import routes from "@/src/data/ROUTES";
import HistoriesModel from "@/src/model/HistoriesModel";
import CategorieModel from "@/src/model/CategorieModel";
import styles from "./category.module.css";
import CategoryCard from "@/src/components/CategoryCard";

const Category = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  try {
    const [categoryRes, historiesRes] = await Promise.all([
      fetch(routes.apiRoutes.CATEGORY(categoryId), { cache: "no-store" }),
      fetch(routes.apiRoutes.CATEGORY_HISTORIES(categoryId), {
        cache: "no-store",
      }),
    ]);

    if (!categoryRes.ok || !historiesRes.ok) {
      throw new Error("Erreur lors du fetch");
    }

    const category: CategorieModel = await categoryRes.json();
    const histories: HistoriesModel[] = await historiesRes.json();

    return (
      <section className={styles.forBackground}>
        <img src={category.background} alt={category.categorie} />
        <div className={styles.categorycontainer}>
          <CategoryCard category={category} histories={histories} />
        </div>
      </section>
    );
  } catch (error) {
    console.error("Erreur:", error);
    return (
      <div>
        <h1>Erreur</h1>
        <p>Erreur lors du chargement de la catégorie</p>
      </div>
    );
  }
};

export default Category;
