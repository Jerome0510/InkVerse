"use client";

import { useState } from "react";
import CategorieModel from "@/src/model/CategorieModel";
import styles from "./CategoriesClient.module.css";

interface CategoriesClientProps {
  categories: CategorieModel[];
}

const CategoriesClient = ({ categories }: CategoriesClientProps) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <div>
      <h1 className={styles.title}>Choisis une catégorie</h1>
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${styles.categoryCard} ${
              selectedCategory === category.id ? styles.selected : ""
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className={styles.categoriesCard}>
              <h2>{category.categorie}</h2>
              <p>{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesClient;
