"use client";
import { useEffect, useState } from "react";
import styles from "./CategoriesCard.module.css";
import routes from "../data/ROUTES";
import CategorieModel from "../model/CategorieModel";

const CategoriesCard = () => {
  const [categories, setCategories] = useState<CategorieModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(routes.apiRoutes.CATEGORIES);
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement des catégories", err);
        setError("Erreur lors du chargement des catégories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return <div>Chargement des categories ...</div>;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <>
      <h2 className={styles.categoriesTitle}>Categories</h2>
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            <h3>{category.categorie}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoriesCard;
