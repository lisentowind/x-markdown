/**
 * CodeLine 组件的 Props 类型定义
 */
export interface CodeLineProps {
  // 原始数据对象
  raw?: {
    // 代码内容
    content?: string;
    // 是否是行内代码
    inline?: boolean;
  };
  // 代码内容（直接传入）
  content?: string;
}
