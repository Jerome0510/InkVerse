import CategoriesCard from "@/src/components/CategoriesCard";
import styles from "./Categories.module.css";

const Categories = () => {
  return (
    <>
      <div className={styles.containCategories}>
        <CategoriesCard />
      </div>
    </>
  );
};

export default Categories;
