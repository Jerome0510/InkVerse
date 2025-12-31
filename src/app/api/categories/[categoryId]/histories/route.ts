import { db } from "@/lib/db";
import HistoriesModel from "@/model/HistoriesModel";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ categoryId: string }> }
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

    const histories = rows as HistoriesModel[];

    if (histories.length === 0) {
      return NextResponse.json(
        { error: "Histoires non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur MySQL:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
