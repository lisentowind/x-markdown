<template>
  <StreamRenderer
    :code="props?.raw?.content || ''"
    :language="props?.raw?.language || 'text'"
    :is-dark="props.isDark ?? false"
    :theme="props.theme ?? 'vitesse-light'"
  />
</template>
<script lang="ts" setup>
import type { CodeBlockProps } from './types';
import StreamRenderer from './StreamRenderer.vue';

const props = defineProps<CodeBlockProps>()
</script>
