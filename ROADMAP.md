# Roadmap — gubbangenskladbyte.se

Statustracker för migreringen från WordPress.com till Hugo/Sveltia
CMS/Cloudflare Pages. Uppdateras löpande i repot (inte i lokalt minne)
så statusen är synlig oavsett vilken maskin/session man jobbar från.

## Nu / Next

**Nu:** Sajten är **live på `https://gubbangenskladbyte.se`** —
verifierat (giltigt SSL, rätt innehåll, canonical-URL:er pekar rätt).
`/admin/`-inloggningen (GitHub OAuth via `functions/api/auth.js` +
`callback.js`) är testad end-to-end av redaktör och fungerar. Hela
deploy-kedjan (repo → Cloudflare Pages → domän → CMS-inloggning) är
därmed i drift.

**Next:**
1. Ge redaktörerna skrivbehörighet i org-repot (om inte redan gjort).
2. Låt redaktörerna läsa igenom och godkänna de omskrivna texterna
   (se "Innehåll" nedan).
3. Avsluta/redirecta gamla wordpress.com-sajten när ni är redo.
4. Skicka det författade meddelandet till Instagram/Facebook-ansvarig
   (företagskonto + koppling till Facebook-sidan) och invänta
   engångsgodkännandet.
5. Bygg Instagram-tokenförnyelsen (Cloudflare Worker + KV) och
   visningsflödet på sajten (se "Instagram-integration" nedan).

## Status

### Grundstruktur
- [x] Hugo Extended-sajt scaffoldad (`layouts/`, `assets/`, `static/` i
      repo-roten, inget tema)
- [x] CSS-pipeline (`tokens/main/components.css` → Hugo Pipes →
      minify+fingerprint i produktion)
- [x] Innehållsmodell godkänd och implementerad (startsida, 6 fristående
      sidor, `blogg`-section utan taxonomi)
- [x] `hugo --minify` bygger utan fel/varningar

### Innehåll
- [x] Startsida, 6 fristående sidor, 17 blogginlägg migrerade som text
      (omskrivna från wordpress.com-sidornas innehåll)
- [x] Riktiga bilder migrerade från wordpress.com (site-logga,
      startsidans två bilder, "För säljare" etikettexempel + personalfoton,
      "Bli medarbetare" personalfoton, "Om oss" kartbild, "Kontakta oss"
      logga, "Så här funkar det att sälja" Human Bridge-logga) — hämtade
      direkt från originalsidornas `data-orig-file`-attribut och lagda i
      respektive page bundle
- [ ] Innehållet på varje sida/inlägg genomläst och godkänt av
      redaktörerna (texterna är omskrivna, inte 1:1-kopior av
      originalet)
- [ ] Exakt Instagram-URL verifierad (endast användarnamn kunde
      bekräftas vid analysen, `@gubbangens_barnkladesbyte`)

### Sveltia CMS
- [x] `static/admin/config.yml` speglar innehållsmodellen
- [x] GitHub OAuth App skapad under `gubbangenskladbyte`-organisationen
- [x] Inloggning i `/admin/` testad end-to-end — fungerar

### Cloudflare Pages
- [x] Pages-projekt skapat, kopplat till `gubbangenskladbyte/gubbangenskladbyte.se`
- [x] Build-konfiguration satt (`hugo --minify`, output `public`,
      `HUGO_VERSION=0.165.0`)
- [x] `GITHUB_OAUTH_CLIENT_ID`/`GITHUB_OAUTH_CLIENT_SECRET` satta som
      env-vars
- [x] Första lyckade deploy verifierad — `gubbangenskladbyte-se.pages.dev`,
      Hugo-bygget (29 sidor) och OAuth-proxyn (`functions/`) kompilerades
      och deployades utan fel

### Bokning (alf.io)
- [x] `bokning.gubbangenskladbyte.se` uppsatt och driftsatt (utanför
      detta repo, Heroku)
- [x] Bokningen inbäddad via iframe på "Boka shoppingtid" istället för
      att bara länka ut (se CLAUDE.md, "Bokning (iframe-inbäddning)")
- [x] `EMBED_ALLOWED_ORIGINS`/`EMBED_POST_MESSAGE_ORIGIN` satta i
      alf.io-admin så inbäddning/postMessage tillåts
- [x] Svenska aktiverat som språk på eventet + `?lang=sv` i
      `bokningsurl` som extra säkerhet
- [x] "Event Custom CSS" i alf.io matchat mot sajtens utseende
      (dölj dubblerad logga/header, matcha färger/typsnitt — se
      README.md, avsnittet "Bokning")
- [x] Extension-script för max antal biljetter per e-postadress
      (`RESERVATION_VALIDATION`-hook, valfri tidsparameter för att
      släppa spärren automatiskt — se README.md, avsnittet "Bokning")
- [ ] `bokningsurl` uppdateras till rätt specifikt event **inför varje
      ny bokningsrunda** (återkommande uppgift, inte en engångscheckbox)
- [ ] `maxTicketsPerEmail`/`apiKey`/ev. `limitReleaseAt` ifyllda på
      eventets Configuration-sida inför skarp bokningsrunda

### SEO
- [x] Alt-text i galleribilder — `bilder`-fältets `bildtext`
      återanvänds nu som `alt`, både i `partial "galleri.html"` och på
      startsidan
- [x] `og:image` för länkförhandsvisning (sidans egen bild →
      startsidans banner → loggan som sista fallback)
- [x] `Sitemap:`-rad tillagd i `robots.txt`
- [x] Bing Webmaster Tools-verifiering (`static/BingSiteAuth.xml`)
- [ ] Fylla i Bildtext för startsidans banner-/kategoribild
      (`gubbis1.jpg`/`gubbis2.jpg`) i CMS:et — mekaniken finns, texten
      saknas än
- [ ] (Valfritt) Strukturerad data (JSON-LD, `Organization`/
      `LocalBusiness`) för rikare Google-resultat — inte byggt

### Instagram-integration (ej påbörjad)
Mål: visa de senaste Instagram-inläggen automatiskt på sajten.
- [ ] Skicka meddelande till Instagram/Facebook-ansvarig: verifiera
      företagskonto (Business) + koppling till Facebook-sidan
      (meddelande författat, ej skickat)
- [ ] Engångsgodkännande av åtkomst via Meta/Facebook-inloggning
- [ ] Skapa Meta Developer-app (App ID/Secret) för Instagram Graph API
- [ ] Bygg en **fristående Cloudflare Worker** med cron-trigger som
      förnyar access-token med marginal (t.ex. varje vecka) —
      **Cloudflare Pages Functions saknar cron-stöd** (verifierat mot
      Cloudflares dokumentation), så det kan inte ligga i `functions/`
      utan måste deployas separat via `wrangler`
- [ ] Cloudflare KV-lagring för aktuell token, delad mellan
      förnyelse-Workern och sajtens visningsflöde
- [ ] Pages Function i det här repot som hämtar Instagram-flödet åt
      sajten med token från KV
- [ ] Frontend-komponent som visar flödet på sajten (blir sajtens
      andra JS-kod, se CLAUDE.md om `bokning`-scriptet som den första)

### Domän
- [x] Domänen tillagd i Cloudflare (Connect, inte Transfer —
      registreringen är oförändrad hos nuvarande registrar)
- [x] ProtonMail DKIM-CNAME satt till DNS only (var felaktigt Proxied
      vid import, hade annars brutit e-postautentiseringen)
- [x] Nameserver-byte propagerat, domänen Active i Cloudflare
- [x] `gubbangenskladbyte.se` kopplad som Custom Domain på
      Pages-projektet
- [x] DNS för `gubbangenskladbyte.se` pekad mot Cloudflare Pages —
      live, giltigt SSL, verifierat
- [ ] Gammal wordpress.com-sajt avslutad/redirectad (om möjligt via
      WordPress.coms inställningar)

### Repo-ägarskap (dev → produktion)
- [x] Repo flyttat till egen GitHub-organisation
      (`gubbangenskladbyte/gubbangenskladbyte.se`)
- [x] `repo:` i `static/admin/config.yml` uppdaterad till org-repot
- [x] Ny GitHub OAuth App under organisationen
- [x] Cloudflare Pages kopplat mot org-repot (eget Cloudflare-konto,
      `Admin@gubbangenskladbyte.se`)
- [x] Env-vars satta till OAuth-appens värden
- [ ] Redaktörernas skrivbehörighet verifierad i org-repot

Se README.md, avsnittet "Repo-ägarskap: dev vs. produktion", för
detaljerad checklista kring flytten.
