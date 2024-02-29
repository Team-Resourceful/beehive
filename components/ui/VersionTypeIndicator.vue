<template>
  <div v-if="type === 'release'" class="type-indicator release">R</div>
  <div v-else-if="type === 'beta'" class="type-indicator beta">B</div>
  <div v-else-if="type === 'alpha'" class="type-indicator alpha">A</div>
  <div v-else class="type-indicator">?</div>
</template>

<script setup>

defineProps({
  type: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.type-indicator {
  --_color: var(--color-base);
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0.75rem;
  font-weight: bold;
  border: 2px solid var(--_color);
  color: var(--_color);
  line-height: 1em;
  font-size: var(--font-size-sm);

  &.release {
    --_color: var(--color-green);
  }

  &.beta {
    --_color: var(--color-orange);
  }

  &.alpha {
    --_color: var(--color-red);
  }
}
</style>
