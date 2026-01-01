import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sessions, messages, icons } from '@/db/schema';
import { eq, count } from 'drizzle-orm';

// 根据用户消息生成会话标题
function generateSessionTitle(content: string): string {
  // 移除多余空白，取前20个字符
  const cleaned = content.trim().replace(/\s+/g, ' ');
  if (cleaned.length <= 20) return cleaned;
  return cleaned.slice(0, 20) + '...';
}

// 保存消息和图标
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: sessionId } = await params;
  const { message, generatedIcons } = await req.json();
  
  // 保存消息
  const [savedMessage] = await db.insert(messages)
    .values({
      sessionId,
      role: message.role,
      content: message.content,
      toolCalls: message.toolCalls || null,
    } as typeof messages.$inferInsert)
    .returning();
  
  // 如果是用户消息，检查是否是第一条消息，自动更新会话标题
  let newTitle: string | undefined;
  if (message.role === 'user') {
    const [{ messageCount }] = await db.select({ messageCount: count() })
      .from(messages)
      .where(eq(messages.sessionId, sessionId));
    
    // 如果是第一条用户消息，更新会话标题
    if (messageCount === 1) {
      newTitle = generateSessionTitle(message.content);
      await db.update(sessions)
        .set({ title: newTitle, updatedAt: new Date() })
        .where(eq(sessions.id, sessionId));
    } else {
      // 只更新 updatedAt
      await db.update(sessions)
        .set({ updatedAt: new Date() })
        .where(eq(sessions.id, sessionId));
    }
  }
  
  // 如果有生成的图标，保存图标
  if (generatedIcons && generatedIcons.length > 0) {
    for (const icon of generatedIcons) {
      await db.insert(icons).values({
        sessionId,
        messageId: savedMessage.id,
        name: icon.name || '未命名图标',
        prompt: icon.prompt || message.content,
        svgContent: icon.svg,
        style: icon.style || 'modern',
      } as typeof icons.$inferInsert);
    }
  }
  
  return NextResponse.json({ message: savedMessage, newTitle });
}
