<template>
  <div v-if="count > 1" class="paginates">
    <a
      :class="{ disabled: page === 1 }"
      :tabindex="page === 1 ? -1 : 0"
      class="btn btn-transparent icon-only l-btn"
      aria-label="Previous Page"
      :href="linkFunction(page - 1)"
      @click.prevent="page !== 1 ? switchPage(page - 1) : null"
    >
      <LeftArrowIcon />
    </a>
    <div
      v-for="(item, index) in pages"
      :key="'page-' + item + '-' + index"
      :class="{
        'page-number': page !== item,
        shrink: item !== -1 && item > 99,
        'desktop-only': page - 1 !== item && page + 1 !== item && item !== page,
      }"
      class="page-number-container"
    >
      <div v-if="item === -1" class="has-icon">
        <GapIcon class="gap-icon" />
      </div>
      <a
        v-else
        class="btn"
        :class="{
          'page-number current btn-brand-highlight': page === item,
          'btn-transparent': page !== item,
          shrink: item > 99,
        }"
        :href="linkFunction(item)"
        @click.prevent="page !== item ? switchPage(item) : null"
      >
        {{ item }}
      </a>
    </div>

    <a
      :class="{
        disabled: page === pages[pages.length - 1],
      }"
      :tabindex="page === pages[pages.length - 1] ? -1 : 0"
      class="btn btn-transparent icon-only"
      aria-label="Next Page"
      :href="linkFunction(page + 1)"
      @click.prevent="page !== pages[pages.length - 1] ? switchPage(page + 1) : null"
    >
      <RightArrowIcon />
    </a>
  </div>
</template>
<script setup lang="ts">
import { GapIcon, LeftArrowIcon, RightArrowIcon } from 'omorphia'
import { computed } from 'vue'

const emit = defineEmits<{
  'switch-page': [page: number]
}>()

const props = withDefaults(
  defineProps<{
    page: number
    count: number
    linkFunction: (page: number) => string | undefined
  }>(),
  {
    page: 1,
    count: 1,
    linkFunction: (page: number) => void page,
  }
)

const pages = computed(() => {
  const pages = []
  if (props.count > 5) {
    const fourFromStart = 4
    const fourFromEnd = props.count - 3
    pages.push(1)
    if (props.page <= fourFromStart) {
      for (let i = 2; i < Math.min(props.count, 6); i++) {
        pages.push(i)
      }
      pages.push(-1)
    } else if (props.page > fourFromStart && props.page < fourFromEnd) {
      pages.push(-1)
      pages.push(props.page - 1, props.page, props.page + 1)
      pages.push(-1)
    } else if (props.page >= fourFromEnd) {
      pages.push(-1)
      for (let i = Math.max(2, props.count - 4); i < props.count; i++) {
        pages.push(i)
      }
    }
    pages.push(props.count)
  } else {
    for (let i = 1; i <= props.count; i++) {
      pages.push(i)
    }
  }
  return pages
})

function switchPage(newPage: number) {
  emit('switch-page', Math.min(Math.max(newPage, 1), props.count))
}
</script>

<style lang="scss" scoped>
a {
  padding: var(--gap-sm);
  margin: 0;
  height: 2.25rem;
  min-width: 2.25rem;
  box-shadow: none;
}

.has-icon {
  display: flex;
  align-items: center;
  svg {
    width: 1em;
  }
}

.page-number-container,
a,
.has-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.paginates {
  display: flex;
  gap: var(--gap-xs);
}

@media screen and (max-width: 530px) {
  a {
    width: 2.5rem;
    padding: 0.5rem 0;
  }
}

.gap-icon {
  margin-inline: 0.25rem;
}

@media screen and (max-width: 500px) {
  .paginates {
    font-size: 80%;
  }

  .desktop-only {
    display: none;
  }
}

.l-btn {
  margin-left: auto;
}
</style>
