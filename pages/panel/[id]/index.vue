<template>
  <section class="card actions">
    <h2>Project Details</h2>
    <Button color="primary" @click="() => {updateProject(project)}">
      <SaveIcon/>
      Save
    </Button>
  </section>
  <section class="card">
    <h2>Info</h2>

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
  <section class="card">
    <h2>Display</h2>

    <div class="adjacent-input small">
      <label>
        <span class="label__title">Project Name</span>
        <span class="label__description">The name of the project</span>
      </label>
      <input
        type="text"
        v-model="project.title"
      />
    </div>

  </section>
  <section class="card">
    <h2>Maven Info</h2>

    <div class="adjacent-input small">
      <label>
        <span class="label__title">Project Group</span>
        <span class="label__description">The maven group of the project</span>
      </label>
      <input
        type="text"
        disabled
        :value="project.group"
      />
    </div>

  </section>
</template>

<script setup>
import {Button, SaveIcon} from 'omorphia'

const route = useRoute()

defineProps({
  project: {
    type: Object,
    default() {
      return {}
    },
  },
})

const updateProject = (project) => {
  fetch(`https://api.beehive.sh/panel/projects/${route.params.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      info: {
        title: project.title
      },
    }),
  })
}

</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
  }
}
</style>
