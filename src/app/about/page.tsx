import Header from "@/components/Header";
import styles from "./About.module.css";

const About = () => {
  return (
    <>
      <Header />
      <section className={styles.aboutBody}>
        <section className={styles.aboutMain}>
          <h2 className={styles.aboutTitle}>A propos de InkVerse</h2>
          <div>
            <p>
              InkVerse est né de deux passions qui m’animent profondément : le
              storytelling et le développement web.
              <br />
              Ce projet est mon premier projet solo, pensé comme un terrain
              d’expérimentation autant créatif que technique.
              <br />
              L’application propose des histoires interactives, où chaque choix
              influence le déroulement du récit et peut mener à des fins
              différentes. L’objectif est simple : replacer le lecteur au cœur
              de l’histoire et lui donner un véritable rôle dans la narration.
              <br />
              InkVerse explore plusieurs univers, chacun avec sa propre
              identité, ses ambiances et ses mécaniques de choix.
              <br />
              Une attention particulière a été portée à l’accessibilité et à la
              facilité de lecture, afin que l’expérience reste immersive, fluide
              et agréable pour tous les utilisateurs, quel que soit leur
              support.
              <br />
              InkVerse est un projet vivant, amené à évoluer au fil du temps,
              avec de nouvelles histoires, de nouveaux univers et des
              fonctionnalités enrichies. C’est une aventure en constante
              construction, guidée par l’envie de raconter des histoires
              autrement.
              <br />
              Si vous avez une suggestion, une idée ou simplement envie
              d’échanger ? N’hésitez pas à me contacter via les liens présents
              en bas de page.
            </p>
          </div>
        </section>
        <ul className={styles.profilButton}>
          <li>
            <a
              href="https://www.linkedin.com/in/jerome-marbach-a97707359/"
              target="blank"
            >
              <img
                className={styles.linkMe}
                src="/logos/LinkedIn.png"
                alt="Lien vers LinkedIn Jerome"
              />
            </a>
          </li>
        </ul>
      </section>
    </>
  );
};

export default About;
