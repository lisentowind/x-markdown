<template>
  <code class="x-md-inline-code">
    {{ content }}
  </code>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { CodeLineProps } from './types';

const props = withDefaults(defineProps<CodeLineProps>(), {
  raw: () => ({}),
});

// 获取实际内容
const content = computed(() => {
  const result = props.raw?.content ?? '';
  return result;
});
</script>