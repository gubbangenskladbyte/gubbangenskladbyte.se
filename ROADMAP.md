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
2. Sätt upp `bokning.gubbangenskladbyte.se` (alf.io).
3. Låt redaktörerna läsa igenom och godkänna de omskrivna texterna
   (se "Innehåll" nedan).
4. Avsluta/redirecta gamla wordpress.com-sajten när ni är redo.

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

### Bokning (extern, alf.io)
- [ ] `bokning.gubbangenskladbyte.se` uppsatt och driftsatt (utanför
      detta repo)
- [ ] `bokningsurl`-fältet på "Boka shoppingtid" pekar mot skarp
      instans

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
