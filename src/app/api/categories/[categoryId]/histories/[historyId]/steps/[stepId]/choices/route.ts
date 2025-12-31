import { db } from "@/lib/db";
import ChoiceModel from "@/model/ChoiceModel";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ stepId: string; choiceId: string }> }
) {
  try {
    const { stepId, choiceId } = await params;

    const [rows] = await db.query(
      `SELECT id, text, steps_id, link_to_step_id FROM choices WHERE steps_id = ?`,
      [stepId, choiceId]
    );

    const choices = rows as ChoiceModel[];

    if (choices.length === 0) {
      return NextResponse.json({ error: "Choix non trouvée" }, { status: 404 });
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
