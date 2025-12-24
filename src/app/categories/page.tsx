import routes from "@/src/data/ROUTES";
import CategorieModel from "@/src/model/CategorieModel";
import CategoriesClient from "@/src/components/CategoriesClient";
import styles from "./Categories.module.css";

const Categorie = async () => {
  try {
    const apiResult = await fetch(routes.apiRoutes.CATEGORIES, {
      cache: "no-store",
    });

    if (!apiResult.ok) {
      throw new Error(`Failed to fetch categories: ${apiResult.status}`);
    }

    const categories: CategorieModel[] = await apiResult.json();

    return (
      <section className={styles.categoriesContainer}>
        <CategoriesClient categories={categories} />
      </section>
    );
  } catch (error) {
    console.error("Erreur:", error);
    return (
      <div>
        <h1>Erreur</h1>
        <p>Erreur lors du chargement des catégories</p>
      </div>
    );
  }
};

export default Categorie;
