import { apiRoutes } from "@/src/data/ROUTES";
import CategorieModel from "@/src/model/CategorieModel";
import CategoriesCards from "@/src/components/CategoriesCards";
import styles from "./Categories.module.css";

const Categories = async () => {
  try {
    const apiResult = await fetch(apiRoutes.CATEGORIES, {
      cache: "no-store",
    });

    if (!apiResult.ok) {
      throw new Error(`Failed to fetch categories: ${apiResult.status}`);
    }

    const categories: CategorieModel[] = await apiResult.json();

    return (
      <section className={styles.categoriesContainer}>
        <CategoriesCards categories={categories} />
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

export default Categories;
