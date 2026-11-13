(function () {
  'use strict';

  var EN = {
    text: {
      /* Menu */
      nav_home: "Home",
      nav_projects: "Projects",
      nav_experience: "Experience",
      nav_skills: "Skills",
      nav_research: "Publications",
      nav_about: "About",
      nav_contact: "Contact",

      /* Hero */
      hello: "Hello, I am",
      scroll: "Scroll to explore",
      hero_sub: "Electrical and Computer Engineering · University of Victoria · Victoria, BC",
      cta_projects: "See my projects ↓",
      cta_contact: "Get in touch",

      /* Intro statement (the words that light up) */
      state: "I am a MASc student in <b>Electrical and Computer Engineering</b> at the University of Victoria. I am drawn to <b>privacy and security,</b> and I work across <b>hardware, software and machine learning.</b>",

      /* Numbers */
      stat_pubs: "Peer-reviewed publications",
      stat_lab: "Undergraduates in my weekly digital design labs",
      stat_masc: "Expected MASc completion",

      /* Projects */
      k_projects: "Selected <i>projects</i>",
      p1: "Ocean Hackathon Victoria, October 2026. A team prototype that turns live ferry ocean-sensor data into a passenger kiosk and a crew dashboard for BC Ferries. I wrote the project description and built the pitch deck.",
      p2: "A database-driven web application that helps a utility services business manage service requests by area.",
      team_repo: "Team repo",
      source: "Source",
      demo: "Demo",
      p3: "A web platform that streamlines computer science research by organizing academic resources in one place.",
      p4: "A Python project that detects seizures from EEG data, an early step toward my published research.",
      earlier_h: "Earlier web demos",
      earlier_p: "Where I started with front-end work.",
      hs_tip: "Keep scrolling",

      /* Experience */
      k_exp: "Experience",
      t1_time: "Sept 2026 – Present",
      t1_h: "Laboratory Instructor, Digital Design (ECE 241)",
      t1_a: "Lead two weekly labs for 18 undergraduates on sequential and combinational logic, FPGAs and VHDL.",
      t1_b: "Guide students through hardware and simulation exercises, debugging circuits and design errors one-on-one.",
      t1_c: "Explain technical concepts clearly to students with different levels of background knowledge.",
      t2_time: "Mar 2024 – Nov 2024",
      t2_h: "Software Engineer",
      t2_a: "Developed responsive web applications with React.js, Next.js, JavaScript and TypeScript, connecting frontend interfaces to backend REST APIs.",
      t2_b: "Contributed to the Brilliant Cloud Portal, a production platform for managing user access, cloud services and administrative operations.",
      t2_c: "Automated end-to-end testing with Cypress, writing around 20 test cases per feature to improve software quality and reduce regressions.",

      /* Experience: the Volunteering and Other work tabs */
      tab_vol: "Volunteering",
      tab_work: "Other work",
      v1_y: "2025 – now",
      v1_r: "Technology Support Volunteer",
      v1_d: "I help community members, mostly seniors, solve everyday tech problems, explaining things patiently and in plain language.",
      v2_r: "Conference Volunteer",
      v2_d: "Welcomed and guided attendees at a fast-paced international conference and answered their questions.",
      v3_r: "Vice-Chair · Jahangirnagar University",
      v3_d: "Coordinated events and schedules for a student tech community, keeping plans organized and teams on the same page.",
      j1_y: "Sept 2026 – now",
      j1_r: "Product Process Associate",
      j1_d: "Assisting with inventory control and basic loss prevention.",
      j2_y: "Sept 2025 – Aug 2026",
      j2_r: "Omni Customer Fulfillment Associate",
      j2_d: "Fulfilled around 400 online and in-store orders a day using digital inventory and order systems. Named Shining Star of the Month in March 2026, chosen from about 500 store associates.",
      j3_y: "Jan 2025 – Aug 2025",
      j3_r: "Customer Service Associate",
      j3_d: "Priced up to 1,400 books and media in a single day with close attention to detail and accuracy.",

      /* Skills */
      k_skills: "What I <i>can do</i>",
      c1_h: "Machine Learning",
      c1_p: "Deep learning and federated learning, applied to medical data such as MRI and EEG.",
      c2_h: "Web Engineering",
      c2_p: "Responsive React and Next.js interfaces connected to REST APIs.",
      c3_h: "Digital Design",
      c3_p: "Combinational and sequential logic, and FPGA programming in VHDL.",
      c4_h: "Teaching",
      c4_p: "Lab instruction that makes hardware concepts clear for every background.",

      /* Skills: marquee row labels (the row items are in "marquee" below) */
      mq1: "Languages",
      mq2: "Frameworks, tools and databases",
      mq3: "Machine learning and digital design",

      /* Publications */
      k_research: "Published <i>research</i>",
      res_lead: "Earlier research in deep learning, published before I started my MASc.",
      pub1_venue: "ACM · ICCA 2024 · 2025",
      pub1_desc: "An ensemble of ResNet-50 and ResNet-18 called E-ResNet classifies seizure activity in pediatric EEG. Federated learning lets hospitals train together without sharing patient data, a privacy-aware approach.",
      read_pub: "View publication",
      pub2_venue: "Frontiers in Bioinformatics · 2025",
      pub2_desc: "Transfer-learning feature extractors and a fused Inception and ResNet model, IncepRes, classify Alzheimer's stages from MRI. Accuracy reached 96.96%, 98.35% and 97.13% on ADNI, OASIS and the merged set.",

      /* About */
      k_about: "About <i>me</i>",
      ab_h: "Engineer, student, teacher.",
      ab_p1: "I am a <strong>MASc student in Electrical and Computer Engineering</strong> at the University of Victoria. I am drawn to privacy and security, and I am still choosing my exact research area. I also like building software that people can use.",
      ab_p2: "Before moving to Victoria, I worked as a software engineer in Dhaka and published two papers on deep learning. Now I also teach digital design labs to undergraduates.",
      ab_course: "Current coursework:",

      /* Education */
      ed_tag: "Education",
      e1_time: "Sept 2026 – Aug 2028 (expected)",
      e1_h: "Master of Applied Science, Electrical and Computer Engineering",
      e2_time: "Feb 2018 – Mar 2023",
      e2_h: "Bachelor of Science in Information Technology",
      e2_p: "Government Merit Scholarship for academic excellence, awarded all four undergraduate years.",

      /* Resume */
      rs_tag: "Resume",
      rs_h: "The full story, in one PDF.",
      rs_btn: "Open resume (PDF)",

      /* Contact */
      k_contact: "Let's work <i>together</i>",
      where: "Based in Victoria, BC, Canada.",
      f_email: "Your email",
      f_msg: "Message",
      f_send: "Send message",

      /* Footer */
      top: "Back to top ↑",
      f_ph: "Tell me about your project or question",

      /* Button labels read by screen readers, and the menu button */
      ui_lang_label: "Passer en français",
      ui_theme_dark: "Switch to dark theme",
      ui_theme_light: "Switch to light theme",
      ui_menu: "Menu",
      ui_close: "Close",

      /* Contact form status messages */
      form_sending: "Sending…",
      form_ok: "Thank you. Your message has been sent.",
      form_err: "Sorry, your message could not be sent. Please email maleehakaikaus.official@gmail.com."
    },

    /* The typed line under the name */
    roles: ['MASc Student in ECE', 'Software Engineer', 'Web Developer', 'Lab Instructor'],

    /* The three scrolling skill rows */
    marquee: {
      lang: ['JavaScript', 'TypeScript', 'Python', 'C++', 'SQL', 'VHDL'],
      tools: ['React.js', 'Next.js', 'REST APIs', 'Cypress', 'Git', 'GitHub', 'MySQL'],
      ml: ['Deep learning', 'Federated learning', 'Medical data (MRI, EEG)', 'Combinational and sequential logic', 'FPGA programming']
    }
  };

  /* ==========================================================================
     FRENCH — DRAFT. To be reviewed by a French speaker.
     Everything French on the site is in this one block (text, roles, marquee).
     ========================================================================== */
  var FR = {
    text: {
      /* Menu */
      nav_home: "Accueil",
      nav_projects: "Projets",
      nav_experience: "Expérience",
      nav_skills: "Compétences",
      nav_research: "Publications",
      nav_about: "À propos",
      nav_contact: "Contact",

      /* Hero */
      hello: "Bonjour, je suis",
      scroll: "Faites défiler",
      hero_sub: "Génie électrique et informatique · Université de Victoria · Victoria (C.-B.)",
      cta_projects: "Voir mes projets ↓",
      cta_contact: "Me contacter",

      /* Intro statement (the words that light up) */    
      state: "Je suis étudiante à la maîtrise en <b>génie électrique et informatique</b> à l’Université de Victoria. Je m’intéresse à la <b>confidentialité et à la sécurité,</b> et je travaille à la fois sur le <b>matériel, le logiciel et l’apprentissage automatique.</b>",
      /* Numbers */
      stat_pubs: "Publications révisées par les pairs",
      stat_lab: "Étudiants dans mes laboratoires hebdomadaires de conception numérique",
      stat_masc: "Fin prévue de la maîtrise",

      /* Projects */
      k_projects: "Projets <i>choisis</i>",
      p1: "Ocean Hackathon Victoria, octobre 2026. Un prototype d’équipe qui transforme les données en direct des capteurs océaniques d’un traversier en une borne pour les passagers et un tableau de bord pour l’équipage de BC Ferries. J’ai rédigé la description du projet et créé la présentation.",
      p2: "Une application web reposant sur une base de données, qui aide une entreprise de services publics à gérer les demandes de service par secteur.",
      team_repo: "Dépôt de l’équipe",
      source: "Code source",
      demo: "Démo",
      p3: "Une plateforme web qui simplifie la recherche en informatique en regroupant les ressources universitaires au même endroit.",
      p4: "Un projet Python qui détecte les crises d’épilepsie à partir de données EEG, une première étape vers mes recherches publiées.",
      earlier_h: "Anciennes démos web",
      earlier_p: "Mes débuts en développement front-end.",
      hs_tip: "Continuez à défiler",

      /* Experience */
      k_exp: "Expérience",
      t1_time: "Sept. 2026 – aujourd’hui",
      t1_h: "Instructrice de laboratoire, conception numérique (ECE 241)",
      t1_a: "Je dirige deux laboratoires hebdomadaires pour 18 étudiants de premier cycle sur la logique séquentielle et combinatoire, les FPGA et le VHDL.",
      t1_b: "J’accompagne les étudiants dans les exercices matériels et de simulation et je les aide à déboguer circuits et erreurs de conception, un à un.",
      t1_c: "J’explique clairement les concepts techniques à des étudiants de formations très différentes.",
      t2_time: "Mars 2024 – nov. 2024",
      t2_h: "Ingénieure logiciel",
      t2_a: "J’ai développé des applications web adaptatives avec React.js, Next.js, JavaScript et TypeScript, en reliant les interfaces aux API REST du serveur.",
      t2_b: "J’ai contribué au Brilliant Cloud Portal, une plateforme de production pour gérer les accès des utilisateurs, les services infonuagiques et les opérations administratives.",
      t2_c: "J’ai automatisé les tests de bout en bout avec Cypress, en rédigeant environ 20 cas de test par fonctionnalité pour améliorer la qualité logicielle et réduire les régressions.",

      /* Experience: the Volunteering and Other work tabs */
      tab_vol: "Bénévolat",
      tab_work: "Autres emplois",
      v1_y: "2025 – auj.",
      v1_r: "Bénévole en soutien technologique",
      v1_d: "J’aide des membres de la communauté, surtout des aînés, à résoudre leurs problèmes technologiques du quotidien, avec patience et dans un langage simple.",
      v2_r: "Bénévole de conférence",
      v2_d: "J’ai accueilli et guidé les participants d’une conférence internationale au rythme soutenu et répondu à leurs questions.",
      v3_r: "Vice-présidente · Université Jahangirnagar",
      v3_d: "J’ai coordonné les événements et les calendriers d’une communauté technologique étudiante, en gardant les plans organisés et les équipes sur la même longueur d’onde.",
      j1_y: "Sept. 2026 – auj.",
      j1_r: "Associée aux processus de produits",
      j1_d: "Je participe au contrôle des stocks et à la prévention de base des pertes.",
      j2_y: "Sept. 2025 – août 2026",
      j2_r: "Associée à l’exécution des commandes omnicanal",
      j2_d: "J’ai préparé environ 400 commandes en ligne et en magasin par jour à l’aide de systèmes numériques d’inventaire et de commandes. Nommée « Shining Star » du mois en mars 2026, parmi environ 500 associés du magasin.",
      j3_y: "Janv. 2025 – août 2025",
      j3_r: "Associée au service à la clientèle",
      j3_d: "J’ai étiqueté jusqu’à 1 400 livres et articles multimédias en une seule journée, avec une grande attention aux détails et à l’exactitude.",

      /* Skills */
      k_skills: "Ce que je <i>sais faire</i>",
      c1_h: "Apprentissage automatique",
      c1_p: "Apprentissage profond et fédéré, appliqués à des données médicales comme l’IRM et l’EEG.",
      c2_h: "Ingénierie web",
      c2_p: "Interfaces React et Next.js adaptatives, reliées à des API REST.",
      c3_h: "Conception numérique",
      c3_p: "Logique combinatoire et séquentielle, et programmation de FPGA en VHDL.",
      c4_h: "Enseignement",
      c4_p: "Des laboratoires qui rendent le matériel accessible à tous les profils.",

      /* Skills: marquee row labels (the row items are in "marquee" below) */
      mq1: "Langages",
      mq2: "Cadres, outils et bases de données",
      mq3: "Apprentissage automatique et conception numérique",

      /* Publications */
      k_research: "Recherche <i>publiée</i>",
      res_lead: "Des recherches antérieures en apprentissage profond, publiées avant le début de ma maîtrise.",
      pub1_venue: "ACM · ICCA 2024 · 2025",
      pub1_desc: "E-ResNet, un ensemble de ResNet-50 et de ResNet-18, classe l’activité épileptique dans l’EEG pédiatrique. L’apprentissage fédéré permet à des hôpitaux d’entraîner un modèle ensemble sans partager les données des patients, une approche respectueuse de la vie privée.",
      read_pub: "Voir la publication",
      pub2_venue: "Frontiers in Bioinformatics · 2025",
      pub2_desc: "Des extracteurs de caractéristiques par apprentissage par transfert et un modèle fusionnant Inception et ResNet, IncepRes, classent les stades de la maladie d’Alzheimer à partir d’IRM. La précision atteint 96,96 %, 98,35 % et 97,13 % sur ADNI, OASIS et l’ensemble fusionné.",

      /* About */
      k_about: "À <i>propos</i>",
      ab_h: "Ingénieure, étudiante, enseignante.",
      ab_p1: "Je suis <strong>étudiante à la maîtrise (MASc) en génie électrique et informatique</strong> à l’Université de Victoria. La confidentialité et la sécurité m’attirent, et je choisis encore mon domaine de recherche précis. J’aime aussi concevoir des logiciels que les gens utilisent facilement.",
      ab_p2: "Avant d’arriver à Victoria, j’ai travaillé comme ingénieure logiciel à Dacca et publié deux articles sur l’apprentissage profond. J’enseigne aussi maintenant des laboratoires de conception numérique au premier cycle.",
      ab_course: "Cours en cours :",

      /* Education */
      ed_tag: "Formation",
      e1_time: "Sept. 2026 – août 2028 (prévu)",
      e1_h: "Maîtrise en sciences appliquées (MASc), génie électrique et informatique",
      e2_time: "Févr. 2018 – mars 2023",
      e2_h: "Baccalauréat en sciences, technologies de l’information",
      e2_p: "Bourse gouvernementale au mérite pour l’excellence scolaire, reçue les quatre années du baccalauréat.",

      /* Resume */
      rs_tag: "CV",
      rs_h: "Tout le parcours, dans un seul PDF.",
      rs_btn: "Ouvrir le CV (PDF)",

      /* Contact */
      k_contact: "Travaillons <i>ensemble</i>",
      where: "Basée à Victoria (Colombie-Britannique), Canada.",
      f_email: "Votre courriel",
      f_msg: "Message",
      f_send: "Envoyer le message",

      /* Footer */
      top: "Haut de page ↑",
      f_ph: "Parlez-moi de votre projet ou de votre question",

      /* Button labels read by screen readers, and the menu button */
      ui_lang_label: "Switch to English",
      ui_theme_dark: "Passer au thème sombre",
      ui_theme_light: "Passer au thème clair",
      ui_menu: "Menu",
      ui_close: "Fermer",

      /* Contact form status messages */
      form_sending: "Envoi en cours…",
      form_ok: "Merci. Votre message a bien été envoyé.",
      form_err: "Désolée, votre message n’a pas pu être envoyé. Écrivez-moi à maleehakaikaus.official@gmail.com."
    },

    roles: ['Étudiante à la maîtrise en génie', 'Ingénieure logiciel', 'Développeuse web', 'Instructrice de laboratoire'],

    marquee: {
      lang: ['JavaScript', 'TypeScript', 'Python', 'C++', 'SQL', 'VHDL'],
      tools: ['React.js', 'Next.js', 'API REST', 'Cypress', 'Git', 'GitHub', 'MySQL'],
      ml: ['Apprentissage profond', 'Apprentissage fédéré', 'Données médicales (IRM, EEG)', 'Logique combinatoire et séquentielle', 'Programmation de FPGA']
    }
  };
  /* ============================ END OF FRENCH ============================== */

  window.MK_I18N = { en: EN, fr: FR };
})();
