<script lang="ts">
import { defineComponent, h, type PropType, type VNode } from 'vue';
import type { BuiltinTheme } from 'shiki';
// @ts-ignore
import CodeBlock from '../CodeBlock/index.vue';
// @ts-ignore
import CodeLine from '../CodeLine/index.vue';
import Mermaid from '../Mermaid/index.vue';

// 插槽函数类型
type SlotFn = (props: any) => VNode | VNode[];

export default defineComponent({
  props: {
    // ==================== 基础配置 ====================
    /** 原始数据对象 */
    raw: {
      type: Object,
      default: () => ({})
    },
    /** 自定义渲染器映射 */
    codeXRender: {
      type: Object,
      default: () => ({})
    },
    /** 自定义插槽映射 */
    codeXSlots: {
      type: Object as PropType<Record<string, SlotFn>>,
      default: () => ({})
    },

    // ==================== 主题配置 ====================
    /** 是否为暗色模式 */
    isDark: {
      type: Boolean,
      default: false
    },
    /** 亮色主题 */
    codeLightTheme: {
      type: String as PropType<BuiltinTheme>,
      default: 'vitesse-light'
    },
    /** 暗色主题 */
    codeDarkTheme: {
      type: String as PropType<BuiltinTheme>,
      default: 'vitesse-dark'
    },

    // ==================== 功能配置 ====================
    /** 是否显示代码块头部 */
    showCodeBlockHeader: {
      type: Boolean,
      default: true
    },
    /** 代码块最大高度（超出后滚动） */
    codeMaxHeight: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    const { codeXRender } = props;
    return (): ReturnType<typeof h> | null => {
      // 处理行内代码
      if (props.raw.inline) {
        if (codeXRender && codeXRender.inline) {
          const renderer = codeXRender.inline;
          if (typeof renderer === 'function') {
            return renderer(props);
          }
          return h(renderer, props);
        }
        return h(CodeLine, props);
      }

      const { language } = props.raw;

      // 处理自定义渲染器
      if (codeXRender && codeXRender[language]) {
        const renderer = codeXRender[language];
        if (typeof renderer === 'function') {
          return renderer(props);
        }
        return h(renderer, props);
      }

      // 处理 Mermaid 图表
      if (language === 'mermaid') {
        return h(Mermaid, props);
      }

      // 渲染标准代码块
      return h(CodeBlock, {
        code: props.raw.content || '',
        language: props.raw.language || 'text',
        isDark: props.isDark,
        lightTheme: props.codeLightTheme,
        darkTheme: props.codeDarkTheme,
        showCodeBlockHeader: props.showCodeBlockHeader,
        codeMaxHeight: props.codeMaxHeight
      }, props.codeXSlots);
    };
  }
});
</script>
