# Workify — Techniczne zadanie (TZ)

**Wersja:** 1.0  
**Data:** 2026-06-14  
**Marka:** Workify — parasol dla wszystkich spółek grupy (bez osobnych nazw spółek na stronie)

---

## 1. Cel projektu

Stworzyć wielojęzyczną stronę B2B oraz **w pełni działający CRM** dla grupy Workify, która łączy:

1. Agencję pracy i pracę tymczasową  
2. Rekrutację  
3. Outsourcing procesów (różne modele współpracy)  
4. Fasady (wszystkie główne typy)  
5. Hurtownię (materiały różnych typów)

**Geografia:** Polska i Niemcy (cała PL + kluczowe regiony DE).  
**Języki:** PL, DE, RU, UA — pełna treść na wszystkich.

---

## 2. Pozycjonowanie

- Workify = **grupa spółek** pod jedną marką  
- Komunikat główny: jeden partner dla firm — kadry, outsourcing, fasady, materiały  
- Nie pokazujemy nazw poszczególnych spółek — tylko Workify  
- Blok „Zaufali nam” — rozpoznawalne firmy (szablonowo, jak na demo)

---

## 3. Struktura serwisu

| URL | Opis |
|-----|------|
| `/` | Strona główna: grupa, filary, statystyki, partnerzy |
| `/o-nas` | O grupie Workify, wartości, PL+DE |
| `/uslugi` | Kadry: leasing, rekrutacja, outsourcing kadrowy, personel projektowy |
| `/uslugi/:slug` | Szczegóły usługi kadrowej |
| `/fasady` | Przegląd elewacji / fasad |
| `/fasady/:slug` | Typ fasady + dla kogo pracujemy |
| `/hurtownia` | Hurtownia materiałów — kategorie, dla kogo |
| `/wspolpraca` | Modele współpracy (outsourcing procesów) |
| `/branze` | Branże kadrowe + „dla kogo” per nisza |
| `/branze/:slug` | Szczegóły branży |
| `/lokalizacje` | Mapa PL + DE |
| `/kontakt` | Formularz z wyborem kierunku (dywizja) |
| `/admin` | **CRM** — dashboard, kanban, leady |
| `/admin/leads/:id` | Karta leada, notatki, historia statusów |

---

## 4. Treści wg wymagań szefa

### 4.1 Grupa spółek (hero + O nas)
Krótko: Workify to grupa spółek oferująca kompleksowe wsparcie dla firm w Polsce i Niemczech.

### 4.2 Filary (karty na stronie głównej)
- Kadry i praca tymczasowa  
- Rekrutacja  
- Outsourcing procesów  
- Fasady  
- Hurtownia  

### 4.3 Fasady — typy
- Elewacje wentylowane  
- Elewacje tradycyjne (tynk, struktura)  
- Panele aluminiowe i kompozytowe  
- Szkło architektoniczne  
- Docieplenia i termomodernizacja  
- Renowacje i naprawy elewacji  

Każdy typ: opis, **dla kogo pracujemy**, CTA.

### 4.4 Hurtownia
- Opt materiałów budowlanych i elewacyjnych  
- Kategorie: izolacje, kleje i zaprawy, systemy elewacyjne, profile, narzędzia, BHP  
- Dla kogo: wykonawcy, deweloperzy, sklepy, inwestycje  

### 4.5 Outsourcing — modele współpracy
- Personel tymczasowy  
- Outsourcing kadrowy  
- Outsourcing procesów  
- Współpraca projektowa / sezonowa  
- Stała współpraca B2B (SLA)  

### 4.6 Dla kogo (per nisza)
Przy każdym filarze: typy klientów (np. magazyny, deweloperzy, generalni wykonawcy).

### 4.7 Partnerzy
Logo znanych firm (Allegro, DHL, Lidl, Orlen, Amazon itd.) — blok „Zaufali nam”.

---

## 5. CRM — wymagania funkcjonalne

### 5.1 Leady ze strony
- Automatyczny zapis z `/kontakt`  
- Pola: imię, firma, email, telefon, dywizja, wiadomość, język, IP, data  

### 5.2 Pipeline statusów
`new` → `contacted` → `qualified` → `offer` → `won` / `lost`

### 5.3 Dashboard (`/admin`)
- Statystyki: wszystkie, nowe, w toku, wygrane  
- **Kanban** — kolumny statusów, drag nie wymagany w v1 (przyciski zmiany statusu)  
- Filtr: dywizja, status, wyszukiwarka  

### 5.4 Karta leada (`/admin/leads/:id`)
- Pełne dane kontaktu  
- Zmiana statusu i dywizji  
- **Notatki** z datą (timeline)  
- Historia zmian statusu  
- Usuwanie leada  

### 5.5 UX CRM
- Nowoczesny UI (navy/teal, spójny z Workify)  
- Sidebar: Dashboard, Leady  
- Responsywność  
- Login hasłem (`ADMIN_PASSWORD`)  

### 5.6 Dane
- `data/crm.json` — persystencja (JSON)  
- Migracja z `data/leads.json` przy pierwszym uruchomieniu  

---

## 6. i18n

Wszystkie nowe sekcje i etykiety CRM w PL, DE, RU, UA.  
Formularz kontaktowy: lista dywizji w każdym języku.

---

## 7. Poza zakresem v1

- Osobne domeny / marki spółek  
- Sklep internetowy hurtowni  
- Wielu użytkowników CRM / role  
- Integracja e-mail / SMS  
- Baza PostgreSQL (opcjonalnie później na Render)

---

## 8. Plan wdrożenia

| Etap | Zakres |
|------|--------|
| 1 | TZ, dane, merge, nawigacja |
| 2 | Strony: fasady, hurtownia, współpraca, home, o nas |
| 3 | i18n × 4 |
| 4 | CRM: store, dashboard, kanban, karta leada |
| 5 | Formularz + dywizje, deploy docs |
