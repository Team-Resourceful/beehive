<template>
  <div class="settings-page">
    <div class="settings-page__header">
      <h1>Settings</h1>
    </div>
    <aside class="settings-page__sidebar">
      <div class="vertical-navbar">
        <h3>Display</h3>
        <NuxtLink to="/settings"><PaintBrushIcon /> Appearance</NuxtLink>
        <NuxtLink to="/settings/developer"><CodeIcon /> Developer</NuxtLink>
      </div>
    </aside>
    <div class="settings-page__content">
      <NuxtPage :route="route" />
    </div>
  </div>
</template>
<script setup>
import {PaintBrushIcon, CodeIcon} from 'omorphia'

const route = useRoute()
</script>
<style lang="scss" scoped>
h1 {
  margin-block: var(--gap-sm) var(--gap-lg);
  font-size: 2em;
  line-height: 1em;
}
</style>
