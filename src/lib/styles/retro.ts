/**
 * Retro 风格 - 复古像素 (Vintage)
 * 
 * 特点：
 * - 复古配色方案
 * - 像素化边缘
 * - 怀旧感设计
 * - 温暖的色调
 * - 适合游戏、娱乐、怀旧主题应用
 */

import { StylePlugin, StyleColors } from './types';

const config = {
  id: 'retro',
  name: '复古像素',
  platform: 'Vintage',
  description: '复古配色 + 像素边缘 + 怀旧质感',
  colors: {
    primary: '#FF6F61',    // 珊瑚橙
    secondary: '#6B5B95',  // 复古紫
    background: '#F7CAC9', // 玫瑰粉
    accent: '#88B04B',     // 草绿
  },
};

function buildSvg(iconContent: string, colors: StyleColors): string {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 复古渐变背景 -->
    <linearGradient id="bg-retro" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.background}"/>
      <stop offset="100%" stop-color="#FADBD8"/>
    </linearGradient>
    
    <!-- 像素化滤镜 -->
    <filter id="pixelate-retro" x="0%" y="0%" width="100%" height="100%">
      <feFlood x="4" y="4" height="2" width="2"/>
      <feComposite width="8" height="8"/>
      <feTile result="tile"/>
      <feComposite in="SourceGraphic" in2="tile" operator="in"/>
      <feMorphology operator="dilate" radius="2"/>
    </filter>
    
    <!-- 复古阴影 -->
    <filter id="retro-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="3" stdDeviation="0" flood-color="${colors.secondary}" flood-opacity="0.4"/>
    </filter>
    
    <!-- 噪点纹理 -->
    <filter id="noise-retro" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise"/>
      <feColorMatrix in="noise" type="saturate" values="0"/>
      <feBlend in="SourceGraphic" mode="multiply" result="blend"/>
      <feComposite in="blend" in2="SourceGraphic" operator="in"/>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect x="10" y="10" width="100" height="100" rx="16" fill="url(#bg-retro)"/>
  
  <!-- 装饰边框 -->
  <rect x="16" y="16" width="88" height="88" rx="12" fill="none" stroke="${colors.secondary}" stroke-width="3" stroke-dasharray="6 4"/>
  
  <!-- 角落装饰 -->
  <circle cx="22" cy="22" r="4" fill="${colors.primary}"/>
  <circle cx="98" cy="22" r="4" fill="${colors.accent}"/>
  <circle cx="22" cy="98" r="4" fill="${colors.accent}"/>
  <circle cx="98" cy="98" r="4" fill="${colors.primary}"/>
  
  <!-- 主体容器 -->
  <g transform="translate(60, 60)">
    <g transform="translate(-60, -60)" filter="url(#retro-shadow)">${iconContent}</g>
  </g>
</svg>`;
}

function getPrompt(mainBody: string, colors: StyleColors): string {
  return `你是复古风格设计师。为 "${mainBody}" 绘制一个充满怀旧感的图形。

## 设计风格要求

### 色彩运用
- 主体使用 ${colors.primary}（珊瑚橙）或 ${colors.secondary}（复古紫）
- ${colors.accent}（草绿）用于点缀
- 颜色要温暖、柔和，有年代感
- 避免过于现代的配色

### 形态特征
- 简洁的几何形状
- 可以有轻微的像素感或方正感
- 复古但不过时的设计
- 保持图形的趣味性

### 构图要求
- 【重要】主体必须居中在坐标 (60, 60) 附近
- 主体占图标 55-65% 面积
- 图形要有温暖怀旧的感觉

## 技术规则
1. 只输出 SVG 图形元素 (path, circle, rect, polygon)
2. 图形中心点在 (60, 60)，有效范围 35-85
3. 使用温暖的复古色调
4. 直接输出代码，无需解释

## 参考示例 - 游戏手柄:
<rect x="38" y="48" width="44" height="28" rx="6" fill="${colors.secondary}"/>
<circle cx="50" cy="58" r="6" fill="${colors.primary}"/>
<circle cx="70" cy="58" r="6" fill="${colors.accent}"/>
<rect x="56" y="62" width="8" height="4" rx="1" fill="${colors.background}"/>
<rect x="56" y="68" width="8" height="4" rx="1" fill="${colors.background}"/>`;
}

const retroStyle: StylePlugin = {
  config,
  buildSvg,
  getPrompt,
};

export default retroStyle;
