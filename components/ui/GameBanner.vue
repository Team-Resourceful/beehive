<template>
  <div class="page-header dark-mode">
    <img :src="bannerUrl" class="game-banner" :alt="`Banner art for ${game}`" />
    <div class="banner-overlay">
      <div class="banner-overlay__content">
        <Avatar class="game-icon" :src="iconUrl" />
        <h1 class="game-title">
          <span class="game-name">Minecraft</span>
          <span class="game-subtitle">Java Edition</span>
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Avatar } from 'omorphia'

defineProps({
  game: {
    type: String,
    required: true,
  },
})

const iconUrl = computed(() => 'https://files.teamresourceful.com/u/minecraft-java-icon.webp')
const bannerUrl = computed(() => 'https://files.teamresourceful.com/u/minecraft-java-banner.webp')
</script>

<style lang="scss" scoped>
.page-header {
  position: relative;
  border-radius: var(--radius-sm);
  overflow: hidden;
  width: 100%;
  height: fit-content;
  border: 1px solid rgba(255, 255, 255, 0.15);

  .banner-overlay {
    display: flex;
    width: 100%;
    padding: 2rem;
    background-image: radial-gradient(
      ellipse at -20% 100%,
      rgba(0, 0, 0, 0.8) 0%,
      transparent 100%
    );

    .banner-overlay__content {
      display: flex;
      align-items: center;
      margin-top: auto;
    }

    .game-icon {
      width: 3rem;
      height: 3rem;
      margin-right: 1rem;
      border: none;
      background-color: transparent;
      box-shadow: none;
    }

    .game-title {
      margin: 0;
      display: flex;
      flex-direction: column;

      .game-subtitle {
        color: var(--color-base);
        font-size: var(--font-size-lg);
      }
    }
  }

  .game-banner {
    position: absolute;
    inset: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
</style>
