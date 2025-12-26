import routes from "@/src/data/ROUTES";
import HistoriesModel from "@/src/model/HistoriesModel";
import styles from "./category.module.css";

const Category = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;
  try {
    const apiResult = await fetch(
      routes.apiRoutes.CATEGORY_HISTORIES(categoryId),
      { cache: "no-store" }
    );

    if (!apiResult.ok) {
      throw new Error(`Failed to fetch histories: ${apiResult.status}`);
    }

    const histories: HistoriesModel[] = await apiResult.json();

    return (
      <section className={styles.categoryContainer}>
        <h2>ici composant CategoryCards</h2>
      </section>
    );
  } catch (error) {
    console.error("Erreur:", error);
    return (
      <div>
        <h1>Erreur</h1>
        <p>Erreur lors du chargement des histoires</p>
      </div>
    );
  }
};

export default Category;
