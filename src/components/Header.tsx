import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.headerForHome}>
      <Link href="/">
        <img className={styles.homeLogo} src="" alt="Aller vers l'accueil" />
        <p>Accueil</p>
      </Link>
    </header>
  );
};

export default Header;
