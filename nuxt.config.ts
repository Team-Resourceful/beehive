import {promises as fs} from 'fs'
import {pathToFileURL} from 'node:url'
import svgLoader from 'vite-svg-loader'
import {basename, relative} from 'pathe'
import {defineNuxtConfig} from 'nuxt/config'
import {globIterate} from 'glob'
import {$fetch} from 'ofetch'
import {match as matchLocale} from '@formatjs/intl-localematcher'
import {consola} from 'consola'

const preloadedFonts = [
  'inter/Inter-Regular.woff2',
  'inter/Inter-Medium.woff2',
  'inter/Inter-SemiBold.woff2',
  'inter/Inter-Bold.woff2',
]

/**
 * Tags of locales that are auto-discovered besides the default locale.
 *
 * Preferably only the locales that reach a certain threshold of complete
 * translations would be included in this array.
 */
const enabledLocales: string[] = []

/**
 * Overrides for the categories of the certain locales.
 */
const localesCategoriesOverrides: Partial<Record<string, 'fun' | 'experimental'>> = {
  'en-x-pirate': 'fun',
  'en-x-updown': 'fun',
  'en-x-lolcat': 'fun',
  'en-x-uwu': 'fun',
  'ru-x-bandit': 'fun',
  ar: 'experimental',
  he: 'experimental',
  pes: 'experimental',
}

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Beehive',
      link: [
        // The type is necessary because the linter can't always compare this very nested/complex type on itself
        ...preloadedFonts.map((font): object => {
          return {
            rel: 'preload',
            href: `https://cdn-raw.modrinth.com/fonts/${font}?v=3.19`,
            as: 'font',
            type: 'font/woff2',
            crossorigin: 'anonymous',
          }
        }),
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
      ],
      meta: [
        {
          'name': 'darkreader-lock'
        }
      ]
    },
  },
  vite: {
    plugins: [
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      }),
    ],
  },
  hooks: {
    async 'build:before'() {
      let state: {
        lastGenerated?: string
        gameVersions?: any[]
      } = {}

      try {
        state = JSON.parse(await fs.readFile('./generated/state.json', 'utf8'))
      } catch {
        // File doesn't exist, create folder
        await fs.mkdir('./generated', {recursive: true})
      }

      state.lastGenerated = new Date().toISOString()

      const gameVersions: any = await $fetch(`https://piston-meta.mojang.com/mc/game/version_manifest_v2.json`)

      state.gameVersions = gameVersions.versions.map((version: any) => {
        return {
          version: version.id,
          version_type: version.type,
          date: version.releaseTime
        }
      })

      await fs.writeFile('./generated/state.json', JSON.stringify(state))

      console.log('Tags generated!')
    },
    async 'vintl:extendOptions'(opts) {
      opts.locales ??= []

      const resolveCompactNumberDataImport = await (async () => {
        const compactNumberLocales: string[] = []

        for await (const localeFile of globIterate(
          'node_modules/@vintl/compact-number/dist/locale-data/*.mjs',
          {ignore: '**/*.data.mjs'}
        )) {
          const tag = basename(localeFile, '.mjs')
          compactNumberLocales.push(tag)
        }

        function resolveImport(tag: string) {
          const matchedTag = matchLocale([tag], compactNumberLocales, 'en-x-placeholder')
          return matchedTag === 'en-x-placeholder'
            ? undefined
            : `@vintl/compact-number/locale-data/${matchedTag}`
        }

        return resolveImport
      })()

      const resolveOmorphiaLocaleImport = await (async () => {
        const omorphiaLocales: string[] = []
        const omorphiaLocaleSets = new Map<string, { files: { from: string }[] }>()

        for await (const localeDir of globIterate('node_modules/omorphia/locales/*', {
          posix: true,
        })) {
          const tag = basename(localeDir)
          omorphiaLocales.push(tag)

          const localeFiles: { from: string; format?: string }[] = []

          omorphiaLocaleSets.set(tag, {files: localeFiles})

          for await (const localeFile of globIterate(`${localeDir}/*`, {posix: true})) {
            localeFiles.push({
              from: pathToFileURL(localeFile).toString(),
              format: 'default',
            })
          }
        }

        return function resolveLocaleImport(tag: string) {
          return omorphiaLocaleSets.get(matchLocale([tag], omorphiaLocales, 'en-x-placeholder'))
        }
      })()

      for await (const localeDir of globIterate('locales/*/', {posix: true})) {
        const tag = basename(localeDir)
        if (!enabledLocales.includes(tag) && opts.defaultLocale !== tag) continue

        const locale =
          opts.locales.find((locale) => locale.tag === tag) ??
          opts.locales[opts.locales.push({tag}) - 1]

        const localeFiles = (locale.files ??= [])

        for await (const localeFile of globIterate(`${localeDir}/*`, {posix: true})) {
          const fileName = basename(localeFile)
          if (fileName === 'index.json') {
            localeFiles.push({
              from: `./${localeFile}`,
              format: 'crowdin',
            })
          } else if (fileName === 'meta.json') {
            const meta: Record<string, { message: string }> = await fs
              .readFile(localeFile, 'utf8')
              .then((date) => JSON.parse(date))
            locale.meta ??= {}
            for (const key in meta) {
              locale.meta[key] = meta[key].message
            }
          } else {
            ;(locale.resources ??= {})[fileName] = `./${localeFile}`
          }
        }

        const categoryOverride = localesCategoriesOverrides[tag]
        if (categoryOverride != null) {
          ;(locale.meta ??= {}).category = categoryOverride
        }

        const omorphiaLocaleData = resolveOmorphiaLocaleImport(tag)
        if (omorphiaLocaleData != null) {
          localeFiles.push(...omorphiaLocaleData.files)
        }

        const cnDataImport = resolveCompactNumberDataImport(tag)
        if (cnDataImport != null) {
          ;(locale.additionalImports ??= []).push({
            from: cnDataImport,
            resolve: false,
          })
        }
      }
    },
  },
  runtimeConfig: {
    // @ts-ignore
    rateLimitKey: process.env.RATE_LIMIT_IGNORE_KEY ?? globalThis.RATE_LIMIT_IGNORE_KEY,
    public: {
      siteUrl: getDomain(),

      owner: 'teamresourceful',
      slug: 'beehive',
      branch:
        process.env.VERCEL_GIT_COMMIT_REF ||
        process.env.CF_PAGES_BRANCH ||
        // @ts-ignore
        globalThis.CF_PAGES_BRANCH ||
        'master',
      hash:
        process.env.CF_PAGES_COMMIT_SHA ||
        // @ts-ignore
        globalThis.CF_PAGES_COMMIT_SHA ||
        'unknown',
    },
  },
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
      },
    },
  },
  modules: ['@vintl/nuxt', '@nuxtjs/turnstile'],
  vintl: {
    defaultLocale: 'en-US',
    locales: [
      {
        tag: 'en-US',
        meta: {
          static: {
            iso: 'en',
          },
        },
      },
    ],
    storage: 'cookie',
    parserless: 'only-prod',
    seo: {
      defaultLocaleHasParameter: false,
    },
    onParseError({error, message, messageId, moduleId, parseMessage, parserOptions}) {
      const errorMessage = String(error)
      const modulePath = relative(__dirname, moduleId)

      try {
        const fallback = parseMessage(message, {...parserOptions, ignoreTag: true})

        consola.warn(
          `[i18n] ${messageId} in ${modulePath} cannot be parsed normally due to ${errorMessage}. The tags will will not be parsed.`
        )

        return fallback
      } catch (err) {
        const secondaryErrorMessage = String(err)

        const reason =
          errorMessage === secondaryErrorMessage
            ? errorMessage
            : `${errorMessage} and ${secondaryErrorMessage}`

        consola.warn(
          `[i18n] ${messageId} in ${modulePath} cannot be parsed due to ${reason}. It will be skipped.`
        )
      }
    },
  },
  turnstile: {
    siteKey: '0x4AAAAAAAHWfmKCm7cUG869',
  },
  nitro: {
    moduleSideEffects: ['@vintl/compact-number/locale-data'],
  },
  devtools: {
    enabled: true,
  },
})

function getDomain() {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.SITE_URL) {
      return process.env.SITE_URL
    }
    // @ts-ignore
    else if (process.env.CF_PAGES_URL || globalThis.CF_PAGES_URL) {
      // @ts-ignore
      return process.env.CF_PAGES_URL ?? globalThis.CF_PAGES_URL
    } else {
      return 'https://beehive.teamresourceful.com'
    }
  } else {
    return 'http://localhost:3000'
  }
}
