// AB2PRO Mobile — L'intérim, nouvelle génération.
// Application démo pour intérimaires en poste — un seul fichier App.js (Expo Snack / Expo Go)
// Aucune dépendance externe : uniquement React Native.

import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, Alert, StatusBar, Linking, KeyboardAvoidingView, Platform,
} from 'react-native';

const C = {
  navy: '#101D35',
  bordeaux: '#70263F',
  rose: '#E0A9BC',
  roseLight: '#F7E6EC',
  bg: '#F4F5F8',
  white: '#FFFFFF',
  text: '#1B2333',
  muted: '#6B7385',
  border: '#E1E4EA',
  green: '#2E7D5B',
  orange: '#B26A00',
  yellow: '#F2B705', // jaune chantier
};

const LANGS = [
  { code: 'fr', label: 'Français' },
  { code: 'ro', label: 'Română' },
  { code: 'hu', label: 'Magyar' },
  { code: 'bg', label: 'Български' },
  { code: 'pl', label: 'Polski' },
];

const T = {
  fr: {
    slogan: "L'intérim, nouvelle génération.", signIn: 'Se connecter', email: 'Identifiant ou e-mail', password: 'Mot de passe', faceId: 'Connexion avec Face ID', language: 'Langue', logout: 'Se déconnecter', back: 'Retour',
    home: 'Accueil', chantier: 'Mon chantier', planning: 'Planning', salary: 'Salaires', advances: 'Acomptes', hours: 'Heures', referral: 'Parrainage', travel: 'Prime voyage', documents: 'Documents', messages: 'Messagerie', copilot: 'AB2PRO Copilot', profile: 'Profil', agency: 'Espace agence',
    hello: 'Bonjour', currentMission: 'Chantier en cours', hoursThisMonth: 'Heures ce mois', nextShift: 'Prochain poste', quickAccess: 'Accès rapide', notifications: 'Notifications',
    amount: 'Montant (€)', send: 'Envoyer', requestAdvance: 'Demander un acompte', available: 'Disponible', approved: 'Validé', pending: 'En attente',
    advanceRules: 'Maximum 3 acomptes par mois, plafond total de 1 000 €. Demandes possibles à partir du 13 du mois.', advanceClosed: "Les demandes d'acompte ouvrent le 13 du mois.", advanceLimitCount: 'Vous avez atteint 3 demandes ce mois-ci.', advanceLimitAmount: 'Montant supérieur au plafond disponible.', advanceSent: 'Demande envoyée.', history: 'Historique', requestsUsed: 'Demandes utilisées',
    payslip: 'Bulletin de paie', net: 'Net', gross: 'Brut', download: 'Télécharger',
    weekHours: 'Heures de la semaine', declare: 'Déclarer mes heures', declared: "Heures déclarées. Validation par l'agence en attente.", total: 'Total',
    referralText: 'Parrainez un proche : 150 € versés après validation de sa mission.', friendName: 'Nom du filleul', phone: 'Téléphone', referralSent: 'Parrainage envoyé.',
    travelText: 'Prime voyage de 400 € à partir de 300 heures travaillées.', progress: 'Progression', eligible: 'Vous êtes éligible.', notEligible: 'Heures restantes', license: 'Permis de conduire', registration: "Certificat d'immatriculation", idCard: "Pièce d'identité", tickets: 'Photos des bons', add: 'Ajouter', added: 'Ajouté', submit: 'Envoyer le dossier', travelNotif: 'Dossier reçu. Merci de remettre les bons originaux à votre recruteur.', missingDocs: 'Merci d\'ajouter tous les justificatifs.',
    iban: 'IBAN', bic: 'BIC', changeIban: 'Modifier mon RIB', save: 'Enregistrer', ibanSaved: 'RIB mis à jour. Il sera pris en compte sur la prochaine paie.', ibanInvalid: 'IBAN invalide.', personalInfo: 'Informations personnelles',
    copilotWelcome: 'Bonjour, je suis AB2PRO Copilot. Posez-moi une question sur vos acomptes, salaires, heures, planning ou documents.', typeMessage: 'Écrire un message',
    agencyText: 'Votre agence AB2PRO', call: 'Appeler', write: 'Écrire', hoursOpen: "Horaires d'ouverture",
    site: 'Adresse du chantier', schedule: 'Horaires', contact: 'Chef de chantier', safety: 'Sécurité', rate: 'Taux horaire', details: 'Voir le chantier', start: 'Début', end: 'Fin',
    notif1: 'Votre bulletin de paie est disponible.', notif2: 'Nouveau planning chantier publié pour la semaine prochaine.',
    holder: 'Titulaire du compte', holderPh: 'Nom et prénom du titulaire', ribNotice: 'Le RIB doit obligatoirement être à votre nom. Un RIB au nom d\'une autre personne sera refusé.', holderRequired: 'Merci d\'indiquer le nom du titulaire du compte.', holderMismatch: 'Le titulaire du compte doit être vous-même ({name}). Les RIB au nom d\'une autre personne ne sont pas acceptés.', ppe: 'EPI obligatoires', task: 'Poste', siteWeek: 'Planning chantier', route: 'Itinéraire', today: 'Aujourd\'hui', days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  },
  ro: {
    slogan: 'Munca temporară, noua generație.', signIn: 'Conectare', email: 'Identificator sau e-mail', password: 'Parolă', faceId: 'Conectare cu Face ID', language: 'Limbă', logout: 'Deconectare', back: 'Înapoi',
    home: 'Acasă', chantier: 'Șantierul meu', planning: 'Program', salary: 'Salarii', advances: 'Avansuri', hours: 'Ore', referral: 'Recomandare', travel: 'Primă de călătorie', documents: 'Documente', messages: 'Mesagerie', copilot: 'AB2PRO Copilot', profile: 'Profil', agency: 'Agenție',
    hello: 'Bună ziua', currentMission: 'Șantierul curent', hoursThisMonth: 'Ore luna aceasta', nextShift: 'Următorul post', quickAccess: 'Acces rapid', notifications: 'Notificări',
    amount: 'Sumă (€)', send: 'Trimite', requestAdvance: 'Solicită un avans', available: 'Disponibil', approved: 'Aprobat', pending: 'În așteptare',
    advanceRules: 'Maximum 3 avansuri pe lună, plafon total de 1 000 €. Cereri posibile începând cu data de 13 a lunii.', advanceClosed: 'Cererile de avans se deschid pe 13 ale lunii.', advanceLimitCount: 'Ați atins 3 cereri luna aceasta.', advanceLimitAmount: 'Suma depășește plafonul disponibil.', advanceSent: 'Cerere trimisă.', history: 'Istoric', requestsUsed: 'Cereri folosite',
    payslip: 'Fluturaș de salariu', net: 'Net', gross: 'Brut', download: 'Descarcă',
    weekHours: 'Orele săptămânii', declare: 'Declară orele', declared: 'Ore declarate. Validarea agenției în așteptare.', total: 'Total',
    referralText: 'Recomandați o persoană apropiată: 150 € plătiți după validarea misiunii sale.', friendName: 'Numele persoanei recomandate', phone: 'Telefon', referralSent: 'Recomandare trimisă.',
    travelText: 'Primă de călătorie de 400 € începând de la 300 de ore lucrate.', progress: 'Progres', eligible: 'Sunteți eligibil.', notEligible: 'Ore rămase', license: 'Permis de conducere', registration: 'Certificat de înmatriculare', idCard: 'Act de identitate', tickets: 'Fotografii ale bonurilor', add: 'Adaugă', added: 'Adăugat', submit: 'Trimite dosarul', travelNotif: 'Dosar primit. Vă rugăm să predați bonurile originale recrutorului.', missingDocs: 'Vă rugăm să adăugați toate documentele justificative.',
    iban: 'IBAN', bic: 'BIC', changeIban: 'Modifică contul bancar', save: 'Salvează', ibanSaved: 'Cont bancar actualizat. Va fi luat în calcul la următorul salariu.', ibanInvalid: 'IBAN invalid.', personalInfo: 'Informații personale',
    copilotWelcome: 'Bună ziua, sunt AB2PRO Copilot. Puneți-mi o întrebare despre avansuri, salarii, ore, program sau documente.', typeMessage: 'Scrieți un mesaj',
    agencyText: 'Agenția dumneavoastră AB2PRO', call: 'Sună', write: 'Scrie', hoursOpen: 'Program de lucru',
    site: 'Adresa șantierului', schedule: 'Program', contact: 'Șef de șantier', safety: 'Siguranță', rate: 'Tarif orar', details: 'Vezi șantierul', start: 'Început', end: 'Sfârșit',
    notif1: 'Fluturașul de salariu este disponibil.', notif2: 'Programul de șantier pentru săptămâna viitoare a fost publicat.',
    holder: 'Titularul contului', holderPh: 'Numele și prenumele titularului', ribNotice: 'Contul bancar (RIB) trebuie să fie obligatoriu pe numele dumneavoastră. Un cont pe numele altei persoane va fi refuzat.', holderRequired: 'Vă rugăm să indicați numele titularului contului.', holderMismatch: 'Titularul contului trebuie să fiți chiar dumneavoastră ({name}). Conturile pe numele altei persoane nu sunt acceptate.', ppe: 'EIP obligatorii', task: 'Post', siteWeek: 'Program șantier', route: 'Itinerariu', today: 'Azi', days: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
  },
  hu: {
    slogan: 'A munkaerő-kölcsönzés új generációja.', signIn: 'Bejelentkezés', email: 'Azonosító vagy e-mail', password: 'Jelszó', faceId: 'Bejelentkezés Face ID-val', language: 'Nyelv', logout: 'Kijelentkezés', back: 'Vissza',
    home: 'Kezdőlap', chantier: 'Építkezésem', planning: 'Beosztás', salary: 'Bérek', advances: 'Előlegek', hours: 'Órák', referral: 'Ajánlás', travel: 'Utazási prémium', documents: 'Dokumentumok', messages: 'Üzenetek', copilot: 'AB2PRO Copilot', profile: 'Profil', agency: 'Ügynökség',
    hello: 'Jó napot', currentMission: 'Aktuális építkezés', hoursThisMonth: 'Órák ebben a hónapban', nextShift: 'Következő műszak', quickAccess: 'Gyors elérés', notifications: 'Értesítések',
    amount: 'Összeg (€)', send: 'Küldés', requestAdvance: 'Előleg igénylése', available: 'Elérhető', approved: 'Jóváhagyva', pending: 'Folyamatban',
    advanceRules: 'Havonta legfeljebb 3 előleg, összesen 1 000 € felső határ. Igénylés a hónap 13. napjától lehetséges.', advanceClosed: 'Az előlegigénylés a hónap 13. napján nyílik.', advanceLimitCount: 'Ebben a hónapban elérte a 3 igénylést.', advanceLimitAmount: 'Az összeg meghaladja az elérhető keretet.', advanceSent: 'Igénylés elküldve.', history: 'Előzmények', requestsUsed: 'Felhasznált igénylések',
    payslip: 'Bérjegyzék', net: 'Nettó', gross: 'Bruttó', download: 'Letöltés',
    weekHours: 'Heti órák', declare: 'Órák bejelentése', declared: 'Órák bejelentve. Az ügynökség jóváhagyására vár.', total: 'Összesen',
    referralText: 'Ajánljon egy ismerőst: 150 € jár a megbízása jóváhagyása után.', friendName: 'Az ajánlott neve', phone: 'Telefon', referralSent: 'Ajánlás elküldve.',
    travelText: '400 € utazási prémium 300 ledolgozott órától.', progress: 'Előrehaladás', eligible: 'Ön jogosult.', notEligible: 'Hátralévő órák', license: 'Jogosítvány', registration: 'Forgalmi engedély', idCard: 'Személyi igazolvány', tickets: 'Bizonylatok fotói', add: 'Hozzáadás', added: 'Hozzáadva', submit: 'Dosszié küldése', travelNotif: 'Dosszié beérkezett. Kérjük, adja le az eredeti bizonylatokat a toborzónak.', missingDocs: 'Kérjük, adja hozzá az összes igazoló dokumentumot.',
    iban: 'IBAN', bic: 'BIC', changeIban: 'Bankszámla módosítása', save: 'Mentés', ibanSaved: 'Bankszámla frissítve. A következő bérfizetéskor érvényes.', ibanInvalid: 'Érvénytelen IBAN.', personalInfo: 'Személyes adatok',
    copilotWelcome: 'Jó napot, AB2PRO Copilot vagyok. Kérdezzen előlegekről, bérekről, órákról, beosztásról vagy dokumentumokról.', typeMessage: 'Üzenet írása',
    agencyText: 'Az Ön AB2PRO ügynöksége', call: 'Hívás', write: 'Írás', hoursOpen: 'Nyitvatartás',
    site: 'Az építkezés címe', schedule: 'Munkaidő', contact: 'Építésvezető', safety: 'Biztonság', rate: 'Órabér', details: 'Építkezés megnyitása', start: 'Kezdés', end: 'Befejezés',
    notif1: 'Elérhető a bérjegyzéke.', notif2: 'Megjelent a jövő heti építkezési beosztás.',
    holder: 'Számlatulajdonos', holderPh: 'A számlatulajdonos teljes neve', ribNotice: 'A bankszámlának kötelezően az Ön nevén kell lennie. Más nevére szóló számlát elutasítunk.', holderRequired: 'Kérjük, adja meg a számlatulajdonos nevét.', holderMismatch: 'A számlatulajdonosnak Önnek kell lennie ({name}). Más személy nevére szóló számlát nem fogadunk el.', ppe: 'Kötelező védőfelszerelés', task: 'Feladat', siteWeek: 'Építkezési beosztás', route: 'Útvonal', today: 'Ma', days: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
  },
  bg: {
    slogan: 'Временната заетост от ново поколение.', signIn: 'Вход', email: 'Идентификатор или имейл', password: 'Парола', faceId: 'Вход с Face ID', language: 'Език', logout: 'Изход', back: 'Назад',
    home: 'Начало', chantier: 'Моят обект', planning: 'График', salary: 'Заплати', advances: 'Аванси', hours: 'Часове', referral: 'Препоръка', travel: 'Пътна премия', documents: 'Документи', messages: 'Съобщения', copilot: 'AB2PRO Copilot', profile: 'Профил', agency: 'Агенция',
    hello: 'Здравейте', currentMission: 'Текущ обект', hoursThisMonth: 'Часове този месец', nextShift: 'Следваща смяна', quickAccess: 'Бърз достъп', notifications: 'Известия',
    amount: 'Сума (€)', send: 'Изпрати', requestAdvance: 'Заявка за аванс', available: 'Налично', approved: 'Одобрено', pending: 'Изчакване',
    advanceRules: 'Максимум 3 аванса на месец, общ лимит 1 000 €. Заявки от 13-о число на месеца.', advanceClosed: 'Заявките за аванс се отварят на 13-о число.', advanceLimitCount: 'Достигнахте 3 заявки този месец.', advanceLimitAmount: 'Сумата надвишава наличния лимит.', advanceSent: 'Заявката е изпратена.', history: 'История', requestsUsed: 'Използвани заявки',
    payslip: 'Фиш за заплата', net: 'Нето', gross: 'Бруто', download: 'Изтегли',
    weekHours: 'Часове за седмицата', declare: 'Декларирай часове', declared: 'Часовете са декларирани. Очаква се одобрение от агенцията.', total: 'Общо',
    referralText: 'Препоръчайте близък човек: 150 € след одобрение на неговата мисия.', friendName: 'Име на препоръчания', phone: 'Телефон', referralSent: 'Препоръката е изпратена.',
    travelText: 'Пътна премия от 400 € след 300 изработени часа.', progress: 'Напредък', eligible: 'Имате право на премията.', notEligible: 'Оставащи часове', license: 'Шофьорска книжка', registration: 'Талон на автомобила', idCard: 'Лична карта', tickets: 'Снимки на бележките', add: 'Добави', added: 'Добавено', submit: 'Изпрати досието', travelNotif: 'Досието е получено. Моля, предайте оригиналните бележки на вашия рекрутер.', missingDocs: 'Моля, добавете всички документи.',
    iban: 'IBAN', bic: 'BIC', changeIban: 'Промяна на банковата сметка', save: 'Запази', ibanSaved: 'Банковата сметка е обновена. Ще се използва при следващата заплата.', ibanInvalid: 'Невалиден IBAN.', personalInfo: 'Лични данни',
    copilotWelcome: 'Здравейте, аз съм AB2PRO Copilot. Задайте въпрос за аванси, заплати, часове, график или документи.', typeMessage: 'Напишете съобщение',
    agencyText: 'Вашата агенция AB2PRO', call: 'Обаждане', write: 'Пиши', hoursOpen: 'Работно време',
    site: 'Адрес на обекта', schedule: 'Работно време', contact: 'Ръководител на обекта', safety: 'Безопасност', rate: 'Часова ставка', details: 'Виж обекта', start: 'Начало', end: 'Край',
    notif1: 'Фишът ви за заплата е наличен.', notif2: 'Публикуван е графикът на обекта за следващата седмица.',
    holder: 'Титуляр на сметката', holderPh: 'Име и фамилия на титуляря', ribNotice: 'Банковата сметка трябва задължително да е на ваше име. Сметка на името на друго лице ще бъде отказана.', holderRequired: 'Моля, въведете името на титуляря на сметката.', holderMismatch: 'Титулярят на сметката трябва да сте вие ({name}). Сметки на името на друго лице не се приемат.', ppe: 'Задължителни ЛПС', task: 'Задача', siteWeek: 'График на обекта', route: 'Маршрут', today: 'Днес', days: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  },
  pl: {
    slogan: 'Praca tymczasowa nowej generacji.', signIn: 'Zaloguj się', email: 'Login lub e-mail', password: 'Hasło', faceId: 'Logowanie przez Face ID', language: 'Język', logout: 'Wyloguj', back: 'Wstecz',
    home: 'Start', chantier: 'Moja budowa', planning: 'Grafik', salary: 'Wynagrodzenia', advances: 'Zaliczki', hours: 'Godziny', referral: 'Polecenia', travel: 'Premia za dojazd', documents: 'Dokumenty', messages: 'Wiadomości', copilot: 'AB2PRO Copilot', profile: 'Profil', agency: 'Agencja',
    hello: 'Dzień dobry', currentMission: 'Bieżąca budowa', hoursThisMonth: 'Godziny w tym miesiącu', nextShift: 'Następna zmiana', quickAccess: 'Szybki dostęp', notifications: 'Powiadomienia',
    amount: 'Kwota (€)', send: 'Wyślij', requestAdvance: 'Poproś o zaliczkę', available: 'Dostępne', approved: 'Zatwierdzono', pending: 'Oczekuje',
    advanceRules: 'Maksymalnie 3 zaliczki miesięcznie, łączny limit 1 000 €. Wnioski od 13. dnia miesiąca.', advanceClosed: 'Wnioski o zaliczkę otwierają się 13. dnia miesiąca.', advanceLimitCount: 'Osiągnięto 3 wnioski w tym miesiącu.', advanceLimitAmount: 'Kwota przekracza dostępny limit.', advanceSent: 'Wniosek wysłany.', history: 'Historia', requestsUsed: 'Wykorzystane wnioski',
    payslip: 'Pasek wypłaty', net: 'Netto', gross: 'Brutto', download: 'Pobierz',
    weekHours: 'Godziny w tygodniu', declare: 'Zgłoś godziny', declared: 'Godziny zgłoszone. Oczekuje na zatwierdzenie agencji.', total: 'Razem',
    referralText: 'Poleć bliską osobę: 150 € po zatwierdzeniu jej misji.', friendName: 'Imię i nazwisko polecanego', phone: 'Telefon', referralSent: 'Polecenie wysłane.',
    travelText: 'Premia za dojazd 400 € od 300 przepracowanych godzin.', progress: 'Postęp', eligible: 'Przysługuje Ci premia.', notEligible: 'Pozostałe godziny', license: 'Prawo jazdy', registration: 'Dowód rejestracyjny', idCard: 'Dokument tożsamości', tickets: 'Zdjęcia paragonów', add: 'Dodaj', added: 'Dodano', submit: 'Wyślij dokumenty', travelNotif: 'Dokumenty otrzymane. Prosimy przekazać oryginalne paragony rekruterowi.', missingDocs: 'Prosimy dodać wszystkie dokumenty.',
    iban: 'IBAN', bic: 'BIC', changeIban: 'Zmień konto bankowe', save: 'Zapisz', ibanSaved: 'Konto bankowe zaktualizowane. Zostanie uwzględnione przy następnej wypłacie.', ibanInvalid: 'Nieprawidłowy IBAN.', personalInfo: 'Dane osobowe',
    copilotWelcome: 'Dzień dobry, jestem AB2PRO Copilot. Zapytaj o zaliczki, wynagrodzenia, godziny, grafik lub dokumenty.', typeMessage: 'Napisz wiadomość',
    agencyText: 'Twoja agencja AB2PRO', call: 'Zadzwoń', write: 'Napisz', hoursOpen: 'Godziny otwarcia',
    site: 'Adres budowy', schedule: 'Godziny pracy', contact: 'Kierownik budowy', safety: 'Bezpieczeństwo', rate: 'Stawka godzinowa', details: 'Zobacz budowę', start: 'Początek', end: 'Koniec',
    notif1: 'Twój pasek wypłaty jest dostępny.', notif2: 'Opublikowano grafik budowy na przyszły tydzień.',
    holder: 'Właściciel konta', holderPh: 'Imię i nazwisko właściciela', ribNotice: 'Konto bankowe musi być obowiązkowo na Twoje nazwisko. Konto na nazwisko innej osoby zostanie odrzucone.', holderRequired: 'Podaj imię i nazwisko właściciela konta.', holderMismatch: 'Właścicielem konta musisz być Ty ({name}). Konta na nazwisko innej osoby nie są akceptowane.', ppe: 'Obowiązkowe ŚOI', task: 'Stanowisko', siteWeek: 'Grafik budowy', route: 'Trasa', today: 'Dziś', days: ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'],
  },
};

// ---------- Données de démonstration ----------
const USER = { first: 'Alexandru', last: 'Popescu', id: 'INT-20481', email: 'a.popescu@email.com', phone: '+33 6 12 34 56 78' };
const CHANTIER = {
  title: 'Maçon coffreur', company: 'BTP Nord Construction', name: 'Résidence Les Tilleuls — 48 logements',
  city: "Villeneuve-d'Ascq (59)", address: "Chantier Les Tilleuls, 18 rue de la Briqueterie, 59650 Villeneuve-d'Ascq",
  start: '02/11/2026', end: '30/04/2027', rate: '14,50 €', hours: '07:30 - 16:30',
  contact: 'M. Durand — 06 12 00 00 00', phone: '0612000000',
  safety: 'Casque, chaussures de sécurité, gilet haute visibilité, gants, lunettes de protection',
};
// day : 0 = dimanche … 6 = samedi
const SHIFTS = [
  { day: 3, d: '25/11', h: '07:30 - 16:30', task: 'Coffrage voiles R+1', zone: 'Bâtiment A' },
  { day: 4, d: '26/11', h: '07:30 - 16:30', task: 'Coffrage voiles R+1', zone: 'Bâtiment A' },
  { day: 5, d: '27/11', h: '07:30 - 12:00', task: 'Ferraillage dalle', zone: 'Bâtiment A' },
  { day: 1, d: '30/11', h: '07:30 - 16:30', task: 'Coulage dalle R+1', zone: 'Bâtiment A' },
  { day: 2, d: '01/12', h: '07:30 - 16:30', task: 'Décoffrage', zone: 'Bâtiment B' },
  { day: 3, d: '02/12', h: '07:30 - 16:30', task: 'Montage agglos', zone: 'Bâtiment B' },
];
const PAYSLIPS = [
  { m: '10/2026', net: '1 842,50 €', gross: '2 361,00 €' },
  { m: '09/2026', net: '1 790,20 €', gross: '2 294,00 €' },
  { m: '08/2026', net: '1 655,80 €', gross: '2 122,00 €' },
];
const DOCS = ['Contrat de mission — Les Tilleuls', 'Avenant de prolongation', 'Attestation employeur', 'Bulletin de paie 10/2026', 'Carte BTP', 'Habilitation travail en hauteur'];
const TOTAL_HOURS = 312; // heures cumulées pour la prime voyage

// ---------- Composants ----------
const Card = ({ children, style }) => <View style={[s.card, style]}>{children}</View>;
const Btn = ({ title, onPress, variant = 'primary', style }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}
    style={[s.btn, variant === 'outline' && s.btnOutline, variant === 'navy' && { backgroundColor: C.navy }, style]}>
    <Text style={[s.btnText, variant === 'outline' && { color: C.bordeaux }]}>{title}</Text>
  </TouchableOpacity>
);
const Row = ({ label, value }) => (
  <View style={s.row}><Text style={s.rowLabel}>{label}</Text><Text style={s.rowValue}>{value}</Text></View>
);
const Input = (props) => <TextInput placeholderTextColor={C.muted} style={s.input} {...props} />;
const Title = ({ children }) => <Text style={s.sectionTitle}>{children}</Text>;
const Badge = ({ text, color }) => (
  <View style={[s.badge, { backgroundColor: color + '22' }]}><Text style={{ color, fontWeight: '700', fontSize: 12 }}>{text}</Text></View>
);

// ---------- Application ----------
export default function App() {
  const [lang, setLang] = useState('fr');
  const [logged, setLogged] = useState(false);
  const [screen, setScreen] = useState('home');
  const t = (k) => (T[lang] && T[lang][k]) || T.fr[k] || k;

  // États partagés
  const [advances, setAdvances] = useState([{ date: '14/11/2026', amount: 200, status: 'approved' }]);
  const [iban, setIban] = useState('FR76 3000 6000 0112 3456 7890 189');
  const [holder, setHolder] = useState(USER.first + ' ' + USER.last);
  const [messages, setMessages] = useState([
    { from: 'agency', text: 'Bonjour Alexandru, votre planning de la semaine prochaine est disponible.' },
  ]);

  if (!logged) return <Login t={t} lang={lang} setLang={setLang} onLogin={() => setLogged(true)} />;

  const go = (sc) => setScreen(sc);
  const titles = { home: 'AB2PRO Mobile' };
  const title = titles[screen] || t(screen);
  const tabs = ['home', 'chantier', 'planning', 'messages', 'profile'];

  let content;
  switch (screen) {
    case 'chantier': content = <Chantier t={t} />; break;
    case 'planning': content = <Planning t={t} />; break;
    case 'salary': content = <Salary t={t} />; break;
    case 'advances': content = <Advances t={t} list={advances} setList={setAdvances} />; break;
    case 'hours': content = <Hours t={t} />; break;
    case 'referral': content = <Referral t={t} />; break;
    case 'travel': content = <Travel t={t} />; break;
    case 'documents': content = <Documents t={t} />; break;
    case 'messages': content = <Messages t={t} list={messages} setList={setMessages} />; break;
    case 'copilot': content = <Copilot t={t} />; break;
    case 'profile': content = <Profile t={t} lang={lang} setLang={setLang} iban={iban} setIban={setIban} holder={holder} setHolder={setHolder} logout={() => { setLogged(false); setScreen('home'); }} />; break;
    case 'agency': content = <Agency t={t} go={go} />; break;
    default: content = <Home t={t} go={go} advances={advances} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.navy }}>
      <StatusBar barStyle="light-content" backgroundColor={C.navy} />
      <View style={s.header}>
        {screen !== 'home' ? (
          <TouchableOpacity onPress={() => go('home')} style={s.backBtn}>
            <Text style={s.backText}>{'< ' + t('back')}</Text>
          </TouchableOpacity>
        ) : <View style={s.backBtn} />}
        <Text style={s.headerTitle} numberOfLines={1}>{title}</Text>
        <View style={s.backBtn} />
      </View>
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: C.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {content}
      </KeyboardAvoidingView>
      <View style={s.tabBar}>
        {tabs.map((k) => (
          <TouchableOpacity key={k} style={s.tab} onPress={() => go(k)}>
            <View style={[s.tabDot, screen === k && { backgroundColor: C.rose }]} />
            <Text style={[s.tabText, screen === k && { color: C.white, fontWeight: '700' }]} numberOfLines={1}>{t(k)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

// ---------- Écrans ----------
function Login({ t, lang, setLang, onLogin }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.navy }}>
      <StatusBar barStyle="light-content" backgroundColor={C.navy} />
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 60 }}>
        <Text style={s.logo}>AB2PRO</Text>
        <Text style={s.logoSub}>MOBILE</Text>
        <Text style={s.slogan}>{t('slogan')}</Text>
        <View style={s.loginCard}>
          <Input placeholder={t('email')} value={id} onChangeText={setId} autoCapitalize="none" />
          <Input placeholder={t('password')} value={pw} onChangeText={setPw} secureTextEntry />
          <Btn title={t('signIn')} onPress={onLogin} />
          <Btn title={t('faceId')} variant="outline" onPress={onLogin} style={{ marginTop: 10 }} />
        </View>
        <Text style={[s.slogan, { marginTop: 24, marginBottom: 8 }]}>{t('language')}</Text>
        <View style={s.langRow}>
          {LANGS.map((l) => (
            <TouchableOpacity key={l.code} onPress={() => setLang(l.code)}
              style={[s.langChip, lang === l.code && { backgroundColor: C.rose }]}>
              <Text style={{ color: lang === l.code ? C.navy : C.white, fontWeight: '600' }}>{l.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={s.footer}>Une application unique. Tous vos services.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Home({ t, go, advances }) {
  const modules = ['chantier', 'planning', 'salary', 'advances', 'hours', 'referral', 'travel', 'documents', 'messages', 'copilot', 'agency'];
  const used = advances.reduce((a, b) => a + b.amount, 0);
  return (
    <ScrollView contentContainerStyle={s.page}>
      <View style={s.hero}>
        <Text style={s.heroHello}>{t('hello')}, {USER.first}</Text>
        <Text style={s.heroSub}>{t('currentMission')} : {CHANTIER.name}{'\n'}{CHANTIER.title} — {CHANTIER.company}</Text>
      </View>
      <View style={s.statRow}>
        <Card style={s.stat}><Text style={s.statValue}>142 h</Text><Text style={s.statLabel}>{t('hoursThisMonth')}</Text></Card>
        <Card style={s.stat}><Text style={s.statValue}>{1000 - used} €</Text><Text style={s.statLabel}>{t('advances')} — {t('available')}</Text></Card>
      </View>
      <Card>
        <Text style={s.cardLabel}>{t('nextShift')}</Text>
        <Text style={s.cardValue}>{t('days')[SHIFTS[0].day]} {SHIFTS[0].d} · {SHIFTS[0].h}</Text>
        <Text style={s.text}>{SHIFTS[0].task} — {SHIFTS[0].zone}</Text>
        <Text style={s.muted}>{CHANTIER.name}, {CHANTIER.city}</Text>
      </Card>
      <Title>{t('notifications')}</Title>
      <Card><Text style={s.text}>{t('notif1')}</Text></Card>
      <Card><Text style={s.text}>{t('notif2')}</Text></Card>
      <Title>{t('quickAccess')}</Title>
      <View style={s.grid}>
        {modules.map((m) => (
          <TouchableOpacity key={m} style={s.tile} onPress={() => go(m)} activeOpacity={0.8}>
            <View style={s.tileMark} />
            <Text style={s.tileText}>{t(m)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const Hazard = () => (
  <View style={s.hazard}>
    {Array.from({ length: 24 }).map((_, i) => <View key={i} style={[s.hazardStripe, i % 2 === 1 && { backgroundColor: C.navy }]} />)}
  </View>
);

function SiteHeader({ t }) {
  return (
    <View style={s.siteHero}>
      <Hazard />
      <View style={{ padding: 18 }}>
        <Text style={s.siteKicker}>{t('currentMission').toUpperCase()}</Text>
        <Text style={s.heroHello}>{CHANTIER.name}</Text>
        <Text style={s.heroSub}>{CHANTIER.title} — {CHANTIER.company}</Text>
        <Text style={[s.heroSub, { marginTop: 2 }]}>{CHANTIER.city}</Text>
      </View>
    </View>
  );
}

function Chantier({ t }) {
  return (
    <ScrollView contentContainerStyle={s.page}>
      <SiteHeader t={t} />
      <Card>
        <Row label={t('site')} value={CHANTIER.address} />
        <Row label={t('start')} value={CHANTIER.start} />
        <Row label={t('end')} value={CHANTIER.end} />
        <Row label={t('schedule')} value={CHANTIER.hours} />
        <Row label={t('rate')} value={CHANTIER.rate} />
      </Card>
      <Card><Text style={s.cardLabel}>{t('contact')}</Text><Text style={s.text}>{CHANTIER.contact}</Text></Card>
      <Card style={s.ppeCard}><Text style={[s.cardLabel, { color: C.navy }]}>{t('ppe')}</Text><Text style={s.text}>{CHANTIER.safety}</Text></Card>
      <Btn title={t('route')} variant="navy" onPress={() => Linking.openURL('https://maps.google.com/?q=' + encodeURIComponent(CHANTIER.address))} />
      <Btn title={t('call') + ' — ' + t('contact')} variant="outline" onPress={() => Linking.openURL('tel:' + CHANTIER.phone)} style={{ marginTop: 10 }} />
    </ScrollView>
  );
}

function Planning({ t }) {
  return (
    <ScrollView contentContainerStyle={s.page}>
      <SiteHeader t={t} />
      <Title>{t('siteWeek')}</Title>
      {SHIFTS.map((sh, i) => (
        <View key={i} style={[s.shift, i === 0 && s.shiftToday]}>
          <View style={[s.shiftDate, i === 0 && { backgroundColor: C.yellow }]}>
            <Text style={[s.shiftDay, i === 0 && { color: C.navy }]}>{t('days')[sh.day]}</Text>
            <Text style={[s.shiftNum, i === 0 && { color: C.navy }]}>{sh.d}</Text>
          </View>
          <View style={{ flex: 1, padding: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={s.cardValue}>{sh.h}</Text>
              {i === 0 && <Badge text={t('today')} color={C.orange} />}
            </View>
            <Text style={s.text}>{t('task')} : {sh.task}</Text>
            <Text style={s.muted}>{sh.zone}</Text>
          </View>
        </View>
      ))}
      <Card style={s.ppeCard}>
        <Text style={[s.cardLabel, { color: C.navy }]}>{t('ppe')}</Text>
        <Text style={s.text}>{CHANTIER.safety}</Text>
      </Card>
      <Card>
        <Text style={s.cardLabel}>{t('contact')}</Text>
        <Text style={s.text}>{CHANTIER.contact}</Text>
        <Text style={s.muted}>{CHANTIER.address}</Text>
      </Card>
      <Btn title={t('route')} variant="navy" onPress={() => Linking.openURL('https://maps.google.com/?q=' + encodeURIComponent(CHANTIER.address))} />
    </ScrollView>
  );
}

function Salary({ t }) {
  return (
    <ScrollView contentContainerStyle={s.page}>
      {PAYSLIPS.map((p) => (
        <Card key={p.m}>
          <Text style={s.cardValue}>{t('payslip')} {p.m}</Text>
          <Row label={t('net')} value={p.net} />
          <Row label={t('gross')} value={p.gross} />
          <Btn title={t('download')} variant="outline" onPress={() => Alert.alert(t('payslip'), p.m + ' — PDF (démo)')} style={{ marginTop: 8 }} />
        </Card>
      ))}
    </ScrollView>
  );
}

function Advances({ t, list, setList }) {
  const [amount, setAmount] = useState('');
  const day = new Date().getDate();
  const used = list.reduce((a, b) => a + b.amount, 0);
  const left = 1000 - used;
  const submit = () => {
    const v = parseInt(amount, 10);
    if (day < 13) return Alert.alert(t('advances'), t('advanceClosed'));
    if (list.length >= 3) return Alert.alert(t('advances'), t('advanceLimitCount'));
    if (!v || v <= 0 || v > left) return Alert.alert(t('advances'), t('advanceLimitAmount'));
    const d = new Date();
    const date = String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
    setList([...list, { date, amount: v, status: 'pending' }]);
    setAmount('');
    Alert.alert(t('advances'), t('advanceSent'));
  };
  return (
    <ScrollView contentContainerStyle={s.page}>
      <Card style={{ backgroundColor: C.roseLight }}><Text style={s.text}>{t('advanceRules')}</Text></Card>
      <View style={s.statRow}>
        <Card style={s.stat}><Text style={s.statValue}>{left} €</Text><Text style={s.statLabel}>{t('available')}</Text></Card>
        <Card style={s.stat}><Text style={s.statValue}>{list.length} / 3</Text><Text style={s.statLabel}>{t('requestsUsed')}</Text></Card>
      </View>
      <Card>
        <Text style={s.cardLabel}>{t('requestAdvance')}</Text>
        {day < 13 ? <Text style={[s.text, { color: C.orange }]}>{t('advanceClosed')}</Text> : null}
        <Input placeholder={t('amount')} keyboardType="numeric" value={amount} onChangeText={setAmount} />
        <Btn title={t('send')} onPress={submit} />
      </Card>
      <Title>{t('history')}</Title>
      {list.map((a, i) => (
        <Card key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View><Text style={s.cardValue}>{a.amount} €</Text><Text style={s.muted}>{a.date}</Text></View>
          <Badge text={t(a.status)} color={a.status === 'approved' ? C.green : C.orange} />
        </Card>
      ))}
    </ScrollView>
  );
}

function Hours({ t }) {
  const [days, setDays] = useState([
    { d: '23/11', h: '7' }, { d: '24/11', h: '7' }, { d: '25/11', h: '' }, { d: '26/11', h: '' }, { d: '27/11', h: '' },
  ]);
  const total = days.reduce((a, b) => a + (parseFloat(b.h.replace(',', '.')) || 0), 0);
  return (
    <ScrollView contentContainerStyle={s.page}>
      <Title>{t('weekHours')}</Title>
      {days.map((x, i) => (
        <Card key={x.d} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={s.cardValue}>{x.d}</Text>
          <TextInput style={s.hourInput} keyboardType="numeric" value={x.h} placeholder="0"
            onChangeText={(v) => setDays(days.map((y, j) => (j === i ? { ...y, h: v } : y)))} />
        </Card>
      ))}
      <Card><Row label={t('total')} value={total + ' h'} /></Card>
      <Btn title={t('declare')} onPress={() => Alert.alert(t('hours'), t('declared'))} />
    </ScrollView>
  );
}

function Referral({ t }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  return (
    <ScrollView contentContainerStyle={s.page}>
      <View style={s.hero}><Text style={s.heroHello}>150 €</Text><Text style={s.heroSub}>{t('referralText')}</Text></View>
      <Card>
        <Input placeholder={t('friendName')} value={name} onChangeText={setName} />
        <Input placeholder={t('phone')} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
        <Btn title={t('send')} onPress={() => {
          if (!name || !phone) return;
          setName(''); setPhone('');
          Alert.alert(t('referral'), t('referralSent'));
        }} />
      </Card>
    </ScrollView>
  );
}

function Travel({ t }) {
  const [docs, setDocs] = useState({ license: false, registration: false, idCard: false });
  const [tickets, setTickets] = useState(0);
  const [sent, setSent] = useState(false);
  const pct = Math.min(100, Math.round((TOTAL_HOURS / 300) * 100));
  const ok = TOTAL_HOURS >= 300;
  const submit = () => {
    if (!docs.license || !docs.registration || !docs.idCard || tickets === 0) return Alert.alert(t('travel'), t('missingDocs'));
    setSent(true);
    Alert.alert(t('travel'), t('travelNotif'));
  };
  return (
    <ScrollView contentContainerStyle={s.page}>
      <View style={s.hero}><Text style={s.heroHello}>400 €</Text><Text style={s.heroSub}>{t('travelText')}</Text></View>
      <Card>
        <Text style={s.cardLabel}>{t('progress')} : {TOTAL_HOURS} h / 300 h</Text>
        <View style={s.progressBg}><View style={[s.progressFill, { width: pct + '%' }]} /></View>
        <Text style={[s.text, { color: ok ? C.green : C.orange, marginTop: 6 }]}>
          {ok ? t('eligible') : t('notEligible') + ' : ' + (300 - TOTAL_HOURS) + ' h'}
        </Text>
      </Card>
      {ok && !sent ? (
        <Card>
          {['license', 'registration', 'idCard'].map((k) => (
            <View key={k} style={s.docRow}>
              <Text style={[s.text, { flex: 1 }]}>{t(k)}</Text>
              {docs[k] ? <Badge text={t('added')} color={C.green} /> :
                <Btn title={t('add')} variant="outline" style={s.smallBtn} onPress={() => setDocs({ ...docs, [k]: true })} />}
            </View>
          ))}
          <View style={s.docRow}>
            <Text style={[s.text, { flex: 1 }]}>{t('tickets')} ({tickets})</Text>
            <Btn title={t('add')} variant="outline" style={s.smallBtn} onPress={() => setTickets(tickets + 1)} />
          </View>
          <Btn title={t('submit')} onPress={submit} style={{ marginTop: 10 }} />
        </Card>
      ) : null}
      {sent ? <Card style={{ backgroundColor: C.roseLight }}><Text style={s.text}>{t('travelNotif')}</Text></Card> : null}
    </ScrollView>
  );
}

function Documents({ t }) {
  return (
    <ScrollView contentContainerStyle={s.page}>
      {DOCS.map((d) => (
        <Card key={d} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[s.text, { flex: 1 }]}>{d}</Text>
          <Btn title={t('download')} variant="outline" style={s.smallBtn} onPress={() => Alert.alert(t('documents'), d + ' — PDF (démo)')} />
        </Card>
      ))}
    </ScrollView>
  );
}

function Chat({ list, onSend, placeholder, sendLabel }) {
  const [txt, setTxt] = useState('');
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={s.page}>
        {list.map((m, i) => (
          <View key={i} style={[s.bubble, m.from === 'me' ? s.bubbleMe : s.bubbleOther]}>
            <Text style={{ color: m.from === 'me' ? C.white : C.text }}>{m.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={s.chatBar}>
        <TextInput style={s.chatInput} value={txt} onChangeText={setTxt} placeholder={placeholder} placeholderTextColor={C.muted} />
        <TouchableOpacity style={s.sendBtn} onPress={() => { if (txt.trim()) { onSend(txt.trim()); setTxt(''); } }}>
          <Text style={{ color: C.white, fontWeight: '700' }}>{sendLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Messages({ t, list, setList }) {
  return <Chat list={list} placeholder={t('typeMessage')} sendLabel={t('send')}
    onSend={(x) => setList([...list, { from: 'me', text: x }, { from: 'agency', text: 'Message bien reçu. Votre agence vous répond rapidement.' }])} />;
}

function Copilot({ t }) {
  const [list, setList] = useState([{ from: 'bot', text: t('copilotWelcome') }]);
  const answer = (q) => {
    const x = q.toLowerCase();
    const has = (arr) => arr.some((w) => x.includes(w));
    if (has(['acompte', 'avans', 'előleg', 'elöleg', 'аванс', 'zaliczk'])) return t('advanceRules');
    if (has(['prime', 'primă', 'prima', 'voyage', 'călător', 'calator', 'utaz', 'пътн', 'dojazd'])) return t('travelText');
    if (has(['parrain', 'recomand', 'ajánl', 'препоръ', 'polec'])) return t('referralText');
    if (has(['salaire', 'paie', 'salar', 'bér', 'заплат', 'wynagrodz', 'wypłat'])) return t('notif1');
    if (has(['planning', 'program', 'beoszt', 'график', 'grafik', 'horaire'])) return t('notif2') + ' ' + SHIFTS[0].d + ' · ' + SHIFTS[0].h;
    if (has(['heure', 'ore', 'óra', 'час', 'godzin'])) return t('hoursThisMonth') + ' : 142 h';
    if (has(['document', 'contrat', 'contract', 'dokument', 'документ', 'umow'])) return DOCS.join(', ');
    return t('copilotWelcome');
  };
  return <Chat list={list} placeholder={t('typeMessage')} sendLabel={t('send')}
    onSend={(x) => setList([...list, { from: 'me', text: x }, { from: 'bot', text: answer(x) }])} />;
}

const normName = (x) => x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z\s-]/g, ' ').split(/[\s-]+/).filter(Boolean).sort().join(' ');

function Profile({ t, lang, setLang, iban, setIban, holder, setHolder, logout }) {
  const [edit, setEdit] = useState(false);
  const [val, setVal] = useState(iban);
  const [name, setName] = useState(holder);
  const fullName = USER.first + ' ' + USER.last;
  const save = () => {
    if (!name.trim()) return Alert.alert(t('holder'), t('holderRequired'));
    if (normName(name) !== normName(fullName)) return Alert.alert(t('holder'), t('holderMismatch').replace('{name}', fullName));
    const clean = val.replace(/\s/g, '').toUpperCase();
    if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/.test(clean)) return Alert.alert(t('iban'), t('ibanInvalid'));
    setIban(clean.replace(/(.{4})/g, '$1 ').trim());
    setHolder(name.trim().replace(/\s+/g, ' '));
    setEdit(false);
    Alert.alert(t('iban'), t('ibanSaved'));
  };
  return (
    <ScrollView contentContainerStyle={s.page}>
      <View style={s.hero}><Text style={s.heroHello}>{USER.first} {USER.last}</Text><Text style={s.heroSub}>{USER.id}</Text></View>
      <Title>{t('personalInfo')}</Title>
      <Card>
        <Row label="E-mail" value={USER.email} />
        <Row label={t('phone')} value={USER.phone} />
      </Card>
      <Title>{t('iban')}</Title>
      <Card>
        {edit ? (
          <>
            <View style={s.notice}><Text style={s.noticeText}>{t('ribNotice')}</Text></View>
            <Text style={s.fieldLabel}>{t('holder')} *</Text>
            <Input value={name} onChangeText={setName} autoCapitalize="words" placeholder={t('holderPh')} />
            <Text style={s.fieldLabel}>{t('iban')} *</Text>
            <Input value={val} onChangeText={setVal} autoCapitalize="characters" placeholder="FR76 ..." />
            <Btn title={t('save')} onPress={save} />
          </>
        ) : (
          <>
            <Row label={t('holder')} value={holder} />
            <Text style={[s.cardValue, { marginTop: 10 }]}>{iban}</Text>
            <Btn title={t('changeIban')} variant="outline" onPress={() => { setVal(iban); setName(holder); setEdit(true); }} style={{ marginTop: 10 }} />
          </>
        )}
      </Card>
      <Title>{t('language')}</Title>
      <View style={s.langRow}>
        {LANGS.map((l) => (
          <TouchableOpacity key={l.code} onPress={() => setLang(l.code)}
            style={[s.langChip, { borderColor: C.navy }, lang === l.code && { backgroundColor: C.navy }]}>
            <Text style={{ color: lang === l.code ? C.white : C.navy, fontWeight: '600' }}>{l.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Btn title={t('logout')} variant="navy" onPress={logout} style={{ marginTop: 20 }} />
    </ScrollView>
  );
}

function Agency({ t, go }) {
  return (
    <ScrollView contentContainerStyle={s.page}>
      <View style={s.hero}><Text style={s.heroHello}>{t('agencyText')}</Text><Text style={s.heroSub}>AB2PRO — www.ab2pro.com</Text></View>
      <Card>
        <Row label={t('contact')} value="Mme Martin" />
        <Row label={t('phone')} value="03 20 00 00 00" />
        <Row label={t('hoursOpen')} value="Lun-Ven 8h30-18h" />
      </Card>
      <Btn title={t('call')} onPress={() => Linking.openURL('tel:0320000000')} />
      <Btn title={t('write')} variant="outline" onPress={() => go('messages')} style={{ marginTop: 10 }} />
      <Btn title="www.ab2pro.com" variant="navy" onPress={() => Linking.openURL('https://www.ab2pro.com')} style={{ marginTop: 10 }} />
    </ScrollView>
  );
}

// ---------- Styles ----------
const s = StyleSheet.create({
  header: { height: 56, backgroundColor: C.navy, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
  headerTitle: { flex: 1, color: C.white, fontSize: 18, fontWeight: '700', textAlign: 'center' },
  backBtn: { width: 80 },
  backText: { color: C.rose, fontWeight: '600' },
  page: { padding: 16, paddingBottom: 32 },
  hazard: { flexDirection: 'row', height: 10, overflow: 'hidden' },
  hazardStripe: { flex: 1, backgroundColor: C.yellow, transform: [{ skewX: '-30deg' }], marginHorizontal: -1 },
  siteHero: { backgroundColor: C.navy, borderRadius: 16, overflow: 'hidden', marginBottom: 14 },
  siteKicker: { color: C.yellow, fontWeight: '800', fontSize: 12, letterSpacing: 1.5, marginBottom: 6 },
  ppeCard: { backgroundColor: '#FFF6D6', borderColor: C.yellow, borderLeftWidth: 6 },
  shift: { flexDirection: 'row', backgroundColor: C.white, borderRadius: 14, marginBottom: 10, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  shiftToday: { borderColor: C.yellow, borderWidth: 2 },
  shiftDate: { width: 72, backgroundColor: C.navy, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  shiftDay: { color: C.yellow, fontWeight: '800', fontSize: 15 },
  shiftNum: { color: C.white, fontWeight: '700', marginTop: 2 },
  notice: { backgroundColor: '#FFF6D6', borderLeftWidth: 4, borderLeftColor: C.orange, borderRadius: 8, padding: 10, marginBottom: 12 },
  noticeText: { color: C.text, fontSize: 13, lineHeight: 18 },
  fieldLabel: { color: C.muted, fontWeight: '600', marginBottom: 6 },
  card: { backgroundColor: C.white, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: C.border },
  cardLabel: { color: C.bordeaux, fontWeight: '700', marginBottom: 6 },
  cardValue: { color: C.text, fontSize: 16, fontWeight: '700' },
  text: { color: C.text, fontSize: 15, lineHeight: 21 },
  muted: { color: C.muted, marginTop: 4 },
  sectionTitle: { color: C.navy, fontSize: 17, fontWeight: '800', marginTop: 8, marginBottom: 10 },
  hero: { backgroundColor: C.bordeaux, borderRadius: 16, padding: 20, marginBottom: 14 },
  heroHello: { color: C.white, fontSize: 22, fontWeight: '800' },
  heroSub: { color: C.roseLight, marginTop: 6, fontSize: 15, lineHeight: 21 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: { width: '48%' },
  statValue: { color: C.navy, fontSize: 22, fontWeight: '800' },
  statLabel: { color: C.muted, marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tile: { width: '31%', backgroundColor: C.white, borderRadius: 14, paddingVertical: 18, paddingHorizontal: 8, marginBottom: 10, alignItems: 'center', borderWidth: 1, borderColor: C.border },
  tileMark: { width: 30, height: 4, borderRadius: 2, backgroundColor: C.bordeaux, marginBottom: 10 },
  tileText: { color: C.navy, fontWeight: '700', textAlign: 'center', fontSize: 13 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: C.border },
  rowLabel: { color: C.muted, flex: 1 },
  rowValue: { color: C.text, fontWeight: '600', flex: 1.4, textAlign: 'right' },
  btn: { backgroundColor: C.bordeaux, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  btnOutline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: C.bordeaux },
  btnText: { color: C.white, fontWeight: '700', fontSize: 15 },
  smallBtn: { paddingVertical: 8, paddingHorizontal: 14 },
  input: { backgroundColor: C.white, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 14, marginBottom: 12, fontSize: 15, color: C.text },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  tabBar: { flexDirection: 'row', backgroundColor: C.navy, paddingVertical: 8 },
  tab: { flex: 1, alignItems: 'center' },
  tabDot: { width: 18, height: 3, borderRadius: 2, backgroundColor: 'transparent', marginBottom: 6 },
  tabText: { color: '#AAB2C5', fontSize: 11 },
  logo: { color: C.white, fontSize: 44, fontWeight: '900', textAlign: 'center', letterSpacing: 2 },
  logoSub: { color: C.rose, fontSize: 16, fontWeight: '700', textAlign: 'center', letterSpacing: 8 },
  slogan: { color: C.roseLight, textAlign: 'center', marginTop: 10, fontSize: 15 },
  loginCard: { backgroundColor: C.white, borderRadius: 18, padding: 20, marginTop: 30 },
  langRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  langChip: { borderWidth: 1, borderColor: C.rose, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, margin: 4 },
  footer: { color: '#AAB2C5', textAlign: 'center', marginTop: 30 },
  progressBg: { height: 10, backgroundColor: C.border, borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: 10, backgroundColor: C.bordeaux },
  docRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: C.border },
  hourInput: { width: 70, borderWidth: 1, borderColor: C.border, borderRadius: 10, padding: 8, textAlign: 'center', fontSize: 16, color: C.text },
  bubble: { maxWidth: '82%', padding: 12, borderRadius: 14, marginBottom: 8 },
  bubbleMe: { alignSelf: 'flex-end', backgroundColor: C.bordeaux },
  bubbleOther: { alignSelf: 'flex-start', backgroundColor: C.white, borderWidth: 1, borderColor: C.border },
  chatBar: { flexDirection: 'row', padding: 10, backgroundColor: C.white, borderTopWidth: 1, borderTopColor: C.border },
  chatInput: { flex: 1, borderWidth: 1, borderColor: C.border, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, color: C.text },
  sendBtn: { backgroundColor: C.bordeaux, borderRadius: 20, paddingHorizontal: 16, justifyContent: 'center', marginLeft: 8 },
});
