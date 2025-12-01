import type { PropType, Ref } from 'vue';
import type { PluggableList } from 'unified';
import type { MarkdownContext } from './types';
import type { CodeXProps } from '../CodeX/types';
import type { MermaidToolbarConfig } from '../Mermaid/types';
import type { CustomAttrs, SanitizeOptions } from '../../core/types';
import deepmerge from 'deepmerge';
import { computed, defineComponent, h, inject, provide, toValue } from 'vue';
import { usePlugins, useProcessMarkdown } from '../../hooks';

// Provider 注入的 key
const MARKDOWN_PROVIDER_KEY = Symbol('vue-element-plus-x-markdown-provider');

// Markdown 核心 Props 定义
const MARKDOWN_CORE_PROPS = {
  markdown: { type: String, default: '' },
  allowHtml: { type: Boolean, default: false },
  enableLatex: { type: Boolean, default: true },
  enableAnimate: { type: Boolean, default: false },
  enableBreaks: { type: Boolean, default: true },
  codeXProps: {
    type: Object as PropType<CodeXProps>,
    default: () => ({ enableCodeCopy: true, enableThemeToggle: false, enableCodeLineNumber: false })
  },
  codeXRender: { type: Object, default: () => ({}) },
  codeXSlot: { type: Object, default: () => ({}) },
  codeHighlightTheme: { type: Object as PropType<any | null>, default: () => null },
  customAttrs: { type: Object as PropType<CustomAttrs>, default: () => ({}) },
  remarkPlugins: { type: Array as PropType<PluggableList>, default: () => [] },
  remarkPluginsAhead: { type: Array as PropType<PluggableList>, default: () => [] },
  rehypePlugins: { type: Array as PropType<PluggableList>, default: () => [] },
  rehypePluginsAhead: { type: Array as PropType<PluggableList>, default: () => [] },
  rehypeOptions: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
  sanitize: { type: Boolean, default: false },
  sanitizeOptions: { type: Object as PropType<SanitizeOptions>, default: () => ({}) },
  mermaidConfig: { type: Object as PropType<Partial<MermaidToolbarConfig>>, default: () => ({}) },
  defaultThemeMode: { type: String as PropType<'light' | 'dark'>, default: 'light' },
  isDark: { type: Boolean, default: false }
};


const MarkdownProvider = defineComponent({
  name: 'MarkdownProvider',
  props: MARKDOWN_CORE_PROPS,
  setup(props, { slots, attrs }) {
    const { rehypePlugins, remarkPlugins } = usePlugins(props);
    const markdown = computed(() => {
      if (props.enableLatex) {
        return useProcessMarkdown(props.markdown);
      } else {
        return props.markdown;
      }
    });
    const processProps = computed(() => {
      return {
        ...props,
        codeXProps: Object.assign(
          {},
          MARKDOWN_CORE_PROPS.codeXProps.default(),
          props.codeXProps
        ),
        markdown: markdown.value
      };
    });

    const contextProps = computed(() => {
      return deepmerge(
        {
          rehypePlugins: toValue(rehypePlugins),
          remarkPlugins: toValue(remarkPlugins),
        },
        processProps.value
      );
    });
    provide(MARKDOWN_PROVIDER_KEY, contextProps);
    return () =>
      h(
        'div',
        { class: 'elx-xmarkdown-provider', ...attrs },
        slots.default && slots.default()
      );
  }
});

function useMarkdownContext(): Ref<MarkdownContext> {
  const context = inject<Ref<MarkdownContext>>(
    MARKDOWN_PROVIDER_KEY,
    computed(() => ({}))
  );
  if (!context) {
    return computed(() => ({})) as unknown as Ref<MarkdownContext>;
  }
  return context;
}

export { MarkdownProvider, useMarkdownContext, MARKDOWN_CORE_PROPS };
