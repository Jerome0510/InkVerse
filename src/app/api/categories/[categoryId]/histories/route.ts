import { db } from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { categoryId } = await params;

    const [rows] = await db.query(
      `
      SELECT id, title, description, background, categories_id, first_step_id
      FROM histories
      WHERE categories_id = ?
      `,
      [categoryId]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur MySQL:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
