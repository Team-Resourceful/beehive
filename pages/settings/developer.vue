<template>
  <div>
    <section class="card">
      <h2>Developer Settings</h2>
      <div class="adjacent-input small">
        <label for="advanced-rendering">
          <span class="label__title">Developer Mode</span>
          <span class="label__description">Will show developer things, do not turn on unless you know what you're doing.</span>
        </label>
        <input
          id="developer-mode"
          v-model="cosmetics.developerMode"
          class="switch stylized-toggle"
          type="checkbox"
          @change="saveCosmetics"
        />
      </div>
      <div class="adjacent-input small">
        <label for="advanced-rendering">
          <span class="label__title">Maven Info</span>
          <span class="label__description">Will show maven information in versions</span>
        </label>
        <input
          id="developer-mode"
          v-model="cosmetics.mavenInfo"
          class="switch stylized-toggle"
          type="checkbox"
          @change="saveCosmetics"
        />
      </div>
    </section>
  </div>
</template>

<script setup>

useHead({
  title: `Developer settings - Hive`,
})

const cosmetics = useCosmetics()
</script>
