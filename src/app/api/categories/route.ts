import { db } from "@/lib/db";
import CategorieModel from "@/model/CategorieModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, categorie, description FROM categories"
    );
    return NextResponse.json(rows as CategorieModel[]);
  } catch (error) {
    console.error("erreur MySql : ", error);
    return NextResponse.json(
      { error: " Internal Server Error" },
      { status: 500 }
    );
  }
}
