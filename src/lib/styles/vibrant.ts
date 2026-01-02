/**
 * Serene 风格 - 静谧深邃 (Serene Depth)
 * 
 * 特点：
 * - 日式侘寂美学 + 北欧极简主义
 * - 柔和的自然色调
 * - 精致的光影层次
 * - 内敛而高级的视觉语言
 * - 适合专业、高端、品质类应用
 */

import { StylePlugin, StyleColors } from './types';

const config = {
  id: 'serene',
  name: '静谧深邃',
  platform: 'Serene',
  description: '侘寂美学 + 自然质感 + 内敛高级',
  colors: {
    primary: '#2D3436',    // 墨石灰
    secondary: '#636E72',  // 青灰
    background: '#F5F3EF', // 暖白
    accent: '#B8860B',     // 古铜金
  },
};

function buildSvg(iconContent: string, colors: StyleColors): string {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 暖白纸质背景 -->
    <linearGradient id="serene-paper" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.background}"/>
      <stop offset="100%" stop-color="#EBE8E2"/>
    </linearGradient>
    
    <!-- 墨色主调 -->
    <linearGradient id="serene-ink" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${colors.primary}"/>
      <stop offset="100%" stop-color="#1A1E1F"/>
    </linearGradient>
    
    <!-- 青灰辅助 -->
    <linearGradient id="serene-mist" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.secondary}"/>
      <stop offset="100%" stop-color="#8395A7"/>
    </linearGradient>
    
    <!-- 古铜点缀 -->
    <linearGradient id="serene-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.accent}"/>
      <stop offset="50%" stop-color="#D4A84B"/>
      <stop offset="100%" stop-color="#8B6914"/>
    </linearGradient>
    
    <!-- 陶瓷质感 -->
    <radialGradient id="serene-ceramic" cx="35%" cy="35%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${colors.background}" stop-opacity="0"/>
    </radialGradient>
    
    <!-- 柔和投影 -->
    <filter id="serene-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="${colors.primary}" flood-opacity="0.08"/>
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="${colors.primary}" flood-opacity="0.05"/>
    </filter>
    
    <!-- 内凹质感 -->
    <filter id="serene-inset" x="-10%" y="-10%" width="120%" height="120%">
      <feOffset dx="0" dy="1" in="SourceAlpha" result="offset"/>
      <feGaussianBlur stdDeviation="1" in="offset" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  
  <!-- 纸质底色 -->
  <rect x="8" y="8" width="104" height="104" rx="20" fill="url(#serene-paper)" filter="url(#serene-shadow)"/>
  
  <!-- 陶瓷光泽 -->
  <rect x="8" y="8" width="104" height="104" rx="20" fill="url(#serene-ceramic)"/>
  
  <!-- 细边框 -->
  <rect x="8" y="8" width="104" height="104" rx="20" fill="none" stroke="${colors.secondary}" stroke-width="0.5" stroke-opacity="0.2"/>
  
  <!-- 主体容器 -->
  <g transform="translate(60, 60)">
    <g transform="translate(-60, -60)" filter="url(#serene-inset)">${iconContent}</g>
  </g>
</svg>`;
}

function getPrompt(mainBody: string, colors: StyleColors): string {
  return `你是静谧深邃风格设计师，融合日式侘寂美学与北欧极简主义。为 "${mainBody}" 设计一个内敛高级的图标。

## 设计哲学

### 侘寂之美
- 追求不完美中的完美
- 简约但不简单
- 留白即是设计
- 每一笔都有意义

### 色彩运用
- 主色使用 url(#serene-ink) - ${colors.primary}（墨石灰）
- 辅色使用 url(#serene-mist) - ${colors.secondary}（青灰）
- 点缀使用 url(#serene-gold) - ${colors.accent}（古铜金，极少量）
- 色彩克制，高级感源于节制

### 形态特征
- 线条简洁有力
- 适度的圆角，避免尖锐
- 形状要有手工质感
- 比例遵循黄金分割

### 设计原则
- 少即是多
- 负空间与正空间同等重要
- 细节决定品质
- 静中有动，动中有静

### 构图要求
- 【重要】主体居中于坐标 (60, 60)
- 主体占图标 50-65% 面积
- 保持呼吸感和平衡感
- 图标应像一枚印章般精致

## 技术规则
1. 只输出 SVG 图形元素 (path, circle, rect, ellipse)
2. 图形中心点在 (60, 60)，有效范围 35-85
3. 优先使用 url(#serene-ink)，少量使用 url(#serene-gold) 点缀
4. stroke 效果可增加手工感：stroke="${colors.primary}" stroke-width="1.5"
5. 直接输出代码，无需解释

## 参考示例 - 山:
<path d="M35 75 L60 40 L85 75 Z" fill="url(#serene-ink)"/>
<path d="M45 75 L60 55 L75 75 Z" fill="url(#serene-mist)" opacity="0.6"/>
<circle cx="75" cy="45" r="3" fill="url(#serene-gold)"/>

## 参考示例 - 茶杯:
<ellipse cx="60" cy="70" rx="18" ry="6" fill="url(#serene-ink)"/>
<path d="M42 50 L42 68 Q60 80 78 68 L78 50 Z" fill="url(#serene-mist)"/>
<ellipse cx="60" cy="50" rx="18" ry="6" fill="url(#serene-ink)"/>
<circle cx="60" cy="50" r="2" fill="url(#serene-gold)"/>

## 参考示例 - 书:
<rect x="42" y="45" width="36" height="28" rx="2" fill="url(#serene-ink)"/>
<rect x="44" y="47" width="32" height="24" rx="1" fill="url(#serene-mist)" opacity="0.3"/>
<line x1="60" y1="47" x2="60" y2="71" stroke="url(#serene-gold)" stroke-width="1"/>`;
}

const sereneStyle: StylePlugin = {
  config,
  buildSvg,
  getPrompt,
};

export default sereneStyle;