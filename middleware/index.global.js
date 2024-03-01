export default defineNuxtRouteMiddleware(async (to) => {
  if (to && to.path === '/') {
    return navigateTo(`/projects`)
  }
})
