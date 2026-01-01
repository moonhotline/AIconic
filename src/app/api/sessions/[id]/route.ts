import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sessions, messages, icons } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

// 获取单个会话详情（包含消息和图标）
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const [session] = await db.select()
    .from(sessions)
    .where(eq(sessions.id, id));
  
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }
  
  const sessionMessages = await db.select()
    .from(messages)
    .where(eq(messages.sessionId, id))
    .orderBy(asc(messages.createdAt));
  
  const sessionIcons = await db.select()
    .from(icons)
    .where(eq(icons.sessionId, id))
    .orderBy(asc(icons.createdAt));
  
  return NextResponse.json({
    session,
    messages: sessionMessages,
    icons: sessionIcons,
  });
}

// 删除会话
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  await db.delete(sessions).where(eq(sessions.id, id));
  
  return NextResponse.json({ success: true });
}
