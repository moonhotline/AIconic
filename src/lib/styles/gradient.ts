/**
 * Gradient 风格 - 彩虹糖果 (Candy Pop)
 * 
 * 特点：
 * - 明亮活泼的糖果色
 * - 多彩渐变组合
 * - 圆润可爱的形状
 * - 欢快愉悦的视觉
 * - 适合社交、娱乐、生活类应用
 */

import { StylePlugin, StyleColors } from './types';

const config = {
  id: 'gradient',
  name: '渐变流体',
  platform: 'gradient',
  description: '糖果色 + 多彩渐变 + 圆润可爱',
  colors: {
    primary: '#FF6B9D',    // 糖果粉
    secondary: '#C44FE2',  // 葡萄紫
    background: '#FFF5F8', // 奶油粉
    accent: '#FFD93D',     // 柠檬黄
  },
};

function buildSvg(iconContent: string, colors: StyleColors): string {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 糖果背景渐变 -->
    <linearGradient id="bg-candy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE5EC"/>
      <stop offset="50%" stop-color="${colors.background}"/>
      <stop offset="100%" stop-color="#F0E5FF"/>
    </linearGradient>
    
    <!-- 糖果粉渐变 -->
    <linearGradient id="candy-pink" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF9EC4"/>
      <stop offset="50%" stop-color="${colors.primary}"/>
      <stop offset="100%" stop-color="#FF4D8D"/>
    </linearGradient>
    
    <!-- 葡萄紫渐变 -->
    <linearGradient id="candy-purple" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D87EF0"/>
      <stop offset="50%" stop-color="${colors.secondary}"/>
      <stop offset="100%" stop-color="#9B30D9"/>
    </linearGradient>
    
    <!-- 柠檬黄渐变 -->
    <linearGradient id="candy-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE566"/>
      <stop offset="100%" stop-color="#FFCC00"/>
    </linearGradient>
    
    <!-- 薄荷绿渐变 -->
    <linearGradient id="candy-mint" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7DFFB3"/>
      <stop offset="100%" stop-color="#00D9A0"/>
    </linearGradient>
    
    <!-- 天空蓝渐变 -->
    <linearGradient id="candy-blue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7DD3FF"/>
      <stop offset="100%" stop-color="#00A3E0"/>
    </linearGradient>
    
    <!-- 彩虹渐变 -->
    <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF6B9D"/>
      <stop offset="25%" stop-color="#FFD93D"/>
      <stop offset="50%" stop-color="#7DFFB3"/>
      <stop offset="75%" stop-color="#7DD3FF"/>
      <stop offset="100%" stop-color="#C44FE2"/>
    </linearGradient>
    
    <!-- 糖果光泽 -->
    <filter id="candy-shine" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1" result="blur"/>
      <feSpecularLighting in="blur" surfaceScale="3" specularConstant="0.8" specularExponent="25" lighting-color="#fff" result="spec">
        <fePointLight x="40" y="30" z="80"/>
      </feSpecularLighting>
      <feComposite in="SourceGraphic" in2="spec" operator="arithmetic" k1="0" k2="1" k3="0.3" k4="0"/>
    </filter>
    
    <!-- 柔和阴影 -->
    <filter id="candy-shadow" x="-30%" y="-30%" width="160%" height="180%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="${colors.secondary}" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect x="10" y="10" width="100" height="100" rx="26" fill="url(#bg-candy)"/>
  
  <!-- 装饰性糖果圆点 -->
  <circle cx="22" cy="22" r="6" fill="url(#candy-yellow)" opacity="0.6"/>
  <circle cx="98" cy="28" r="4" fill="url(#candy-mint)" opacity="0.5"/>
  <circle cx="25" cy="95" r="5" fill="url(#candy-blue)" opacity="0.5"/>
  <circle cx="95" cy="92" r="7" fill="url(#candy-pink)" opacity="0.4"/>
  
  <!-- 背景装饰线 -->
  <path d="M15 60 Q30 50 45 60 Q60 70 75 60 Q90 50 105 60" fill="none" stroke="url(#rainbow)" stroke-width="1.5" opacity="0.2"/>
  
  <!-- 主体容器 -->
  <g transform="translate(60, 60)">
    <g transform="translate(-60, -60)" filter="url(#candy-shadow)">${iconContent}</g>
  </g>
</svg>`;
}

function getPrompt(mainBody: string, colors: StyleColors): string {
  return `你是糖果色彩设计大师。为 "${mainBody}" 设计一个明亮可爱的糖果风格图形。

## 设计风格要求

### 色彩运用 - 使用预定义的糖果渐变
- url(#candy-pink) - 糖果粉渐变（主色）
- url(#candy-purple) - 葡萄紫渐变
- url(#candy-yellow) - 柠檬黄渐变
- url(#candy-mint) - 薄荷绿渐变
- url(#candy-blue) - 天空蓝渐变
- url(#rainbow) - 彩虹渐变（特殊效果）

### 形态特征
- 圆润、可爱的形状
- 大圆角（rx="6" 到 rx="12"）
- 简洁但有趣味
- 保持欢快愉悦的感觉

### 视觉效果
- 多种糖果色组合使用
- 可以叠加不同颜色的形状
- 添加白色高光点增加光泽感
- 保持整体的和谐与平衡

### 构图要求
- 【重要】主体必须居中在坐标 (60, 60) 附近
- 主体占图标 55-65% 面积
- 图形要有甜美可爱的感觉

## 技术规则
1. 只输出 SVG 图形元素 (path, circle, rect, ellipse)
2. 图形中心点在 (60, 60)，有效范围 35-85
3. 使用预定义的糖果渐变填充
4. 直接输出代码，无需解释

## 参考示例 - 棒棒糖:
<circle cx="60" cy="52" r="20" fill="url(#candy-pink)"/>
<path d="M60 52 m-18 0 a18 18 0 0 1 36 0" fill="none" stroke="url(#candy-yellow)" stroke-width="6"/>
<path d="M60 52 m-12 0 a12 12 0 0 1 24 0" fill="none" stroke="url(#candy-mint)" stroke-width="4"/>
<rect x="57" y="70" width="6" height="20" rx="3" fill="url(#candy-purple)"/>
<ellipse cx="55" cy="48" rx="4" ry="3" fill="#fff" opacity="0.6"/>

## 参考示例 - 礼物盒:
<rect x="38" y="50" width="44" height="35" rx="4" fill="url(#candy-pink)"/>
<rect x="38" y="50" width="44" height="10" rx="4" fill="url(#candy-purple)"/>
<rect x="56" y="50" width="8" height="35" fill="url(#candy-yellow)"/>
<path d="M48 50 Q52 40 60 38 Q68 40 72 50" fill="none" stroke="url(#candy-mint)" stroke-width="5" stroke-linecap="round"/>
<ellipse cx="48" cy="55" rx="6" ry="4" fill="#fff" opacity="0.3"/>

## 参考示例 - 星星:
<path d="M60 35 L65 50 L82 52 L70 62 L74 80 L60 70 L46 80 L50 62 L38 52 L55 50 Z" fill="url(#candy-yellow)"/>
<path d="M60 42 L63 50 L72 51 L65 57 L67 66 L60 61 L53 66 L55 57 L48 51 L57 50 Z" fill="url(#candy-pink)" opacity="0.6"/>
<ellipse cx="55" cy="48" rx="3" ry="2" fill="#fff" opacity="0.7"/>`;
}

const gradientStyle: StylePlugin = {
  config,
  buildSvg,
  getPrompt,
};

export default gradientStyle;
