const buildLocale = require('./merge');
const group = require('./content/group-de');

module.exports = buildLocale({
  code: 'de',
  label: 'DE',
  name: 'Deutsch',
  flag: '🇩🇪',

  ui: {
    common: {
      home: 'Startseite',
      learnMore: 'Mehr erfahren →',
      seeAllServices: 'Alle Leistungen ansehen',
      seeAllIndustries: 'Alle Branchen ansehen',
      requestQuote: 'Angebot anfordern',
      askQuote: 'Angebot anfragen',
      ourServices: 'Unsere Leistungen',
      contactUs: 'Kontakt aufnehmen',
      howWeWork: 'So arbeiten wir',
      breadcrumbsAria: 'Brotkrümelnavigation',
      homePage: 'Startseite',
    },
    header: {
      logoAria: 'Workify — Startseite',
      navAria: 'Hauptnavigation',
      menuOpen: 'Menü öffnen',
      langAria: 'Sprache wählen',
      langLabel: 'Sprache',
    },
    footer: {
      taglineSuffix: '. Wir sind in Polen und Deutschland tätig.',
      company: 'Unternehmen',
      offer: 'Angebot',
      contact: 'Kontakt',
      about: 'Über uns',
      process: 'So arbeiten wir',
      faq: 'FAQ',
      services: 'Leistungen',
      facades: 'Fassaden',
      wholesale: 'Großhandel',
      cooperation: 'Zusammenarbeit',
      industries: 'Branchen',
      locations: 'Standorte',
      contactForm: 'Kontaktformular',
      rights: 'Alle Rechte vorbehalten.',
    },
    clients: {
      label: 'Vertrauen uns',
      title: 'Wir arbeiten mit führenden Unternehmen zusammen',
      desc: 'Wir stellen Personal für Marktführer im Handel, in der Logistik und Produktion in Polen und Europa.',
    },
    home: {
      badgeLabel: 'Mitarbeiter pro Jahr',
      heroTitle1: 'Eine Gruppe.',
      heroTitle2: 'Viele Kompetenzen.',
      heroSubtitle:
        'Workify ist eine Unternehmensgruppe in Polen und Deutschland — Personal, Rekrutierung, Outsourcing, Fassaden und Materialgroßhandel. Ein Partner für Ihr Unternehmen.',
      industryLabel: 'Personal prüfen für',
      industryLabelStrong: 'Ihre Branche',
      industryPlaceholder: 'Wählen Sie Ihre Branche',
      industryPickAria: 'Branche wählen',
      industryCheck: 'Jetzt prüfen',
      partnersAria: 'Branchen',
      partners: [
        'Lager',
        'Fabriken',
        'Bauwesen',
        'Straßenbau',
        'Produktion',
        'Logistik',
        'Industrie',
        'Montage',
      ],
      statsLabel: 'In Zahlen',
      statsTitle: 'Unsere Ergebnisse',
      servicesLabel: 'Leistungen',
      servicesTitle: 'Lösungen, die Sie brauchen',
      servicesDesc:
        'Von einzelnen Positionen bis zu kompletten Produktionsteams — wir passen den Umfang an Ihre Bedürfnisse an.',
      industriesLabel: 'Branchen',
      industriesTitle: 'Wo wir Personal liefern',
      forBusiness: 'Für Unternehmen',
      whyWorkify: 'Warum die Workify-Gruppe?',
      whyDesc:
        'Wir vereinen die Kompetenzen mehrerer Gesellschaften unter einer Marke — vom Personal über Fassaden bis zu Materialien. Tätig in ganz Polen und Deutschland.',
      divisionsLabel: 'Workify-Gruppe',
      divisionsTitle: 'Unsere Geschäftsbereiche',
      divisionsDesc:
        'Fünf Säulen der Gruppe — jede mit eigenem Expertenteam und dediziertem B2B-Angebot.',
    },
    about: {
      breadcrumb: 'Über uns',
      pageLabel: 'Über uns',
      pageTitle: 'Ein Partner, auf den Sie sich verlassen können',
      pageDesc:
        'Workify ist eine Unternehmensgruppe in Polen und Deutschland — wir vereinen Personal, Outsourcing, Fassaden und Materialgroßhandel unter einer Marke.',
      whoTitle: 'Wer wir sind',
      whoP1:
        'Workify ist der Dachverbund mehrerer Gesellschaften, die gemeinsam Unternehmen in Polen und Deutschland betreuen. Wir sind keine einzelne Agentur — wir sind eine Kompetenzgruppe: von Zeitarbeit über Fassaden bis zu Materiallieferungen.',
      whoP2:
        'Für den Kunden bedeutet das ein Ansprechpartner, einheitliche Standards und Zugang zu vielen Leistungen ohne mehrere Anbieter suchen zu müssen.',
      valuesLabel: 'Unsere Werte',
      valuesTitle: 'Was uns auszeichnet',
      value1Title: 'Branchenerfahrung',
      value1Desc:
        'Wir kennen die Anforderungen in Lager, Fabriken, auf Baustellen und im Straßenbau. Wir rekrutieren mit fundiertem Wissen über die jeweiligen Positionen.',
      value2Title: 'Vollständige Rechtskonformität',
      value2Desc:
        'Wir bearbeiten die Dokumentation gemäß polnischem und deutschem Arbeitsrecht. Sie vermeiden formelle Risiken.',
      value3Title: 'Polen und Deutschland',
      value3Desc:
        'Wir arbeiten grenzüberschreitend mit Büros in beiden Ländern. Wir kennen lokale Vorschriften, Sprache und den Arbeitsmarkt.',
    },
    services: {
      breadcrumb: 'Leistungen',
      pageLabel: 'Leistungen',
      pageTitle: 'Umfassende Personallösungen',
      pageDesc:
        'Wählen Sie das Kooperationsmodell, das zu Ihrem Unternehmen passt — vom flexiblen Leasing bis zu kompletten Projektteams.',
      detailsLink: 'Leistungsdetails →',
      consultTitle: 'Nicht sicher, welche Leistung passt?',
      consultDesc:
        'Beschreiben Sie uns Ihren Bedarf — wir beraten Sie zum besten Kooperationsmodell und erstellen ein unverbindliches Angebot.',
      consultBtn: 'Kostenlose Beratung',
    },
    serviceDetail: {
      breadcrumbServices: 'Leistungen',
      serviceLabel: 'Leistung',
      benefits: 'Vorteile',
      askService: 'Diese Leistung anfragen',
      howCoop: 'So läuft die Zusammenarbeit',
      otherServices: 'Weitere Leistungen',
    },
    industries: {
      breadcrumb: 'Branchen',
      pageLabel: 'Branchen',
      pageTitle: 'Wo wir Personal liefern',
      pageDesc:
        'Wir betreuen Unternehmen aus vielen Wirtschaftssektoren — überall dort, wo geprüftes physisches und technisches Personal benötigt wird.',
      seeDetails: 'Details ansehen →',
    },
    industryDetail: {
      industryLabel: 'Branche',
      rolesTitle: 'Positionen, die wir besetzen',
      askStaff: 'Personal anfordern',
      seeServices: 'Leistungen ansehen',
      otherIndustries: 'Weitere Branchen',
    },
    locations: {
      breadcrumb: 'Standorte',
      pageLabel: 'Standorte',
      pageTitle: 'Wir sind in Polen und Deutschland tätig',
      pageDesc:
        'Unsere Büros und Rekrutierungsteams betreuen Kunden in beiden Ländern — wir kennen lokale Vorschriften und die Besonderheiten des Arbeitsmarktes.',
      mapAria: 'Karte der Workify-Büros in Polen und Deutschland',
      mapShow: 'auf der Karte anzeigen',
      citiesPl: 'Städte in Polen',
      citiesDe: 'Städte in Deutschland',
    },
    process: {
      breadcrumb: 'So arbeiten wir',
      pageLabel: 'Prozess',
      pageTitle: 'Zusammenarbeit in 5 Schritten',
      pageDesc:
        'Ein einfacher und transparenter Prozess — vom ersten Gespräch bis zur Einsatzplanung des Personals an Ihrem Standort.',
      readyTitle: 'Bereit für den Start?',
      readyDesc:
        'Der erste Schritt ist ein kurzes Gespräch über Ihre Bedürfnisse. Wir erstellen innerhalb von 24 Stunden ein Angebot.',
      readyBtn: 'Zusammenarbeit starten',
    },
    faq: {
      breadcrumb: 'FAQ',
      pageLabel: 'FAQ',
      pageTitle: 'Häufig gestellte Fragen',
      pageDesc:
        'Antworten auf die Fragen, die unsere Kunden — Unternehmen auf Personalsuche — am häufigsten stellen.',
      notFoundTitle: 'Keine Antwort gefunden?',
      notFoundDesc:
        'Kontaktieren Sie uns — wir beantworten gerne alle Fragen zur Zusammenarbeit.',
    },
    contact: {
      breadcrumb: 'Kontakt',
      pageLabel: 'Kontakt',
      pageTitle: 'Sprechen wir über Ihre Bedürfnisse',
      pageDesc:
        'Beschreiben Sie Ihr Projekt — wir erstellen ein Angebot, das auf Ihre Branche und Ihren Standort zugeschnitten ist.',
      success:
        'Vielen Dank! Ihre Anfrage wurde gesendet. Wir melden uns innerhalb von 24 Stunden.',
      hours: 'Geschäftszeiten:',
      poland: 'Polen:',
      germany: 'Deutschland:',
      name: 'Vor- und Nachname *',
      company: 'Unternehmen *',
      email: 'E-Mail *',
      phone: 'Telefon',
      service: 'Anfragerichtung',
      division: 'Bereich der Workify-Gruppe',
      divisionPlaceholder: '— Bereich wählen —',
      message: 'Nachricht *',
      servicePlaceholder: '— Auswählen —',
      namePlaceholder: 'Max Mustermann',
      companyPlaceholder: 'Firmenname',
      emailPlaceholder: 'max@firma.de',
      phonePlaceholder: '+49 ...',
      messagePlaceholder: 'Beschreiben Sie Ihren Personalbedarf...',
      submit: 'Anfrage senden',
      select: '— Auswählen —',
    },
    notFound: {
      title: 'Seite nicht gefunden',
      errorTitle: 'Etwas ist schiefgelaufen',
      defaultMsg:
        'Die gesuchte Seite wurde nicht gefunden. Prüfen Sie die URL oder kehren Sie zur Startseite zurück.',
      homeBtn: 'Startseite',
    },
    cta: {
      title: 'Warum die Workify-Gruppe wählen?',
      desc: 'Beschreiben Sie Ihren Bedarf — wir erstellen innerhalb von 24 Stunden ein Angebot.',
      btn: 'Angebot anfordern',
    },
    facades: {
      breadcrumb: 'Fassaden',
      pageLabel: 'Fassaden',
      pageTitle: 'Umfassende Fassadenlösungen',
      pageDesc:
        'Wir planen, realisieren und warten Fassaden aller Art — für Bauträger, Ausführende und Immobilienverwalter in Polen und Deutschland.',
      clientsTitle: 'Für wen wir arbeiten',
      seeDetails: 'Details ansehen →',
      detailRoles: 'Leistungsumfang',
      askQuote: 'Fassade anfragen',
    },
    wholesale: {
      breadcrumb: 'Großhandel',
      pageLabel: 'Großhandel',
      pageTitle: 'Baumaterialien und Fassadenprodukte',
      pageDesc:
        'Großhandel der Workify-Gruppe — Lieferung verschiedener Materialtypen in ganz Polen und ausgewählten Regionen Deutschlands.',
      categoriesTitle: 'Materialkategorien',
      clientsTitle: 'Für wen',
      askQuote: 'Materialien anfragen',
    },
    cooperation: {
      breadcrumb: 'Zusammenarbeit',
      pageLabel: 'Zusammenarbeit',
      pageTitle: 'Kooperationsmodelle und Prozess-Outsourcing',
      pageDesc:
        'Flexible B2B-Kooperationsformen — angepasst an die Größe Ihres Unternehmens und die Art des Projekts.',
      modelsTitle: 'Kooperationsarten',
      clientsTitle: 'Für wen',
      askQuote: 'Kooperationsmodell besprechen',
    },
    crm: {
      dashboard: 'CRM',
      leads: 'Leads',
      logout: 'Abmelden',
      search: 'Leads suchen...',
      filterDivision: 'Alle Bereiche',
      filterStatus: 'Alle Status',
      statusNew: 'Neu',
      statusContacted: 'Kontakt',
      statusQualified: 'Qualifiziert',
      statusOffer: 'Angebot',
      statusWon: 'Gewonnen',
      statusLost: 'Verloren',
      addNote: 'Notiz hinzufügen',
      save: 'Speichern',
      delete: 'Lead löschen',
      back: 'Zurück zum CRM',
      notes: 'Notizen',
      history: 'Verlauf',
      noLeads: 'Keine Leads in dieser Spalte',
      statsTotal: 'Gesamt',
      statsNew: 'Neu',
      statsActive: 'Aktiv',
      statsWon: 'Gewonnen',
      divisionKadry: 'Personal',
      divisionRekrutacja: 'Rekrutierung',
      divisionOutsourcing: 'Outsourcing',
      divisionFasady: 'Fassaden',
      divisionHurtownia: 'Großhandel',
      divisionInne: 'Sonstige',
    },
  },

  meta: {
    home: {
      title: 'Workify — Zeitarbeitsagentur für Unternehmen',
      description:
        'Workify stellt qualifiziertes Personal für Lager, Fabriken, Baustellen und Straßenbau in Polen und Deutschland.',
    },
    about: {
      title: 'Über uns — Workify',
      description:
        'Lernen Sie Workify kennen — eine Zeitarbeitsagentur, die sich auf die Bereitstellung von Personal für Unternehmen in Polen und Deutschland spezialisiert hat.',
    },
    services: {
      title: 'Leistungen — Workify',
      description:
        'Arbeitnehmerüberlassung, Festanstellung, HR-Outsourcing und Projektpersonal — umfassende Personallösungen von Workify.',
    },
    industries: {
      title: 'Branchen — Workify',
      description:
        'Personal für Lager, Fabriken, Bauwesen, Straßenbau und viele weitere Branchen in Polen und Deutschland.',
    },
    locations: {
      title: 'Standorte — Workify',
      description:
        'Workify ist in Polen und Deutschland tätig — Warschau, Berlin, München und andere wichtige Industrieregionen.',
    },
    process: {
      title: 'So arbeiten wir — Workify',
      description:
        'Der Zusammenarbeitsprozess mit Workify — von der Bedarfsanalyse bis zur Einsatzplanung des Personals in 5 einfachen Schritten.',
    },
    faq: {
      title: 'FAQ — Workify',
      description: 'Häufig gestellte Fragen zur Zusammenarbeit mit der Zeitarbeitsagentur Workify.',
    },
    contact: {
      title: 'Kontakt — Workify',
      description:
        'Kontaktieren Sie Workify — wir erstellen ein Angebot, das auf Ihre Personalbedürfnisse zugeschnitten ist.',
    },
    facades: {
      title: 'Fassaden — Workify',
      description:
        'Umfassende Fassadenlösungen der Workify-Gruppe — Planung, Ausführung und Service in Polen und Deutschland.',
    },
    wholesale: {
      title: 'Großhandel — Workify',
      description:
        'Großhandel für Baumaterialien und Fassadenprodukte der Workify-Gruppe — Lieferungen in Polen und Deutschland.',
    },
    cooperation: {
      title: 'Zusammenarbeit — Workify',
      description:
        'B2B-Kooperationsmodelle und Prozess-Outsourcing in der Workify-Gruppe.',
    },
    notFound: {
      title: 'Nicht gefunden — Workify',
      description: 'Die gesuchte Seite wurde nicht gefunden.',
    },
  },

  site: {
    tagline: 'Unternehmensgruppe — Personal, Fassaden und Materialien',
    description:
      'Workify ist eine Unternehmensgruppe in Polen und Deutschland: Zeitarbeit, Rekrutierung, Outsourcing, Fassaden und Materialgroßhandel.',
    nav: [
      { label: 'Über uns', href: '/o-nas', id: 'about' },
      { label: 'Leistungen', href: '/uslugi', id: 'services' },
      { label: 'Fassaden', href: '/fasady', id: 'facades' },
      { label: 'Großhandel', href: '/hurtownia', id: 'wholesale' },
      { label: 'Zusammenarbeit', href: '/wspolpraca', id: 'cooperation' },
      { label: 'Branchen', href: '/branze', id: 'industries' },
      { label: 'Standorte', href: '/lokalizacje', id: 'locations' },
    ],
    stats: [
      { value: '500+', label: 'Eingestellte Mitarbeiter pro Jahr' },
      { value: '120+', label: 'Partnerunternehmen' },
      { value: '2', label: 'Länder — Polen und Deutschland' },
      { value: '48h', label: 'Durchschnittliche Bereitstellungszeit' },
    ],
    contact: {
      hours: 'Mo–Fr, 8:00–17:00',
      address: {
        pl: 'ul. Przykładowa 12, 00-001 Warszawa, Polen',
        de: 'Musterstraße 8, 10115 Berlin, Deutschland',
      },
    },
  },

  validation: {
    name: 'Bitte geben Sie Ihren Vor- und Nachnamen an.',
    company: 'Bitte geben Sie den Firmennamen an.',
    email: 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
    message: 'Bitte schreiben Sie eine Nachricht.',
  },

  services: [
    {
      title: 'Arbeitnehmerüberlassung',
      shortDesc:
        'Flexible Beschäftigung von Zeitarbeitnehmern für einen festgelegten Zeitraum — ideal bei saisonalen Spitzen.',
      desc: 'Arbeitnehmerüberlassung ist der schnellste Weg, Personalengpässe ohne langfristige Verpflichtungen zu schließen. Workify übernimmt Rekrutierung, Verträge und Abrechnung — Sie erhalten einsatzbereite Fachkräfte.',
      benefits: [
        'Flexibilität — skalieren Sie Ihr Team je nach Bedarf nach oben oder unten',
        'Kein Verwaltungsaufwand — wir kümmern uns um die Dokumentation',
        'Schnelle Einsatzplanung — Personal vor Ort innerhalb von 48 Stunden',
        'Vollständige Einhaltung des Arbeitsrechts in PL und DE',
      ],
    },
    {
      title: 'Festanstellung',
      shortDesc:
        'Wir suchen und prüfen Kandidaten für Festanstellungen in Ihrem Unternehmen. Sie sparen Zeit und HR-Kosten.',
      desc: 'Wenn Sie Ihr Team dauerhaft verstärken möchten, übernehmen wir den gesamten Rekrutierungsprozess — vom Stellenprofil bis zum Onboarding. Wir liefern geprüfte Kandidaten, die zu Ihrer Branche passen.',
      benefits: [
        'Gründliche Prüfung von Fähigkeiten und Erfahrung',
        'Praxistests und Referenzprüfung',
        'Ersatzgarantie in der Probezeit',
        'Unterstützung beim Onboarding neuer Mitarbeiter',
      ],
    },
    {
      title: 'HR-Outsourcing',
      shortDesc:
        'Wir übernehmen die Beschäftigungsverwaltung — Gehaltsabrechnung, Verträge, Arbeitsschutz. Sie erhalten ein einsatzbereites Team.',
      desc: 'HR-Outsourcing ist eine umfassende Lösung für Unternehmen, die sich auf die Produktion konzentrieren möchten, nicht auf Papierkram. Workify verwaltet den gesamten Beschäftigungszyklus Ihres Personals.',
      benefits: [
        'Abwicklung von Gehaltsabrechnung und Sozialversicherungsbeiträgen',
        'Verwaltung von Verträgen und Arbeitsschutzdokumentation',
        'Berichterstattung und Analyse der Personalkosten',
        'Ein Ansprechpartner für alle HR-Angelegenheiten',
      ],
    },
    {
      title: 'Projektpersonal',
      shortDesc:
        'Komplette Teams für große Bau- und Straßenbauprojekte. Schnelle Skalierung bei Bedarf.',
      desc: 'Für große Infrastruktur- und Bauprojekte stellen wir fertige Teams bereit — von Vorarbeitern bis zu Hilfskräften. Wir koordinieren Rotation, Unterbringung und Logistik.',
      benefits: [
        'Komplette Teams mit Projekterfahrung',
        'Koordination von Unterbringung und Transport',
        'Teamskalierung in jeder Projektphase',
        'Erfahrung in grenzüberschreitenden PL-DE-Projekten',
      ],
    },
  ],

  industries: [
    {
      title: 'Lager und Logistik',
      shortDesc:
        'Lagerarbeiter, Gabelstaplerfahrer, Kommissionierung, Sortierung und Verpackung.',
      desc: 'Wir stellen qualifiziertes Personal für Logistikzentren, E-Commerce-Lager und Distributionszentren. Unsere Mitarbeiter verfügen über UDT-Berechtigungen und Erfahrung mit WMS-Systemen.',
      roles: [
        'Lagerarbeiter',
        'Gabelstaplerfahrer',
        'Kommissionierer',
        'Sortierung und Verpackung',
        'Inbound-/Outbound-Mitarbeiter',
      ],
    },
    {
      title: 'Fabriken und Produktion',
      shortDesc:
        'Produktionslinienmitarbeiter, Maschinenbediener, Qualitätskontrolle, Montage und Verpackung.',
      desc: 'Wir betreuen Produktionsstätten in der Automobil-, FMCG-, Elektronik- und Schwerindustrie. Wir stellen Mitarbeiter mit Erfahrung an Montagelinien und in der Qualitätskontrolle.',
      roles: [
        'Maschinenbediener',
        'Produktionslinienmitarbeiter',
        'Qualitätsprüfer',
        'Monteur',
        'Verpacker',
      ],
    },
    {
      title: 'Bauwesen',
      shortDesc:
        'Bauarbeiter, Zimmerer, Bewehrungsarbeiter, Maurer, Helfer — in jeder Projektphase.',
      desc: 'Wir unterstützen Generalunternehmer und Bauunternehmen bei Wohn-, Gewerbe- und Industrieprojekten. Wir liefern Teams mit aktuellen Untersuchungen und BHP-Zertifikaten.',
      roles: [
        'Bauarbeiter',
        'Zimmerer',
        'Bewehrungsarbeiter',
        'Maurer',
        'Bauhelfer',
      ],
    },
    {
      title: 'Straßenbau',
      shortDesc:
        'Straßenbauteams, Pflasterer, Bediener von Baumaschinen, Mitarbeiter für Infrastrukturwartung.',
      desc: 'Wir sind spezialisiert auf die Bereitstellung von Personal für Infrastrukturprojekte — Straßen- und Brückenbau, Asphaltierung und Erhaltung der Straßeninfrastruktur.',
      roles: [
        'Straßenbauarbeiter',
        'Pflasterer',
        'Bediener von Bagger/Walze',
        'Brückenbewehrungsarbeiter',
        'Mitarbeiter für Straßenerhaltung',
      ],
    },
    {
      title: 'Schwerindustrie',
      shortDesc:
        'Schweißer, Schlosser, CNC-Bediener, Stahlkonstruktionsmonteure und Instandhaltungsmechaniker.',
      desc: 'Für Schwerindustriebetriebe, Werften und Hütten liefern wir qualifizierte Fachkräfte mit entsprechenden Zertifikaten und Berufsberechtigungen.',
      roles: [
        'Schweißer',
        'Schlosser',
        'CNC-Bediener',
        'Konstruktionsmonteur',
        'Instandhaltungsmechaniker',
      ],
    },
    {
      title: 'Saisonarbeit',
      shortDesc:
        'Saisonpersonal für Landwirtschaft, Gartenbau, saisonale Produktion und Lager in der Hochsaison.',
      desc: 'In Zeiten erhöhter Nachfrage stellen wir schnell Saisonpersonal mit vollständiger Personal- und Logistikbetreuung bereit.',
      roles: [
        'Saisonarbeiter',
        'Sortierung von Obst/Gemüse',
        'Gewächshausmitarbeiter',
        'Saisonlagerarbeiter',
      ],
    },
  ],

  faq: [
    {
      q: 'Für wen ist Workify?',
      a: 'Workify betreut Unternehmen und Firmen auf Personalsuche — Lager, Fabriken, Bauunternehmen, Straßenbauunternehmen und andere. Wir sind kein Stellenportal für Arbeitssuchende.',
    },
    {
      q: 'Wie schnell können Sie Personal bereitstellen?',
      a: 'Die Standardzeit beträgt 48–72 Stunden nach Annahme des Angebots. In dringenden Fällen können wir Personal innerhalb von 24 Stunden bereitstellen, abhängig von Verfügbarkeit und Positionsanforderungen.',
    },
    {
      q: 'Betreuen Sie auch Unternehmen in Deutschland?',
      a: 'Ja. Wir haben Erfahrung in der Beschäftigung von Mitarbeitern sowohl in Polen als auch in Deutschland, mit vollständiger Einhaltung des lokalen Arbeitsrechts und der A1-Vorschriften.',
    },
    {
      q: 'Wer ist der formale Arbeitgeber?',
      a: 'Im Modell der Arbeitnehmerüberlassung und des HR-Outsourcing ist Workify der formale Arbeitgeber. Sie leiten die Arbeit, wir kümmern uns um Verträge, Gehälter und Beiträge.',
    },
    {
      q: 'Welche Branchen betreuen Sie?',
      a: 'Wir sind spezialisiert auf Lager, Produktion, Bauwesen, Straßenbau, Schwerindustrie und Saisonarbeit. Wenn Ihre Branche physisches Personal benötigt — kontaktieren Sie uns.',
    },
    {
      q: 'Bieten Sie Unterbringung an?',
      a: 'Ja, insbesondere bei grenzüberschreitenden und langfristigen Projekten. Wir organisieren Unterbringung gemäß BHP-Normen und lokalen Vorschriften.',
    },
    {
      q: 'Wie funktioniert die Preisgestaltung?',
      a: 'Die Preisgestaltung hängt von Position, Standort, Anzahl der Mitarbeiter und Zusammenarbeitszeitraum ab. Wir erstellen ein individuelles Angebot nach einem kurzen Gespräch — unverbindlich.',
    },
  ],

  process: [
    {
      title: 'Bedarfsanalyse',
      desc: 'Wir sprechen über Ihr Projekt — Branche, Anzahl der Positionen, erforderliche Qualifikationen, Standort und Starttermin.',
    },
    {
      title: 'Angebot und Preisgestaltung',
      desc: 'Wir erstellen ein maßgeschneidertes Angebot mit transparenter Preisgestaltung. Keine versteckten Kosten — Sie wissen genau, wofür Sie zahlen.',
    },
    {
      title: 'Rekrutierung und Prüfung',
      desc: 'Wir suchen Kandidaten in unserer Datenbank und auf dem Markt. Wir prüfen Fähigkeiten, Dokumente und Berechtigungen.',
    },
    {
      title: 'Einsatzplanung des Personals',
      desc: 'Wir organisieren Transport, Unterbringung (falls erforderlich) und Arbeitsschutzschulung. Mitarbeiter sind einsatzbereit.',
    },
    {
      title: 'Laufende Betreuung',
      desc: 'Ein Kundenbetreuer ist während der gesamten Zusammenarbeit erreichbar. Schneller Personalaustausch bei Bedarf.',
    },
  ],

  locations: {
    pl: {
      name: 'Polen',
      desc: 'Wir betreuen Kunden in ganz Polen. Unser Hauptsitz befindet sich in Warschau, und Rekrutierungsteams sind in wichtigen Industrieregionen tätig.',
      address: 'ul. Przykładowa 12, 00-001 Warszawa',
    },
    de: {
      name: 'Deutschland',
      desc: 'Wir unterstützen deutsche Unternehmen bei der Gewinnung qualifizierten Personals. Wir kennen das deutsche Arbeitsrecht und die formalen Beschäftigungsanforderungen.',
      address: 'Musterstraße 8, 10115 Berlin',
    },
  },

  divisions: group.divisions,
  facades: group.facades,
  wholesale: group.wholesale,
  cooperation: group.cooperation,
});
