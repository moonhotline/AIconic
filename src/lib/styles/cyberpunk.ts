/**
 * Cyberpunk 风格 - 赛博朋克 (Futuristic)
 * 
 * 特点：
 * - 高对比度霓虹色彩
 * - 故障艺术效果
 * - 科技感线条
 * - 深色背景配亮色
 * - 适合游戏、科技、未来主题应用
 */

import { StylePlugin, StyleColors } from './types';

const config = {
  id: 'cyberpunk',
  name: '赛博朋克',
  platform: 'Futuristic',
  description: '故障艺术 + 霓虹高对比 + 科技线条',
  colors: {
    primary: '#00F5FF',    // 青色霓虹
    secondary: '#FF00E5',  // 品红霓虹
    background: '#0D0D1A', // 深紫黑
    accent: '#FFFF00',     // 黄色警告
  },
};

function buildSvg(iconContent: string, colors: StyleColors): string {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 深色渐变背景 -->
    <linearGradient id="bg-cyber" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0D0D1A"/>
      <stop offset="50%" stop-color="#1A0A2E"/>
      <stop offset="100%" stop-color="#0D0D1A"/>
    </linearGradient>
    
    <!-- 故障效果滤镜 -->
    <filter id="glitch-cyber" x="-10%" y="-10%" width="120%" height="120%">
      <feOffset in="SourceGraphic" dx="2" dy="0" result="red">
        <animate attributeName="dx" values="2;-2;2" dur="0.1s" repeatCount="indefinite"/>
      </feOffset>
      <feOffset in="SourceGraphic" dx="-2" dy="0" result="blue">
        <animate attributeName="dx" values="-2;2;-2" dur="0.1s" repeatCount="indefinite"/>
      </feOffset>
      <feColorMatrix in="red" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red-only"/>
      <feColorMatrix in="blue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue-only"/>
      <feMerge>
        <feMergeNode in="red-only"/>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="blue-only"/>
      </feMerge>
    </filter>
    
    <!-- 霓虹发光 -->
    <filter id="neon-cyber" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="blur1"/>
      <feGaussianBlur stdDeviation="6" result="blur2"/>
      <feMerge>
        <feMergeNode in="blur2"/>
        <feMergeNode in="blur1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- 扫描线效果 -->
    <pattern id="scanlines-cyber" width="4" height="4" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="4" y2="0" stroke="${colors.primary}" stroke-width="0.5" opacity="0.1"/>
    </pattern>
    
    <!-- 外发光 -->
    <filter id="outer-glow-cyber" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="${colors.primary}" flood-opacity="0.6"/>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect x="10" y="10" width="100" height="100" rx="16" fill="url(#bg-cyber)" filter="url(#outer-glow-cyber)"/>
  
  <!-- 扫描线覆盖 -->
  <rect x="10" y="10" width="100" height="100" rx="16" fill="url(#scanlines-cyber)"/>
  
  <!-- 边框霓虹线 -->
  <rect x="14" y="14" width="92" height="92" rx="12" fill="none" stroke="${colors.primary}" stroke-width="1" opacity="0.5"/>
  <rect x="18" y="18" width="84" height="84" rx="10" fill="none" stroke="${colors.secondary}" stroke-width="0.5" opacity="0.3"/>
  
  <!-- 角落装饰 -->
  <path d="M20 30 L20 20 L30 20" fill="none" stroke="${colors.accent}" stroke-width="2"/>
  <path d="M90 20 L100 20 L100 30" fill="none" stroke="${colors.accent}" stroke-width="2"/>
  <path d="M100 90 L100 100 L90 100" fill="none" stroke="${colors.accent}" stroke-width="2"/>
  <path d="M30 100 L20 100 L20 90" fill="none" stroke="${colors.accent}" stroke-width="2"/>
  
  <!-- 主体容器 -->
  <g transform="translate(60, 60)">
    <g transform="translate(-60, -60)" filter="url(#neon-cyber)">${iconContent}</g>
  </g>
</svg>`;
}

function getPrompt(mainBody: string, colors: StyleColors): string {
  return `你是赛博朋克风格设计师。为 "${mainBody}" 绘制一个充满未来感的图形。

## 设计风格要求

### 色彩运用
- 主体使用 ${colors.primary}（青色霓虹）
- 可用 ${colors.secondary}（品红）作为对比色
- ${colors.accent}（黄色）用于警告/高亮元素
- 保持高对比度，深色背景上的亮色

### 形态特征
- 几何化、棱角分明的设计
- 可以有断裂、故障感的线条
- 科技感的细节装饰
- 简洁但有未来感

### 构图要求
- 【重要】主体必须居中在坐标 (60, 60) 附近
- 主体占图标 55-65% 面积
- 线条清晰，适合发光效果

## 技术规则
1. 只输出 SVG 图形元素 (path, circle, rect, polygon, line)
2. 图形中心点在 (60, 60)，有效范围 35-85
3. 主要使用 ${colors.primary}，可用 ${colors.secondary} 和 ${colors.accent} 点缀
4. 直接输出代码，无需解释

## 参考示例 - 芯片:
<rect x="42" y="42" width="36" height="36" rx="4" fill="none" stroke="${colors.primary}" stroke-width="2"/>
<rect x="48" y="48" width="24" height="24" rx="2" fill="${colors.primary}" opacity="0.3"/>
<circle cx="60" cy="60" r="6" fill="${colors.secondary}"/>
<line x1="42" y1="52" x2="35" y2="52" stroke="${colors.primary}" stroke-width="2"/>
<line x1="42" y1="60" x2="35" y2="60" stroke="${colors.primary}" stroke-width="2"/>
<line x1="42" y1="68" x2="35" y2="68" stroke="${colors.primary}" stroke-width="2"/>
<line x1="78" y1="52" x2="85" y2="52" stroke="${colors.primary}" stroke-width="2"/>
<line x1="78" y1="60" x2="85" y2="60" stroke="${colors.primary}" stroke-width="2"/>
<line x1="78" y1="68" x2="85" y2="68" stroke="${colors.primary}" stroke-width="2"/>`;
}

const cyberpunkStyle: StylePlugin = {
  config,
  buildSvg,
  getPrompt,
};

export default cyberpunkStyle;
