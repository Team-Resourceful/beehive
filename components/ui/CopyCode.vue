<template>
  <button class="code" :class="{ copied }" title="Copy code to clipboard" @click="copyText">
    <span>{{ text }}</span>
    <CheckIcon v-if="copied" />
    <ClipboardCopyIcon v-else />
  </button>
</template>

<script setup>
import { CheckIcon, ClipboardCopyIcon } from "omorphia";

const props = defineProps({ text: String })

const copied = ref(false)

async function copyText() {
  await navigator.clipboard.writeText(props.text)
  copied.value = true
}
</script>

<style lang="scss" scoped>
.code {
  display: inline-flex;
  justify-content: space-between;
  grid-gap: 0.5rem;
  font-family: var(--mono-font);
  font-size: var(--font-size-sm);
  margin: 0;
  padding: 0.5rem;
  background-color: var(--color-button-bg);
  width: min-content;
  border-radius: 10px;
  user-select: text;
  transition: opacity 0.5s ease-in-out, filter 0.2s ease-in-out, transform 0.05s ease-in-out,
  outline 0.2s ease-in-out;

  @media (prefers-reduced-motion) {
    transition: none !important;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  svg {
    width: 1em;
    height: 1em;
  }

  &:hover {
    filter: brightness(var(--filter-hover));
  }

  &:active {
    transform: scale(0.95);
    filter: brightness(var(--filter-active));
  }
}
</style>
