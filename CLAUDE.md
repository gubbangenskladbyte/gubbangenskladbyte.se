# CLAUDE.md

Detta är en statisk Hugo-sajt för **Gubbängens Barnklädesbyte**
(gubbangenskladbyte.se), redigerad av redaktörer via Sveltia CMS och
deployad på Cloudflare Pages vid varje push till `main`. Ingen backend,
ingen databas — allt innehåll är Markdown-filer i git.

## Build-kommandon

```bash
hugo server -D          # lokal utveckling, inkl. draft-innehåll
hugo --minify            # produktionsbygge, samma kommando som körs av Cloudflare Pages
```

Kräver **Hugo Extended** (används för Hugo Pipes/CSS-bearbetning). Inget
npm-tooling behövs för själva sajten — Node/`npx` används bara om
Pagefind (sökfunktion) läggs till senare, vilket inte är fallet idag
(se "Sök" nedan).

Bygget skriver till `public/` (gitignorat).

## Arkitektur

- **Inget tema.** `layouts/`, `assets/`, `static/` ligger direkt i
  repo-roten.
- `layouts/_default/` innehåller generiska `baseof.html`, `single.html`,
  `list.html`. `layouts/blogg/` har sektionsspecifika overrides
  (`list.html` med paginering, `single.html` med datum).
- `layouts/index.html` styr startsidan (hero + introtext + varukategorier
  + ev. bilder).
- `layouts/partials/` innehåller `head.html` (meta/OG/CSS-pipeline),
  `header.html`, `footer.html`, samt `svensk-datum.html` — en liten
  hjälppartial som formaterar datum med svenska månadsnamn, eftersom
  Hugos inbyggda `.Date.Format` inte lokaliserar månadsnamn för den här
  sajtens konfiguration.
- **CSS**: `assets/css/{tokens,main,components}.css` konkateneras via
  Hugo Pipes (`resources.Concat`) i `partials/head.html`. I produktion
  (`hugo.IsProduction`, dvs. vid `hugo --minify`/Cloudflare-bygget)
  minifieras och fingerprintas resultatet; i `hugo server` länkas filerna
  omodifierade för enklare felsökning. Namngivning: löst BEM
  (`.block__element`, `.block--modifier`).
- **Inga taxonomier.** `[taxonomies]` är explicit tom i `hugo.toml` för
  att stänga av Hugos inbyggda `categories`/`tags`.
- **Inget sökindex.** Sajten har ~25 innehållssidor totalt — Pagefind
  bedömdes överflödigt vid uppbyggnaden. Om sidantalet växer kraftigt,
  lägg till `npx --yes pagefind --site public` som ett andra steg i
  Cloudflare Pages build-kommando.

## Innehållsmodell

```
content/
  _index.md                      # startsida (branch bundle)
  om-oss/index.md                # leaf bundle
  for-saljare/index.md           # leaf bundle
  bli-medarbetare/index.md       # leaf bundle
  sa-har-funkar-det-att-salja/index.md
  boka-shoppingtid/index.md
  blogg/
    _index.md                    # listsida, pagineras
    <slug>/index.md              # ett leaf bundle per inlägg
```

- De fem fristående sidorna ligger direkt i content-roten som page
  bundles (inte i en gemensam "sidor"-sektion) — de listas aldrig som en
  samling, bara nås via huvudmenyn. Kontaktuppgifter är en sektion i
  Om oss, ingen egen sida — `content/kontakta-oss/` fanns tidigare som
  en orphan-sida (aldrig länkad i `hugo.toml`s meny) och togs bort.
- `blogg` är den enda listade sektionen (paginerad, `pagerSize = 10` i
  `hugo.toml`).
- Varje sida/inlägg är en **leaf bundle** (`index.md` i egen mapp) så att
  colokerade bilder kan läggas i samma mapp och plockas upp automatiskt
  av layouterna via `.Resources.ByType "image"` — det finns inget behov
  av att referera enskilda bildfilnamn i frontmatter för att de ska
  visas.

## Frontmatter-konvention

Hugo-standardnycklar på engelska, domänspecifika fält på svenska:

```yaml
title: "Om oss"
date: 2026-08-30
draft: false
description: "..."
```

Domänfält som förekommer:
- `bokningsurl` — endast på `boka-shoppingtid`, länk till den
  externa alf.io-bokningen (`bokning.gubbangenskladbyte.se`, egenhostad,
  inte del av detta repo).
- `bokning_aktiv` — bool, endast på `boka-shoppingtid`. Styr bara
  CTA-knappen (rendrad i `layouts/_default/single.html`), inte sidans
  synlighet — det är `draft` som styr det. `false` byter ut länken mot
  en inaktiverad `<span class="btn btn--disabled">`. Notera:
  `eq $.Params.bokning_aktiv false` används istället för Hugos
  `default`-funktion, eftersom `default` behandlar `false` som ett tomt
  värde och skulle skriva över en avsiktlig `false` med `true`.
- `varukategorier` — endast på startsidan, lista med produktkategorier.
- `ingress` — kort ingresstext, endast på startsidan.
- `bilder` — valfri lista med bilder på sidor/inlägg (widget i Sveltia
  CMS för att kunna ladda upp bilder till bundlen). Varje post har ett
  `src` (bundle-relativt filnamn ELLER en extern URL) och ett valfritt
  `bildtext`-fält. `partial "galleri.html"` (se nedan) itererar
  `bilder`-listan direkt som källa till sanning — det är inte en
  passiv bildruta som råkar plocka upp allt i bundlen; en bild som
  laddas upp men inte listas i `bilder` visas inte.

**`draft: true/false` är enda publiceringsmekanismen.** Ingen extra
schemaläggnings- eller statuslogik ovanpå.

## `partial "galleri.html"`

Renderar `bilder`-listan (se ovan) som ett rutnät av `<figure>` med
valfri `figcaption`. Anropas med `(dict "page" . "bilder" $lista)` —
`$lista` är oftast bara `.Params.bilder`, men sidor som redan har
bilder inline i brödtexten (t.ex. `for-saljare`s etikettbilder via
`bild`-shortcoden) filtrerar bort dem först med `where` så de inte
visas dubbelt. Varje `src` provas först som extern URL
(`http(s)://`-prefix), annars slås den upp mot bundlens resurser via
`.Page.Resources.GetMatch`.

## Shortcodes (`layouts/shortcodes/`)

Alla tre kräver `unsafe = true` i `hugo.toml`s goldmark-config (redan
satt) och har en motsvarande **Sveltia CMS "Editor Component"**
registrerad i `static/admin/index.html` — en knapp i verktygsfältet
ovanför **Innehåll**-fältet som öppnar ett formulär istället för att
redaktören skriver shortcode-syntaxen för hand. Ändrar man ett
shortcodes parameternamn eller -ordning **måste** motsvarande
`pattern`/`toBlock` i `static/admin/index.html` uppdateras i samma
commit, annars slutar CMS:et känna igen befintliga instanser i
förhandsgranskningen (hände en gång — se `pattern` nedan för varför
det inte ska vara `^...$`-ankrat).

### `bild` — enskild bild i löptext med storlek/position

```
{{< bild src="filnamn.jpg" storlek="liten" position="höger" alt="Alt-text" >}}
```

- `storlek`: `liten` (8rem) / `medium` (16rem, standard) / `stor` (100%)
- `position`: `vänster` / `center` (standard) / `höger` — vänster/höger
  floatar bilden så text flyter runt den, center gör den till ett
  centrerat block
- `src`: bundle-relativt filnamn eller extern URL (samma upplösning som
  `bilder`-fältet, se `partial "galleri.html"` ovan)
- Om `src` inte kan matchas mot något: `warnf` i byggloggen (icke-fatalt,
  bygget fortsätter, bilden visas bara inte) — inte `errorf`, för att en
  redaktörs felstavade filnamn inte ska kunna fälla hela deployen
- **Containern som `.Content` renderas i måste ha en clearfix**
  (`::after { content:""; display:table; clear:both; }`) annars läcker
  en flytande `bild` ut ur artikeln och överlappar det som kommer
  efter. Alla tre ställen `.Content` renderas (`.page__body`,
  `.post__body`, startsidans `.intro .page__body`) har den — kom ihåg
  att lägga till den på nya containrar också.
- CSS: `.bild`, `.bild--small/medium/large`, `.bild--left/center/right`

### `karta` — interaktiv Google Maps-inbäddning

```
{{< karta adress="Gubbängsskolan, Gubbängsvägen 63, Stockholm" >}}
```

Ingen API-nyckel behövs (`maps.google.com/maps?q=...&output=embed`).
Renderar även en "Visa vägbeskrivning"-länk. CSS: `.karta`.

### `citat` — enskilt citat i löptext

```
{{< citat text="Citattext." person="Namn" >}}
```

`person` är valfritt. Flera anrop i rad radar upp sig i en rad tack
vare `display: inline-block` på `.citat` (ingen förälder-grid behövs,
till skillnad från den gamla `<div class="quotes">`-varianten som
fanns här tidigare — borttagen). Detta är också den **enda**
citat-mekanismen i projektet: `bli-medarbetare` och `for-saljare` hade
tidigare ett separat `citat`/`citatperson`-frontmatter-fält som
renderades ihop med bildgalleriet, men det konsoliderades in i den här
shortcoden för att undvika två saker som båda hette "Citat" i CMS:et.

## Länkkonvention

- **Interna länkar: alltid relativa** (`.RelPermalink`/`.URL`), aldrig
  hårdkodade absoluta URL:er.
- **Undantag: SEO-metadata** (canonical, Open Graph, sitemap, RSS) — där
  används `.Permalink`, som alltid bygger på `baseURL` i `hugo.toml`
  (`https://gubbangenskladbyte.se/`) oavsett vilken host som faktiskt
  serverar sidan (t.ex. en Cloudflare Pages preview-URL).

## Sveltia CMS

`static/admin/config.yml` speglar innehållsmodellen 1:1:
- **`startsida`** — file collection, en post (`content/_index.md`).
- **`sidor`** — file collection med sex poster, en per fristående sida.
  Fälten för fem av dem (alla utom `boka-shoppingtid`) delas via en
  YAML-anker (`&sidfalt`/`*sidfalt`) eftersom de har identisk
  fältstruktur.
- **`blogg`** — folder collection kopplad till `content/blogg/`, skapar
  nya inlägg som `<slug>/index.md`.

Alla fält har `i18n: false` (sajten är enspråkig, ingen i18n-struktur).
Varje collection/fil sätter `media_folder: ""` och `public_folder: ""`
så uppladdade bilder hamnar i samma mapp som `index.md` (page bundle),
inte i en delad global uppladdningsmapp.

## GitHub OAuth-proxy (`functions/`)

Cloudflare Pages Functions som implementerar Decap/Sveltia CMS
popup-OAuth-protokollet:
- `functions/api/auth.js` — redirectar till GitHubs authorize-URL, sätter
  ett kortlivat HttpOnly `oauth_state`-cookie (CSRF-skydd, **inte**
  härlett från request-Host).
- `functions/api/callback.js` — validerar `state` mot cookien, växlar
  `code` mot access token server-side, postar tillbaka token till CMS:et
  via `window.opener.postMessage` enligt standardprotokollet.

`redirect_uri` är hårdkodad till `https://gubbangenskladbyte.se/api/callback`
i **båda** filerna — måste matcha exakt vad som är registrerat i GitHub
OAuth-appen. Kräver miljövariablerna `GITHUB_OAUTH_CLIENT_ID` och
`GITHUB_OAUTH_CLIENT_SECRET` i Cloudflare Pages (aldrig committade).

## Repo-läge

Repot är flyttat till organisationen `gubbangenskladbyte`
(`github.com/gubbangenskladbyte/gubbangenskladbyte.se`). `repo:` i
`static/admin/config.yml` pekar redan dit. Kvarstår: OAuth-app under
organisationen, Cloudflare Pages-projekt mot org-repot, env-vars — se
README.md, avsnittet "Repo-ägarskap: dev vs. produktion".
