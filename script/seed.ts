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
      `INSERT INTO categories (id, categorie, description) VALUES (?, ?, ?)`,
      [
        1,
        "Heroic fantasy",
        "Vivez des aventures épiques au cœur de mondes imaginaires médiévaux et fantastiques.",
      ]
    );
    await connection.execute(
      `INSERT INTO categories (id, categorie, description) VALUES (?, ?, ?)`,
      [
        2,
        "Polar",
        "Menez l'enquête au cœur d'intrigues sombres et mystérieuses où le crime côtoie le suspense.",
      ]
    );

    const histories = [
      [
        1,
        "Les Cendres d'Yrnwald",
        "Une aventure sombre dans un monde dévasté par la Peste Rouge, où tu incarnes un Porte-Marque sans mémoire qui doit refermer la Brèche originelle pour sauver ce qui reste du monde.",
        1,
        1,
      ],
      [
        2,
        "Les Lueurs du Froid",
        "Virek, mégalopole verticale, rongée par les pluies acides et les néons publicitaires.Toi, Elian, 23 ans, tout juste diplômé de l’Académie Fédérale d’Enquête. Première affectation. Tu n’as même pas eu le temps de poser ton sac qu’un appel d’urgence te propulse dans une ruelle du secteur Delta-9.",
        2,
        24,
      ],
    ];
    for (const history of histories) {
      await connection.execute(
        `INSERT INTO histories (id, title, description, categories_id, first_step_id) VALUES (?, ?, ?, ?, ?)`,
        history
      );
    }

    const steps = [
      [
        1,
        `<p>Tu ouvres les yeux, étendu sur un sol froid et dur.<br />
Autour de toi, des ruines noyées dans une brume cramoisie. L’air sent la chair calcinée et la cendre mouillée.<br />
Le ciel est figé, crevé d’un œil rouge qui ne cligne jamais.<br />
Tu n’as ni souvenir, ni nom. Seulement cette certitude oppressante : tu n’aurais pas dû te réveiller.</p>
<br />
<p>Tu te redresses avec peine. Tes membres sont engourdis, lourds, comme s’ils avaient oublié leur fonction.<br />
Ta gorge est sèche, brûlante, comme si tu avais hurlé dans le vide pendant des siècles.</p>
<br />
<p>Tu baisses les yeux sur ta main droite.<br />
Une marque noire y est gravée, brûlée jusque dans la chair : un œil fermé, cerclé de crocs.<br />
Elle pulse lentement, chaude, vivante… au rythme d’un cœur qui n’est peut-être pas le tien.</p>
<br />
<p>Tu n’en connais pas le sens, mais ton instinct le comprend avant toi :<br />
cette marque n’est ni récente, ni accidentelle.<br />
Elle est une clef. Ou une condamnation.</p>
<br />
<p>Derrière toi, un craquement sec résonne parmi les pierres effondrées.</p>
<br />
<p>Tu te retournes d’instinct.<br />
Une silhouette approche dans la brume : une vieille femme drapée d’un manteau de suie, le visage dissimulé derrière un bandeau de cuir clouté.<br />
Sa voix est rauque, usée, mais assurée.</p>
<br />
<p>« Tu n’as pas de nom… » dit-elle.<br />
« Alors tu peux encore en forger un. Mais la Marque, elle, t’a déjà choisi. »</p>
<br />
<p>Elle tend la main vers toi.<br />
Tu hésites. Puis tu la prends.</p>
<br />
<p>« Suis-moi, Porte-Marque. Il te reste peu de temps avant que le Néant ne réalise que tu lui as échappé. »</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        2,
        `<p>Elle te guide à travers les ruines jusqu’aux profondeurs d’un sanctuaire à moitié effondré.<br />
Un ancien Temple des Veilleurs.<br />
Sous la pierre brisée et les symboles profanés, un feu noir brûle sans lumière ni chaleur.</p>
<br />
<p>La femme se présente enfin.<br />
Morgha la Céciteuse.</p>
<br />
<p>Elle te tend une coupe d’eau trouble.<br />
Le liquide est chargé de cendre, mais il ranime tes forces, juste assez pour tenir debout.<br />
« Le monde s’éteint, Porte-Marque.<br />
La Couronne d’Épine a ouvert les Brèches, et par elles s’infiltrent la Peste Rouge… et ceux qu’elle engendre. »</p>
<br />
<p>Elle t’observe longuement, comme si elle tentait de voir à travers ce que tu ignores encore être.<br />
« Tu viens d’un monde d’avant. Ou d’un futur déjà effacé. Peu importe.<br />
La Marque te permet de refermer la Brèche originelle. »</p>
<br />
<p>Morgha sort alors une dague cérémonielle.<br />
L’acier est sombre, parcouru de runes mortes qui refusent de briller.<br />
Elle la pose entre vous.</p>
<br />
<p>« Mais tu n’as ni arme, ni passé pour te guider.<br />
Avant d’agir, tu dois choisir ce que tu es…<br />
et ce que tu es prêt à devenir. »</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        3,
        `<p>Tu refermes les doigts sur la dague.<br />
Le métal est glacé, presque douloureux, mais quelque chose répond en toi.<br />
Un écho ancien.<br />
Des fragments de souvenirs, ou peut-être des possibles encore inexplorés.</p>
<br />
<p>Tu ne sais pas ce que tu étais.<br />
Mais quelque chose, enfoui sous la peur et l’oubli, cherche à remonter à la surface.</p>
<br />
<p>Morgha te fixe sans ciller.<br />
« Il est encore temps.<br />
Certains fils du destin sont rompus. D’autres simplement noués trop serrés.<br />
La Marque n’est pas qu’un fardeau, Porte-Marque. Elle est aussi une clef. »</p>
<br />
<p>Elle glisse un petit objet dans ta main libre.<br />
Sans réfléchir, tu le ranges — à ta ceinture, autour de ton cou ou à ton doigt.<br />
Tu ignores ce que c’est, mais tu le sens pulser doucement contre toi.</p>
<br />
<p>Un talisman… ou un dernier mensonge.</p>
<br />
<p>« Yrnwald est déjà perdu », murmure-t-elle.<br />
« Mais au nord se trouve encore la Brèche originelle.<br />
Elle peut être scellée. »</p>
<br />
<p>Morgha secoue lentement la tête.<br />
« Pas aujourd’hui.<br />
Tu manques de réponses. De puissance. Et surtout… de choix. »</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        4,
        `<p>Dehors, le vent a tourné.<br />
L’aube ne vient plus.<br />
Yrnwald a oublié la lumière du jour depuis bien longtemps.</p>
<br />
<p>L’air est chargé d’une odeur de fer et de cendre.<br />
Des bourrasques froides soulèvent des cendres rouges, virevoltant comme des lucioles mourantes.</p>
<br />
<p>Ici, la lumière ne vient plus du ciel.<br />
Elle émane des Brèches — des plaies béantes dans la chair du monde.<br />
À chaque pulsation, un peu plus de réalité se délite.</p>
<br />
<p>Ta main marquée se contracte soudain.<br />
Une douleur sourde, suivie d’une vision imposée.</p>
<br />
<p>Dans ton esprit, une carte se grave, brûlée dans ta mémoire.<br />
Trois routes apparaissent, nettes, irréfutables.<br />
Comme si tu avais toujours su qu’elles existaient.</p>
<br />
<p>- À l’ouest, les Peste-Ruines d’Ashtorath.<br />
Un champ de bataille figé dans la mort, hanté par les vestiges d’une guerre oubliée.<br />
On murmure qu’une reine déchue y veille encore, prisonnière de ses propres pactes.</p>
<br />
<p>- Au sud-est, la Forêt de Gräven.<br />
Un bois tortueux où les arbres observent, écoutent, et murmurent.<br />
Certains secrets y sauvent des vies.<br />
D’autres les condamnent.</p>
<br />
<p>- Au nord-est, les Temples en ruine.<br />
Vestiges d’une foi dévorée par la folie.<br />
Des Veilleurs fanatiques y rôdent encore, prêts à défendre ce qu’ils appellent « la pureté du Néant ».</p>
<br />
<p>Tu sais que tu devras choisir.</p>
<br />
<p>Aucune route n’est sûre.<br />
Mais chacune mène à un fragment de vérité…<br />
et peut-être à une part de toi que tu as perdue.</p>
<br />
<p>La Marque palpite, impatiente.<br />
Le destin t’attend.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        5,
        `<p>Les arbres de Gräven se referment sur toi comme des os longs et tordus.<br />
Leur écorce craque doucement, comme si la forêt respirait à ton passage.<br />
Le silence est pesant, seulement troublé par le froissement des feuilles mortes.</p>
<br />
<p>Elles ne tombent jamais.<br />
Elles restent accrochées aux branches, sèches et rigides, et semblent t’observer.</p>
<br />
<p>Tu avances à pas mesurés.<br />
Par moments, ton reflet se dessine sur l’écorce, marchant à contre-sens, imitant chacun de tes gestes avec un léger retard.</p>
<br />
<p>Une lueur rougeâtre perce soudain le brouillard.<br />
Un feu.<br />
Un campement sommaire, dressé autour d’un petit autel fait de crânes et de branches nouées.<br />
Une silhouette est accroupie près des flammes.</p>
<br />
<p>« Porte-Marque, hm ? »<br />
La voix est sèche, moqueuse, sans hostilité.<br />
« Tu sens encore le sang chaud. C’est rare ici.<br />
La plupart de ceux que je rencontre… sont déjà creux. »</p>
<br />
<p>Le marchand ne lève pas les yeux.<br />
Son visage est dissimulé derrière un masque rituel, fait de bois et d’os polis.<br />
Des bandes de cuir et des fragments d’ossements recouvrent son corps.</p>
<br />
<p>« Je vends des souvenirs, des malédictions, des promesses…<br />
Et parfois, des choses réellement utiles. »<br />
Il marque une pause.<br />
« Tout dépend de ce que tu cherches. Et surtout… de ce que tu es prêt à perdre. »</p>
<br />
<p>Il dispose lentement plusieurs objets devant toi.</p>
<br />
<p>- Une fiole de mémoire, scellée par une cire sombre, contenant un souvenir encore vivant.</p>
<br />
<p>- Une lame d’obsidienne, fine et fragile, capable de trancher ce qui n’a pas de corps.</p>
<br />
<p>- Un crochet de Brèche, pulsant doucement, calé sur le rythme de ton propre cœur.</p>
<br />
<p>Un des objets te semble étrangement familier.<br />
Ton instinct s’y attarde… ou peut-être est-ce la Marque qui te guide.</p>
<br />
<p>Le marchand incline légèrement la tête.<br />
Ses doigts déplacent imperceptiblement l’ordre des objets.<br />
Il sait quelque chose. Ou il croit savoir.</p>
<br />
<p>« Tu peux en prendre un. »<br />
Son sourire se devine derrière le masque.<br />
« Mais je prendrai quelque chose aussi. Pas maintenant.<br />
Plus tard. Quand tu auras oublié que tu m’es redevable. »</p>
<br />
<p>Il rit doucement.<br />
Puis le feu vacille, et lorsqu’il se stabilise… le campement a disparu.</p>
<br />
<p>Tu repars.<br />
Avec l’objet que tu as choisi — ou celui que tu n’as pas refusé.</p>
<br />
<p>Tu ignores encore quand il te sera utile.<br />
Et surtout… ce qu’il t’a coûté.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        6,
        `<p>Tu quittes Gräven par un ancien sentier de pierre.<br />
La mousse y dévore des symboles oubliés, effaçant des prières que plus personne ne récite.</p>
<br />
<p>Derrière toi, les arbres se referment lentement.<br />
Ils n’aiment pas laisser partir ce qu’ils ont vu.</p>
<br />
<p>La brume se mêle à la cendre.<br />
Le vent transporte des éclats de voix, sans mots, sans langue.<br />
Seulement cette sensation persistante d’être appelé.</p>
<br />
<p>Tu marches longtemps.</p>
<br />
<p>Au loin, une silhouette solitaire se détache sur la plaine dévastée.<br />
Une tour.</p>
<br />
<p>La Tour du Voile.</p>
<br />
<p>Autrefois, elle guidait les sentinelles du nord.<br />
Un phare contre l’obscurité rampante.</p>
<br />
<p>Aujourd’hui, elle penche sous son propre poids.<br />
Éventrée à mi-hauteur, fissurée jusqu’à la base.<br />
Pourtant, elle tient encore, dressée comme un doigt accusateur pointé vers le ciel gris.</p>
<br />
<p>Tu l’atteins au crépuscule.<br />
Ici, le crépuscule ne finit jamais.</p>
<br />
<p>Le seuil est ouvert.</p>
<br />
<p>Tu entres.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        7,
        `<p>Dès que tu franchis le seuil, la lumière s’éteint d’elle-même.<br />
Les murs sont couverts de runes effacées, trop anciennes pour être lues…<br />
ou trop vraies pour être comprises.</p>
<br />
<p>Un grincement résonne dans la tour.<br />
Quelqu’un vit encore ici.</p>
<br />
<p>Et il t’attendait.</p>
<br />
<p>Un vieil homme émerge de l’ombre.<br />
Il porte des peaux rapiécées, usées par le temps.<br />
Un bandeau épais recouvre ses yeux aveugles.</p>
<br />
<p>Il tend vers toi une main tremblante.<br />
« Porte-Marque… »<br />
Sa voix est lente, brisée.<br />
« Tu es en avance. Ou bien terriblement en retard. »</p>
<br />
<p>Il ne donne pas son nom.<br />
Il parle par fragments, par symboles, comme si les mots complets étaient dangereux.</p>
<br />
<p>Une chose, cependant, est claire :</p>
<br />
<p>« Si tu veux atteindre la Brèche originelle,<br />
tu devras éveiller l’un des Trois Dormeurs. »</p>
<br />
<p>Trois piliers scellés par le sang ancien.<br />
Trois gardiens liés à la Couronne d’Épine.<br />
Trois entités liées… à toi.</p>
<br />
<p>Il désigne des cartes à moitié brûlées, clouées au mur.</p>
<br />
<p>- La Reine Écorchée, dans les ruines d’Ashtorath.</p>
<br />
<p>- Le Veilleur Aveugle, sous les Temples.</p>
<br />
<p>- La Mère Cendre, endormie sous le Lac Noir.</p>
<br />
<p>« Tu devras en réveiller au moins un. »<br />
Il marque un silence.<br />
« Aucun réveil ne sera sans prix. »</p>
<br />
<p>À partir de cet instant, tu le sens :<br />
le choix que tu as fait plus tôt commence à modifier ton lien avec ces entités.</p>
<br />
<p>L’un d’eux te répondra plus aisément.<br />
Un autre pourrait te reconnaître.<br />
Un troisième pourrait te haïr.</p>
<br />
<p>Mais tu ignores encore lequel.</p>
<br />
<p>Avant que tu ne partes, le vieil homme dépose un fragment d’os poli dans ta main.<br />
Une clef.</p>
<br />
<p>Pas pour une porte.<br />
Pour un souvenir.</p>
<br />
<p>« Quand la douleur viendra », murmure-t-il,<br />
« serre-la fort… et regarde bien ce que tu t’efforçais d’oublier. »</p>
<br />
<p>Tu repars.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        8,
        `<p>Fuyant la Brèche vivante, tu forces ton passage vers un territoire inconnu.<br />
Les vents cendrés mordent ta peau tandis que tu franchis un ancien pont de pierre, disloqué, suspendu au-dessus d’un gouffre sans fond.</p>
<br />
<p>Derrière toi, la Brèche hurle.<br />
Une gueule béante, palpitante, crachant des filaments d’ombre qui rampent sur les murs effondrés,<br />
cherchant ta chaleur, ton souffle, ton existence.</p>
<br />
<p>Tu cours.<br />
Chaque pas résonne comme un glas sur les dalles fissurées.<br />
La Brèche n’oublie jamais ce qui lui échappe.</p>
<br />
<p>Tu comprends alors une vérité simple et terrifiante :<br />
tu n’es pas seulement poursuivi.<br />
Tu es reconnu.</p>
<br />
<p>Pourtant, au-delà du pont, quelque chose t’appelle.<br />
Un territoire encore intact.<br />
Porteur d’espoir… ou de damnation.</p>
<br />
<p>Derrière toi, la Brèche te traque toujours.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        9,
        `<p>Tu franchis les arches brisées et les avenues mortes d’Ashtorath.<br />
Sous tes pas, le sol craque :<br />
ce ne sont pas des pierres, mais des ossements mêlés à la cendre.</p>
<br />
<p>Le vent charrie une odeur de fer ancien.<br />
La lumière rouge des Brèches glisse le long des murs effondrés, projetant des ombres immenses et difformes.</p>
<br />
<p>Au centre de la cité, un trône de fer fondu se dresse encore.<br />
Forgé dans les restes d’un pouvoir déchu.</p>
<br />
<p>La Reine Écorchée y siège.<br />
Sa chair est à nu, maintenue par des chaînes d’argent et des étoffes ensanglantées.<br />
Malgré cela, elle conserve une grâce terrible.</p>
<br />
<p>Ses yeux abyssaux se posent sur toi.<br />
« Un Porte-Marque… » murmure-t-elle.<br />
« Enfin. »</p>
<br />
<p>Elle tend une main décharnée.<br />
Une lame noire s’y forme, forgée du même fer que son trône.</p>
<br />
<p>« La route vers la Brèche exige un tribut. »<br />
Son sourire est lent, cruel.<br />
« Le mien… ou le tien. »</p>
<br />
<p>Tu sens son regard fouiller ton âme.<br />
Quel que soit ton choix, tu sais qu’Ashtorath ne sortira pas indemne de cet échange.</p>
<br />
<p>Le Pacte de Sang est sur le point d’être scellé.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        10,
        `<p>Le sol tremble sous tes pieds.<br />
D’abord faiblement.<br />
Puis avec la violence d’un cœur ancien qui recommence à battre.</p>
<br />
<p>Dans les profondeurs d’Ashtorath, des chaînes invisibles se rompent.<br />
Leurs échos résonnent comme des cloches funèbres à travers la cité morte.</p>
<br />
<p>Un pilier noir surgit du sol.<br />
Il suinte une lumière blafarde, tordant la réalité autour de lui.</p>
<br />
<p>La Marque sur ta main brûle.<br />
Elle pulse à l’unisson du pilier, comme si une part de toi lui répondait.</p>
<br />
<p>Puis vient le cri.</p>
<br />
<p>Un hurlement venu d’un autre âge.<br />
Un cri d’agonie et de renaissance qui traverse Yrnwald tout entier.</p>
<br />
<p>Tu comprends sans qu’on te l’explique :<br />
le premier Dormeur s’est éveillé.</p>
<br />
<p>Un rayon écarlate transperce les cieux morts.<br />
Désormais, plus rien ne sera jamais comme avant.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        11,
        `<p>Sur le chemin du retour, les ruines d’Ashtorath s’effacent derrière toi, englouties par la brume rouge.</p>
<br />
<p>Une silhouette se dresse au milieu du sentier.</p>
<br />
<p>Un pèlerin.<br />
Son visage est dissimulé sous un masque de bois blanc, sans traits.<br />
Son manteau semble cousu de cendres et de linceuls.</p>
<br />
<p>Sans un mot, il s’approche et te tend un parchemin ancien.<br />
Il est scellé par une mèche de cheveux.</p>
<br />
<p>Tes cheveux.</p>
<br />
<p>Tu ne te souviens pas qu’on ait pu te les prendre.<br />
Pourtant, tu reconnais leur teinte, leur texture.</p>
<br />
<p>Sa voix est un souffle fragile.<br />
« Ouvre-le seulement lorsque tu n’auras plus d’autre choix. »</p>
<br />
<p>Il te fixe longuement.<br />
« Ce que tu crois avoir perdu… peut encore être sauvé. »</p>
<br />
<p>Puis il disparaît dans la brume.<br />
Il ne reste que le poids du parchemin dans ta main.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        12,
        `<p>Dans les profondeurs du Bois-Puits, le chemin se dérobe sous tes pas.<br />
La brume s’enroule autour des arbres morts comme un linceul vivant.</p>
<br />
<p>L’air est lourd, saturé d’une nostalgie étouffante.<br />
Chaque pas te rapproche d’un passé que tu n’as jamais voulu retrouver.</p>
<br />
<p>Une silhouette apparaît dans la brume mouvante.<br />
Une femme, drapée d’un manteau sombre, le visage voilé d’argent.</p>
<br />
<p>Avant même qu’elle ne parle, sa voix résonne dans ton esprit.</p>
<br />
<p>Dans ses mains pâles, elle tient un paquet ensanglanté.<br />
Tu le reconnais immédiatement.</p>
<br />
<p>Elle te le tend.<br />
« Tu l’as abandonné. »</p>
<br />
<p>Son ton est neutre.<br />
« Ce paquet contenait ton vrai nom.<br />
Celui que tu as volontairement oublié pour survivre. »</p>
<br />
<p>La brume s’épaissit brutalement.<br />
Une autre présence approche.</p>
<br />
<p>La femme disparaît.<br />
Il ne reste que toi… et ce qui s’avance pour te confronter.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        13,
        `<p>La forêt se dissout derrière toi.<br />
Tu marches dans un espace sans frontières, où le sol et le ciel se confondent.</p>
<br />
<p>Devant toi, une silhouette t’attend.</p>
<br />
<p>Tu la reconnais immédiatement.</p>
<br />
<p>C’est toi.</p>
<br />
<p>Une version plus jeune.<br />
Plus entière.<br />
Ou simplement plus honnête.</p>
<br />
<p>Il tient une lame noire, sans reflet.<br />
Un abîme figé.</p>
<br />
<p>« Il ne peut y avoir qu’un seul Porte-Marque », dit-il calmement.<br />
« La Brèche exige un porteur. Un seul. »</p>
<br />
<p>Il marque une pause.</p>
<br />
<p>- « Tu peux fuir.</p>
<br />
<p>- Tu peux me combattre.</p>
<br />
<p>- Ou tu peux m’accepter. »</p>
<br />
<p>Ce choix existe depuis toujours.<br />
Ici, il ne peut plus être repoussé.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        14,
        `<p>Le ciel se déchire au-dessus de toi, dévoilant la Couronne d’Épine, suspendue au-dessus du gouffre béant qu’est la Brèche.<br />
Elle tourne lentement, immense et silencieuse, tissée d’épines noires et de fragments de souvenirs déchirés. Chaque pointe scintille de lumière rouge, comme des étoiles mourantes.</p>
<br />
<p>Trois escaliers de pierre s'élèvent vers elle, chacun portant les marques des choix que tu as faits jusque-là.<br />
Aucun ne semble plus sûr qu’un autre.</p>
<br />
<p>Tu ressens la Brèche t’appeler, affamée, impatiente. C’est ici que ton voyage prend fin. Ici que tu dois faire le dernier choix.</p>
<br />
<p>Le vent hurle autour de toi, portant les échos de tous ceux qui t’ont précédé… et échoué.</p>
<br />
<p>Un seul Porte-Marque peut franchir le seuil.<br />
Ce que tu abandonneras ici ne pourra jamais être repris.</p>`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        15,
        `<p>Les ruines d’Ashtorath se dressent de nouveau devant toi.<br />
La brume écarlate glisse entre les colonnes brisées.</p>
<br />
<p>Une silhouette spectrale t’attend.<br />
Son visage est masqué par une couronne fendue.</p>
<br />
<p>« Porte-Marque… » souffle-t-il.<br />
« Reviens d’où tu viens.<br />
Ou abandonne ce que tu crois être tien. »</p>
<br />
<p>Il tend la main.<br />
Ni haine.<br />
Ni compassion.</p>
<br />
<p>Seulement la faim d’un pacte ancien.</p>
<br />
<p>Un frisson te parcourt.<br />
Ici, tu devras sacrifier ta mémoire… ou ta chair.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        16,
        `<p>Tu descends dans les entrailles d’Ashtorath.<br />
Les escaliers s’effritent sous tes pas.</p>
<br />
<p>Les murs suintent une humidité chaude mêlée à la cendre.<br />
La cité pleure encore ses morts.</p>
<br />
<p>Au loin, une flamme pâle vacille.<br />
Elle t’appelle.</p>
<br />
<p>À chaque pas, la Marque brûle davantage.<br />
Quelque chose t’attend.</p>
<br />
<p>Quelque chose d’ancien.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        17,
        `<p>Les Temples s’élèvent autour de toi, éventrés, profanés.</p>
<br />
<p>L’air est saturé de fer, de cendre et d’encens brûlé.</p>
<br />
<p>Dans l’ombre, des silhouettes encapuchonnées prient en silence.<br />
Leurs lèvres bougent sans produire le moindre son.</p>
<br />
<p>À chacun de tes pas, leurs têtes se tournent lentement vers toi.</p>
<br />
<p>Leurs regards sont vides.<br />
Consumés par une dévotion qui n’a plus d’objet.</p>
<br />
<p>Ce lieu est sacré… ou maudit.</p>
<br />
<p>Et quelque chose t’y attend.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        18,
        `<p>Sous les Temples, tu découvres une crypte oubliée.</p>
<br />
<p>Au centre, un autel massif gravé de runes effacées.<br />
La Marque sur ta main pulse en résonance.</p>
<br />
<p>Tu comprends le choix qui s’offre à toi.</p>
<br />
<p>Purifier la Marque.<br />
Offrir une part de ton essence pour en chasser les ténèbres.</p>
<br />
<p>Ou l’embrasser pleinement.<br />
Laisser la corruption s’ancrer plus profondément.</p>
<br />
<p>Quelle que soit ta décision, tu sais qu’elle laissera une trace.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        19,
        `<p>Sous les eaux sombres du Lac Noir, tout devient plus lourd.<br />
L’eau freine chacun de tes mouvements.</p>
<br />
<p>Le silence est total.</p>
<br />
<p>Au cœur du sanctuaire englouti, elle repose.</p>
<br />
<p>La Mère Cendre.</p>
<br />
<p>Son corps gigantesque mêle pierre, racines et cendre.<br />
Des veines d’obsidienne pulsent lentement.</p>
<br />
<p>Son rêve n’est pas un repos.<br />
C’est une corruption vivante.</p>
<br />
<p>Pourtant, quelque chose en toi lui répond.<br />
Un lien ancien.<br />
Un héritage oublié.</p>
<br />
<p>Comme si tu avais déjà bu à sa source.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        20,
        `<p>Tu atteins enfin la Brèche originelle.<br />
Elle s’étend devant toi, gigantesque, vivante.<br />
Les vents cendrés s’y déchaînent, portant avec eux des murmures oubliés.</p>
<br />
<p>Ton double, les Dormeurs, et la Mère Cendre convergent vers ce même point.<br />
Tout se rassemble pour le dernier acte.</p>
<br />
<p>La Marque brûle intensément.<br />
Elle réclame un choix final.<br />
Un sacrifice.<br />
Une fusion.</p>
<br />
<p>Les hurlements de la Brèche te transpercent.<br />
Elle t’offre une seule issue : la comprendre, ou disparaître.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        21,
        `<p>Le sol se fissure sous tes pieds.<br />
Des filaments de lumière et d’ombre s’entrelacent.<br />
Chaque respiration semble déchirer la réalité.</p>
<br />
<p>Ton double s’avance et te tend la main.<br />
« Accepte-moi ou refuse… mais choisis vite », dit-il.<br />
Ses yeux reflètent ton âme, ton passé et ce que tu pourrais devenir.</p>
<br />
<p>Les Dormeurs hurlent depuis l’ombre, écho de leurs propres souffrances.<br />
Le choix est simple, mais impossible :</p>
<br />
<p>- Fusionner avec la Marque et la Brèche.<br />
- Laisser la Brèche consumer tout.<br />
- Ou sacrifier une part de toi pour fermer définitivement ce gouffre.</p>
<br />
<p>Tout repose sur toi.<br />
Le monde d’Yrnwald attend ta décision.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        22,
        `<p>Tu inspires profondément.<br />
La Marque pulse, vibrant avec tout ce que tu as traversé.</p>
<br />
<p>Si tu choisis la fusion :<br />
Ton corps devient un phare de lumière et d’ombre.<br />
Les Dormeurs se calment, la Brèche stabilisée.<br />
Une nouvelle ère commence, mais à quel prix ?</p>
<br />
<p>Si tu choisis le sacrifice :<br />
Une part de toi disparaît.<br />
La Brèche se referme dans un hurlement silencieux.<br />
Les Dormeurs s’éteignent un par un.<br />
Yrnwald survit, mais ton nom est effacé de ses mémoires.</p>
<br />
<p>Si tu refuses :<br />
La Brèche engloutit tout.<br />
Les Dormeurs se libèrent.<br />
Le monde s’effondre… et tu deviens une légende tragique, oubliée mais connue.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
      ],
      [
        23,
        `<p>Le vent se calme.<br />
La lumière revient, faible mais sincère.</p>
<br />
<p>Yrnwald respire à nouveau.<br />
Les Dormeurs sont redevenus des ombres dormantes.<br />
La Marque, selon ton choix, est soit purifiée, soit fusionnée, soit dissipée.</p>
<br />
<p>Ton double sourit.<br />
Ou disparaît.<br />
Le temps s’étire et se contracte, laissant place à la paix… ou à la mémoire d’un monde perdu.</p>
<br />
<p>Quel que soit le chemin, tu sais une chose :<br />
Tu as changé Yrnwald à jamais.<br />
Et quelque part, la Brèche se souviendra de ton nom.</p>
`,
        1,
        "/backgrounds/LesCendres.png",
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
      [27, "Accepter de donner ta mémoire au Spectre", 15, 16],
      [28, "Refuser et affronter les ombres", 15, 16],
      [29, "Suivre la lumière dans les souterrains", 16, 8],
      [30, "Rebrousser chemin", 16, 8],
      [31, "Prier auprès des fanatiques", 17, 18],
      [32, "Tenter de dérober un artefact", 17, 18],
      [33, "Purifier ta Marque à l’autel", 18, 8],
      [34, "Corrompre davantage ta Marque à l’autel", 18, 8],
      [35, "Reprendre la route vers la Tour du Voile", 16, 7],
      [36, "Quitter les Temples et rejoindre la Tour du Voile", 18, 7],
      [
        37,
        "Aller aux Ruines d’Ashtorath pour réveiller la Reine Écorchée",
        7,
        15,
      ],
      [38, "Se rendre aux Temples pour éveiller le Veilleur Aveugle", 7, 17],
      [39, "Se rendre sous le Lac Noir pour éveiller la Mère Cendre", 7, 19],
      [40, "Éveiller la Mère Cendre en offrant un fragment de toi-même", 19, 8],
      [41, "Refuser de troubler son sommeil et fuir discrètement", 19, 8],
      [42, "Fin : Le Héros Oublié", 20, 23],
      [43, "Fin : Le Brisé", 21, 23],
      [44, "Fin : Le Souverain Gris", 22, 23],
      [45, "Revenir à l'accueil.", 23, 0],
    ];
    await connection.execute(`SET FOREIGN_KEY_CHECKS =0`);
    for (const choice of choices) {
      await connection.execute(
        `INSERT INTO choices (id, text, steps_id, link_to_step_id)`,
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
