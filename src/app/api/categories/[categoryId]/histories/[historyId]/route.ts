import { db } from "@/src/lib/db";
import HistoriesModel from "@/src/model/HistoriesModel";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ historyId: string }> }
) {
  try {
    const { historyId } = await params;

    const [rows] = await db.query(
      `SELECT id, title, description, background, categories_id, first_step_id FROM histories WHERE id = ?`,
      [historyId]
    );

    const history = rows as HistoriesModel[];

    if (history.length === 0) {
      return NextResponse.json(
        { error: "Histoire non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur MySQL:", error);
    return NextResponse.json(
      { error: "internal Server Error" },
      { status: 500 }
    );
  }
}
