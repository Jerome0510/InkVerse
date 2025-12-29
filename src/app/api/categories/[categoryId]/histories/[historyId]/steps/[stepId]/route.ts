import { db } from "@/src/lib/db";
import StepModel from "@/src/model/StepModel";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ stepId: string }> }
) {
  try {
    const { stepId } = await params;

    const [rows] = await db.query(
      `SELECT id, text, histories_id, background FROM steps WHERE id = ?`,
      [stepId]
    );

    const step = rows as StepModel[];

    if (step.length === 0) {
      return NextResponse.json({ error: "Etape non trouvée" }, { status: 404 });
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
