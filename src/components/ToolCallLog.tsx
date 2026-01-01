'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToolLog {
  name: string;
  status: 'running' | 'done';
  logs: string[];
}

interface ToolCallLogProps {
  tools: ToolLog[];
}

// 工具名称映射
const toolNames: Record<string, string> = {
  'analyze_icon_main_body': '分析主体',
  'generate_icon_set': '生成图标',
  'generate_icon_by_main_body': '生成图标',
  'save_icon': '保存图标',
};

// 工具图标
const toolIcons: Record<string, string> = {
  'analyze_icon_main_body': '🔍',
  'generate_icon_set': '🎨',
  'generate_icon_by_main_body': '🎨',
  'save_icon': '💾',
};

export default function ToolCallLog({ tools }: ToolCallLogProps) {
  const [expanded, setExpanded] = useState(false);

  if (tools.length === 0) return null;

  return (
    <div style={{ marginBottom: 12 }}>
      {/* 工具标签列表 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
        {tools.map((tool, idx) => (
          <div
            key={idx}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              background: tool.status === 'running' ? '#fef3c7' : '#ecfdf5',
              border: `1px solid ${tool.status === 'running' ? '#fcd34d' : '#6ee7b7'}`,
              borderRadius: 6,
              fontSize: 12,
              color: tool.status === 'running' ? '#92400e' : '#047857',
            }}
          >
            {tool.status === 'running' ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ display: 'inline-block' }}
              >
                ⟳
              </motion.span>
            ) : (
              <span>✓</span>
            )}
            <span>{toolNames[tool.name] || tool.name}</span>
          </div>
        ))}
      </div>

      {/* 展开/收起按钮 */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '4px 8px',
          background: 'transparent',
          border: '1px solid #e5e7eb',
          borderRadius: 4,
          fontSize: 11,
          color: '#6b7280',
          cursor: 'pointer',
        }}
      >
        <span style={{ 
          transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          display: 'inline-block',
        }}>
          ▶
        </span>
        {expanded ? '收起日志' : '查看执行日志'}
      </button>

      {/* 日志详情 */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                marginTop: 8,
                padding: 12,
                background: '#1e1e1e',
                borderRadius: 8,
                fontFamily: 'Monaco, Consolas, monospace',
                fontSize: 11,
                lineHeight: 1.6,
                maxHeight: 200,
                overflowY: 'auto',
              }}
            >
              {tools.map((tool, toolIdx) => (
                <div key={toolIdx} style={{ marginBottom: toolIdx < tools.length - 1 ? 8 : 0 }}>
                  {/* 工具名称 */}
                  <div style={{ color: '#6ee7b7', marginBottom: 2 }}>
                    {toolIcons[tool.name]} [{toolNames[tool.name] || tool.name}]
                  </div>
                  {/* 日志内容 */}
                  {tool.logs.map((log, logIdx) => (
                    <div key={logIdx} style={{ color: '#d1d5db', paddingLeft: 16 }}>
                      {log}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 简化版：只显示当前执行状态
export function ToolCallStatus({ tools }: ToolCallLogProps) {
  if (tools.length === 0) return null;

  const currentTool = tools.find(t => t.status === 'running') || tools[tools.length - 1];
  const lastLog = currentTool?.logs[currentTool.logs.length - 1];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 12px',
      background: '#f8fafc',
      borderRadius: 8,
      fontSize: 12,
      color: '#64748b',
    }}>
      {currentTool?.status === 'running' ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          ⟳
        </motion.span>
      ) : (
        <span>✓</span>
      )}
      <span>
        {toolIcons[currentTool?.name || '']} {lastLog || '处理中...'}
      </span>
    </div>
  );
}
