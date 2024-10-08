<template>
  <div class="content">
    <VersionFilterControl :versions="props.versions" @switch-page="switchPage" />
    <div v-if="filteredVersions.length > 0" id="all-versions" class="card all-versions">
      <div class="header">
        <div />
        <div>Version</div>
        <div>Supports</div>
        <div>Stats</div>
      </div>
      <div
        v-for="version in filteredVersions.slice((currentPage - 1) * 20, currentPage * 20)"
        :key="version.id"
        class="version-button button-base button-transparent button-base"
        @click="
          $router.push(
            `/${project.project_type}/${route.params.id}/version/${encodeURI(version.id)}`
          )
        "
      >
        <a
          v-tooltip="version.primaryFile.filename"
          :href="version.primaryFile.url"
          class="download-button btn icon-only btn-download"
          :class="version.version_type"
          :aria-label="`Download ${version.name}`"
          @click.stop="(event) => event.stopPropagation()"
        >
          <DownloadIcon aria-hidden="true" />
        </a>
        <nuxt-link
          :to="`/${project.project_type}/${route.params.id}/version/${encodeURI(version.id)}`"
          class="version__title"
        >
          {{ version.name }}
        </nuxt-link>
        <div class="version__metadata">
          <VersionBadge v-if="version.version_type === 'release'" type="release" color="green" />
          <VersionBadge v-else-if="version.version_type === 'beta'" type="beta" color="orange" />
          <VersionBadge v-else-if="version.version_type === 'alpha'" type="alpha" color="red" />
          <span class="divider" />
          <span class="version_number">{{ version.version_number }}</span>
        </div>
        <div class="version__supports">
          <span>{{ version.loaders.map((x) => formatCategory(x)).join(', ') }}</span>
          <span>{{ formatVersions(version.game_versions, tags.gameVersions) }}</span>
        </div>
        <div class="version__stats">
          <strong>{{ formatBytes(version.primaryFile.size) }}</strong>
          <span>
            Published on
            <strong>{{ dayjs(version.date_published).format('MMM D, YYYY') }}</strong>
          </span>
        </div>
      </div>
    </div>
<!--    TODO FIX THIS PAGINATION AS OMORPHIA DOESNT HAVE SPECIAL CASES FOR ALL PAGES-->
    <div class="version-pagination">
      <PaginationV2
        :page="currentPage"
        :count="Math.ceil(filteredVersions.length / 20)"
        class="pagination-before"
        :link-function="(page) => `?page=${page}`"
        @switch-page="switchPage"
      />
    </div>
  </div>
</template>
<script setup>
import dayjs from 'dayjs'
import {
  Badge as VersionBadge,
  DownloadIcon,
  formatBytes,
  formatCategory,
  formatNumber,
  formatVersions,
} from 'omorphia'
import VersionFilterControl from '~/components/ui/VersionFilterControl.vue'
import PaginationV2 from "~/components/ui/PaginationV2.vue";

const props = defineProps({
  project: {
    type: Object,
    default() {
      return {}
    },
  },
  versions: {
    type: Array,
    default() {
      return []
    },
  },
  members: {
    type: Array,
    default() {
      return []
    },
  },
})

const tags = useTags()

const title = `${props.project.title} - Versions`
const description = `Download and browse ${props.versions.length} ${
  props.project.title
} versions. ${formatNumber(props.project.downloads)} total downloads. Last updated ${dayjs(
  props.project.updated
).format('MMM D, YYYY')}.`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
})

const route = useRoute()
const currentPage = ref(1)

const filteredVersions = computed(() => {
  const selectedGameVersions = getArrayOrString(route?.query?.g) ?? []
  const selectedLoaders = getArrayOrString(route?.query?.l) ?? []
  const selectedVersionTypes = getArrayOrString(route?.query?.c) ?? []

  return props.versions.filter(
    (projectVersion) =>
      (selectedGameVersions.length === 0 ||
        selectedGameVersions.some((gameVersion) =>
          projectVersion.game_versions.includes(gameVersion)
        )) &&
      (selectedLoaders.length === 0 ||
        selectedLoaders.some((loader) => projectVersion.loaders.includes(loader))) &&
      (selectedVersionTypes.length === 0 ||
        selectedVersionTypes.includes(projectVersion.version_type))
  )
})

function switchPage(page) {
  currentPage.value = page

  const router = useRouter()
  const route = useRoute()

  router.replace({
    query: {
      ...route.query,
      p: currentPage.value !== 1 ? currentPage.value : undefined,
    },
  })
}
</script>

<style lang="scss" scoped>
.version-pagination {
  display: flex;
  justify-content: center;

  .pagination-before {
    width: fit-content;
  }
}

.btn-download {
  --_text-color: var(--color-contrast);
  --_background-color: var(--color-super-raised-bg);
  --_accent-color: var(--color-super-raised-bg);
}

.header-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;

  .indicator {
    display: flex;
    gap: 0.5ch;
    align-items: center;
    color: var(--color-secondary);
  }
}

.all-versions {
  display: flex;
  flex-direction: column;

  .header {
    display: grid;
    grid-template: 'download title supports stats';
    grid-template-columns: calc(2.25rem + var(--gap-sm)) 1.25fr 1fr 1fr;
    color: var(--color-contrast);
    font-size: var(--font-size-md);
    font-weight: bold;
    justify-content: left;
    margin-inline: var(--gap-md);
    margin-bottom: var(--gap-sm);
    column-gap: var(--gap-sm);

    div:first-child {
      grid-area: download;
    }

    div:nth-child(2) {
      grid-area: title;
    }

    div:nth-child(3) {
      grid-area: supports;
    }

    div:nth-child(4) {
      grid-area: stats;
    }
  }

  .version-button {
    display: grid;
    grid-template:
      'download title supports stats'
      'download metadata supports stats'
      'download dummy supports stats';
    grid-template-columns: calc(2.25rem + var(--gap-sm)) 1.25fr 1fr 1fr;
    column-gap: var(--gap-sm);
    justify-content: left;
    padding: var(--gap-md);

    .download-button {
      grid-area: download;
    }
    .version__title {
      grid-area: title;
      font-weight: bold;

      svg {
        vertical-align: top;
      }
    }
    .version__metadata {
      grid-area: metadata;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--gap-xs);
      margin-top: var(--gap-xs);
    }
    .version__supports {
      grid-area: supports;
      display: flex;
      flex-direction: column;
      gap: var(--gap-xs);
    }
    .version__stats {
      grid-area: stats;
      display: flex;
      flex-direction: column;
      gap: var(--gap-xs);
    }
  }
}

@media screen and (max-width: 1024px) {
  .all-versions {
    .header {
      grid-template: 'download title';
      grid-template-columns: calc(2.25rem + var(--gap-sm)) 1fr;

      div:nth-child(3) {
        display: none;
      }

      div:nth-child(4) {
        display: none;
      }
    }

    .version-button {
      grid-template: 'download title' 'download metadata' 'download supports' 'download stats';
      grid-template-columns: calc(2.25rem + var(--gap-sm)) 1fr;
      row-gap: var(--gap-xs);

      .version__supports {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        column-gap: var(--gap-xs);
      }
      .version__metadata {
        margin: 0;
      }
    }
  }
}

.search-controls {
  display: flex;
  flex-direction: row;
  gap: var(--gap-md);
  align-items: center;
  flex-wrap: wrap;
  .multiselect {
    flex: 1;
  }
  .checkbox-outer {
    min-width: fit-content;
  }
}
</style>
