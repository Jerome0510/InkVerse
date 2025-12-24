import { NextResponse } from "next/server";

const Get = (
  request: Request,
  { params }: { params: { categoryId: string } }
) => {
  return NextResponse.json({
    id: params.categoryId,
    name: "Catégorie détaillée",
  });
};

export default Get;
