import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.OPENAI_BASE_URL,
});

// ============================================
// 高质量 App 图标生成器
// 4 种跨平台专业风格
// ============================================

/**
 * 风格配置
 * 
 * 1. appstore - 数字静物摄影 (Apple)
 *    - 居中主体 + 柔光 + 浅背景 + 微投影
 *    - 主体占 60-70% 面积
 *    - 避免描边，用色彩对比
 * 
 * 2. material - Material 具象符号 (Google)
 *    - 几何化主体 + 动态渐变背景
 *    - 适配多种形状裁剪
 *    - Material 阴影 (elevation)
 * 
 * 3. fluent - Fluent 插画焦点 (Microsoft)
 *    - 清晰轮廓 + 光影方向 + 等距感
 *    - 2px+ 描边或色块对比
 *    - 从左上角打光
 * 
 * 4. neon - 霓虹发光
 *    - 发光效果 + 深色渐变背景
 *    - 高对比度
 */

export interface StyleConfig {
  name: string;
  platform: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    accent: string;
  };
}

export const STYLE_CONFIGS: Record<string, StyleConfig> = {
  appstore: {
    name: '数字静物',
    platform: 'App Store',
    description: '柔光 + 浅背景 + 微投影，如同桌面静物摄影',
    colors: {
      primary: '#007AFF',    // Apple 蓝
      secondary: '#5856D6',  // 紫
      background: '#F5F5F7', // 浅灰
      accent: '#FFFFFF',
    },
  },
  material: {
    name: 'Material',
    platform: 'Google Play',
    description: '几何化主体 + 动态渐变 + Material 阴影',
    colors: {
      primary: '#4285F4',    // Google 蓝
      secondary: '#34A853',  // Google 绿
      background: '#FFFFFF',
      accent: '#EA4335',     // Google 红
    },
  },
  fluent: {
    name: 'Fluent',
    platform: 'Microsoft',
    description: '清晰轮廓 + 左上光源 + 等距插画感',
    colors: {
      primary: '#0078D4',    // Microsoft 蓝
      secondary: '#50E6FF',  // 浅蓝
      background: '#F3F3F3',
      accent: '#FFB900',     // 黄
    },
  },
  neon: {
    name: '霓虹',
    platform: 'Creative',
    description: '发光效果 + 深色背景 + 高对比度',
    colors: {
      primary: '#EC4899',    // 粉
      secondary: '#8B5CF6',  // 紫
      background: '#1a1a2e',
      accent: '#00D9FF',
    },
  },
};


// ============================================
// SVG 模板构建器
// ============================================

/**
 * App Store 风格 - 数字静物摄影
 * 特点：浅色背景、柔和阴影、主体居中、无描边
 */
function buildAppStoreSvg(iconContent: string, colors: StyleConfig['colors']): string {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 柔和的背景渐变 -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="${colors.background}"/>
    </linearGradient>
    <!-- 柔光效果 -->
    <filter id="softLight" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
      <feOffset in="blur" dx="0" dy="2" result="shadow"/>
      <feFlood flood-color="#000" flood-opacity="0.08"/>
      <feComposite in2="shadow" operator="in"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <!-- 主体光晕 -->
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feFlood flood-color="${colors.primary}" flood-opacity="0.15"/>
      <feComposite in2="blur" operator="in"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- 背景 -->
  <rect x="10" y="10" width="100" height="100" rx="22" fill="url(#bg)"/>
  <!-- 顶部高光 -->
  <rect x="10" y="10" width="100" height="35" rx="22" fill="#fff" opacity="0.6"/>
  <!-- 主体（带柔光和光晕） -->
  <g filter="url(#softLight)">
    <g filter="url(#glow)">${iconContent}</g>
  </g>
</svg>`;
}

/**
 * Material 风格 - Google Play
 * 特点：几何化、动态渐变背景、Material 阴影
 */
function buildMaterialSvg(iconContent: string, colors: StyleConfig['colors']): string {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 动态渐变背景 -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.primary}"/>
      <stop offset="50%" stop-color="${colors.secondary}"/>
      <stop offset="100%" stop-color="${colors.primary}"/>
    </linearGradient>
    <!-- Material elevation 阴影 -->
    <filter id="elevation" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.2"/>
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.14"/>
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000" flood-opacity="0.12"/>
    </filter>
  </defs>
  <!-- 背景圆角矩形 -->
  <rect x="10" y="10" width="100" height="100" rx="20" fill="url(#bg)"/>
  <!-- 顶部光泽 -->
  <ellipse cx="60" cy="30" rx="40" ry="20" fill="#fff" opacity="0.2"/>
  <!-- 主体（带 Material 阴影） -->
  <g filter="url(#elevation)">${iconContent}</g>
</svg>`;
}

/**
 * Fluent 风格 - Microsoft
 * 特点：清晰轮廓、左上光源、等距感、2px描边
 */
function buildFluentSvg(iconContent: string, colors: StyleConfig['colors']): string {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Fluent 渐变（左上到右下光源） -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAFAFA"/>
      <stop offset="100%" stop-color="${colors.background}"/>
    </linearGradient>
    <!-- 左上光源效果 -->
    <linearGradient id="light" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <!-- Fluent 阴影 -->
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="140%">
      <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/>
    </filter>
    <!-- 主体描边效果 -->
    <filter id="outline" x="-5%" y="-5%" width="110%" height="110%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="expanded"/>
      <feFlood flood-color="${colors.primary}" flood-opacity="0.3"/>
      <feComposite in2="expanded" operator="in"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- 背景 -->
  <rect x="10" y="10" width="100" height="100" rx="16" fill="url(#bg)" filter="url(#shadow)"/>
  <!-- 左上光源高光 -->
  <rect x="10" y="10" width="100" height="100" rx="16" fill="url(#light)"/>
  <!-- 主体（带轮廓） -->
  <g filter="url(#outline)">${iconContent}</g>
</svg>`;
}

/**
 * Neon 风格 - 霓虹发光
 * 特点：深色背景、发光效果、高对比度
 */
function buildNeonSvg(iconContent: string, colors: StyleConfig['colors']): string {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 深色渐变背景 -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.primary}"/>
      <stop offset="100%" stop-color="${colors.secondary}"/>
    </linearGradient>
    <!-- 霓虹发光 -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <!-- 外发光阴影 -->
    <filter id="outerGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="${colors.primary}" flood-opacity="0.5"/>
    </filter>
  </defs>
  <!-- 背景 -->
  <rect x="10" y="10" width="100" height="100" rx="24" fill="url(#bg)" filter="url(#outerGlow)"/>
  <!-- 玻璃高光 -->
  <rect x="10" y="10" width="100" height="50" rx="24" fill="#fff" opacity="0.15"/>
  <!-- 主体（带霓虹发光） -->
  <g filter="url(#glow)">${iconContent}</g>
</svg>`;
}


// ============================================
// 主体生成提示词
// ============================================

function getStylePrompt(style: string, mainBody: string, colors: StyleConfig['colors']): string {
  const baseRules = `规则:
1. 只输出 SVG 图形元素 (path, circle, rect, ellipse)
2. 图形居中在 40-80 坐标范围内
3. 主体占图标 60-70% 面积
4. 直接输出代码，无解释`;

  switch (style) {
    case 'appstore':
      return `你是 Apple 设计师。绘制 "${mainBody}" 的静物风格图形。

风格要求：
- 主体用品牌色 ${colors.primary}，带柔和渐变
- 无描边，用色彩明暗区分层次
- 简化细节，保留可识别轮廓
- 添加微弱的立体感（用浅色表示高光面）

${baseRules}

示例 - 相机镜头:
<circle cx="60" cy="60" r="24" fill="${colors.primary}"/>
<circle cx="60" cy="60" r="18" fill="#fff"/>
<circle cx="60" cy="60" r="12" fill="${colors.secondary}"/>
<ellipse cx="55" cy="55" rx="4" ry="3" fill="#fff" opacity="0.6"/>`;

    case 'material':
      return `你是 Google Material 设计师。绘制 "${mainBody}" 的几何化图形。

风格要求：
- 使用白色 #fff 作为主体色
- 几何化简化，用基础形状组合
- 可添加 ${colors.accent} 作为点缀色
- 保持边缘清晰，适合多种裁剪形状

${baseRules}

示例 - 音符:
<circle cx="52" cy="70" r="10" fill="#fff"/>
<circle cx="72" cy="65" r="10" fill="#fff"/>
<rect x="60" y="35" width="4" height="35" rx="2" fill="#fff"/>
<path d="M64 35 Q80 30 80 45 Q80 55 64 50" fill="#fff"/>`;

    case 'fluent':
      return `你是 Microsoft Fluent 设计师。绘制 "${mainBody}" 的插画风格图形。

风格要求：
- 主体用 ${colors.primary}，高光用 ${colors.secondary}
- 清晰的 2px 轮廓感（用色块对比实现）
- 左上角是光源方向，右下较暗
- 可用等距视角增加立体感

${baseRules}

示例 - 文档:
<rect x="40" y="35" width="35" height="45" rx="3" fill="${colors.primary}"/>
<rect x="42" y="37" width="31" height="10" fill="${colors.secondary}" opacity="0.5"/>
<rect x="45" y="52" width="25" height="3" rx="1" fill="#fff" opacity="0.8"/>
<rect x="45" y="58" width="20" height="3" rx="1" fill="#fff" opacity="0.6"/>
<rect x="45" y="64" width="15" height="3" rx="1" fill="#fff" opacity="0.4"/>`;

    case 'neon':
    default:
      return `你是霓虹风格设计师。绘制 "${mainBody}" 的发光图形。

风格要求：
- 主体用白色 #fff，会自动添加发光效果
- 可用 ${colors.primary} 作为点缀
- 简洁线条，适合发光效果
- 高对比度，深色背景上要醒目

${baseRules}

示例 - 闪电:
<path d="M65 30 L50 58 L58 58 L55 90 L75 55 L65 55 Z" fill="#fff"/>`;
  }
}

// ============================================
// 主函数
// ============================================

export async function generateIconFromMainBody(params: {
  mainBody: string;
  style: string;
}): Promise<string | null> {
  const { mainBody, style } = params;
  
  const config = STYLE_CONFIGS[style] || STYLE_CONFIGS.neon;
  
  console.log(`[IconGen] 生成 ${config.platform} 风格图标 - 主体: ${mainBody}`);

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-5.1',
      messages: [
        { 
          role: 'system', 
          content: getStylePrompt(style, mainBody, config.colors)
        },
        { 
          role: 'user', 
          content: `绘制 "${mainBody}":` 
        }
      ],
      temperature: 0.6,
      max_tokens: 600,
    });

    let iconContent = response.choices[0]?.message?.content || '';
    
    // 清理
    iconContent = iconContent
      .replace(/```(?:svg|xml)?\s*/gi, '')
      .replace(/```/g, '')
      .replace(/<svg[^>]*>/gi, '')
      .replace(/<\/svg>/gi, '')
      .trim();

    if (!iconContent || iconContent.length < 20) {
      iconContent = `<circle cx="60" cy="60" r="20" fill="${config.colors.primary}"/>`;
    }

    // 根据风格选择模板
    switch (style) {
      case 'appstore':
        return buildAppStoreSvg(iconContent, config.colors);
      case 'material':
        return buildMaterialSvg(iconContent, config.colors);
      case 'fluent':
        return buildFluentSvg(iconContent, config.colors);
      case 'neon':
      default:
        return buildNeonSvg(iconContent, config.colors);
    }

  } catch (error) {
    console.error('[IconGen] 生成失败:', error);
    const config = STYLE_CONFIGS[style] || STYLE_CONFIGS.neon;
    const fallback = `<circle cx="60" cy="60" r="20" fill="${config.colors.primary}"/>`;
    return buildNeonSvg(fallback, config.colors);
  }
}

// 兼容旧接口
export async function generateHighQualitySvg(params: {
  description: string;
  style: string;
  primaryColor?: string;
  secondaryColor?: string;
}): Promise<string | null> {
  return generateIconFromMainBody({
    mainBody: params.description,
    style: params.style,
  });
}

// 导出配色方案供 tools.ts 使用
export const COLOR_SCHEMES = STYLE_CONFIGS;
