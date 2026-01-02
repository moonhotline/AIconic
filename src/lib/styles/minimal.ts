/**
 * Minimal 风格 - 极简主义 (Minimalist)
 * 
 * 特点：
 * - 极简线条和形状
 * - 大量留白
 * - 单色或双色配色
 * - 清晰的视觉层次
 * - 适合工具、效率、专业类应用
 */

import { StylePlugin, StyleColors } from './types';

const config = {
  id: 'minimal',
  name: '极简主义',
  platform: 'Minimalist',
  description: '极简线条 + 大量留白 + 清晰层次',
  colors: {
    primary: '#1A1A2E',    // 深墨蓝
    secondary: '#E94560',  // 珊瑚红
    background: '#FFFFFF', // 纯白
    accent: '#0F3460',     // 深蓝
  },
};

function buildSvg(iconContent: string, colors: StyleColors): string {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 微妙阴影 -->
    <filter id="subtle-shadow-min" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="${colors.primary}" flood-opacity="0.08"/>
    </filter>
    
    <!-- 边框阴影 -->
    <filter id="border-shadow-min" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="${colors.primary}" flood-opacity="0.05"/>
    </filter>
  </defs>
  
  <!-- 纯白背景 -->
  <rect x="10" y="10" width="100" height="100" rx="20" fill="${colors.background}" filter="url(#border-shadow-min)"/>
  
  <!-- 极细边框 -->
  <rect x="10" y="10" width="100" height="100" rx="20" fill="none" stroke="${colors.primary}" stroke-width="0.5" opacity="0.1"/>
  
  <!-- 主体容器 -->
  <g transform="translate(60, 60)">
    <g transform="translate(-60, -60)" filter="url(#subtle-shadow-min)">${iconContent}</g>
  </g>
</svg>`;
}

function getPrompt(mainBody: string, colors: StyleColors): string {
  return `你是极简主义设计师。为 "${mainBody}" 绘制一个简洁有力的图形。

## 设计风格要求

### 色彩运用
- 主体使用 ${colors.primary}（深墨蓝）
- ${colors.secondary}（珊瑚红）仅用于关键点缀（可选）
- 保持色彩克制，最多使用两种颜色
- 避免渐变，使用纯色

### 形态特征
- 极简的几何形状
- 线条粗细一致（推荐 stroke-width: 3-4）
- 去除所有不必要的装饰
- 图形要有良好的识别度

### 设计原则
- Less is more - 能用一笔画的不用两笔
- 留白是设计的一部分
- 每个元素都要有存在的理由

### 构图要求
- 【重要】主体必须居中在坐标 (60, 60) 附近
- 主体占图标 50-60% 面积，保持充足留白
- 图形要在小尺寸下也清晰可辨

## 技术规则
1. 只输出 SVG 图形元素 (path, circle, rect, line)
2. 图形中心点在 (60, 60)，有效范围 38-82
3. 优先使用 stroke 而非 fill
4. stroke-width 保持在 3-4
5. 直接输出代码，无需解释

## 参考示例 - 搜索:
<circle cx="55" cy="55" r="18" fill="none" stroke="${colors.primary}" stroke-width="3.5"/>
<line x1="68" y1="68" x2="82" y2="82" stroke="${colors.primary}" stroke-width="3.5" stroke-linecap="round"/>

## 参考示例 - 设置:
<circle cx="60" cy="60" r="8" fill="none" stroke="${colors.primary}" stroke-width="3"/>
<circle cx="60" cy="60" r="20" fill="none" stroke="${colors.primary}" stroke-width="3" stroke-dasharray="8 6"/>

## 参考示例 - 邮件:
<rect x="35" y="42" width="50" height="36" rx="3" fill="none" stroke="${colors.primary}" stroke-width="3"/>
<path d="M35 45 L60 62 L85 45" fill="none" stroke="${colors.primary}" stroke-width="3"/>`;
}

const minimalStyle: StylePlugin = {
  config,
  buildSvg,
  getPrompt,
};

export default minimalStyle;
