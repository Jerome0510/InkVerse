import { db } from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { stepId: string } }
) {
  try {
    const { stepId } = await params;

    const [rows] = await db.query(
      `SELECT id, text, histories_id, background FROM steps WHERE id = ?`,
      [stepId]
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
