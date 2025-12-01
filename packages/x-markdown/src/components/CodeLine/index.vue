<template>
  <code class="inline-code-tag">
    {{ content }}
  </code>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { CodeLineProps } from './types';

const props = withDefaults(defineProps<CodeLineProps>(), {
  raw: () => ({}),
  content: ''
});

// 获取实际内容
const content = computed(() => {
  const result = props.raw?.content || props.content || '';
  return result;
});
</script>