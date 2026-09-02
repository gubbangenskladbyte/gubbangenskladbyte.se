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
  kontakta-oss/index.md
  blogg/
    _index.md                    # listsida, pagineras
    <slug>/index.md              # ett leaf bundle per inlägg
```

- De sex fristående sidorna ligger direkt i content-roten som page
  bundles (inte i en gemensam "sidor"-sektion) — de listas aldrig som en
  samling, bara nås via huvudmenyn.
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
  CMS för att kunna ladda upp bilder till bundlen). Varje post kan ha
  ett `bildtext`-fält (bildtext/figcaption). Layouterna använder inte
  `src` direkt för att avgöra vad som visas — de plockar upp alla
  bildresurser i bundlen automatiskt (`partial "galleri.html"`,
  se nedan) — men slår upp `bildtext` via `src` som nyckel för att sätta
  rätt figcaption på rätt bild.
- `citat` / `citatperson` — valfritt pull-quote (endast `bli-medarbetare`
  och `for-saljare` just nu), renderas i samma rutnät som bildgalleriet
  via `partial "galleri.html"`.

**`draft: true/false` är enda publiceringsmekanismen.** Ingen extra
schemaläggnings- eller statuslogik ovanpå.

## `bild`-shortcode

För enskilda bilder inline i brödtext (storlek + position + eventuell
textflytning) — separat från det automatiska bildgalleriet ovan, som
alltid visar alla bundle-bilder i ett rutnät utan positionskontroll.

```
{{< bild src="filnamn.jpg" storlek="liten" position="höger" alt="Alt-text" >}}
```

- `storlek`: `liten` (8rem) / `medium` (16rem, standard) / `stor` (100%)
- `position`: `vänster` / `center` (standard) / `höger` — vänster/höger
  floatar bilden så text flyter runt den, center gör den till ett
  centrerat block
- `src` matchas mot en bildresurs i sidans egen page bundle via
  `.Page.Resources.GetMatch` — samma bundle-princip som `bilder`-fältet
- Kräver `unsafe = true` i `hugo.toml`s goldmark-config (redan satt) —
  shortcoden själv renderar ren `<img>`, men samma inställning tillåter
  även rå HTML i markdown-body rent generellt (används t.ex. för
  `<div class="quotes">`-blocket på `sa-har-funkar-det-att-salja`)
- Om `src` inte matchar någon bundle-resurs: `warnf` i byggloggen
  (icke-fatalt, bygget fortsätter, bilden visas bara inte) — inte
  `errorf`, för att en redaktörs felstavade filnamn inte ska kunna
  fälla hela deployen

CSS-klasserna (`.bild`, `.bild--small/medium/large`,
`.bild--left/center/right`) ligger i `assets/css/components.css`.

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
