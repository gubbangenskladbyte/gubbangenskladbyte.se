# gubbangenskladbyte.se

Källkoden för [gubbangenskladbyte.se](https://gubbangenskladbyte.se) —
en statisk Hugo-sajt som ersätter den tidigare WordPress.com-sajten.
Innehållet redigeras via Sveltia CMS och publiceras automatiskt av
Cloudflare Pages vid varje push till `main`.

## För redaktörer: så redigerar du innehåll

### Logga in

1. Gå till **`https://gubbangenskladbyte.se/admin/`**.
2. Logga in med ditt GitHub-konto (du behöver skrivbehörighet till
   detta repo — hör av dig till den som administrerar repot om du
   saknar tillgång).

Du kommer då till Sveltia CMS — ett gränssnitt med en meny till
vänster där allt innehåll på sajten är listat, uppdelat i tre grupper.

### De tre grupperna av innehåll

**Startsida**
Den enda sidan i den här gruppen. Hero-rubrik, ingress, introtext,
listan med varukategorier ("Vad kan du hitta hos oss?") och bilder.

**Sidor**
De fem fristående sidorna som nås via huvudmenyn (kontaktuppgifter är en
del av Om oss, ingen egen sida):

| Sida | Extra fält utöver Titel/Beskrivning/Bilder/Innehåll |
|---|---|
| Så här funkar det att sälja | — |
| Bli medarbetare | **Citat** + **Citat — person** (se nedan) |
| För säljare | **Citat** + **Citat — person** |
| Om oss | — |
| Boka shoppingtid | **Bokningslänk (alf.io)** + **Bokningsknapp aktiv** (se nedan) |

**Blogg**
Nyhetsinlägg. Skapa ett nytt via **"Ny Blogg"**-knappen. Varje inlägg
har ett eget **Datum**-fält (sätter var det hamnar i listan och i
webadressen) utöver de vanliga fälten.

### Fält som är gemensamma för allt innehåll

- **Titel** — rubriken, syns även i webbläsarens flik och i Google.
- **Publicerad** — kryssrutan som avgör om sidan/inlägget syns på
  sajten. **Ett nytt blogginlägg är opublicerat som standard** tills du
  bockar i rutan; övriga sidor är publicerade som standard eftersom de
  redan finns live. Det här är den **enda** publiceringsmekanismen —
  det finns inget separat "schemalägg" eller "kladd"-läge utöver den
  här kryssrutan.
- **Beskrivning (SEO)** — en kort sammanfattning (1–2 meningar) som
  används av sökmotorer och när länken delas i t.ex. Facebook. Syns
  inte på själva sidan.
- **Bilder** — se nästa avsnitt.
- **Innehåll** — själva brödtexten, skriven i markdown (se
  formateringsavsnittet nedan).

### Bilder

Ladda upp bilder direkt i **Bilder**-fältet på respektive sida/inlägg
— de hamnar automatiskt tillsammans med sidans övriga filer och visas
i ett bildgalleri längst ner på sidan, i den ordning du lägger till
dem. Varje bild kan få en **Bildtext** (visas under bilden som en
liten, gråtonad rad).

Vill du istället ha en bild inne **i löptexten** — mindre, med text
som flyter runt den (som Human Bridge-loggan på "Så här funkar det att
sälja") — se avsnittet om `bild`-shortcoden nedan.

### Citat

**Bli medarbetare** och **För säljare** har ett extra **Citat**- och
**Citat — person**-fält. Det renderas som ett fristående citat med en
röd kantlinje, placerat bredvid bildgalleriet längst ner på sidan —
inte inne i löptexten. Lämna fälten tomma om sidan inte ska ha något
citat.

### Stänga av bokningsknappen

**Boka shoppingtid** har ett fält **Bokningsknapp aktiv** (kryssruta),
skilt från **Publicerad**. Det styr bara själva knappen — resten av
sidans text syns som vanligt oavsett:

- **Ibockad** (standard): knappen visas som vanligt och länkar till
  bokningssystemet.
- **Urbockad**: knappen ersätts med en gråtonad, oklickbar text
  ("Bokning är stängd just nu") — praktiskt när det inte går att köpa
  biljetter just nu, t.ex. mellan bytena eller när bokningen inte
  öppnat än, utan att behöva dölja hela sidan.

### Skriva och formatera text

**Innehåll**-fältet skrivs i markdown. De vanligaste sakerna:

| Vill du ha... | Skriv... |
|---|---|
| Fet text | `**fet text**` |
| Kursiv text | `*kursiv text*` |
| Rubrik (mellanstor) | `## Rubriktext` |
| Rubrik (mindre) | `### Rubriktext` |
| Länk | `[länktext](https://exempel.se)` |
| Punktlista | Rader som börjar med `- ` |
| Numrerad lista | Rader som börjar med `1. `, `2. ` osv. |

Rubriker (`##`/`###`) som du skriver i löptexten blir automatiskt
centrerade — det är sajtens stilval, inget du behöver tänka på.

### Styra storlek och placering på en bild i löptexten

Vanliga bilder som laddas upp i Bilder-fältet visas i galleriet i full
bredd (se ovan). Vill du istället ha en mindre bild som texten flyter
runt, mitt i brödtexten, växla till markdown/raw-läget i
textredigeraren och skriv:

```
{{< bild src="filnamn.jpg" storlek="liten" position="höger" alt="Beskrivning" >}}
```

- `storlek`: `liten`, `medium` (standard) eller `stor`
- `position`: `vänster`, `center` (standard) eller `höger` — vänster
  och höger gör att texten flyter runt bilden, center centrerar den
  fristående
- `src` måste vara filnamnet på en bild som redan laddats upp till
  samma sida/inlägg (samma Bilder-fält)

### Spara och publicera

Spara. Ändringen skapas som en git-commit direkt mot `main` (inget
extra godkännandesteg — se till att **Publicerad**-kryssrutan är rätt
innan du sparar) och Cloudflare Pages bygger om sajten automatiskt —
det tar vanligtvis under en minut innan ändringen syns live.

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

Repot låg tidigare under ett privat GitHub-konto (`dvalfrid`) som
utvecklingsmiljö, precis som suhf.se gjorde innan sin flytt. Det är
**redan flyttat** till organisationen **`gubbangenskladbyte`** —
repot bor nu på `github.com/gubbangenskladbyte/gubbangenskladbyte.se`.

Kvarstående steg innan sajten är skarp:

1. ~~Flytta/transferera repot till organisationen~~ — klart.
2. ~~Skapa en GitHub OAuth App under organisationen~~ — klart.
3. ~~Sätt upp Cloudflare Pages-projektet mot org-repot~~ — klart, första
   deploy verifierad på `gubbangenskladbyte-se.pages.dev`.
4. ~~Sätt miljövariablerna `GITHUB_OAUTH_CLIENT_ID`/`GITHUB_OAUTH_CLIENT_SECRET`~~
   — klart.
5. ~~Uppdatera `repo:` i `static/admin/config.yml`~~ — klart, pekar på
   `gubbangenskladbyte/gubbangenskladbyte.se`.
6. **Ge redaktörerna skrivbehörighet** i org-repot — kvarstår.
7. ~~Koppla domänen och verifiera `/admin/`-inloggningen~~ — klart.
   Domänen ligger på Cloudflare (Connect, inte Transfer — registreringen
   är oförändrad hos nuvarande registrar), är kopplad som Custom Domain
   på Pages-projektet, och `/admin/`-inloggningen är testad och
   fungerar.

**Sajten är därmed live på `https://gubbangenskladbyte.se`.**

## Bokning

Bokning av shoppingtider hanteras **inte** i detta repo. Det sker via en
egenhostad [alf.io](https://alf.io/)-instans på
`bokning.gubbangenskladbyte.se`. Länken till bokningen redigeras som
ett vanligt textfält (`bokningsurl`) på sidan "Boka shoppingtid" i CMS:et.
