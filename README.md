# 🎟️ NFCtron Seating - Case study

Moje řešení case study na pozici frontend developera pro NFCtron. Aplikace umožňuje
vybrat konkrétní sedadlo na interaktivní mapě sálu, přidat ho do košíku a dokončit
nákup přes třífázový checkout (výběr sedadel, souhrn objednávky, platba). Celý proces
je vidět níže v sekci [Průběh nákupu](#-průběh-nákupu).

## 🔗 Odkazy

- **Živé nasazení:** [nf-ctron-case-study.vercel.app](https://nf-ctron-case-study.vercel.app)
- **Zadání:** [ASSIGNMENT.md](./ASSIGNMENT.md)
- **API:** [API.md](./API.md)
- **Poznámky k řešení:** [COMMENTS.md](./COMMENTS.md)

## 👀 Preview

<p align="center">
  <img src="./public/app-screen.png" alt="Úvodní obrazovka aplikace — světlý režim" width="420" />
</p>

## 🎨 Branding

Design systém navržený ve Figmě před samotnou implementací — paleta barev a typografie
použité ke konzistenci UI a udržení brandové identity (promítnuto do `src/App.css`).

**Barevná paleta** — odvozená z brandu NFCtronu, definovaná jako CSS proměnné
(`--color-*`) pro konzistentní použití napříč komponentami a podporu světlého/tmavého
režimu.

<p align="center">
  <img src="./public/paleta-barev.png" alt="Paleta barev" width="420" />
</p>

**Font** — [Poppins](https://fonts.google.com/specimen/Poppins), primární text napříč
celým UI (`--font-sans`, načtené z Google Fonts).

<p align="center">
  <img src="./public/font.png" alt="Font — Poppins" width="420" />
</p>

**Inspirace** — vycházel jsem z aktuálního řešení NFCtronu a z dohledaných vizuálních
reprezentací designů jiných aplikací.

<p align="center">
  <img src="./public/inspiration.png" alt="Vizuální inspirace pro design" width="600" />
</p>

## ✨ Funkce

### 📌 Ze zadání

- Detail akce (obrázek, název, popis, datum/čas, místo s vloženou mapou) v `EventCard`.
- Mapa sedadel v `SeatMap`/`Seat` — sedadla rozložená podle skutečné `seatRow`/`place`
  pozice (grid respektuje mezery v číslování, ne pořadí v API odpovědi), barevně odlišená
  podle typu vstupenky, s legendou a zoom/pan ovládáním.
- Přidávání/odebírání sedadel z košíku (`useCart` hook), s potvrzovacím dialogem při
  odebrání z přehledu košíku.
- Třífázový checkout (`CheckoutStepper`) — výběr sedadel, souhrn objednávky, platba —
  s navigací zpět i mezi již navštívenými kroky.
- Přihlášení nebo dokončení objednávky jako host (`GuestCheckoutForm`), bez nutnosti
  registrace.
- Vytvoření objednávky přes `/order` API a zobrazení výsledku (toast s potvrzením nebo
  chybovou hláškou).

### 🌟 Navíc

- **Perzistentní přihlášení** — po přihlášení se uživatel uloží do cookie (`useAuth`),
  takže se nemusí přihlašovat opakovaně.
- **Přidání do kalendáře** — tlačítko v `EventCard` generuje Google Calendar odkaz
  s předvyplněnými údaji o akci.
- **Multijazyčnost (CS/EN)** — vlastní i18n systém (`useLocale` + slovník v
  `src/lib/i18n`), přepínač v navigaci, formátování data i měny podle zvoleného jazyka.
- **Světlý/tmavý režim** — přepínač v navigaci, uložený v `localStorage`, respektuje
  systémovou preferenci při první návštěvě.
- Vstupenka v drawer detailu i v košíku stylizovaná jako skutečná vstupenka (perforace,
  barcode pruh).

## 🛒 Průběh nákupu

**1. Výběr sedadel**

<p align="center"><img src="./public/select-ticket.png" alt="1. Výběr sedadel" width="600" /></p>

**2. Rezervace vstupenky**

<p align="center"><img src="./public/reserve-ticket.png" alt="2. Rezervace vstupenky" width="600" /></p>

**3. Obsah košíku**

<p align="center"><img src="./public/cart-contents.png" alt="3. Obsah košíku" width="600" /></p>

**4. Platba**

<p align="center"><img src="./public/payment.png" alt="4. Platba" width="600" /></p>

**5. Potvrzení platby**

<p align="center"><img src="./public/payment-success.png" alt="5. Potvrzení platby" width="600" /></p>

## 🚀 Spuštění

```bash
npm install
npm run dev
```

Aplikace běží proti veřejnému API na `nfctron-frontend-seating-case-study-2024.vercel.app`
(viz [API.md](./API.md)) — žádná vlastní API konfigurace není potřeba. Pro přihlášení
použijte testovací účet z [API.md](./API.md) (tlačítko "Vyplnit testovací účet" v
přihlašovacím formuláři ho doplní automaticky), nebo pokračujte jako host.

> `.env` je záměrně součástí repozitáře — obsahuje pouze veřejný testovací účet z
> [API.md](./API.md), ne skutečné tajemství, a je zde jen kvůli pohodlnému vyzkoušení
> přihlášení. Necommitoval bych ho, kdyby šlo o reálné credentials.

```bash
npm run build     # produkční build (tsc + vite build)
npm run lint       # ESLint
npm run preview    # náhled produkčního buildu
```

## 🛠️ Technologie

React 19, TypeScript, Vite, Tailwind CSS v4, Base UI (headless primitivy pod shadcn
wrappery v `src/components/ui`), TanStack React Query, Zod (runtime validace API
odpovědí), `react-zoom-pan-pinch` (zoom/pan mapy sedadel).

## 📁 Struktura

```
src/
  api/            # fetch klienti (event, tickets, order, auth) + sdílený ApiError
  components/     # feature komponenty (SeatMap, CheckoutStepper, EventCard, ...)
  components/ui/  # shadcn/Base UI primitivy
  hooks/          # useCart, useAuth, useLocale, useTheme, ...
  lib/            # formátování, i18n slovník, utility funkce
  types/          # typy odvozené ze Zod schémat
```

---

Made by **Daniel Ledvina** · case study pro NFCtron
