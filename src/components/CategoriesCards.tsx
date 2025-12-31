"use client";

import { useState } from "react";
import CategorieModel from "@/model/CategorieModel";
import styles from "./CategoriesCards.module.css";
import Link from "next/link";

interface CategoriesCardsProps {
  categories: CategorieModel[];
}

const CategoriesCards = ({ categories }: CategoriesCardsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <div>
      <h2 className={styles.title}>Choisis une catégorie</h2>
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoriesCard}>
            <Link
              href={`/categories/${category.id}`}
              className={`${styles.categoryCard} ${
                selectedCategory === category.id ? styles.selected : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className={styles.categoriesText}>
                <h2>{category.categorie}</h2>
                <p>{category.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesCards;
