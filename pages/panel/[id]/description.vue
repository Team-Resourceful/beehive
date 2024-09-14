<template>
  <div class="card description-actions">
    <h2>Description/Summary</h2>
    <Button color="primary" @click="() => {fetchDescription(project)}">
      <UpdatedIcon/> Fetch from Modrinth
    </Button>
  </div>
  <div class="card">
    <div class="description-actions">
      <h3>Summary</h3>
      <Button color="danger" disabled>
        <UploadIcon/> Push
      </Button>
    </div>
    <br>
    <input class="summary" type="text" disabled :value="project.description"/>
  </div>
  <div class="card description-actions">
    <h3>Description</h3>
    <Button color="danger" disabled>
      <UploadIcon/> Push
    </Button>
  </div>
  <div class="markdown-body card" v-html="renderHighlightedString(project.body)" />
</template>

<script setup>
import {Button, renderHighlightedString, UpdatedIcon, UploadIcon} from 'omorphia'

const route = useRoute()

defineProps({
  project: {
    type: Object,
    default() {
      return {}
    },
  },
})

const fetchDescription = (project) => {
  fetch(`https://api.modrinth.com/v2/project/${project.extra.modrinth}`)
    .then((res) => res.json())
    .then((data) => {
      project.body = data.body

      fetch(`https://api.beehive.sh/panel/projects/${route.params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          info: {
            body: data.body,
          },
        }),
      })
    });
}
</script>
<style lang="scss" scoped>
.card > :last-child(h3) {
  margin: 0;
}

.description-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2, h3 {
    margin: 0;
  }
}

.summary {
  width: 100%;
}
</style>
