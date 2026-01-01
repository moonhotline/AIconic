import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sessions } from '@/db/schema';
import { desc } from 'drizzle-orm';

// 获取所有会话列表
export async function GET() {
  try {
    const allSessions = await db.select()
      .from(sessions)
      .orderBy(desc(sessions.updatedAt))
      .limit(50);
    
    return NextResponse.json({ sessions: allSessions });
  } catch (error) {
    console.error('Failed to get sessions:', error);
    return NextResponse.json({ sessions: [], error: 'Database error' }, { status: 200 });
  }
}

// 创建新会话
export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();
    
    const [session] = await db.insert(sessions)
      .values({ title: title || '新会话' })
      .returning();
    
    return NextResponse.json({ session });
  } catch (error) {
    console.error('Failed to create session:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
