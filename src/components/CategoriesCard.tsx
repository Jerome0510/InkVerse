import styles from "./CategoriesCard.module.css";

const CategoriesCard = () => {
  return (
    <>
      <h2 className={styles.categoriesTitle}>Choisis une categorie</h2>
      <div className={styles.categoriesContainer}></div>
    </>
  );
};

export default CategoriesCard;
