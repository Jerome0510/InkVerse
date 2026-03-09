export const runtime = "nodejs";

import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/db";

interface UserRows extends RowDataPacket {
  id: number;
}

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const [rows] = await db.query<UserRows[]>(
      "SELECT id FROM users WHERE email = ?",
      [session.user.email],
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 404 },
      );
    }

    const userId = rows[0].id;

    await db.query("DELETE FROM progress WHERE users_id = ?", [userId]);

    await db.query("DELETE FROM users WHERE id = ?", [userId]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("SQL ERROR:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
