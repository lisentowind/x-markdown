import type { BuiltinTheme } from 'shiki'

/**
 * CodeX 组件的 Props 类型定义
 */
export interface CodeXProps {
  // 启动代码复制功能
  enableCodeCopy?: boolean;
  // 启动主题切换
  enableThemeToggle?: boolean;
  // 开启行号
  enableCodeLineNumber?: boolean;
  // 是否为深色模式
  isDark?: boolean;
  // Shiki 主题
  theme?: BuiltinTheme;
}
