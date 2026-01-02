/**
 * Material 风格 - Google Play Material You 设计系统
 * 
 * 设计规范：
 * - Material Design 3 / Material You 动态色彩系统
 * - 强调动态色彩、深度层次、柔和圆角、响应式形状
 * - Adaptive Icon 规范：前景 + 背景分层
 * - 色彩系统：Material Color System (#6750A4 + #EADDFF)
 * - 圆角规范：8-12px
 * - 安全边距：20%
 * - WCAG 2.1 AA 色彩对比 ≥ 4.5:1
 */

import { StylePlugin, StyleColors } from './types';

const config = {
  id: 'material',
  name: 'Google Play',
  platform: 'Android',
  description: 'Material You 动态色彩 + Adaptive Icon + 响应式形状',
  colors: {
    primary: '#6750A4',    // Material You 主色 (M3 Primary)
    secondary: '#625B71',  // M3 Secondary
    background: '#FFFBFE', // M3 Surface
    accent: '#7D5260',     // M3 Tertiary
  },
};

function buildSvg(iconContent: string, colors: StyleColors): string {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Material You 动态背景 - 从主色提取的柔和渐变 -->
    <linearGradient id="m3-surface" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFBFE"/>
      <stop offset="50%" stop-color="#F6EDFF"/>
      <stop offset="100%" stop-color="#EADDFF"/>
    </linearGradient>
    
    <!-- M3 Primary 容器渐变 -->
    <linearGradient id="m3-primary" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D0BCFF"/>
      <stop offset="50%" stop-color="${colors.primary}"/>
      <stop offset="100%" stop-color="#4F378B"/>
    </linearGradient>
    
    <!-- M3 Secondary 容器渐变 -->
    <linearGradient id="m3-secondary" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8DEF8"/>
      <stop offset="50%" stop-color="${colors.secondary}"/>
      <stop offset="100%" stop-color="#4A4458"/>
    </linearGradient>
    
    <!-- M3 Tertiary 容器渐变 -->
    <linearGradient id="m3-tertiary" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD8E4"/>
      <stop offset="50%" stop-color="${colors.accent}"/>
      <stop offset="100%" stop-color="#633B48"/>
    </linearGradient>
    
    <!-- M3 Error 渐变 -->
    <linearGradient id="m3-error" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F9DEDC"/>
      <stop offset="50%" stop-color="#B3261E"/>
      <stop offset="100%" stop-color="#8C1D18"/>
    </linearGradient>
    
    <!-- M3 Tonal Surface 渐变 -->
    <linearGradient id="m3-tonal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8DEF8"/>
      <stop offset="100%" stop-color="#D0BCFF"/>
    </linearGradient>
    
    <!-- Material Elevation 阴影 - Level 2 -->
    <filter id="m3-elevation-2" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000" flood-opacity="0.15"/>
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="${colors.primary}" flood-opacity="0.12"/>
    </filter>
    
    <!-- Material Elevation 阴影 - Level 3 -->
    <filter id="m3-elevation-3" x="-25%" y="-25%" width="150%" height="170%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000" flood-opacity="0.12"/>
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="${colors.primary}" flood-opacity="0.1"/>
    </filter>
    
    <!-- 图标阴影 -->
    <filter id="m3-icon-shadow" x="-15%" y="-15%" width="130%" height="150%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="${colors.primary}" flood-opacity="0.2"/>
    </filter>
    
    <!-- 状态层叠加 -->
    <linearGradient id="m3-state-layer" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  
  <!-- Adaptive Icon 背景层 -->
  <rect x="12" y="12" width="96" height="96" rx="22" fill="url(#m3-surface)" filter="url(#m3-elevation-2)"/>
  
  <!-- 动态色彩装饰 - Material You 风格 -->
  <circle cx="90" cy="28" r="16" fill="url(#m3-tertiary)" opacity="0.25"/>
  <circle cx="28" cy="90" r="14" fill="url(#m3-secondary)" opacity="0.2"/>
  <ellipse cx="85" cy="85" rx="12" ry="10" fill="url(#m3-primary)" opacity="0.15"/>
  
  <!-- 顶部状态层 - 响应式形状 -->
  <rect x="12" y="12" width="96" height="48" rx="22" fill="url(#m3-state-layer)"/>
  
  <!-- Adaptive Icon 前景层 - 主体内容 -->
  <g transform="translate(60, 60)">
    <g transform="translate(-60, -60)" filter="url(#m3-icon-shadow)">${iconContent}</g>
  </g>
</svg>`;
}

function getPrompt(mainBody: string, colors: StyleColors): string {
  return `你是 Google Material Design 3 设计大师。为 "${mainBody}" 设计一个符合 Material You 规范的图标。

## Material You 设计规范

### 色彩系统 - M3 Color Tokens
- url(#m3-primary) - Primary 主色渐变 (${colors.primary})
- url(#m3-secondary) - Secondary 次要色渐变
- url(#m3-tertiary) - Tertiary 第三色渐变
- url(#m3-tonal) - Tonal Surface 色调表面
- url(#m3-error) - Error 错误色渐变
- #FFFBFE - On Primary 文字/图标色
- #1C1B1F - On Surface 深色

### Material You 核心特性
- 动态色彩：从主色提取的和谐色板
- 响应式形状：圆角 rx="10" 到 rx="16"（大圆角）
- 深度层次：使用 filter="url(#m3-elevation-2)" 或 filter="url(#m3-elevation-3)"
- 简洁几何：用基础形状组合表达概念

### 形态规范
- 圆润友好的几何形状
- 避免尖锐边角
- 色彩鲜明但和谐统一
- 保持 48×48px 下的可识别性

### 构图要求
- 【重要】主体居中于坐标 (60, 60)
- 主体占画布 55-65%
- 安全区域：35-85（保留 20% 边距）
- 符合 Adaptive Icon 前景层规范

## 技术规则
1. 只输出 SVG 图形元素 (path, circle, rect, ellipse)
2. 使用预定义的 M3 渐变填充
3. 禁止使用文字
4. 直接输出代码，无需解释

## 参考示例 - 播放按钮:
<circle cx="60" cy="60" r="26" fill="url(#m3-primary)"/>
<path d="M52 45 L52 75 L78 60 Z" fill="#FFFBFE"/>
<ellipse cx="55" cy="50" rx="8" ry="5" fill="#fff" opacity="0.25"/>

## 参考示例 - 相册:
<rect x="34" y="40" width="52" height="40" rx="12" fill="url(#m3-primary)"/>
<circle cx="48" cy="54" r="9" fill="url(#m3-tertiary)"/>
<path d="M34 72 L48 58 L62 70 L74 60 L86 74 L86 80 L34 80 Z" fill="url(#m3-secondary)"/>
<ellipse cx="50" cy="48" rx="14" ry="5" fill="#fff" opacity="0.2"/>

## 参考示例 - 消息气泡:
<rect x="34" y="42" width="52" height="38" rx="14" fill="url(#m3-primary)"/>
<path d="M34 72 L46 82 L46 72" fill="url(#m3-primary)"/>
<circle cx="48" cy="61" r="4" fill="#FFFBFE"/>
<circle cx="60" cy="61" r="4" fill="#FFFBFE"/>
<circle cx="72" cy="61" r="4" fill="#FFFBFE"/>`;
}

const materialStyle: StylePlugin = {
  config,
  buildSvg,
  getPrompt,
};

export default materialStyle;
