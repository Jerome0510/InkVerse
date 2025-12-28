import { db } from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { historyId: string } }
) {
  try {
    const { historyId } = await params;

    const [rows] = await db.query(
      `SELECT id, title, description, background, categories_id, first_step_id FROM histories WHERE id = ?`,
      [historyId]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur MySQL:", error);
    return NextResponse.json(
      { error: "internal Server Error" },
      { status: 500 }
    );
  }
}
