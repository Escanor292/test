/**
 * PATCH /api/chat/conversations/[conversationId]/messages/[messageId]/reaction
 * Toggle an emoji reaction on a message
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { toggleMessageReaction } from '@/services/pg/chat.service';

export async function PATCH(
  request: NextRequest,
  context: {
    params: Promise<{ conversationId: string; messageId: string }>;
  }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;
    const { conversationId, messageId } = await context.params;

    const conv = await prisma.conversations.findFirst({
      where: { id: conversationId, participantIds: { has: userId } },
    });
    if (!conv) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    const body = await request.json();
    const emoji = body?.emoji;
    if (!emoji || typeof emoji !== 'string' || !emoji.trim()) {
      return NextResponse.json({ error: 'Emoji is required' }, { status: 400 });
    }

    const message = await prisma.messages.findFirst({
      where: { id: messageId, conversationId, isDeleted: false },
    });
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    const reactions = await toggleMessageReaction(messageId, userId, emoji.trim());
    return NextResponse.json({ reactions });
  } catch (error: any) {
    console.error('[API] Toggle reaction error:', error);
    if (error.message === 'Message not found') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    if (error.message === 'Conversation not found') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || 'Failed to toggle reaction' },
      { status: 500 }
    );
  }
}
