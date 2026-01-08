import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

interface DbUserRow {
  id: number;
  email: string;
}

interface ProgressBody {
  historyId: number;
  stepId: number;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const session = await getServerSession();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json({ error: "Non connecté" }, { status: 401 });
    }

    const body = (await request.json()) as ProgressBody;
    const { historyId, stepId } = body;

    if (!historyId || !stepId) {
      return NextResponse.json(
        { error: "historyId et stepId sont requis" },
        { status: 400 }
      );
    }

    const [usersRows] = await db.query(
      "SELECT id, email FROM users WHERE email = ?",
      [userEmail]
    );
    const users = usersRows as DbUserRow[];

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 404 }
      );
    }

    const userId = users[0].id;

    await db.query(
      `INSERT INTO progress (users_id, histories_id, steps_id) 
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE steps_id = ?`,
      [userId, historyId, stepId, stepId]
    );

    return NextResponse.json({
      message: "Progression enregistrée",
      success: true,
    });
  } catch (error) {
    console.error("Erreur MySQL:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
