import { db } from "@/src/lib/db";
import CategorieModel from "@/src/model/CategorieModel";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { categoryId } = await params;

    const [rows] = await db.query(
      "SELECT id, categorie, description FROM categories WHERE id = ?",
      [categoryId]
    );

    const categories = rows as CategorieModel[];

    if (categories.length === 0) {
      return NextResponse.json(
        { error: "Catégorie non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(categories[0]);
  } catch (error) {
    console.error("Erreur MySQL:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
