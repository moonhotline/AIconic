/**
 * Atelier 风格 - 匠心臻品 (Artisan Excellence)
 * 
 * 设计哲学：
 * - 源自瑞士精密制表工艺美学
 * - 融合法式高定品牌视觉语言
 * - 每一个细节都经得起放大审视
 * - 克制即奢华，精准即高级
 * 
 * 适用场景：
 * - 金融、法律、咨询等专业服务
 * - 奢侈品、高端零售品牌
 * - 企业级 SaaS 产品
 * - 高端生活方式应用
 */

import { StylePlugin, StyleColors } from './types';

const config = {
  id: 'atelier',
  name: '匠心臻品',
  platform: 'Atelier',
  description: '瑞士精密 + 法式高定 + 克制奢华',
  colors: {
    primary: '#1C1F26',    // 墨夜黑
    secondary: '#6B7280',  // 钢铁灰
    background: '#FAFAF9', // 瓷器白
    accent: '#C9A55C',     // 香槟金
  },
};

function buildSvg(iconContent: string, colors: StyleColors): string {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 瓷器质感背景 -->
    <linearGradient id="atelier-surface" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="${colors.background}"/>
    </linearGradient>
    
    <!-- 主色深邃渐变 -->
    <linearGradient id="atelier-primary" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2D3142"/>
      <stop offset="100%" stop-color="${colors.primary}"/>
    </linearGradient>
    
    <!-- 辅助灰调 -->
    <linearGradient id="atelier-secondary" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#9CA3AF"/>
      <stop offset="100%" stop-color="${colors.secondary}"/>
    </linearGradient>
    
    <!-- 香槟金属光泽 -->
    <linearGradient id="atelier-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8D5A3"/>
      <stop offset="25%" stop-color="${colors.accent}"/>
      <stop offset="50%" stop-color="#DFC07F"/>
      <stop offset="75%" stop-color="${colors.accent}"/>
      <stop offset="100%" stop-color="#A08339"/>
    </linearGradient>
    
    <!-- 精密投影系统 -->
    <filter id="atelier-shadow" x="-25%" y="-25%" width="150%" height="150%">
      <!-- 环境光遮蔽 -->
      <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="${colors.primary}" flood-opacity="0.04"/>
      <!-- 主投影 -->
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="${colors.primary}" flood-opacity="0.08"/>
      <!-- 远景投影 -->
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="${colors.primary}" flood-opacity="0.04"/>
    </filter>
    
    <!-- 图标精致投影 -->
    <filter id="atelier-icon-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1" stdDeviation="0.5" flood-color="${colors.primary}" flood-opacity="0.15"/>
    </filter>
    
    <!-- 内部光泽 -->
    <linearGradient id="atelier-sheen" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6"/>
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    
    <!-- 边缘精修 -->
    <linearGradient id="atelier-edge" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${colors.secondary}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="${colors.primary}" stop-opacity="0.12"/>
    </linearGradient>
  </defs>
  
  <!-- 基底层 -->
  <rect x="10" y="10" width="100" height="100" rx="20" fill="url(#atelier-surface)" filter="url(#atelier-shadow)"/>
  
  <!-- 精密边框 - 1px 完美贴合 -->
  <rect x="10.5" y="10.5" width="99" height="99" rx="19.5" fill="none" stroke="url(#atelier-edge)" stroke-width="1"/>
  
  <!-- 顶部光泽带 -->
  <rect x="10" y="10" width="100" height="35" rx="20" fill="url(#atelier-sheen)"/>
  <rect x="10" y="35" width="100" height="10" fill="url(#atelier-sheen)" opacity="0"/>
  
  <!-- 主体容器 -->
  <g transform="translate(60, 60)">
    <g transform="translate(-60, -60)" filter="url(#atelier-icon-shadow)">${iconContent}</g>
  </g>
</svg>`;
}

function getPrompt(mainBody: string, colors: StyleColors): string {
  return `你是 Atelier 匠心臻品风格设计师，遵循瑞士精密制表与法式高定的设计标准。为 "${mainBody}" 设计一个经得起放大审视的高端图标。

## 核心设计准则

### 黄金法则
- 克制即奢华：能用一笔完成，绝不用两笔
- 精准即高级：每个点位都有存在的理由
- 负空间是设计的一部分

### 色彩规范
- 主色 url(#atelier-primary) - ${colors.primary} 墨夜黑（核心图形）
- 辅色 url(#atelier-secondary) - ${colors.secondary} 钢铁灰（次要元素）
- 金色 url(#atelier-gold) - ${colors.accent} 香槟金（仅用于极小面积点缀，< 5%）
- 禁止：任何高饱和色彩、渐变叠加超过2层

### 形态规范
- 圆角半径：统一使用 2、4、6、8 像素（保持一致性）
- 线条粗细：1.5px / 2px / 2.5px（三档选择）
- 间距：遵循 4px 网格系统
- 形状：优先使用几何基本形，避免复杂曲线

### 品质标准
- 在 16x16 尺寸下仍清晰可辨
- 放大到 512x512 细节经得起审视
- 黑白模式下同样优雅
- 图形重心视觉居中（非数学居中）

### 构图要求
- 【核心】主体视觉重心在 (60, 60)
- 主体占画布 45-60%（留足呼吸空间）
- 垂直方向可略微上移 2-3px（视觉平衡）
- 确保四周留白均匀

## 技术规格
1. 仅输出：path / circle / rect / ellipse / line / polygon
2. 画布中心 (60, 60)，安全区域 32-88
3. 填充优先使用 url(#atelier-primary)
4. 描边使用 stroke="${colors.primary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
5. 香槟金 url(#atelier-gold) 仅用于点睛之笔（一个小圆点/一条短线）
6. 直接输出代码，无任何解释

## 标杆示例

### 示例 - 盾牌（安全/信任）:
<path d="M60 35 L78 42 L78 58 Q78 72 60 82 Q42 72 42 58 L42 42 Z" fill="url(#atelier-primary)"/>
<path d="M60 38 L75 44 L75 57 Q75 69 60 78 Q45 69 45 57 L45 44 Z" fill="none" stroke="url(#atelier-secondary)" stroke-width="1.5"/>
<circle cx="60" cy="56" r="2.5" fill="url(#atelier-gold)"/>

### 示例 - 天平（公正/法律）:
<line x1="60" y1="38" x2="60" y2="78" stroke="url(#atelier-primary)" stroke-width="2.5" stroke-linecap="round"/>
<line x1="42" y1="52" x2="78" y2="52" stroke="url(#atelier-primary)" stroke-width="2" stroke-linecap="round"/>
<path d="M42 52 L38 62 L46 62 Z" fill="url(#atelier-secondary)"/>
<path d="M78 52 L74 62 L82 62 Z" fill="url(#atelier-secondary)"/>
<circle cx="60" cy="38" r="3" fill="url(#atelier-gold)"/>
<rect x="54" y="76" width="12" height="4" rx="2" fill="url(#atelier-primary)"/>

### 示例 - 钥匙（安全/访问）:
<circle cx="52" cy="48" r="10" fill="none" stroke="url(#atelier-primary)" stroke-width="2.5"/>
<circle cx="52" cy="48" r="4" fill="url(#atelier-secondary)"/>
<line x1="62" y1="48" x2="78" y2="48" stroke="url(#atelier-primary)" stroke-width="2.5" stroke-linecap="round"/>
<line x1="72" y1="48" x2="72" y2="54" stroke="url(#atelier-primary)" stroke-width="2" stroke-linecap="round"/>
<line x1="78" y1="48" x2="78" y2="56" stroke="url(#atelier-primary)" stroke-width="2" stroke-linecap="round"/>
<circle cx="52" cy="48" r="1.5" fill="url(#atelier-gold)"/>

### 示例 - 王冠（尊贵/会员）:
<path d="M40 70 L44 50 L52 58 L60 45 L68 58 L76 50 L80 70 Z" fill="url(#atelier-primary)"/>
<rect x="40" y="68" width="40" height="6" rx="2" fill="url(#atelier-primary)"/>
<circle cx="60" cy="50" r="2" fill="url(#atelier-gold)"/>
<circle cx="48" cy="56" r="1.5" fill="url(#atelier-gold)"/>
<circle cx="72" cy="56" r="1.5" fill="url(#atelier-gold)"/>`;
}

const atelierStyle: StylePlugin = {
  config,
  buildSvg,
  getPrompt,
};

export default atelierStyle;