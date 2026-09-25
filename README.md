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
De sex fristående sidorna som nås via huvudmenyn (kontaktuppgifter är en
del av Om oss, ingen egen sida):

| Sida | Extra fält utöver Titel/Beskrivning/Innehåll |
|---|---|
| Så här funkar det att sälja | **Bilder** |
| Bli medarbetare | — (bilder infogas i Innehåll via **Bilder + citat**-knappen) |
| För säljare | — (bilder infogas i Innehåll via **Bild**/**Bilder + citat**-knapparna) |
| Om oss | **Bilder** |
| Bokningsinfo | **Bilder** |
| Boka shoppingtid | **Bokningslänk (alf.io)** + **Bokningsknapp aktiv** (se nedan) |

**Blogg**
Nyhetsinlägg. Skapa ett nytt via **"Ny Blogg"**-knappen. Varje inlägg
har ett eget **Datum**-fält (sätter var det hamnar i listan och i
webadressen) utöver de vanliga fälten.

### Fält som är gemensamma för allt innehåll

- **Titel** — rubriken, syns även i webbläsarens flik och i Google.
- **Dold (utkast)** — kryssrutan som avgör om sidan/inlägget syns på
  sajten. **Ibockad = döljs**, urbockad = syns. **Ett nytt blogginlägg
  är dolt som standard** tills du bockar ur rutan; övriga sidor är
  synliga som standard eftersom de redan finns live. Det här är den
  **enda** publiceringsmekanismen — det finns inget separat
  "schemalägg"-läge utöver den här kryssrutan.
- **Beskrivning (SEO)** — en kort sammanfattning (1–2 meningar) som
  används av sökmotorer och när länken delas i t.ex. Facebook. Syns
  inte på själva sidan.
- **Bilder** — finns bara på sidor som listar flera bilder i ett
  bildgalleri (Startsida, "Så här funkar det att sälja", Om oss,
  Bokningsinfo, Blogg). Se nästa avsnitt. På Bli medarbetare/För säljare infogas
  bilder istället direkt i löptexten via knapparna i verktygsfältet
  (se "Citat, kartor och andra knappar" nedan).
- **Innehåll** — själva brödtexten, skriven i markdown (se
  formateringsavsnittet nedan).

### Bilder

Ladda upp bilder direkt i **Bilder**-fältet på respektive sida/inlägg
— de hamnar automatiskt tillsammans med sidans övriga filer och visas
i ett bildgalleri längst ner på sidan, i den ordning du lägger till
dem. Varje bild kan få en **Bildtext** (visas under bilden som en
liten, gråtonad rad).

**Startsidan är ett undantag:** där har varje bild i Bilder-fältet
(utom bannerbilden överst, som alltid är fullbredd) även **Storlek**
och **Position** — samma val som bild-knappen i löptexten (se nedan).
Bilderna visas under varukategorierna, var för sig, med bildtexten
under.

Vill du istället ha en bild inne **i löptexten** — mindre, med text
som flyter runt den (som Human Bridge-loggan på "Så här funkar det att
sälja") — se avsnittet om `bild`-shortcoden nedan.

### Citat, kartor och andra knappar i verktygsfältet

Ovanför **Innehåll**-fältet finns knappar som infogar färdigformaterat
innehåll i löptexten — inget att skriva för hand:

- **Bild (storlek/position)** — se nästa avsnitt.
- **Karta (Google Maps)** — en interaktiv, zoombar karta med
  vägbeskrivning. Fyll bara i en adress.
- **Citat** — ett enstaka fristående citat med röd kantlinje. Ett
  **Position**-fält styr hur det placeras:
  - **Centrerad** (standard) — ett enda citat, centrerat.
  - **Vänster**/**Höger** — texten flyter runt citatet, precis som för
    Bild.
- **Citat i rad (flera, centrerade)** — för flera citat sida vid sida
  (som "Vad säger folk om oss?" på "Så här funkar det att sälja").
  Fyll i 2–4 citat i samma formulär — de läggs i en rad och centreras
  alltid som grupp, oavsett hur många det är.
- **Bilder + citat (rad)** — återskapar "personalfoto + personalfoto +
  citat i en rad"-layouten (som på "Bli medarbetare" och "För
  säljare"). Fyll i en eller två bilder och valfritt ett citat.

Klicka på knappen, fyll i formuläret, klart. Klicka på det infogade
blocket igen för att redigera det senare.

### Stänga av bokningsknappen

**Boka shoppingtid** har ett fält **Bokningsknapp aktiv** (kryssruta),
skilt från **Dold (utkast)**. Det styr bara själva knappen — resten av
sidans text syns som vanligt oavsett:

- **Ibockad** (standard): bokningen visas inbäddad direkt på sidan (en
  ruta där man kan välja och betala biljetter utan att lämna sajten),
  med en reservlänk ("Öppna bokningen i ny flik") under.
- **Urbockad**: bokningsrutan ersätts med en gråtonad, oklickbar text
  ("Bokning är stängd just nu") — praktiskt när det inte går att köpa
  biljetter just nu, t.ex. mellan bytena eller när bokningen inte
  öppnat än, utan att behöva dölja hela sidan.

**Bokningslänken måste peka på det specifika eventet** (t.ex.
`https://bokning.gubbangenskladbyte.se/event/hostbytet-2026`), inte
alf.io-startsidan — annars visas fel innehåll i bokningsrutan. Kom ihåg
att uppdatera **Bokningslänk (alf.io)** varje gång ni öppnar en ny
bokningsrunda, samtidigt som ni bockar i **Bokningsknapp aktiv**.

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
runt, mitt i brödtexten, klicka på knappen **"Bild (storlek/position)"**
i verktygsfältet ovanför **Innehåll**-fältet. Ett formulär öppnas där
du:

- laddar upp (eller väljer) bilden,
- skriver en alt-text (beskrivning för skärmläsare),
- väljer **Storlek**: `liten`, `medium` (standard), `mellanstor`
  (ungefär halva sidbredden) eller `stor` (hela bredden),
- väljer **Position**: `vänster`, `center` (standard) eller `höger` —
  vänster och höger gör att texten flyter runt bilden, center centrerar
  den fristående,
- skriver valfritt en **Bildtext** — visas som en liten gråtonad rad
  under bilden. Lämna tomt om du inte vill ha någon.

Bilden infogas där markören stod. Klicka på den infogade bilden igen
för att ändra storlek/position senare.

<details>
<summary>För utvecklare: vad knappen genererar</summary>

```
{{< bild src="filnamn.jpg" alt="Beskrivning" storlek="liten" position="höger" >}}
{{< bild src="filnamn.jpg" alt="Beskrivning" storlek="medium" position="center" bildtext="Synlig bildtext" >}}
```

`bildtext` skrivs bara ut när den är ifylld. Registrerad som en
Sveltia CMS "Editor Component" i `static/admin/index.html`, renderas
av `layouts/shortcodes/bild.html` → `layouts/partials/bild.html`
(samma partial som startsidans bilder använder).
`src` kan vara antingen ett bundle-relativt filnamn eller en extern
URL.
</details>

### Spara och publicera

Spara. Ändringen skapas som en git-commit direkt mot `main` (inget
extra godkännandesteg — se till att **Dold (utkast)**-kryssrutan är
rätt innan du sparar) och Cloudflare Pages bygger om sajten
automatiskt — det tar vanligtvis under en minut innan ändringen syns
live.

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
`bokning.gubbangenskladbyte.se` (Heroku). Bokningsflödet bäddas in
direkt på sidan "Boka shoppingtid" i en iframe (se `CLAUDE.md`,
avsnittet "Bokning (iframe-inbäddning)") — länken redigeras som ett
vanligt textfält (`bokningsurl`) i CMS:et och måste peka på det
**specifika eventet** (`.../event/<eventShortName>`), inte
instansens startsida.

**Krävs i alf.io:s adminpanel** för att inbäddningen ska fungera
(systeminställningarna under "Embedding options"), annars blockerar
alf.io all inbäddning som standard:

| Inställning | Värde |
|---|---|
| `EMBED_ALLOWED_ORIGINS` | `https://gubbangenskladbyte.se` |
| `EMBED_POST_MESSAGE_ORIGIN` | `https://gubbangenskladbyte.se` |

Detta ligger helt utanför det här repot (separat Heroku-app) och måste
sättas manuellt i alf.io:s admin-UI, precis som env-variablerna för
GitHub OAuth nedan är en operationell förutsättning snarare än
kodändringar.

**Språk:** se till att **svenska** är aktiverat som språk på eventet
(alf.io faller annars tillbaka på engelska för besökare vars
webbläsarspråk inte matchar något aktiverat språk). Lägg dessutom till
`?lang=sv` sist i `bokningsurl` som en extra säkerhet — den parametern
vinner alltid över webbläsarens språkinställning:

```
https://bokning.gubbangenskladbyte.se/event/<eventShortName>?lang=sv
```

**Utseende:** eventets adminsida i alf.io har ett fält **"Event Custom
CSS"** som injiceras direkt i bokningssidan (bara det eventet
påverkas, inte hela alf.io-instansen). Klistra in följande för att
dölja dubblerad logga/rubrik/länkar och matcha typsnitt/färger mot
sajten:

```css
/* ===== Dölj element som dubblerar/pekar tillbaka till huvudsajten ===== */

/* Header med logga, eventrubrik och språkväljare — visas redan på vår egen sida */
app-purchase-context-header { display: none; }

/* "Event info"-blocket (arrangör/datum/plats/kalenderlänkar) — står redan i vår löptext */
app-event-summary { display: none; }

/* Den lösa URL-raden direkt under headern (bara på toppnivå — INTE ticket-beskrivningar
   längre ner, de återanvänder samma klass men ligger inte direkt under <main>) */
main > .markdown-content { display: none; }

/* De två kvarvarande linjerna som blev föräldralösa när ovanstående doldes.
   Den tredje (.mt-5, precis ovanför knapparna) behålls som avskiljare. */
main > hr:not(.mt-5) { display: none; }

/* "Tillbaka till eventsidan"-knappen — länkar bara hit igen */
div:has(> a[translate="to-event-site"]) { display: none; }

/* Sidfotens villkorslänk — pekar också bara tillbaka till huvudsajten */
app-footer-links { display: none; }

/* ===== Matcha typsnitt/färger mot vår sajt ===== */

app-root, body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

a { color: #2f7d5b; }
a:hover { color: #245f45; }

.btn-link { color: #2f7d5b; }

.btn { border-radius: 0.5rem; }

.btn-success {
  background-color: #2f7d5b !important;
  border-color: #2f7d5b !important;
}

.btn-success:hover {
  background-color: #245f45 !important;
  border-color: #245f45 !important;
}

main > h2 { text-align: center; font-weight: 700; }

.alert { border-radius: 0.5rem; }

/* ===== Scrollist inuti iframen ===== */
html, body {
  scrollbar-color: #2f7d5b #f2ece1;
  scrollbar-width: thin;
}
body::-webkit-scrollbar { width: 10px; }
body::-webkit-scrollbar-track { background: #f2ece1; }
body::-webkit-scrollbar-thumb { background: #2f7d5b; border-radius: 8px; }
```

Färgvärdena (`#2f7d5b`/`#245f45`/`#f2ece1`) är hämtade rakt av från
`assets/css/tokens.css` (`--color-primary`/`--color-primary-dark`/
`--color-bg`) — går inte att referera CSS-variabler över origin-gränsen,
så om de tokens någonsin ändras i den filen måste värdena uppdateras
här manuellt också.

**Viktigt att veta:** detta targetar alf.io:s interna Angular-
komponentnamn och attribut (`app-event-summary`,
`translate="to-event-site"` osv.) — inte ett dokumenterat/stabilt
gränssnitt. Går sönder tyst (elementen dyker bara upp igen) om alf.io
uppdateras och byter markup, inte hela sidan som slutar fungera.
Testa om CSS:et fortfarande träffar rätt efter en alf.io-uppgradering.
Selektorn för `.markdown-content` är medvetet avgränsad till `main >`
eftersom biljettyper längre ner i flödet troligen återanvänder samma
klass för sina egna beskrivningar — kontrollera det när fler
biljettyper läggs till i eventet.

**Max antal biljetter per e-postadress:** alf.io har ingen inbyggd
inställning för detta (bara `MAX_AMOUNT_OF_TICKETS_BY_RESERVATION`,
som bara begränsar en enskild bokning, inte upprepade bokningar med
samma e-post). Lösningen är ett **Extension**-script (admin →
Extensions), kopplat till händelsen `RESERVATION_VALIDATION`, som
slår upp befintliga bekräftade biljetter för e-postadressen via
alf.io:s eget `download-attendees`-API och avvisar bokningen om
gränsen skulle överskridas:

```js
function getScriptMetadata() {
    return {
        id: 'limitTicketsPerEmail',
        displayName: 'Begransa antal biljetter per e-post',
        version: 3,
        async: false,
        events: [
            'RESERVATION_VALIDATION'
        ],
        parameters: {
            fields: [
                { name: 'maxTicketsPerEmail', description: 'Max antal biljetter per e-postadress', type: 'TEXT', required: true },
                { name: 'apiKey', description: 'Alf.io Organization API-nyckel', type: 'TEXT', required: true },
                { name: 'limitReleaseAt', description: 'Tidpunkt da sparren slapps, ISO 8601 med tidszon, t.ex. 2026-10-15T15:00:00+02:00. Lamna tomt for att aldrig slappa sparren.', type: 'TEXT', required: false }
            ],
            configurationLevels: ['EVENT']
        }
    };
}

function executeScript(scriptEvent) {
    var releaseAt = extensionParameters.limitReleaseAt;
    if (releaseAt) {
        var releaseDate = new Date(releaseAt);
        if (!isNaN(releaseDate.getTime()) && new Date().getTime() >= releaseDate.getTime()) {
            log.warn('Sparren for max antal biljetter per e-post ar slappt (releaseAt: ' + releaseAt + ')');
            return;
        }
    }

    var maxTickets = parseInt(extensionParameters.maxTicketsPerEmail, 10);
    var apiKey = extensionParameters.apiKey;

    if (!form.email) {
        return;
    }
    var email = form.email.trim().toLowerCase();

    var url = 'https://bokning.gubbangenskladbyte.se/api/v1/admin/event/' + event.getShortName() + '/download-attendees';
    var response = simpleHttpClient.get(url, { 'Authorization': 'ApiKey ' + apiKey });
    var categories = response.getJsonBody();

    var existingCount = 0;
    for (var i = 0; i < categories.size(); i++) {
        var attendees = categories.get(i).getAsJsonObject().get('attendees').getAsJsonArray();
        for (var j = 0; j < attendees.size(); j++) {
            var attendeeEmail = attendees.get(j).getAsJsonObject().get('email').getAsString();
            if (attendeeEmail && attendeeEmail.toLowerCase() === email) {
                existingCount++;
            }
        }
    }

    var ticketsInThisReservation = form.tickets ? Object.keys(form.tickets).length : 1;

    log.warn('Existing tickets for ' + email + ': ' + existingCount + ', in this reservation: ' + ticketsInThisReservation);

    if (existingCount + ticketsInThisReservation > maxTickets) {
        bindingResult.reject('error.max-tickets-per-email',
            'Den har e-postadressen har redan bokat max antal biljetter (' + maxTickets + ').');
    }
}
```

**Ny parameter `limitReleaseAt`:** valfritt fält, ISO 8601-tidsstämpel
**med explicit tidszon** (t.ex. `2026-10-15T15:00:00+02:00` för
svensk sommartid/CEST — utan tidszonen tolkas tiden i serverns egen
tidszon, troligen UTC på Heroku, vilket ger fel klockslag). Så fort
serverns aktuella tid passerat detta värde hoppar scriptet över hela
kontrollen och släpper igenom bokningar utan begränsning. Lämnas
fältet tomt gäller begränsningen tills vidare (fail-safe — en tom
eller ogiltig tidsstämpel tolkas som "spärren är alltid aktiv", inte
tvärtom).

**Namnet i "Add Extension"-formuläret** (den tredje rutan i
"Path"-raden, efter organisation/event) måste bestå av **bara
bokstäver och siffror** (`^[A-Za-z0-9]+$`, alf.io tillåter varken
bindestreck, understreck eller mellanslag där) — använd t.ex.
`limitTicketsPerEmail`. Klistra in **hela** scriptet i kodrutan i ett
svep (markera allt och radera först) — en delvis redigering av
standardmallen lämnar lätt kvar en klammerparentes från exempelkoden
och ger "Syntax error in script ...".

**Konfiguration efter installation (fylla i `maxTicketsPerEmail` och
`apiKey`):** dessa fält dyker **inte** upp på samma sida som
scriptet skrevs in på ("Extensions"), utan på eventets vanliga
**Configuration**-sida i admin — samma ställe som språkinställningen
och "Event Custom CSS" — under en egen sektion med scriptets
`displayName` ("Begransa antal biljetter per e-post") som rubrik.
`apiKey` ska vara en **Organization API-nyckel** (rollen visas som
"API Client" i admin, se ovan) — en helt separat nyckel från
`EMBED_*`-inställningarna.

**Kända begränsningar, testa innan skarpt bruk:**
- `download-attendees` returnerar bara **bekräftade** biljetter — två
  samtidigt pågående (obekräftade) bokningar med samma e-post fångas
  inte av det här scriptet.
- Hook-kontraktet (`RESERVATION_VALIDATION`, `form.email`,
  `bindingResult.reject`) och API-endpointen/auth-headern
  (`Authorization: ApiKey ...`) är verifierade direkt mot alf.io:s
  källkod, men själva GSON-traverseringen (`getAsJsonObject`/
  `getAsJsonArray`) är inte körd mot en skarp instans — testa med en
  riktig testbokning (boka en gång, boka igen med samma e-post) och
  kontrollera extension-loggen innan ni litar på scriptet för en
  verklig bokningsrunda.
- Svenska tecken (å/ä/ö) i scriptets kommentarer/loggtext undveks
  medvetet efter ett "Syntax error"-fel vid sparande (oklart om det
  var den faktiska orsaken eller en delvis inklistrad mall, se ovan,
  men ASCII-varianten fungerade). Felmeddelandet till slutanvändaren
  (`bindingResult.reject`) fungerade fint med svenska tecken kvar.
- **`scriptEvent`-parametern till `executeScript(scriptEvent)` är bara
  händelsenamnet som sträng** (t.ex. `"RESERVATION_VALIDATION"`), inte
  ett objekt med `.form`/`.bindingResult`-fält. Alla dokumenterade
  "scope-variabler" (`form`, `reservation`, `bindingResult`,
  `extensionParameters`, `event` m.fl.) är egna globala variabler i
  scriptets scope, inte fält på `scriptEvent` — verifierat mot alf.io:s
  källkod (`ScriptingExecutionService.java`) och deras egna
  exempel-scripts, som aldrig använder `scriptEvent.*`. Ett tidigt
  utkast läste `scriptEvent.form`/`scriptEvent.bindingResult` och
  kraschade i produktion med `Cannot read property "email" from
  undefined` — koden nedan använder `form`/`bindingResult` direkt.
