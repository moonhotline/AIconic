/**
 * Clay 风格 - 3D 粘土 (Playful 3D)
 * 
 * 特点：
 * - 柔软的 3D 质感
 * - 圆润的形状
 * - 柔和的阴影
 * - 可爱友好的视觉
 * - 适合儿童、教育、社交类应用
 */

import { StylePlugin, StyleColors } from './types';

const config = {
  id: 'clay',
  name: '3D粘土',
  platform: 'Playful 3D',
  description: '柔软质感 + 圆润形状 + 可爱友好',
  colors: {
    primary: '#FF8A65',    // 珊瑚橙
    secondary: '#7986CB',  // 薰衣草蓝
    background: '#FFF8E1', // 奶油黄
    accent: '#81C784',     // 薄荷绿
  },
};

function buildSvg(iconContent: string, colors: StyleColors): string {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 柔和背景渐变 -->
    <linearGradient id="bg-clay" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.background}"/>
      <stop offset="100%" stop-color="#FFE0B2"/>
    </linearGradient>
    
    <!-- 3D 高光渐变 -->
    <linearGradient id="highlight-clay" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#fff" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    
    <!-- 柔和阴影 -->
    <filter id="soft-shadow-clay" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#5D4037" flood-opacity="0.2"/>
    </filter>
    
    <!-- 内阴影效果 -->
    <filter id="inner-shadow-clay" x="-10%" y="-10%" width="120%" height="120%">
      <feOffset dx="0" dy="2"/>
      <feGaussianBlur stdDeviation="3" result="shadow"/>
      <feFlood flood-color="#000" flood-opacity="0.1"/>
      <feComposite in2="shadow" operator="in"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    
    <!-- 粘土质感 -->
    <filter id="clay-texture" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect x="10" y="10" width="100" height="100" rx="28" fill="url(#bg-clay)" filter="url(#soft-shadow-clay)"/>
  
  <!-- 装饰圆点 -->
  <circle cx="25" cy="25" r="8" fill="${colors.secondary}" opacity="0.3"/>
  <circle cx="95" cy="90" r="10" fill="${colors.accent}" opacity="0.3"/>
  <circle cx="90" cy="30" r="6" fill="${colors.primary}" opacity="0.2"/>
  
  <!-- 主体容器 -->
  <g transform="translate(60, 60)">
    <g transform="translate(-60, -60)" filter="url(#inner-shadow-clay)">${iconContent}</g>
  </g>
</svg>`;
}

function getPrompt(mainBody: string, colors: StyleColors): string {
  return `你是 3D 粘土风格设计师。为 "${mainBody}" 绘制一个可爱柔软的图形。

## 设计风格要求

### 色彩运用
- 主体使用 ${colors.primary}（珊瑚橙）或 ${colors.secondary}（薰衣草蓝）
- ${colors.accent}（薄荷绿）用于点缀
- 颜色要柔和、友好，有亲和力
- 可以使用渐变来表现 3D 质感

### 形态特征
- 圆润、柔软的形状，避免尖锐边角
- 有明显的 3D 立体感
- 简洁可爱的设计
- 保持图形的趣味性和友好感

### 构图要求
- 【重要】主体必须居中在坐标 (60, 60) 附近
- 主体占图标 55-65% 面积
- 图形要有温暖可爱的感觉

## 技术规则
1. 只输出 SVG 图形元素 (path, circle, ellipse, rect)
2. 图形中心点在 (60, 60)，有效范围 35-85
3. 使用圆角和柔和的形状
4. 直接输出代码，无需解释

## 参考示例 - 爱心:
<path d="M60 75 C45 65 35 55 35 45 C35 35 45 30 55 35 C58 37 60 40 60 40 C60 40 62 37 65 35 C75 30 85 35 85 45 C85 55 75 65 60 75 Z" fill="${colors.primary}"/>
<ellipse cx="48" cy="42" rx="6" ry="4" fill="#fff" opacity="0.5"/>`;
}

const clayStyle: StylePlugin = {
  config,
  buildSvg,
  getPrompt,
};

export default clayStyle;
