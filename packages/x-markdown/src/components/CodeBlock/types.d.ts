/**
 * CodeBlock 组件的 Props 类型定义
 * 用于代码块的展示和高亮
 */
export interface CodeBlockProps {
  /**
   * 要展示的代码字符串
   * @default ''
   */
  code?: string;

  /**
   * 代码语言，用于语法高亮
   * 例如：'javascript', 'typescript', 'python', 'vue' 等
   * @default ''
   */
  lang?: string;

  /**
   * 是否显示行号
   * @default false
   */
  showLineNumbers?: boolean;

  /**
   * 需要高亮的行号数组
   * 例如：[1, 3, 5] 表示高亮第 1、3、5 行
   * @default []
   */
  highlightedLines?: number[];

  /**
   * 自定义 CSS 类名
   * @default ''
   */
  className?: string;
}
