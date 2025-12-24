import CategorieModel from "@/src/model/CategorieModel";

type Props = { params: { categoryId: string } };

const CategoryPage = ({ params }: Props) => {
  return <h1>Categorie {params.categoryId}</h1>;
};

export default CategoryPage;
