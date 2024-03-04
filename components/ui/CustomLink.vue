<template>
  <a :href="url" :target="external()" rel="noopener nofollow ugc" class="custom-link">
    <BuyMeACoffeeIcon v-if="icon === 'bmac'" aria-hidden="true" />
    <PatreonIcon v-else-if="icon === 'patreon'" aria-hidden="true" />
    <KoFiIcon v-else-if="icon === 'ko-fi'" aria-hidden="true" />
    <PayPalIcon v-else-if="icon === 'paypal'" aria-hidden="true" />
    <OpenCollectiveIcon v-else-if="icon === 'open-collective'" aria-hidden="true" />
    <HeartIcon v-else-if="icon === 'sponsor'" aria-hidden="true" />
    <IssuesIcon v-else-if="icon === 'issues'" aria-hidden="true" />
    <CodeIcon v-else-if="icon === 'code'" aria-hidden="true" />
    <WikiIcon v-else-if="icon === 'wiki'" aria-hidden="true" />
    <DiscordIcon v-else-if="icon === 'discord'" class="shrink" aria-hidden="true" />
    <UnknownIcon v-else />
    <span>{{ text }}</span>
    <ExternalIcon aria-hidden="true" class="external-icon" />
  </a>
</template>

<script setup>
import {
  CodeIcon,
  DiscordIcon,
  ExternalIcon,
  HeartIcon,
  IssuesIcon,
  KoFiIcon,
  OpenCollectiveIcon,
  PatreonIcon,
  PayPalIcon,
  UnknownIcon,
  WikiIcon,
  BuyMeACoffeeIcon,
} from 'omorphia'

defineProps({
  text: String,
  icon: String,
  url: String,
})
</script>

<style lang="scss" scoped>
.custom-link {
  display: inline-flex;
  align-items: center;
  border-radius: 1rem;
  color: var(--color-base);
  font-weight: 500;
  width: fit-content;

  svg,
  img {
    height: 1.1rem;
    width: 1.1rem;
    color: var(--color-secondary);
    margin-right: var(--gap-sm);
  }

  .external-icon {
    visibility: hidden;
    height: 0.8rem;
    width: 0.8rem;
    margin-left: var(--gap-xs);

    transition: color 0.2s ease;
  }

  &:hover {
    .external-icon {
      visibility: visible;
    }
  }

  &:focus-visible,
  &:hover {
    &,
    svg,
    img {
      color: var(--color-contrast);
    }
  }

  &:active {
    svg,
    img,
    span {
      color: var(--color-contrast);
    }
  }
}
</style>
