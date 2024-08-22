<template>
  <div class="normal-page alt-layout">
    <div class="normal-page__header">
      <h1>Editing {{ project.title }}</h1>
    </div>
    <div class="vertical-navbar normal-page__sidebar">
      <h3>Project</h3>
      <NuxtLink :to="`/panel/${route.params.id}`">
        <DashboardIcon/>
        Details
      </NuxtLink>
      <NuxtLink :to="`/panel/${route.params.id}/description`">
        <BookIcon/>
        Description
      </NuxtLink>
      <NuxtLink :to="`/panel/${route.params.id}/links`">
        <LinkIcon/>
        Links
      </NuxtLink>
      <h3>Team</h3>
      <NuxtLink :to="`/panel/${route.params.id}/members`">
        <UsersIcon/>
        Members
      </NuxtLink>
    </div>
    <section class="normal-page__content">
      <NuxtPage
        v-model:project="project"
        v-model:versions="versions"
        v-model:all-members="allMembers"
      />
    </section>
  </div>
</template>

<script setup>
import {computeVersions} from '~/helpers/projects'
import {BookIcon, DashboardIcon, LinkIcon, UsersIcon} from "omorphia";

const route = useRoute()

if (!route.params.id) {
  throw createError({
    fatal: true,
    statusCode: 404,
    message: 'The page could not be found',
  })
}

let project, allMembers, versions
try {
  ;[{data: project}, {data: allMembers}, {data: versions}] = await Promise.all([
    useAsyncData(
      `project/${route.params.id}`,
      () => $fetch(`https://beehive-api.teamresourceful.com/projects/${route.params.id}`),
      {
        transform: (project) => {
          if (project) {
            project.actualProjectType = JSON.parse(JSON.stringify(project.project_type))

            if (process.client && history.state && history.state.overrideProjectType) {
              project.project_type = history.state.overrideProjectType
            }
          }

          return project
        },
      }
    ),
    useAsyncData(`project/${route.params.id}/members`, () =>
      $fetch(`https://beehive-api.teamresourceful.com/teams/${route.params.id}`)
    ),
    useAsyncData(`project/${route.params.id}/version`, () =>
      $fetch(`https://beehive-api.teamresourceful.com/versions/${route.params.id}`)
    ),
  ])

  versions = shallowRef(toRaw(versions))
} catch (error) {
  throw createError({
    fatal: true,
    statusCode: 404,
    message: 'Project not found',
  })
}

if (!project.value) {
  throw createError({
    fatal: true,
    statusCode: 404,
    message: 'Project not found',
  })
}

versions.value = computeVersions(versions.value)

</script>
<style lang="scss" scoped>
</style>
