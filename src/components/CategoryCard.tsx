"use client";

import { useState } from "react";
import HistoriesModel from "../model/HistoriesModel";
import CategorieModel from "../model/CategorieModel";
import Link from "next/link";
import styles from "./CategoryCard.module.css";
import { appRoutes } from "../data/ROUTES";

interface CategoryCardProps {
  category: CategorieModel;
  histories: HistoriesModel[];
}

const CategoryCard = ({ category, histories }: CategoryCardProps) => {
  return (
    <section>
      <div className={styles.categoryTitle}>
        <h2 className={styles.titleOfCategory}>{category.categorie}</h2>
      </div>
      <div className={styles.historiesCard}>
        {histories.map((history) => (
          <div key={history.id} className={styles.historyCard}>
            <Link href={appRoutes.HISTORY(category.id, history.id)}>
              <div className={styles.historyText}>
                <h2>{history.title}</h2>
                <p>{history.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCard;
