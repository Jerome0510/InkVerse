"use client";

import { useState } from "react";
import HistoriesModel from "../model/HistoriesModel";
import CategorieModel from "../model/CategorieModel";
import Link from "next/link";
import styles from "./CategoryCard.module.css";

interface CategoryCardProps {
  category: CategorieModel;
  histories: HistoriesModel[];
}

const CategoryCard = ({ category, histories }: CategoryCardProps) => {
  const [selectedHistory, setSelectedHistory] = useState<number | null>(null);

  return (
    <section>
      <div className={styles.categoryTitle}>
        <h2 className={styles.titleOfCategory}>{category.categorie}</h2>
      </div>
      <div className={styles.historiesCard}>
        {histories.map((history) => (
          <div key={history.id} className={styles.historyCard}>
            <Link href={`/histories/${history.id}`}>
              <h2>{history.title}</h2>
              <p>{history.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCard;
