import "dotenv/config";
import mysql from "mysql2/promise";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

const seed = async () => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      database: MYSQL_DB_NAME,
      multipleStatements: true,
    });

    await connection.query(`
            SET FOREIGN_KEY_CHECKS = 0;
            TRUNCATE TABLE users;
            TRUNCATE TABLE categories;
            TRUNCATE TABLE histories;
            TRUNCATE TABLE choices;
            TRUNCATE TABLE steps;
            TRUNCATE TABLE progress;
            SET FOREIGN_KEY_CHECKS = 1;`);

    await connection.execute(
      `INSERT INTO categories (id, categorie, description, background) VALUES (?, ?, ?, ?)`,
      [
        1,
        "Heroic fantasy",
        "Vivez des aventures épiques au cœur de mondes imaginaires médiévaux et fantastiques.",
        "/backgrounds/HeroicFantasy.png",
      ]
    );
    await connection.execute(
      `INSERT INTO categories (id, categorie, description, background) VALUES (?, ?, ?, ?)`,
      [
        2,
        "Polar",
        "Menez l'enquête au cœur d'intrigues sombres et mystérieuses où le crime côtoie le suspense.",
        "/backgrounds/Polar.png",
      ]
    );

    const histories = [
      [
        1,
        "Les Cendres d'Yrnwald",
        "Une aventure sombre dans un monde dévasté par la Peste Rouge, où tu incarnes un Porte-Marque sans mémoire qui doit refermer la Brèche originelle pour sauver ce qui reste du monde.",
        "/backgrounds/LesCendres.png",
        1,
        1,
      ],
      [
        2,
        "Les Lueurs du Froid",
        "Virek, mégalopole verticale, rongée par les pluies acides et les néons publicitaires.Toi, Elian, 23 ans, tout juste diplômé de l’Académie Fédérale d’Enquête. Première affectation. Tu n’as même pas eu le temps de poser ton sac qu’un appel d’urgence te propulse dans une ruelle du secteur Delta-9.",
        "/backgrounds/LesLueurs.png",
        2,
        24,
      ],
    ];
    for (const history of histories) {
      await connection.execute(
        `INSERT INTO histories (id, title, description, background, categories_id, first_step_id) VALUES (?, ?, ?, ?, ?, ?)`,
        history
      );
    }

    const steps = [
      [
        1,
        `<p>&nbsp;&nbsp;&nbsp;Tu ouvres les yeux, étendu sur un sol froid et dur.<br />
La pierre est fendue, rongée par la cendre et l’humidité.<br />
Autour de toi, des ruines noyées dans une brume cramoisie.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;L’air empeste la chair calcinée et la pluie morte.<br />
Chaque inspiration brûle ta gorge.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le ciel est figé.<br />
Crevé d’un œil rouge immense qui ne cligne jamais.<br />
Il te fixe.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu cherches un souvenir.<br />
Un nom.<br />
Il n’y a rien.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Seulement cette certitude oppressante :<br />
tu n’aurais pas dû te réveiller.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu te redresses avec peine.<br />
Tes membres sont lourds, engourdis, oubliés par le temps.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ta gorge est sèche, brûlante.<br />
Comme si tu avais hurlé dans le vide pendant des siècles.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ton regard tombe sur ta main droite.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Une marque noire y est gravée.<br />
Un œil fermé, cerclé de crocs, brûlé jusque dans la chair.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Elle pulse lentement.<br />
Chaude.<br />
Vivante.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Au rythme d’un cœur qui n’est peut-être pas le tien.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un craquement sec résonne derrière toi.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu te retournes d’instinct.<br />
Une silhouette approche dans la brume.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Une vieille femme, drapée d’un manteau de suie.<br />
Son visage est dissimulé derrière un bandeau de cuir clouté.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Tu n’as pas de nom », dit-elle d’une voix rauque.<br />
« Mais la Marque, elle, t’a déjà choisi. »</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        2,
        `<p>&nbsp;&nbsp;&nbsp;Elle te guide à travers les ruines effondrées.<br />
Ses pas sont sûrs, comme si le sol lui obéissait encore.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Vous descendez dans les profondeurs d’un sanctuaire brisé.<br />
Un ancien Temple des Veilleurs.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Les murs sont couverts de symboles profanés.<br />
Des prières gravées, puis arrachées.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Au centre, un feu noir brûle.<br />
Sans chaleur.<br />
Sans lumière.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La femme se tient face à toi.<br />
« Morgha », dit-elle enfin.<br />
« La Céciteuse. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Elle te tend une coupe d’eau trouble.<br />
Chargée de cendre.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le liquide te brûle la gorge, puis te ranime.<br />
Juste assez pour tenir debout.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Le monde s’éteint, Porte-Marque », murmure-t-elle.<br />
« La Couronne d’Épine a ouvert les Brèches. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Par elles s’infiltrent la Peste Rouge…<br />
et ceux qu’elle engendre. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Son regard se pose sur ta main marquée.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Tu viens d’un monde d’avant.<br />
Ou d’un futur déjà effacé. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Elle secoue la tête.<br />
« Peu importe. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« La Marque te permet de refermer la Brèche originelle. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Morgha sort une dague sombre.<br />
Runes mortes gravées sur l’acier.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Mais avant d’agir…<br />
tu dois choisir ce que tu es, ou ce que tu veux devenir ! »</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        3,
        `<p>&nbsp;&nbsp;&nbsp;Tu refermes les doigts sur la dague.<br />
Le métal est glacé, presque douloureux.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Quelque chose répond en toi.<br />
Un écho ancien.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Des fragments surgissent.<br />
Souvenirs possibles d'une vies qui auraient pu être les tiennes.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu ignores ce que tu étais.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Mais quelque chose cherche à remonter.<br />
Enfoui sous la peur et l’oubli.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Morgha ne te quitte pas des yeux.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Certains fils du destin sont rompus », dit-elle.<br />
« D’autres simplement noués trop serrés. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« La Marque n’est pas qu’un fardeau.<br />
Elle est aussi une clef. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Elle glisse un petit objet dans ta main libre.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Sans réfléchir, tu le ranges contre toi.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Il pulse doucement.<br />
Comme s’il t’avait attendu.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un talisman…<br />
ou un dernier mensonge.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Yrnwald est déjà perdu », murmure Morgha.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Mais la Brèche peut encore être scellée. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Mais pas aujourd’hui. »</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        4,
        `<p>&nbsp;&nbsp;&nbsp;Dehors, le vent a tourné.<br />
L’aube ne vient plus.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Yrnwald a oublié la lumière du jour.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;L’air sent le fer et la cendre.<br />
Des bourrasques soulèvent des poussières rouges.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Elles virevoltent comme des lucioles mourantes.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ici, la lumière ne vient plus du ciel.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Elle émane des Brèches.<br />
Plaies béantes dans la chair du monde.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;À chaque pulsation, un peu plus de réalité se délite.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ta main marquée se contracte.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La douleur est brève.<br />
Puis la vision s’impose.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Une carte se grave dans ton esprit.<br />
Brûlée dans ta mémoire.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Trois routes apparaissent.<br />
Nettes.<br />
Irréfutables.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;_ À l’ouest, Ashtorath.<br />
Champ de bataille figé dans la mort.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;_ Au sud-est, la Forêt de Gräven.<br />
Un bois qui observe et murmure.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;_ Au nord-est, les Temples en ruine.<br />
Foyers d’une foi dévorée par le Néant.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Marque palpite.<br />
Le choix t’appartient.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        5,
        `<p>&nbsp;&nbsp;&nbsp;Les arbres de Gräven se referment sur toi.<br />
Leurs troncs sont longs, tordus, semblables à des os dressés vers le ciel.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le silence est pesant.<br />
Même tes pas semblent retenus par la forêt.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Les feuilles ne tombent jamais.<br />
Elles restent accrochées, sèches, rigides.<br />
Elles observent.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Par instants, ton reflet apparaît dans l’écorce.<br />
Il marche à contre-sens.<br />
Il te regarde.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Une lueur perce soudain la brume.<br />
Un feu rougeâtre.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un campement sommaire entoure un autel de crânes et de branches nouées.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Une silhouette est accroupie près des flammes.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Porte-Marque, hm ? » dit une voix sèche.<br />
« Tu sens encore le sang chaud. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;L’homme ne lève pas les yeux.<br />
Un masque de bois et d’os dissimule son visage.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Je vends des souvenirs.<br />
Des malédictions.<br />
Et parfois, des choses utiles. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Il dispose lentement plusieurs objets devant toi.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Une fiole de mémoire.<br />
Une lame d’obsidienne.<br />
Un crochet pulsant.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;L’un d’eux te semble familier.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Tu peux en prendre un », murmure-t-il.<br />
« Mais je prendrai aussi quelque chose. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le feu vacille.<br />
Puis le campement disparaît.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        6,
        `<p>&nbsp;&nbsp;&nbsp;Tu quittes Gräven par un ancien sentier de pierre.<br />
La mousse y dévore des symboles oubliés.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Derrière toi, la forêt se referme lentement.<br />
Elle n’aime pas laisser partir ce qu’elle a vu.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La brume se mêle à la cendre.<br />
Le vent charrie des voix sans mots.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ton objet pulse contre toi.<br />
La Marque répond.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu marches longtemps.<br />
Trop longtemps.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Au loin, une silhouette se dresse sur la plaine morte.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Une tour solitaire.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Tour du Voile.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Autrefois, un phare contre l’obscurité.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Aujourd’hui, elle penche sous son propre poids.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Éventrée à mi-hauteur.<br />
Fissurée jusqu’à la base.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Pourtant, elle tient encore.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le crépuscule s’installe.<br />
Ici, il ne finit jamais.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu atteins la tour. Le seuil est ouvert.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu entres.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        7,
        `<p>&nbsp;&nbsp;&nbsp;Lorsque tu franchis le seuil, la lumière s’éteint d’elle-même.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Les murs sont couverts de runes effacées.<br />
Trop anciennes… ou trop vraies.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un grincement résonne dans la tour.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Quelqu’un vit encore ici.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un vieil homme émerge de l’ombre.<br />
Un bandeau épais recouvre ses yeux aveugles.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Porte-Marque », murmure-t-il.<br />
« Tu es attendu. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Il parle par fragments.<br />
Comme si les mots complets étaient dangereux.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« La Brèche originelle ne peut être atteinte ainsi. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Tu devras éveiller l’un des Trois Dormeurs. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;_ La Reine Écorchée.<br />
<br />
<p>&nbsp;&nbsp;&nbsp;_ Le Veilleur Aveugle.<br />
<br />
<p>&nbsp;&nbsp;&nbsp;_ La Mère Cendre.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Il cloue des cartes brûlées au mur.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Aucun réveil ne sera sans prix. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Il dépose un fragment d’os poli dans ta main.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Une clef.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Pour un souvenir », murmure-t-il.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        8,
        `<p>&nbsp;&nbsp;&nbsp;La Brèche s’agite soudain.<br />
Comme si elle avait senti ton passage.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Les murs tremblent.<br />
La tour gémit.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu fuis.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un ancien pont de pierre surgit devant toi.<br />
Suspendu au-dessus d’un gouffre sans fond.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Derrière toi, la Brèche hurle.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Des filaments d’ombre rampent.<br />
Ils cherchent ta chaleur.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu cours. Chaque pas résonne comme un glas.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ton objet brûle contre toi.<br />
La Marque pulse.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu comprends alors :</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu n’es pas seulement poursuivi.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu es reconnu.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Au-delà du pont, un territoire intact t’appelle.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Espoir… ou damnation. La Brèche ne renonce pas.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Et toi non plus.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        9,
        `<p>&nbsp;&nbsp;&nbsp;Au-delà du pont, la terre change.</p>
<br />
<p>La cendre se fait poussière. Le ciel, moins lourd.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Des murs apparaissent.<br />
Debout.<br />
Intacts.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu viens d' arriver à Ashtorath.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Une cité vivante.<br />
Ou quelque chose qui y ressemble.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Des torches brûlent sans fumer.<br />
Des portes grincent, mais tiennent.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Des voix résonnent.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Pas des murmures.<br />
De vraies voix.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Des silhouettes te regardent passer.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Aucun cri.<br />
Aucune fuite.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Certains s’inclinent.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;D’autres détournent les yeux.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tous ont vu la Marque.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ashtorath te reconnaît.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Mais pas encore comme un sauve

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        10,
        `<p>&nbsp;&nbsp;&nbsp;Les rues sont propres.<br />
Trop propres.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Aucune ruine récente.<br />
Aucune trace de panique.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Les habitants sourient.<br />
Toujours un peu trop tard.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Leurs regards glissent sur toi.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ils parlent d’abondance.<br />
De paix.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;De protection.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un mot revient sans cesse :</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le Voile.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Il protège Ashtorath de la Brèche.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Il filtre le monde.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Marque te brûle légèrement.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Comme si elle doutait.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un enfant te fixe longuement.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Tu ne devrais pas être ici », murmure-t-il.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Puis il s’enfuit.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        11,
        `<p>&nbsp;&nbsp;&nbsp;On te mène au cœur de la cité.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Une salle circulaire.<br />
Des vitraux sans lumière.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le Conseil t’attend.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Sept figures voilées.<br />
Immobiles.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Porte-Marque », disent-elles d’une seule voix.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Tu es une anomalie. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ils parlent de stabilité.<br />
D’équilibre maintenu.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Brèche est contenue, ici.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Grâce au Voile.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Ta présence l’affaiblit. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Marque pulse.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Mais elle pourrait aussi le renforcer. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un choix sans mots est posé.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Rester.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ou comprendre.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        12,
        `<p>&nbsp;&nbsp;&nbsp;La nuit tombe sur Ashtorath.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Les lanternes s’allument d’elles-mêmes.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu marches seul.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ton reflet se déforme dans les vitres.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Par moments, la cité cligne.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un mur se fissure.<br />
Puis redevient intact.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un cri étouffé résonne.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Personne ne réagit.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Sous une arche, tu vois l’envers.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Des corps figés.<br />
Des visages endormis.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Maintenus.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le Voile ne protège pas.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Il suspend.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Marque devient glacée.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Quelque chose va céder.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        13,
        `<p>&nbsp;&nbsp;&nbsp;Tu t’effondres sur les dalles.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Des mains te retiennent.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le Conseil est là.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Tu as vu ce qui ne devait pas être vu. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ils ne nient rien.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ils justifient.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Ashtorath vit grâce au Voile. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Grâce à la Couronne. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Grâce à ceux qui dorment. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Marque hurle.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Tu peux partir », disent-ils.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Ou rester et devenir un pilier. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un pilier vivant.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Cloué.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Comme les autres.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        14,
        `<p>&nbsp;&nbsp;&nbsp;Le ciel se déchire au-dessus de toi.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ashtorath disparaît.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Brèche s’ouvre, béante.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Suspendue dans le gouffre, elle apparaît.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Couronne d’Épine.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Immense.<br />
Silencieuse.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Elle tourne lentement.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Chaque épine est un monde brisé.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Chaque battement dévore un souvenir.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu comprends.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le Voile est tissé de sacrifices.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ashtorath est clouée au Néant.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Couronne te voit.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Elle attend ton choix.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Puis la vision se brise.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        15,
        `<p>&nbsp;&nbsp;&nbsp;La cité attend.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le Voile vibre autour de toi.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu sens sa fatigue.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Sa peur.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Couronne murmure encore.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Rester, c’est survivre.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Partir, c’est condamner.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ou libérer.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Marque se stabilise.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Elle n’impose rien.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Elle attend que tu sois entier.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un pas suffit.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Vers le cœur.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ou vers la sortie.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ashtorath retient son souffle.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        16,
        `<p>&nbsp;&nbsp;&nbsp;Le Voile se tend.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Quelque part, un Dormeur frissonne.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Brèche sourit.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ashtorath ne sera plus jamais intacte.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Quoi que tu aies choisi,</p>
<br />
<p>&nbsp;&nbsp;&nbsp;le monde vient de s’en souvenir.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Couronne d’Épine tourne plus vite.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Et ton nom,</p>
<br />
<p>&nbsp;&nbsp;&nbsp;que tu n’as pas encore,</p>
<br />
<p>&nbsp;&nbsp;&nbsp;commence à circuler.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Dans la cendre.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Dans les prières.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Et dans la peur.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le voyage ne fait que commencer.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Mais Ashtorath, elle, est fissurée.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        17,
        `<p>&nbsp;&nbsp;&nbsp;Devant toi, une série d’arches massives se dresse.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Les Temples d’Ashtorath.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Des pierres noires, gravées de runes anciennes, respirent.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le vent y danse, chantant des hymnes oubliés.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Chaque arche est gardée par une statue.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Des créatures figées, à moitié pierre, à moitié chair.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Leurs yeux, bien que clos, semblent te suivre.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Une odeur d’encens flotte encore.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Elle est sucrée, étrange, presque vivante.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un murmure t’invite.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Entre… si tu oses. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Marque vibre sur ton poignet.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Comme pour confirmer.<br />
Elle connaît le chemin.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu franchis la première arche.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;L’air change. Plus lourd, plus dense.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        18,
        `<p>&nbsp;&nbsp;&nbsp;À l’intérieur, la lumière est rare.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Des piliers soutiennent un plafond invisible.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Chaque pas résonne.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Des symboles circulaires s’allument sous tes pieds.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Comme si le sol te lisait.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un souffle glacé caresse ta nuque.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Une voix chuchote, venue de partout et de nulle part :</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Tu as vu la Couronne. Tu sais ce qu’elle exige. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Des statues pivotent lentement.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Elles te mesurent.<br />
Elles jugent.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Au centre, un piédestal supporte un objet scintillant.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Marque brûle plus fort.<br />
Elle t’encourage ou te prévient ?</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le Sanctuaire entier semble retenir son souffle.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le choix est là, palpable.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Chaque Temple détient un fragment de vérité.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        19,
        `<p>&nbsp;&nbsp;&nbsp;L’eau s’épaissit autour de toi.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Chaque mouvement devient effort.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le silence est absolu, pesant, écrasant.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Au cœur du sanctuaire englouti, une forme gigantesque sommeille.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Mère Cendre.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Son corps mêle pierre, racines et cendre noire.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Des veines d’obsidienne parcourent sa peau, pulsant comme un cœur invisible.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ton sang palpite en écho.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un lien ancien te rattache à elle.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Chaque geste que tu fais réveille des souvenirs oubliés.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu comprends : réveiller la Mère Cendre exigera un fragment de toi-même.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Et pourtant… tu avances.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;L’eau reflète la lumière rouge de la Brèche, pulsant à l’unisson de la Marque.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tout converge vers ce lieu, où le choix final s’impose.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ton souffle devient visible, suspendu dans le froid du sanctuaire.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        20,
        `<p>&nbsp;&nbsp;&nbsp;Enfin, la Brèche originelle s’ouvre devant toi.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Gigantesque, vivante, elle gronde comme un être conscient.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Les vents cendrés hurlent autour, porteurs de murmures oubliés.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ton double, les Dormeurs et la Mère Cendre convergent vers ce point unique.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Marque brûle avec une intensité douloureuse.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Elle réclame un choix final.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Sacrifice. Fusion. Ou refus.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Les hurlements de la Brèche te transpercent.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Elle t’offre une seule issue : comprendre… ou disparaître.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Chaque fragment de ton voyage converge ici.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le temps semble se plier autour de toi.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tes souvenirs, tes choix, ton essence sont mis à nu.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le souffle de la Brèche te caresse et t’avertit.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ici, un seul Porte-Marque peut décider.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tout ce que tu feras résonnera dans Yrnwald pour toujours.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        21,
        `<p>&nbsp;&nbsp;&nbsp;Le sol se fissure sous tes pieds.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Des filaments de lumière et d’ombre s’entrelacent.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Chaque respiration semble déchirer la réalité.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ton double s’avance et te tend la main.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Accepte-moi ou refuse… mais choisis vite », dit-il.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ses yeux reflètent ton âme, ton passé et ce que tu pourrais devenir.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Les Dormeurs hurlent depuis l’ombre, écho de leurs propres souffrances.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le choix est simple… et pourtant impossible :</p>
<br />
<p>&nbsp;&nbsp;&nbsp;- Fusionner avec la Marque et la Brèche.<br />
- Laisser la Brèche consumer tout.<br />
- Sacrifier une part de toi pour refermer définitivement le gouffre.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tout repose sur toi.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le monde d’Yrnwald retient son souffle.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le vent hurle les échos de toutes les vies que tu as croisées.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Marque palpite, amplifiant l’urgence de ta décision.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Chaque instant compte, chaque choix laisse sa trace.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        22,
        `<p>&nbsp;&nbsp;&nbsp;Tu inspires profondément.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Marque pulse, vibrant avec tout ce que tu as traversé.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Si tu choisis la fusion :</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ton corps devient un phare de lumière et d’ombre.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Les Dormeurs se calment, la Brèche stabilisée.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Une nouvelle ère commence… mais à quel prix ?</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Si tu choisis le sacrifice :</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Une part de toi disparaît.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Brèche se referme dans un hurlement silencieux.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Les Dormeurs s’éteignent un par un.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Yrnwald survit, mais ton nom est effacé de ses mémoires.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Si tu refuses :</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Brèche engloutit tout.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Les Dormeurs se libèrent.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le monde s’effondre… et tu deviens une légende tragique, oubliée mais connue.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        23,
        `<p>&nbsp;&nbsp;&nbsp;Le vent se calme.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La lumière revient, faible mais sincère.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Yrnwald respire à nouveau.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Les Dormeurs sont redevenus des ombres dormantes.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La Marque, selon ton choix, est purifiée, fusionnée ou dissipée.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Ton double sourit… ou disparaît.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le temps s’étire et se contracte, laissant place à la paix… ou à la mémoire d’un monde perdu.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Quel que soit le chemin, tu sais une chose :</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu as changé Yrnwald à jamais.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Et quelque part, la Brèche se souviendra de ton nom.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le silence retombe, solennel et définitif.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Le cycle est terminé… pour le moment.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Mais le monde, lui, continue de respirer sous ton influence.</p>

`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        24,
        `<p>&nbsp;&nbsp;&nbsp;La pluie te tombe dessus comme une sentence.<br />
Première nuit à Virek, et déjà elle ne t’épargne pas. Tu viens d’arriver. Pas eu le temps de poser tes affaires, pas eu le temps de comprendre la ville.<br />
À peine le badge activé, déjà appelé sur le terrain.</p>

<p>&nbsp;&nbsp;&nbsp;La ruelle est étroite. Trop étroite.<br />
Les murs suintent d’humidité et de secrets. L’air est lourd, chargé d’électricité.</p>

<p>&nbsp;&nbsp;&nbsp;À tes pieds, un corps.</p>

<p>&nbsp;&nbsp;&nbsp;Un homme allongé sur le dos, les yeux ouverts.<br />
Pas de sang. Pas d’arme. Pas même un cri enregistré.</p>

<p>&nbsp;&nbsp;&nbsp;Juste cette odeur d’ozone.<br />
Et cette marque circulaire, nette, brûlée à la tempe. Ce n’est pas un tir. Ce n’est pas une lame.</p>

<p>&nbsp;&nbsp;&nbsp;Autour de toi, la ville observe en silence.<br />
Des fenêtres s’entrouvrent puis se referment. Des drones passent, indifférents.</p>

<p>&nbsp;&nbsp;&nbsp;Tu n’as encore rien signalé à ton superviseur.<br />
Techniquement, tu devrais attendre l’équipe médico-légale. Mais tu viens d’arriver ici, et tu comprends déjà une chose :</p>

<p>&nbsp;&nbsp;&nbsp;À Virek, attendre, c’est laisser quelqu’un d’autre décider à ta place.</p>

<p>&nbsp;&nbsp;&nbsp;La pluie continue de tomber. Le corps, lui, ne dira plus rien.<br />
Tu es seul. Et pour l’instant, personne ne t’empêche de choisir.</p>

<p>&nbsp;&nbsp;&nbsp;Trois options s’offrent à toi.</p>

`,
        2,
        "/backgrounds/Lueur24.png",
      ],
      [
        25,
        `<p>&nbsp;&nbsp;&nbsp;Ton gant effleure la tempe, glisse vers la nuque.<br />
La peau est froide. Trop froide.</p>

<p>&nbsp;&nbsp;&nbsp;Un léger relief résiste sous tes doigts.<br />
Pas un os. Pas une blessure.</p>

<p>&nbsp;&nbsp;&nbsp;Quelque chose d’implanté. Mal dissimulé.</p>

<p>&nbsp;&nbsp;&nbsp;Tu sors ton scalpel de terrain.<br />
Officiellement, il est réservé aux prélèvements.<br />
Officieusement… il est là pour les vérités qu’on enterre.</p>

<p>&nbsp;&nbsp;&nbsp;La lame gratte doucement. La chair cède.<br />
Et tu le vois.</p>

<p>&nbsp;&nbsp;&nbsp;Un micro-module cristallin, parfaitement taillé.<br />
Logé là où aucun implant légal ne devrait se trouver.</p>

<p>&nbsp;&nbsp;&nbsp;Une technologie bannie depuis la réforme énergétique.</p>

<p>&nbsp;&nbsp;&nbsp;Tu filmes. Rapidement.<br />
Tu sécurises les données.</p>

<p>&nbsp;&nbsp;&nbsp;Un bip sec te fige.<br />
Ton visuel se brouille. Ton oreille bourdonne.</p>

<p>&nbsp;&nbsp;&nbsp;Une voix synthétique s’impose :</p>

<p>&nbsp;&nbsp;&nbsp;— « Agent. Accès restreint détecté. Veuillez rester sur place. »</p>

<p>&nbsp;&nbsp;&nbsp;Le ciel s’illumine d’un flash bleu.<br />
Un drone noir, sans marquage, s’immobilise au-dessus de toi.</p>

<p>&nbsp;&nbsp;&nbsp;Tu viens de franchir une limite invisible.</p>

`,
        2,
        "/backgrounds/LueurTrame.png",
      ],
      [
        26,
        `<p>&nbsp;&nbsp;&nbsp;Tu as désobéi.<br />
Et maintenant, la Ville le sait.</p>

<p>&nbsp;&nbsp;&nbsp;Le drone flotte au-dessus de toi, immobile.<br />
Son bourdonnement grave te traverse la poitrine.</p>

<p>&nbsp;&nbsp;&nbsp;Un faisceau balaie ton visage, ta rétine, ton identifiant neural.</p>

<p>&nbsp;&nbsp;&nbsp;Tu sens ton accès réseau s’effondrer, couche après couche.<br />
Tes canaux sécurisés se ferment.</p>

<p>&nbsp;&nbsp;&nbsp;Ton nom disparaît.</p>

<p>&nbsp;&nbsp;&nbsp;Une alerte rouge pulse dans ta visière :</p>

<p>&nbsp;&nbsp;&nbsp;PROTOCOLE DE SUSPENSION — ACTIF</p>

<p>&nbsp;&nbsp;&nbsp;Le quartier s’éteint.<br />
Plus de drones civils. Plus de voix. Même la pluie semble se figer.</p>

<p>&nbsp;&nbsp;&nbsp;Ce n’était pas un crime isolé.<br />
C’était une opération d’effacement.</p>

<p>&nbsp;&nbsp;&nbsp;Tu as vu l’implant.<br />
Un vestige d’un pouvoir que la Ville refuse de reconnaître.</p>

<p>&nbsp;&nbsp;&nbsp;Tu sais.</p>

<p>&nbsp;&nbsp;&nbsp;Et désormais, c’est toi qu’on va effacer.</p>

`,
        2,
        "/backgrounds/LueurTrame.png",
      ],
      [
        27,
        `<p>&nbsp;&nbsp;&nbsp;La pluie s’abat sans relâche.<br />
Mais quelque chose attire ton regard.</p>

<p>&nbsp;&nbsp;&nbsp;Au quatrième étage d’un immeuble décrépit, une lumière pâle vacille derrière des rideaux délavés.</p>

<p>&nbsp;&nbsp;&nbsp;Une silhouette apparaît.<br />
Puis plus rien.</p>

<p>&nbsp;&nbsp;&nbsp;Tu traverses la ruelle.<br />
Le hall pue l’humidité et la peur ancienne.</p>

<p>&nbsp;&nbsp;&nbsp;Des caméras factices pendent aux murs, mortes depuis des années.</p>

<p>&nbsp;&nbsp;&nbsp;Chaque marche gémit sous ton poids.<br />
Tes capteurs s’affolent : tu es observé.</p>

<p>&nbsp;&nbsp;&nbsp;Mais pas menacé.<br />
Pas encore.</p>

<p>&nbsp;&nbsp;&nbsp;Devant la porte : aucun nom.<br />
Un œilleton noir. Un cadenas électronique hors service.</p>

<p>&nbsp;&nbsp;&nbsp;Tu frappes.</p>

<p>&nbsp;&nbsp;&nbsp;Une voix rauque fuse de l’intérieur :</p>

<p>&nbsp;&nbsp;&nbsp;— « T’es pas du coin. Et t’étais pas censé voir ça. »</p>

<p>&nbsp;&nbsp;&nbsp;À Virek, regarder, c’est déjà trahir.</p>

`,
        2,
        "/backgrounds/LueurTrame.png",
      ],
      [
        28,
        `<p>&nbsp;&nbsp;&nbsp;Tu frappes encore.<br />
Cette fois, trois coups secs.</p>

<p>&nbsp;&nbsp;&nbsp;Ta main se pose sur la serrure.<br />
Elle cède dans un grincement métallique.</p>

<p>&nbsp;&nbsp;&nbsp;L’appartement est sombre.<br />
Saturé d’odeurs de nicotine, d’huile rance et de peur contenue.</p>

<p>&nbsp;&nbsp;&nbsp;Une femme t’observe depuis un fauteuil élimé.<br />
Cinquante ans, peut-être.</p>

<p>&nbsp;&nbsp;&nbsp;Les yeux rouges de fatigue ou de larmes.<br />
Son bras cybernétique date d’avant les interdictions.</p>

<p>&nbsp;&nbsp;&nbsp;Rafistolé avec du cuivre et du plastique alimentaire.</p>

<p>&nbsp;&nbsp;&nbsp;— « Il n’a pas crié, » murmure-t-elle.<br />
« Il s’est juste arrêté. Comme si on l’avait débranché. »</p>

<p>&nbsp;&nbsp;&nbsp;Elle te tend un petit cube translucide.<br />
Un bloc mémoire utilisé pour le cryptage illégal.</p>

<p>&nbsp;&nbsp;&nbsp;— « Il m’a dit de le donner à quelqu’un qui comprendrait. »</p>

<p>&nbsp;&nbsp;&nbsp;Elle détourne le regard.</p>

<p>&nbsp;&nbsp;&nbsp;— « Partez. Vous êtes déjà mort. »</p>

<p>&nbsp;&nbsp;&nbsp;Tu repars.<br />
Dehors, la pluie tombe plus fort.</p>

`,
        2,
        "/backgrounds/LueurTrame.png",
      ],
      [
        29,
        `<p>&nbsp;&nbsp;&nbsp;Le cube pulse dans ta main. Faiblement, comme un cœur artificiel.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;La ruelle est trop calme. Pas de drones. Pas de voix. Rien de normal.</p>
<p>Une cabine de cryptocommunication fonctionne encore. Tu t’y engouffres.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;L’écran s’illumine.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;— “Connexion établie. Nœud 114 débloqué.”</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu hésites. Combien sont morts pour que ces données arrivent jusqu’à toi ?</p>
<p>Tu insères le cube. Le transfert démarre.</p>
<p>Tu ignores qui reçoit le message. Tu ignores ce qu’il déclenchera.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Mais quelque chose vient de quitter la Ville.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Et rien ne pourra l’y faire revenir.</p>
`,
        2,
        "/backgrounds/Lueur29.png",
      ],
      [
        30,
        `<p>&nbsp;&nbsp;&nbsp;À l’abri d’un porche, tu actives un canal ancien. Un cryptage d’étudiant sale, lent, invisible.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;— “Linh. C’est Elian. J’ai un corps. Une marque étrange.”</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Un silence trop long.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;— “Tu sais que t’es en train de foutre ta carrière en l’air ?”</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Des lignes de code défilent sur ta visière.<br />
Tu voies apparaitre un message: flux drones piratés.</p>
<br />
<p>Pause.<br />
Zoom.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Une silhouette encapuchonnée. Puis un détail minuscule.</p>
Un badge gouvernemental.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;— “C’est une exécution propre,” souffle Linh.<br />
“Supprime tout. Oublie.”</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu fais une capture. Tu sais que ce n’est pas assez.</p>
<br />
<p>Mais ça pourra servir de preuve, plus tard.</p>
`,
        2,
        "/backgrounds/LueurTrame.png",
      ],
      [
        31,
        `<p>&nbsp;&nbsp;&nbsp;La ville t’a vu.</p>
<p>Chaque caméra, chaque écran, chaque drone<br />
peut désormais comparer ton visage à ce que tu sais.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Dans ton esprit, l’image est figée. Un badge, un assassin sans nom.</p>
<p>Un dernier message de Linh :</p>
<br />
<p>&nbsp;&nbsp;&nbsp;« Supprime tout. Tu peux encore t’en sortir. »</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu ne réponds pas. Tu observes ton reflet dans une vitre sale.<br />
Jeune. Fatigué. Hors-la-loi.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Tu pourrais fuir ou rester.</p>
<br />
<p>&nbsp;&nbsp;&nbsp;Et un jour, parler.</p>
`,
        2,
        "/backgrounds/Lueur31.png",
      ],
      [
        32,
        `<p>&nbsp;&nbsp;&nbsp;La pluie continue de tomber sur Virek, indifférente aux vérités qu’elle recouvre.<br />
Les drones reprennent leur ronde, les écrans se rallument, et la Ville fait ce qu’elle fait le mieux : oublier.</p>

<p>&nbsp;&nbsp;&nbsp;Officiellement, rien ne s’est passé.<br />
Un incident mineur. Un rapport classé. La machine avance.</p>

<p>&nbsp;&nbsp;&nbsp;Mais quelque part, une trace subsiste.<br />
Une image volée. Un fragment de mémoire. Un nom qui ne devait pas exister.</p>

<p>&nbsp;&nbsp;&nbsp;Tu as appris une chose essentielle :<br />
à Virek, la vérité ne disparaît jamais vraiment.<br />
Elle change de forme… et de porteur.</p>

<p>&nbsp;&nbsp;&nbsp;Tu aurais pu détourner le regard.<br />
Effacer. Oublier. Survivre.</p>

<p>&nbsp;&nbsp;&nbsp;Mais chaque choix laisse une empreinte,<br />
et certaines brûlent plus longtemps que le froid.</p>

<p>&nbsp;&nbsp;&nbsp;La Ville ne t’a pas encore pris.<br />
Pas encore.</p>

<p>&nbsp;&nbsp;&nbsp;Car tant qu’une lueur subsistera dans le froid,<br />
le système ne sera jamais totalement à l’abri.</p>

<p>&nbsp;&nbsp;&nbsp;Ce n’était qu’un avertissement.<br />
La première fissure.</p>
`,
        2,
        "/backgrounds/LueurFin.png",
      ],
    ];
    await connection.execute(`SET FOREIGN_KEY_CHECKS = 0;`);
    for (const step of steps) {
      await connection.execute(
        `INSERT INTO steps (id, text, histories_id, background) VALUES (?, ?, ?, ?)`,
        step
      );
    }
    await connection.execute(`SET FOREIGN_KEY_CHECKS = 1`);

    const choices = [
      [1, "Suivre la vieille femme à travers les ruines", 1, 2],
      [2, "Choisir La Lame Noire (guerrier)", 2, 3],
      [3, "Choisir L’Ombre Sifflante (rôdeur)", 2, 3],
      [4, "Choisir L’Appel du Sang (sorcier)", 2, 3],
      [5, "Prendre la Pierre de veillée", 3, 4],
      [6, "Prendre l’Anneau de murmures", 3, 4],
      [7, "Prendre la Poche d’ombres", 3, 4],
      [8, "Prendre la route vers les Peste-Ruines d’Ashtorath", 4, 15],
      [9, "Prendre la route vers la Forêt de Gräven", 4, 5],
      [10, "Prendre la route vers les Temples en ruine", 4, 17],
      [11, "Acheter la Fiole de mémoire", 5, 6],
      [12, "Acheter la Lame d’obsidienne", 5, 6],
      [13, "Acheter le Crochet de Brèche", 5, 6],
      [14, "Suivre la route vers la Tour du Voile", 6, 7],
      [15, "Utiliser un objet défensif pour bloquer l’ombre", 5, 9],
      [16, "Utiliser un artefact de voyage pour fuir instantanément", 8, 9],
      [17, "Invoquer une aide temporaire", 8, 9],
      [18, "Offrir ton sang à la Reine Écorchée", 9, 10],
      [19, "Offrir le sien", 9, 10],
      [20, "Accepter le fragment d’os et continuer vers la suite", 10, 11],
      [21, "Poursuivre vers la Couronne d’Épine", 11, 12],
      [22, "Suivre la femme pour récupérer le paquet", 12, 13],
      [23, "Refuser et continuer seul", 12, 13],
      [24, "Fuir et laisser ton autre franchir la Brèche", 13, 20],
      [25, "Combattre son double et prendre sa place", 13, 21],
      [26, "Fusionner avec son double", 13, 22],
      [27, "Prendre le passage secret vers la Tour du Voile", 13, 14],
      [28, "Approcher la Couronne d’Épine et descendre vers la Brèche", 14, 12],
      [29, "Accepter de donner ta mémoire au Spectre", 15, 16],
      [30, "Refuser et affronter les ombres", 15, 16],
      [31, "Suivre la lumière dans les souterrains", 16, 8],
      [32, "Rebrousser chemin", 16, 8],
      [33, "Prier auprès des fanatiques", 17, 18],
      [34, "Tenter de dérober un artefact", 17, 18],
      [35, "Purifier ta Marque à l’autel", 18, 8],
      [36, "Corrompre davantage ta Marque à l’autel", 18, 8],
      [37, "Reprendre la route vers la Tour du Voile", 16, 7],
      [38, "Quitter les Temples et rejoindre la Tour du Voile", 18, 7],
      [39, "Aller aux Ruines d’Ashtorath, réveiller la Reine Écorchée", 7, 15],
      [40, "Se rendre aux Temples pour éveiller le Veilleur Aveugle", 7, 17],
      [41, "Se rendre sous le Lac Noir pour éveiller la Mère Cendre", 7, 19],
      [42, "Éveiller la Mère Cendre en offrant un fragment de toi-même", 19, 8],
      [43, "Refuser de troubler son sommeil et fuir discrètement", 19, 8],
      [44, "Fin : Le Héros Oublié", 20, 23],
      [45, "Fin : Le Brisé", 21, 23],
      [46, "Fin : Le Souverain Gris", 22, 23],
      [47, "Revenir à l'accueil.", 23, 0],

      [48, "Explorer les environs à la recherche d’un témoin", 24, 27],
      [49, "Examiner le corps malgré le protocole", 24, 25],
      [50, "Continuer vers la suite", 25, 26],
      [51, "Appeler une ancienne camarade de promo dans la tech", 24, 30],
      [52, "Insister et frapper à la porte", 27, 28],
      [53, "Transmettre le bloc mémoire", 28, 29],
      [54, "Aller à la capture interdite", 30, 31],
      [55, "Ce que l’on ne doit pas voir", 26, 32],
      [56, "Le témoin silencieux", 29, 32],
      [57, "La capture interdite", 31, 32],
      [58, "Revenir à l'accueil.", 32, 0],
    ];
    await connection.execute(`SET FOREIGN_KEY_CHECKS =0`);
    for (const choice of choices) {
      await connection.execute(
        `INSERT INTO choices (id, text, steps_id, link_to_step_id) VALUES (?, ?, ?, ?)`,
        choice
      );
    }

    const progress = [
      [1, 1, 1],
      [1, 3, 2],
    ];
    for (const prog of progress) {
      await connection.execute(
        `INSERT INTO progress (histories_id, steps_id, users_id) VALUES (?, ?, ?)`,
        prog
      );
    }

    const users = [
      [1, "Porte marque", "Avatar_porteMarque.png", "porteMarque@yrnwald.com"],
      [
        2,
        "Elian",
        "Avatar_EllianJeuneRecrue.png",
        "EllianJeuneRecrue@Virek.com",
      ],
    ];
    for (const user of users) {
      await connection.execute(
        `INSERT INTO users (id, pseudo, avatar, email) VALUES (?, ?, ?, ?)`,
        user
      );
    }

    console.log("✅ Database schema created successfully");
  } catch (err) {
    console.error("❌ Error during seeding:", err);
  }
};

seed();
