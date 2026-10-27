import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { startConversation } from "@/services/pg/chat.service";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const currentUser = await prisma.users.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { participantId } = await req.json();

    if (!participantId) {
      return NextResponse.json(
        { error: "participantId is required" },
        { status: 400 }
      );
    }

    if (currentUser.id === participantId) {
      return NextResponse.json(
        { error: "Không thể nhắn tin với chính mình" },
        { status: 400 }
      );
    }

    const targetUser = await prisma.users.findUnique({
      where: { id: participantId },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "Target user not found" },
        { status: 404 }
      );
    }

    const result = await startConversation(currentUser.id, participantId);

    return NextResponse.json({
      ...result.conversation,
      isNew: result.isNew,
    });
  } catch (error: any) {
    console.error("[POST /api/chat/conversations/find-or-create]", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
