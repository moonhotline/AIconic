'use client';

import { useMemo } from 'react';

interface IconPreviewProps {
  svg: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  showBackground?: boolean;
}

// 标准化 SVG 以确保正确渲染
function normalizeSvg(svg: string): string {
  let normalized = svg;
  
  // 确保有 viewBox
  if (!normalized.includes('viewBox')) {
    normalized = normalized.replace(/<svg/, '<svg viewBox="0 0 120 120"');
  }
  
  // 移除固定宽高，让 SVG 自适应容器
  normalized = normalized
    .replace(/\s+width="[^"]*"/g, '')
    .replace(/\s+height="[^"]*"/g, '');
  
  // 确保有 xmlns
  if (!normalized.includes('xmlns=')) {
    normalized = normalized.replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  
  // 为滤镜 ID 添加唯一前缀，避免多个 SVG 之间的 ID 冲突
  const uniqueId = Math.random().toString(36).slice(2, 8);
  normalized = normalized
    .replace(/id="([^"]+)"/g, `id="$1-${uniqueId}"`)
    .replace(/url\(#([^)]+)\)/g, `url(#$1-${uniqueId})`);
  
  // 添加 preserveAspectRatio 确保图标居中
  if (!normalized.includes('preserveAspectRatio')) {
    normalized = normalized.replace(/<svg/, '<svg preserveAspectRatio="xMidYMid meet"');
  }
  
  return normalized;
}

export default function IconPreview({ 
  svg, 
  size = 120, 
  className = '',
  style = {},
  showBackground = false 
}: IconPreviewProps) {
  const normalizedSvg = useMemo(() => normalizeSvg(svg), [svg]);
  
  return (
    <div 
      className={className}
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible', // 允许滤镜效果溢出
        background: showBackground ? '#f8fafc' : 'transparent',
        borderRadius: showBackground ? 8 : 0,
        ...style
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        dangerouslySetInnerHTML={{ __html: normalizedSvg }}
      />
    </div>
  );
}

// 用于网格展示的小图标
export function IconThumbnail({ 
  svg, 
  selected = false,
  onClick,
  label
}: { 
  svg: string; 
  selected?: boolean;
  onClick?: () => void;
  label?: string;
}) {
  const normalizedSvg = useMemo(() => normalizeSvg(svg), [svg]);
  
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        background: '#fff',
        borderRadius: 12,
        padding: 8,
        cursor: 'pointer',
        border: selected ? '2px solid #6366f1' : '2px solid #f3f4f6',
        boxShadow: selected ? '0 4px 12px rgba(99, 102, 241, 0.15)' : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <div 
        style={{ 
          width: '100%', 
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible',
          padding: 4,
        }}
      >
        <div
          style={{ width: '100%', height: '100%' }}
          dangerouslySetInnerHTML={{ __html: normalizedSvg }}
        />
      </div>
      
      {selected && (
        <div style={{
          position: 'absolute',
          top: 6,
          right: 6,
          width: 18,
          height: 18,
          background: '#6366f1',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#fff">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      
      {label && (
        <span style={{
          position: 'absolute',
          bottom: 4,
          left: 8,
          fontSize: 9,
          color: '#6b7280',
          background: 'rgba(255,255,255,0.9)',
          padding: '2px 6px',
          borderRadius: 4,
          fontWeight: 500,
        }}>
          {label}
        </span>
      )}
    </div>
  );
}
