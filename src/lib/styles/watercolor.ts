/**
 * Watercolor 风格 - 水彩艺术 (Artistic)
 * 
 * 特点：
 * - 柔和的水彩晕染效果
 * - 自然的色彩过渡
 * - 手绘质感
 * - 温暖治愈的视觉感受
 * - 适合艺术、教育、生活类应用
 */

import { StylePlugin, StyleColors } from './types';

const config = {
  id: 'watercolor',
  name: '水彩艺术',
  platform: 'Artistic',
  description: '水彩晕染 + 柔和过渡 + 手绘质感',
  colors: {
    primary: '#FF9A9E',    // 樱花粉
    secondary: '#A18CD1',  // 薰衣草紫
    background: '#FDF6F0', // 米白
    accent: '#84FAB0',     // 薄荷绿
  },
};

function buildSvg(iconContent: string, colors: StyleColors): string {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 纸张纹理背景 -->
    <filter id="paper-texture" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise"/>
      <feDiffuseLighting in="noise" lighting-color="#FDF6F0" surfaceScale="2">
        <feDistantLight azimuth="45" elevation="60"/>
      </feDiffuseLighting>
    </filter>
    
    <!-- 水彩晕染效果 -->
    <filter id="watercolor-blur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise"/>
      <feDisplacementMap in="blur" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    
    <!-- 水彩边缘效果 -->
    <filter id="watercolor-edge" x="-20%" y="-20%" width="140%" height="140%">
      <feMorphology operator="dilate" radius="1" result="dilate"/>
      <feGaussianBlur in="dilate" stdDeviation="2" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    
    <!-- 主渐变 -->
    <linearGradient id="wash1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.primary}" stop-opacity="0.7"/>
      <stop offset="50%" stop-color="${colors.secondary}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${colors.accent}" stop-opacity="0.6"/>
    </linearGradient>
    
    <!-- 背景水彩渐变 -->
    <radialGradient id="bg-wash" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="${colors.primary}" stop-opacity="0.3"/>
      <stop offset="50%" stop-color="${colors.secondary}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${colors.background}" stop-opacity="0"/>
    </radialGradient>
    
    <!-- 点缀水彩 -->
    <radialGradient id="accent-wash" cx="70%" cy="70%" r="50%">
      <stop offset="0%" stop-color="${colors.accent}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${colors.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  
  <!-- 纸张背景 -->
  <rect x="10" y="10" width="100" height="100" rx="20" fill="${colors.background}"/>
  
  <!-- 水彩晕染装饰 -->
  <ellipse cx="35" cy="35" rx="30" ry="25" fill="url(#bg-wash)" filter="url(#watercolor-blur)"/>
  <ellipse cx="85" cy="80" rx="25" ry="20" fill="url(#accent-wash)" filter="url(#watercolor-blur)"/>
  <circle cx="75" cy="30" r="18" fill="${colors.secondary}" opacity="0.15" filter="url(#watercolor-blur)"/>
  
  <!-- 边框装饰 -->
  <rect x="10" y="10" width="100" height="100" rx="20" fill="none" stroke="${colors.primary}" stroke-width="1" opacity="0.3"/>
  
  <!-- 主体容器 -->
  <g transform="translate(60, 60)">
    <g transform="translate(-60, -60)" filter="url(#watercolor-edge)">${iconContent}</g>
  </g>
</svg>`;
}

function getPrompt(mainBody: string, colors: StyleColors): string {
  return `你是水彩艺术风格设计师。为 "${mainBody}" 绘制一个柔和温暖的图形。

## 设计风格要求

### 色彩运用
- 主体使用 ${colors.primary}（樱花粉）或 ${colors.secondary}（薰衣草紫）
- ${colors.accent}（薄荷绿）用于点缀
- 颜色要柔和，避免过于饱和
- 可以使用渐变来模拟水彩效果

### 形态特征
- 线条柔和、有机，避免过于锐利的边角
- 可以有轻微的不规则感，模拟手绘
- 简洁温馨的设计
- 保持图形的亲和力

### 构图要求
- 【重要】主体必须居中在坐标 (60, 60) 附近
- 主体占图标 55-65% 面积
- 图形要有温暖治愈的感觉

## 技术规则
1. 只输出 SVG 图形元素 (path, circle, ellipse, rect)
2. 图形中心点在 (60, 60)，有效范围 35-85
3. 使用柔和的颜色和适当的透明度
4. 直接输出代码，无需解释

## 参考示例 - 花朵:
<ellipse cx="60" cy="45" rx="8" ry="12" fill="${colors.primary}" opacity="0.8"/>
<ellipse cx="48" cy="55" rx="8" ry="12" fill="${colors.primary}" opacity="0.7" transform="rotate(-45 48 55)"/>
<ellipse cx="72" cy="55" rx="8" ry="12" fill="${colors.primary}" opacity="0.7" transform="rotate(45 72 55)"/>
<ellipse cx="52" cy="68" rx="8" ry="12" fill="${colors.primary}" opacity="0.6" transform="rotate(-20 52 68)"/>
<ellipse cx="68" cy="68" rx="8" ry="12" fill="${colors.primary}" opacity="0.6" transform="rotate(20 68 68)"/>
<circle cx="60" cy="58" r="10" fill="${colors.accent}" opacity="0.9"/>
<path d="M60 70 Q58 85 55 90" fill="none" stroke="${colors.accent}" stroke-width="3" opacity="0.6"/>`;
}

const watercolorStyle: StylePlugin = {
  config,
  buildSvg,
  getPrompt,
};

export default watercolorStyle;
