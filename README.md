# gubbangenskladbyte.se

Källkoden för [gubbangenskladbyte.se](https://gubbangenskladbyte.se) —
en statisk Hugo-sajt som ersätter den tidigare WordPress.com-sajten.
Innehållet redigeras via Sveltia CMS och publiceras automatiskt av
Cloudflare Pages vid varje push till `main`.

## För redaktörer: så redigerar du innehåll

1. Gå till **`https://gubbangenskladbyte.se/admin/`**.
2. Logga in med ditt GitHub-konto (du behöver skrivbehörighet till
   detta repo — hör av dig till den som administrerar repot om du
   saknar tillgång).
3. Välj vad du vill redigera i menyn till vänster:
   - **Startsida** — hero-text, introtext, listan med varukategorier.
   - **Sidor** — de sex fristående sidorna (Så här funkar det att sälja,
     Bli medarbetare, För säljare, Om oss, Kontakta oss, Boka
     shoppingtid).
   - **Blogg** — nyhetsinlägg. Skapa nytt via "Ny Blogg".
4. **Publicerad**-kryssrutan styr om sidan/inlägget syns på sajten
   (motsvarar `draft: false` i filen). Ett nytt blogginlägg är
   **opublicerat som standard** tills du bockar i rutan.
5. Spara. Ändringen skapas som en git-commit direkt mot `main` (eller en
   pull request, beroende på hur editorial workflow är inställt) och
   Cloudflare Pages bygger om sajten automatiskt — det tar vanligtvis
   under en minut innan ändringen syns live.

Bilder laddas upp direkt i respektive sid-/inläggseditor och hamnar
automatiskt tillsammans med sidans övriga filer.

## För utvecklare: köra sajten lokalt

Kräver [Hugo Extended](https://gohugo.io/installation/) (0.150+).

```bash
hugo server -D
```

Öppna `http://localhost:1313`. `-D` inkluderar opublicerat
(`draft: true`) innehåll i förhandsvisningen.

Produktionsbygge (samma kommando som Cloudflare Pages kör):

```bash
hugo --minify
```

## Cloudflare Pages — deploy-konfiguration

| Inställning | Värde |
|---|---|
| Build command | `hugo --minify` |
| Build output directory | `public` |
| Root directory | `/` |
| Hugo-version | Sätt `HUGO_VERSION`-miljövariabeln till samma major/minor som används lokalt (se `hugo version`) |

### Miljövariabler (Cloudflare Pages → Settings → Environment variables)

| Namn | Beskrivning |
|---|---|
| `GITHUB_OAUTH_CLIENT_ID` | Client ID från GitHub OAuth-appen som används för CMS-inloggning |
| `GITHUB_OAUTH_CLIENT_SECRET` | Client secret för samma app — **secret**, aldrig i git |
| `HUGO_VERSION` | Hugo-version för bygget, t.ex. `0.165.0` |

### GitHub OAuth App

Skapas under **Settings → Developer settings → OAuth Apps** på det
GitHub-konto/den organisation som äger repot:

- **Homepage URL:** `https://gubbangenskladbyte.se`
- **Authorization callback URL:** `https://gubbangenskladbyte.se/api/callback`

Callback-URL:en måste matcha exakt vad som står hårdkodat i
`functions/api/auth.js` och `functions/api/callback.js`.

## Repo-ägarskap: dev vs. produktion

Precis som suhf.se ligger detta repo just nu under ett **privat
GitHub-konto** (`dvalfrid`) som en utvecklingsmiljö. Innan sajten går
live på riktigt ska repot flyttas till en **egen GitHub-organisation**.
Behandla inget i den här listan som klart förrän flytten är gjord.

Checklista vid flytt till organisation:

1. **Flytta/transferera repot** till organisationen (GitHub stödjer
   repo-transfer utan att historik eller issues går förlorade).
2. **Skapa en ny GitHub OAuth App under organisationen** — OAuth Apps är
   knutna till ett konto, en app under ett privat användarkonto kan inte
   "flyttas" till en org. Samma Homepage URL/callback URL som ovan.
3. **Uppdatera Cloudflare Pages källa** till det nya org-repot (nytt
   Pages-projekt, eller uppdatera det befintliga projektets kopplade
   repo om Cloudflare stödjer det för er plan).
4. **Sätt om miljövariablerna** `GITHUB_OAUTH_CLIENT_ID` /
   `GITHUB_OAUTH_CLIENT_SECRET` i Cloudflare Pages till värdena från den
   nya OAuth-appen (steg 2).
5. **Uppdatera `repo:` i `static/admin/config.yml`** till
   `<organisation>/gubbangenskladbyte.se`.
6. **Ge redaktörerna skrivbehörighet** i det nya org-repot (de behövde
   det i det gamla repot också, men GitHub-behörigheter följer inte med
   automatiskt vid en transfer om de las till som outside collaborators).
7. Verifiera att inloggning via `/admin/` fungerar mot den nya
   konfigurationen innan ni pekar om DNS för `gubbangenskladbyte.se` på
   riktigt.

## Bokning

Bokning av shoppingtider hanteras **inte** i detta repo. Det sker via en
egenhostad [alf.io](https://alf.io/)-instans på
`bokning.gubbangenskladbyte.se`. Länken till bokningen redigeras som
ett vanligt textfält (`bokningsurl`) på sidan "Boka shoppingtid" i CMS:et.
