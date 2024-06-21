<template>
  <section class="card">
    <h2>Project Details</h2>

    <div class="adjacent-input small">
      <label>
        <span class="label__title">Project Slug</span>
        <span class="label__description">The slug of the project</span>
      </label>
      <input
        type="text"
        placeholder=""
        disabled
        :value="route.params.id"
      />
    </div>

    <div class="adjacent-input small">
      <label>
        <span class="label__title">Modrinth ID</span>
        <span class="label__description">The ID of the project on Modrinth</span>
      </label>
      <input
        type="text"
        placeholder=""
        disabled
        :value="project.extra.modrinth"
      />
    </div>

    <div class="adjacent-input small">
      <label>
        <span class="label__title">CurseForge ID</span>
        <span class="label__description">The ID of the project on CurseForge</span>
      </label>
      <input
        type="text"
        placeholder=""
        disabled
        :value="project.extra.curseforge"
      />
    </div>

  </section>
</template>

<script setup>
const route = useRoute()

defineProps({
  project: {
    type: Object,
    default() {
      return {}
    },
  },
})
</script>
