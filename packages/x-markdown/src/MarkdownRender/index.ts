import type { PropType } from 'vue';
import type { PluggableList } from 'unified';
import type { CodeXProps } from '../components/CodeX/types';
import type { CustomAttrs, SanitizeOptions } from '../core/types';
import type { BuiltinTheme } from 'shiki';
import deepmerge from 'deepmerge';
import { computed, defineComponent, h, toValue } from 'vue';
import { VueMarkdown, VueMarkdownAsync } from '../core';
import { useComponents, usePlugins, useProcessMarkdown } from '../hooks';

// Markdown 渲染器 Props 定义
const markdownRendererProps = {
  // markdown 字符串内容
  markdown: { type: String, default: '' },
  // 是否允许 HTML
  allowHtml: { type: Boolean, default: false },
  // 是否启用 LaTeX 支持
  enableLatex: { type: Boolean, default: true },
  // 是否开启动画
  enableAnimate: { type: Boolean, default: false },
  // 是否启用换行符转 <br>
  enableBreaks: { type: Boolean, default: true },
  // 是否为深色模式
  isDark: { type: Boolean, default: false },
  // Shiki 主题
  theme: { type: String as PropType<BuiltinTheme>, default: 'vitesse-light' },
  // 代码块 CodeX 组件 props
  codeXProps: {
    type: Object as PropType<CodeXProps>,
    default: () => ({ enableCodeCopy: true, enableThemeToggle: false, enableCodeLineNumber: false })
  },
  // 自定义代码块渲染函数
  codeXRender: { type: Object, default: () => ({}) },
  // 自定义代码块插槽
  codeXSlot: { type: Object, default: () => ({}) },
  // 自定义属性对象
  customAttrs: { type: Object as PropType<CustomAttrs>, default: () => ({}) },
  // remark 插件列表
  remarkPlugins: { type: Array as PropType<PluggableList>, default: () => [] },
  // remark 前置插件列表
  remarkPluginsAhead: { type: Array as PropType<PluggableList>, default: () => [] },
  // rehype 插件列表
  rehypePlugins: { type: Array as PropType<PluggableList>, default: () => [] },
  // rehype 前置插件列表
  rehypePluginsAhead: { type: Array as PropType<PluggableList>, default: () => [] },
  // rehype 配置项
  rehypeOptions: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
  // 是否启用内容清洗
  sanitize: { type: Boolean, default: false },
  // 清洗选项
  sanitizeOptions: { type: Object as PropType<SanitizeOptions>, default: () => ({}) }
};

/**
 * Markdown 渲染器组件 - 同步版本
 * 直接渲染 Markdown 内容
 */
const MarkdownRenderer = defineComponent({
  name: 'MarkdownRenderer',
  props: markdownRendererProps,
  setup(props, { slots, attrs }) {
    // 获取 remark/rehype 插件列表
    const { rehypePlugins, remarkPlugins } = usePlugins(props);
    // 获取自定义组件映射
    const components = useComponents(props);

    // 处理 markdown 内容（LaTeX 预处理）
    const markdown = computed(() => {
      if (props.enableLatex) {
        return useProcessMarkdown(props.markdown);
      } else {
        return props.markdown;
      }
    });

    // 处理后的 props，合并默认 codeXProps
    const processProps = computed(() => {
      return {
        ...props,
        codeXProps: Object.assign(
          {},
          markdownRendererProps.codeXProps.default(),
          props.codeXProps
        ),
        markdown: markdown.value
      };
    });

    // 最终渲染 props，深度合并插件配置
    const renderProps = computed(() => {
      return deepmerge(
        {
          rehypePlugins: toValue(rehypePlugins),
          remarkPlugins: toValue(remarkPlugins),
        },
        processProps.value
      );
    });

    return () =>
      h(
        'div',
        {
          class: ['elx-xmarkdown-renderer', { 'is-dark': props.isDark }],
          style: {
            backgroundColor: props.isDark ? '#1e1e1e' : '#ffffff',
            color: props.isDark ? '#e5e5e5' : '#333333',
            padding: '16px'
          },
          ...attrs
        },
        h(VueMarkdown, renderProps.value as any, {
          ...components,
          ...slots
        })
      );
  }
});

/**
 * Markdown 渲染器组件 - 异步版本
 * 异步渲染 Markdown 内容
 */
const MarkdownRendererAsync = defineComponent({
  name: 'MarkdownRendererAsync',
  props: markdownRendererProps,
  setup(props, { slots, attrs }) {
    // 获取 remark/rehype 插件列表
    const { rehypePlugins, remarkPlugins } = usePlugins(props);
    // 获取自定义组件映射
    const components = useComponents(props);

    // 处理 markdown 内容（LaTeX 预处理）
    const markdown = computed(() => {
      if (props.enableLatex) {
        return useProcessMarkdown(props.markdown);
      } else {
        return props.markdown;
      }
    });

    // 处理后的 props，合并默认 codeXProps
    const processProps = computed(() => {
      return {
        ...props,
        codeXProps: Object.assign(
          {},
          markdownRendererProps.codeXProps.default(),
          props.codeXProps
        ),
        markdown: markdown.value
      };
    });

    // 最终渲染 props，深度合并插件配置
    const renderProps = computed(() => {
      return deepmerge(
        {
          rehypePlugins: toValue(rehypePlugins),
          remarkPlugins: toValue(remarkPlugins),
        },
        processProps.value
      );
    });

    return () =>
      h(
        'div',
        {
          class: ['elx-xmarkdown-renderer', { 'is-dark': props.isDark }],
          style: {
            backgroundColor: props.isDark ? '#1e1e1e' : '#ffffff',
            color: props.isDark ? '#e5e5e5' : '#333333',
            padding: '16px'
          },
          ...attrs
        },
        h(VueMarkdownAsync, renderProps.value as any, {
          ...components,
          ...slots
        })
      );
  }
});

export {
  MarkdownRenderer,
  MarkdownRendererAsync,
  markdownRendererProps
};
