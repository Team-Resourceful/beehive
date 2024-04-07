<template>
  <div ref="main_page" class="page-container" :class="{ 'expanded-mobile-nav': mobileBrowseOpen }">
    <header class="site-header" role="presentation">
      <section class="mobile-navigation">
        <div
          class="nav-menu nav-menu-browse"
          :class="{ expanded: mobileBrowseOpen }"
          @focusin="mobileBrowseOpen = true"
          @focusout="mobileBrowseOpen = false"
        >
          <div class="links cascade-links">
            <a class="btn" href="https://github.com/teamresourceful/beehive">
              GitHub
            </a>
            <a class="btn" href="https://teamresourceful.com">
              Website
            </a>
            <a class="btn" href="https://twitter.com/teamresourceful">
              Twitter
            </a>
            <a class="btn" href="https://discord.gg/resourcefulbees">
              Discord
            </a>
          </div>
        </div>
        <div
          class="nav-menu nav-menu-mobile"
          :class="{ expanded: mobileUserOpen }"
          @focusin="mobileUserOpen = true"
          @focusout="mobileUserOpen = false"
        >
          <div class="links">
            <NuxtLink class="btn" to="/settings">
              <SettingsIcon aria-hidden="true"/>
              Settings
            </NuxtLink>
            <button class="btn" @click="changeTheme(colorMode.value)">
              <MoonIcon v-if="colorMode.value === 'light'" class="icon"/>
              <SunIcon v-else class="icon"/>
              <span class="dropdown-item__text">Change theme</span>
            </button>
          </div>
        </div>
        <div class="mobile-navbar" :class="{ expanded: mobileBrowseOpen || mobileUserOpen }">
          <button
            class="tab button-animation"
            :class="{ 'router-link-exact-active': mobileBrowseOpen }"
            title="Search"
            @click="toggleBrowseMenu()"
          >
            <LinkIcon/>
            Links
          </button>
          <button class="tab button-animation" title="Toggle Mobile Menu"
                  @click="toggleMobileMenu()">
            <template v-if="!mobileUserOpen">
              <HamburgerIcon/>
              More
            </template>
            <template v-else>
              <CrossIcon/>
              Less
            </template>
          </button>
        </div>
      </section>
    </header>
    <div class="page-layout">
      <nav>
        <div class="navbar-brand">
          <nuxt-link href="/projects">
            <span class="wordmark">
              <BeeHiveOutline/>
              <h1>Beehive</h1>
            </span>
          </nuxt-link>
        </div>
        <div class="navbar-links">
          <OverflowMenu
            class="btn btn-transparent btn-header btn-dropdown-animation small-width-displayed"
            position="bottom"
            direction="left"
            :options="[
              {
                id: 'github',
                link: 'https://github.com/teamresourceful/beehive',
              },
              {
                id: 'website',
                link: 'https://teamresourceful.com',
              },
              {
                id: 'twitter',
                link: 'https://twitter.com/teamresourceful',
              },
              {
                id: 'discord',
                link: 'https://discord.gg/resourcefulbees',
              },
            ]"
          >
            Browse
            <DropdownIcon/>
            <template #github>
              <SSOGitHubIcon/>
              GitHub
            </template>
            <template #website>
              <CodeIcon/>
              Website
            </template>
            <template #twitter>
              <TwitterIcon/>
              Twitter
            </template>
            <template #discord>
              <DiscordIcon/>
              Discord
            </template>
          </OverflowMenu>
          <a class="btn btn-transparent btn-header small-width-hidden" href="https://github.com/teamresourceful/beehive">
            GitHub
          </a>
          <a class="btn btn-transparent btn-header small-width-hidden" href="https://teamresourceful.com">
            Website
          </a>
          <a class="btn btn-transparent btn-header small-width-hidden" href="https://twitter.com/teamresourceful">
            Twitter
          </a>
          <a class="btn btn-transparent btn-header small-width-hidden" href="https://discord.gg/resourcefulbees">
            Discord
          </a>
          <OverflowMenu
            class="btn btn-transparent btn-header btn-dropdown-animation"
            position="bottom"
            direction="left"
            :options="[
              {
                id: 'settings',
                link: '/settings',
              },
              {
                id: 'theme',
                action: () => changeTheme(colorMode.value),
              },
            ]"
          >
            <SettingsIcon/>
            <template #settings>
              <SettingsIcon/>
              Settings
            </template>
            <template #theme>
              <MoonIcon v-if="colorMode.value === 'light'" aria-hidden="true"/>
              <SunIcon v-else aria-hidden="true"/>
              Change Theme
            </template>
          </OverflowMenu>
        </div>
      </nav>
      <main>
        <slot id="main"/>
      </main>
      <footer>
        <div class="logo-info">
          <span class="wordmark text-logo">
            <BeeHiveOutline/>
            <h1>Beehive</h1>
          </span>
          <h6 class="not-affiliated-notice">NOT AN OFFICIAL MINECRAFT PRODUCT.<br>NOT APPROVED BY OR
            ASSOCIATED WITH MOJANG.</h6>
        </div>
        <div class="link-info">
          <div class="links">
            <h4 aria-hidden="true">Resources</h4>
            <a rel="noopener" :target="external()" href="https://example.com">Resources</a>
            <a rel="noopener" :target="external()" href="https://example.com">Resources</a>
            <a rel="noopener" :target="external()" href="https://example.com">Resources</a>
            <a rel="noopener" :target="external()" href="https://example.com">Resources</a>
          </div>
          <div class="links">
            <h4 aria-hidden="true">Socials</h4>
            <a rel="noopener" :target="external()" href="https://example.com">Socials</a>
            <a rel="noopener" :target="external()" href="https://example.com">Socials</a>
            <a rel="noopener" :target="external()" href="https://example.com">Socials</a>
            <a rel="noopener" :target="external()" href="https://example.com">Socials</a>
          </div>
          <div class="links">
            <h4 aria-hidden="true">Contact</h4>
            <a rel="noopener" :target="external()" href="https://example.com">Contact</a>
            <a rel="noopener" :target="external()" href="https://example.com">Contact</a>
            <a rel="noopener" :target="external()" href="https://example.com">Contact</a>
            <a rel="noopener" :target="external()" href="https://example.com">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script setup>
import {
  CodeIcon,
  LinkIcon,
  DropdownIcon,
  HamburgerIcon,
  MoonIcon,
  OverflowMenu,
  SettingsIcon,
  DiscordIcon,
  SSOGitHubIcon,
  SunIcon,
  TwitterIcon,
  XIcon as CrossIcon,
} from 'omorphia'
import BeeHiveOutline from '~/assets/images/icons/beehive-outline.svg'

const cosmetics = useCosmetics()
const colorMode = useTheme()

const config = useRuntimeConfig()
const route = useRoute()

const link = config.public.siteUrl + route.path.replace(/\/+$/, '')
useHead({
  link: [
    {
      rel: 'canonical',
      href: link,
    },
  ],
})

useSeoMeta({
  title: 'Beehive',
  description: 'Download Minecraft mods, plugins, datapacks, shaders, resourcepacks, and modpacks on Beehive. ',
  publisher: 'Beehive',
  themeColor: [{color: '#1bd96a'}],
  colorScheme: 'dark light',

  // OpenGraph
  ogTitle: 'Beehive',
  ogSiteName: 'Beehive',
  ogDescription: 'Discover and publish Minecraft content!',
  ogType: 'website',
  ogImage: 'https://images.teamresourceful.com/u/IDWLGs.png',
  ogUrl: link,

  // Twitter
  twitterCard: 'summary',
  twitterSite: '@teamresourceful',
})

function changeTheme(value) {
  updateTheme(
    ['dark', 'oled', 'retro'].includes(value) ? 'light' : cosmetics.value.preferredDarkTheme,
    true
  )
}

const mobileUserOpen = ref(false)
const mobileBrowseOpen = ref(false)

watch(
  () => route.path,
  () => {
    mobileUserOpen.value = false
    mobileBrowseOpen.value = false

    if (process.client) {
      document.body.style.overflowY = 'scroll'
      document.body.setAttribute('tabindex', '-1')
      document.body.removeAttribute('tabindex')
    }

    updateCurrentDate()
  }
)

onMounted(() => {
  if (process.client && window) {
    window.history.scrollRestoration = 'auto'
  }
})

function toggleMobileMenu() {
  mobileUserOpen.value = !mobileUserOpen.value
  if (mobileUserOpen.value) {
    mobileBrowseOpen.value = false
  }
}

function toggleBrowseMenu() {
  mobileBrowseOpen.value = !mobileBrowseOpen.value

  if (mobileBrowseOpen.value) {
    mobileUserOpen.value = false
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/global.scss';
@import 'omorphia/dist/style.css';

.landing-layout {
  display: flex;
  flex-direction: column;
}

.page-layout {
  display: flex;
  flex-direction: column;

  > main {
    @media screen and (max-width: 600px) and (hover: none) {
      margin-top: var(--gap-lg);
    }
  }

  > nav {
    grid-area: nav;
    display: flex;
    justify-content: space-between;
    padding-block: 1.25rem;
    margin-bottom: 0.5rem;
    align-items: center;
    gap: var(--gap-lg);
    position: relative;
    grid-template: 'brand links user';
    grid-template-columns: auto 1fr auto;
    z-index: 3;
    padding-left: 0.75rem;
    padding-right: 0.75rem;

    .small-width-displayed {
      display: none;
    }

    @media screen and (min-width: 1280px) {
      max-width: 1280px;
      width: 1280px;
      margin-left: auto;
      margin-right: auto;
    }

    @media screen and (max-width: 1250px) {
      .small-width-displayed {
        display: flex;
      }

      .small-width-hidden {
        display: none;
      }
    }

    @media screen and (max-width: 600px) and (hover: none) {
      display: none;
    }

    .navbar-links,
    .navbar-user {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .navbar-brand {
      grid-area: brand;
    }

    .navbar-user {
      grid-area: user;
    }

    .navbar-links {
      grid-area: links;
      flex-wrap: wrap;
    }

    .user-avatar {
      --size: 2.5rem !important;
    }

    .logo-heading {
      display: flex;
      flex-direction: row;
      align-items: center;

      .icon-only {
        margin-left: auto;
      }
    }

    .btn-header,
    .popup-menu .btn {
      box-shadow: none;
      font-weight: 600;

      > svg {
        flex-shrink: 0;
      }

      &.visibly-active,
      &.allow-non-exact.router-link-active,
      &.router-link-exact-active {
        color: var(--color-brand);
        background-color: var(--color-brand-highlight);
        pointer-events: none;

        &:not(.icon-only) svg {
          color: var(--color);
        }
      }
    }
  }
}

.wordmark {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;

  h1 {
    margin: 0;
  }

  svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand);
  }
}

.site-header {
  @media screen and (min-width: 1280px) {
    border-radius: var(--radius-sm);
    max-width: 1280px;
  }

  .mobile-navigation {
    display: none;

    .nav-menu {
      width: 100%;
      position: fixed;
      bottom: calc(var(--size-mobile-navbar-height) - var(--round-card));
      padding-bottom: var(--round-card);
      left: 0;
      background-color: var(--color-raised-bg);
      z-index: 6;
      transform: translateY(100%);
      transition: transform 0.4s cubic-bezier(0.54, 0.84, 0.42, 1);
      border-radius: var(--round-card) var(--round-card) 0 0;
      box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0);

      .links,
      .account-container {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 1rem;
        justify-content: center;
        padding: 1rem;

        .btn {
          width: 100%;
          max-width: 500px;
          padding: 0.75rem;
          justify-content: center;
          font-weight: 600;
          font-size: 1rem;
          margin: 0 auto;
        }
      }

      .cascade-links {
        @media screen and (min-width: 354px) {
          grid-template-columns: repeat(2, 1fr);
        }
        @media screen and (min-width: 674px) {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      &-browse {
        &.expanded {
          transform: translateY(0);
          box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.3);
        }
      }

      &-mobile {
        .account-container {
          padding-bottom: 0;

          .account-button {
            padding: var(--gap-md);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;

            .user-icon {
              --size: 2.25rem;
            }

            .account-text {
              flex-grow: 0;
            }
          }
        }

        &.expanded {
          transform: translateY(0);
          box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.3);
        }
      }
    }

    .mobile-navbar {
      display: flex;
      justify-content: space-evenly;
      height: calc(var(--size-mobile-navbar-height) + env(safe-area-inset-bottom));
      border-radius: var(--round-card) var(--round-card) 0 0;
      padding-bottom: env(safe-area-inset-bottom);
      position: fixed;
      left: 0;
      bottom: 0;
      background-color: var(--color-raised-bg);
      box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.3);
      z-index: 7;
      width: 100%;
      transition: border-radius 0.3s ease-out;
      border-top: 2px solid rgba(0, 0, 0, 0);
      box-sizing: border-box;

      &.expanded {
        box-shadow: none;
        border-radius: 0;
      }

      .tab {
        position: relative;
        background: none;
        display: flex;
        flex-basis: 0;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.25rem;
        font-weight: 600;
        padding: 0;
        transition: color ease-in-out 0.15s;
        color: var(--color-secondary);
        text-align: center;
        font-size: var(--font-size-sm);
        height: 100%;

        &.browse {
          svg {
            transform: rotate(180deg);
            transition: transform ease-in-out 0.3s;

            &.closed {
              transform: rotate(0deg);
            }
          }
        }

        svg {
          height: 1.5rem;
          width: 1.5rem;
        }

        .user-icon {
          --size: 2rem;
          transition: border ease-in-out 0.15s;
          border: 0 solid var(--color-brand);
          box-sizing: border-box;

          &.expanded {
            border: 2px solid var(--color-brand);
          }
        }

        &:hover,
        &:focus {
          color: var(--color-base);
        }

        &.router-link-exact-active:not(&.no-active) {
          svg {
            color: var(--color-brand);
          }

          color: var(--color-brand);

          &::before {
            content: '';
            inset: 0.25rem;
            position: absolute;
            background-color: var(--color-brand-highlight);
            z-index: -1;
            border-radius: 1rem;
          }
        }
      }
    }

    @media screen and (max-width: 600px) and (hover: none) {
      display: flex;
    }
  }

  div {
    flex-grow: 1;
    justify-content: flex-end;
    align-items: center;
    row-gap: 1rem;
  }

  &.active {
    display: flex;

    @media screen and (min-width: 1095px) {
      display: none;
    }
  }
}

footer {
  width: 100%;
  margin-block: 6rem;
  padding: 0 0.75rem;
  display: flex;
  justify-content: space-between;

  .logo-info {
    width: 15rem;
    display: flex;
    flex-direction: column;

    .buttons {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  .link-info {
    display: flex;
    justify-content: space-between;
    width: 50%;
  }

  .links {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    h4 {
      color: var(--color-contrast);
      margin: 0 0 1rem 0;
    }

    a {
      margin: 0 0 1rem 0;
    }
  }

  .not-affiliated-notice {
    font-size: var(--font-size-xs);
    font-weight: 400;
    color: var(--color-gray);
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 0.5rem;
  }

  @media screen and (min-width: 1280px) {
    max-width: 1280px;
    width: 1280px;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (max-width: 1024px) {
    align-items: center;
    flex-direction: column;
    gap: 2rem;

    .logo-info {
      align-items: center;
      flex-direction: column;
      gap: 2rem;
    }

    .buttons {
      flex-direction: row;
      gap: 1rem;
    }

    .link-info {
      width: 100%;
    }
  }

  @media screen and (max-width: 400px) {
    .footer-info {
      .logo-info {
        gap: 1rem;
      }

      .buttons {
        align-items: center;
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
