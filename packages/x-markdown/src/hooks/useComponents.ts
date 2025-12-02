import { h } from 'vue';
import type { BuiltinTheme } from 'shiki';
import CodeX from '../components/CodeX/index.vue';

interface UseComponentsOptions {
  codeXRender?: Record<string, any>;
  isDark?: boolean;
  theme?: BuiltinTheme;
}

function useComponents(props?: UseComponentsOptions) {
  const components = {
    code: (raw: any) => h(CodeX, {
      raw,
      codeXRender: props?.codeXRender,
      isDark: props?.isDark,
      theme: props?.theme
    })
  };
  return components;
}

export { useComponents };
