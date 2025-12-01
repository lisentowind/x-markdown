/**
 * Mermaid 工具栏配置类型
 */
export interface MermaidToolbarConfig {
  // 是否显示工具栏
  showToolbar?: boolean;
  // 是否显示全屏按钮
  showFullscreen?: boolean;
  // 是否显示放大按钮
  showZoomIn?: boolean;
  // 是否显示缩小按钮
  showZoomOut?: boolean;
  // 是否显示重置按钮
  showReset?: boolean;
  // 是否显示下载按钮
  showDownload?: boolean;
  // 工具栏样式
  toolbarStyle?: Record<string, any>;
  // 工具栏类名
  toolbarClass?: string;
  // 图标颜色
  iconColor?: string;
  // 标签文字颜色
  tabTextColor?: string;
  // 悬停背景色
  hoverBackgroundColor?: string;
  // 激活状态背景色
  tabActiveBackgroundColor?: string;
}
