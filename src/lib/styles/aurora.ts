/**
 * Aurora 风格 - 极光幻彩 (Ethereal)
 * 
 * 特点：
 * - 极光般的渐变色彩
 * - 梦幻流动感
 * - 柔和的光晕效果
 * - 神秘优雅的视觉
 * - 适合音乐、冥想、高端品牌应用
 */

import { StylePlugin, StyleColors } from './types';

const config = {
  id: 'aurora',
  name: '极光幻彩',
  platform: 'Ethereal',
  description: '极光渐变 + 梦幻流动 + 柔和光晕',
  colors: {
    primary: '#667EEA',    // 靛蓝
    secondary: '#764BA2',  // 紫罗兰
    background: '#0F0C29', // 深夜蓝
    accent: '#43E97B',     // 极光绿
  },
};

function buildSvg(iconContent: string, colors: StyleColors): string {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 深色背景渐变 -->
    <linearGradient id="bg-aurora" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0F0C29"/>
      <stop offset="50%" stop-color="#302B63"/>
      <stop offset="100%" stop-color="#24243E"/>
    </linearGradient>
    
    <!-- 极光渐变 1 -->
    <linearGradient id="aurora1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.accent}" stop-opacity="0.6"/>
      <stop offset="50%" stop-color="${colors.primary}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${colors.secondary}" stop-opacity="0.2"/>
    </linearGradient>
    
    <!-- 极光渐变 2 -->
    <linearGradient id="aurora2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${colors.secondary}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${colors.accent}" stop-opacity="0.1"/>
    </linearGradient>
    
    <!-- 极光模糊 -->
    <filter id="aurora-blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="12"/>
    </filter>
    
    <!-- 发光效果 -->
    <filter id="glow-aurora" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- 外发光 -->
    <filter id="outer-glow-aurora" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="${colors.primary}" flood-opacity="0.5"/>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect x="10" y="10" width="100" height="100" rx="24" fill="url(#bg-aurora)" filter="url(#outer-glow-aurora)"/>
  
  <!-- 极光效果层 -->
  <ellipse cx="40" cy="50" rx="40" ry="25" fill="url(#aurora1)" filter="url(#aurora-blur)"/>
  <ellipse cx="80" cy="70" rx="35" ry="30" fill="url(#aurora2)" filter="url(#aurora-blur)"/>
  <ellipse cx="60" cy="40" rx="30" ry="20" fill="${colors.accent}" opacity="0.15" filter="url(#aurora-blur)"/>
  
  <!-- 星星装饰 -->
  <circle cx="25" cy="30" r="1" fill="#fff" opacity="0.8"/>
  <circle cx="90" cy="25" r="1.5" fill="#fff" opacity="0.6"/>
  <circle cx="30" cy="85" r="1" fill="#fff" opacity="0.7"/>
  <circle cx="95" cy="75" r="1" fill="#fff" opacity="0.5"/>
  
  <!-- 主体容器 -->
  <g transform="translate(60, 60)">
    <g transform="translate(-60, -60)" filter="url(#glow-aurora)">${iconContent}</g>
  </g>
</svg>`;
}

function getPrompt(mainBody: string, colors: StyleColors): string {
  return `你是极光幻彩风格设计师。为 "${mainBody}" 绘制一个梦幻优雅的图形。

## 设计风格要求

### 色彩运用
- 主体使用白色 #fff，在深色背景上会自动发光
- 可用 ${colors.accent}（极光绿）作为点缀
- 保持神秘优雅的感觉
- 图形要在深色背景上清晰可见

### 形态特征
- 流畅优雅的线条
- 可以有轻微的流动感
- 简洁但有设计感
- 保持图形的高级感

### 构图要求
- 【重要】主体必须居中在坐标 (60, 60) 附近
- 主体占图标 55-65% 面积
- 图形要有梦幻神秘的感觉

## 技术规则
1. 只输出 SVG 图形元素 (path, circle, ellipse, rect)
2. 图形中心点在 (60, 60)，有效范围 35-85
3. 主要使用白色 #fff，可用 ${colors.accent} 点缀
4. 直接输出代码，无需解释

## 参考示例 - 月亮:
<circle cx="60" cy="60" r="22" fill="#fff"/>
<circle cx="68" cy="55" r="18" fill="${colors.background}"/>
<circle cx="45" cy="45" r="2" fill="${colors.accent}"/>
<circle cx="75" cy="70" r="1.5" fill="${colors.accent}"/>`;
}

const auroraStyle: StylePlugin = {
  config,
  buildSvg,
  getPrompt,
};

export default auroraStyle;
