import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import ProgressModel from "@/model/ProgressModel";

interface UserRow {
  id: number;
  email: string;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ historyId: string }> }
) {
  try {
    const session = await getServerSession();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json({ error: "Non connecté" }, { status: 401 });
    }

    const { historyId } = await params;

    const [usersRows] = await db.query(
      "SELECT id, email FROM users WHERE email = ?",
      [userEmail]
    );
    const users = usersRows as UserRow[];

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 404 }
      );
    }

    const userId = users[0].id;

    const [progressRows] = await db.query(
      `SELECT id, histories_id, steps_id, users_id
       FROM progress
       WHERE users_id = ? AND histories_id = ?`,
      [userId, historyId]
    );
    const progress = progressRows as ProgressModel[];

    if (progress.length === 0) return NextResponse.json(null);

    return NextResponse.json(progress[0]);
  } catch (error) {
    console.error("Erreur MySQL:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
