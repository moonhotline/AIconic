/**
 * Metallic 风格 - 金属质感 (Premium)
 * 
 * 特点：
 * - 金属光泽渐变
 * - 高级质感
 * - 精致的反光效果
 * - 奢华感设计
 * - 适合金融、商务、高端品牌应用
 */

import { StylePlugin, StyleColors } from './types';

const config = {
  id: 'metallic',
  name: '金属质感',
  platform: 'Premium',
  description: '金属光泽 + 高级质感 + 精致反光',
  colors: {
    primary: '#C9B037',    // 金色
    secondary: '#D4AF37',  // 深金
    background: '#1C1C1C', // 深灰黑
    accent: '#E8E8E8',     // 银白
  },
};

function buildSvg(iconContent: string, colors: StyleColors): string {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 深色背景渐变 -->
    <linearGradient id="bg-metal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D2D2D"/>
      <stop offset="50%" stop-color="${colors.background}"/>
      <stop offset="100%" stop-color="#2D2D2D"/>
    </linearGradient>
    
    <!-- 金属渐变 -->
    <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5E7A3"/>
      <stop offset="25%" stop-color="${colors.primary}"/>
      <stop offset="50%" stop-color="#F5E7A3"/>
      <stop offset="75%" stop-color="${colors.secondary}"/>
      <stop offset="100%" stop-color="#8B7500"/>
    </linearGradient>
    
    <!-- 银色渐变 -->
    <linearGradient id="silver-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="25%" stop-color="${colors.accent}"/>
      <stop offset="50%" stop-color="#FFFFFF"/>
      <stop offset="75%" stop-color="#B8B8B8"/>
      <stop offset="100%" stop-color="#808080"/>
    </linearGradient>
    
    <!-- 金属光泽滤镜 -->
    <filter id="metallic-shine" x="-20%" y="-20%" width="140%" height="140%">
      <feSpecularLighting surfaceScale="2" specularConstant="1" specularExponent="20" lighting-color="#fff" result="specular">
        <fePointLight x="60" y="20" z="100"/>
      </feSpecularLighting>
      <feComposite in="SourceGraphic" in2="specular" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
    </filter>
    
    <!-- 外发光 -->
    <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="${colors.primary}" flood-opacity="0.5"/>
    </filter>
    
    <!-- 内阴影 -->
    <filter id="inner-shadow-metal" x="-10%" y="-10%" width="120%" height="120%">
      <feOffset dx="0" dy="2"/>
      <feGaussianBlur stdDeviation="2" result="shadow"/>
      <feFlood flood-color="#000" flood-opacity="0.3"/>
      <feComposite in2="shadow" operator="in"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect x="10" y="10" width="100" height="100" rx="20" fill="url(#bg-metal)"/>
  
  <!-- 金属边框 -->
  <rect x="14" y="14" width="92" height="92" rx="16" fill="none" stroke="url(#gold-gradient)" stroke-width="2"/>
  
  <!-- 角落装饰 -->
  <circle cx="20" cy="20" r="3" fill="url(#gold-gradient)"/>
  <circle cx="100" cy="20" r="3" fill="url(#gold-gradient)"/>
  <circle cx="20" cy="100" r="3" fill="url(#gold-gradient)"/>
  <circle cx="100" cy="100" r="3" fill="url(#gold-gradient)"/>
  
  <!-- 主体容器 -->
  <g transform="translate(60, 60)">
    <g transform="translate(-60, -60)" filter="url(#gold-glow)">${iconContent}</g>
  </g>
</svg>`;
}

function getPrompt(mainBody: string, colors: StyleColors): string {
  return `你是金属质感风格设计师。为 "${mainBody}" 绘制一个高级奢华的图形。

## 设计风格要求

### 色彩运用
- 主体使用 url(#gold-gradient) 金色渐变
- 或使用 url(#silver-gradient) 银色渐变
- 保持高级奢华的感觉
- 图形要在深色背景上闪耀

### 形态特征
- 精致、优雅的设计
- 线条流畅，有金属质感
- 简洁但不简单
- 保持图形的高端感

### 构图要求
- 【重要】主体必须居中在坐标 (60, 60) 附近
- 主体占图标 55-65% 面积
- 图形要有奢华高级的感觉

## 技术规则
1. 只输出 SVG 图形元素 (path, circle, rect, polygon)
2. 图形中心点在 (60, 60)，有效范围 35-85
3. 使用 url(#gold-gradient) 或 url(#silver-gradient) 填充
4. 直接输出代码，无需解释

## 参考示例 - 皇冠:
<path d="M35 70 L40 50 L50 60 L60 45 L70 60 L80 50 L85 70 Z" fill="url(#gold-gradient)"/>
<rect x="35" y="70" width="50" height="8" rx="2" fill="url(#gold-gradient)"/>
<circle cx="60" cy="50" r="4" fill="url(#silver-gradient)"/>`;
}

const metallicStyle: StylePlugin = {
  config,
  buildSvg,
  getPrompt,
};

export default metallicStyle;
