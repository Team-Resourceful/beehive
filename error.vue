<template>
  <NuxtLayout>
    <div class="main">
      <div class="page-error" :class="{
        'not-found': error.statusCode === 404,
      }">
        <Logo404 v-if="error.statusCode === 404" />
        <div>
          <h1 v-if="error.statusCode !== 404">An error occurred!</h1>
          <p>{{ error.message }}</p>
          <div class="input-group">
            <nuxt-link to="/" class="btn btn-primary"> Go home </nuxt-link>
            <a href="https://rsfl.team/discord" class="btn raised" rel="noopener">
              Get help on Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import Logo404 from '~/assets/images/404.svg'

defineProps({
  error: {
    type: Object,
    default() {
      return {
        statusCode: 1000,
        message: 'Unknown error',
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}

.page-error {
  width: 60%;

  h1 {
    margin-bottom: 0.25rem;
  }

  svg {
    fill: var(--color-base);
    color: var(--color-base);

    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .input-group {
    display: flex;
    gap: 1rem;
  }
}

.not-found {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

</style>
