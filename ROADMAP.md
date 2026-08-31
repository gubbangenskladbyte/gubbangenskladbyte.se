# Roadmap — gubbangenskladbyte.se

Statustracker för migreringen från WordPress.com till Hugo/Sveltia
CMS/Cloudflare Pages. Uppdateras löpande i repot (inte i lokalt minne)
så statusen är synlig oavsett vilken maskin/session man jobbar från.

## Nu / Next

**Nu:** Grundscaffold + fullständig innehållsmigrering (inkl. bilder)
är committat och pushat till `main` (commit `c3d18b0`). Header/footer
finslipade mot originaldesignen. Inget deployat till Cloudflare Pages
än.

**Next:**
1. Skapa GitHub OAuth App (dev, under `dvalfrid`-kontot) och testa
   `/admin/`-inloggning mot en Cloudflare Pages-preview.
2. Sätt upp Cloudflare Pages-projektet mot detta repo.
3. Låt redaktörerna läsa igenom och godkänna de omskrivna texterna
   (se "Innehåll" nedan).

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
- [ ] GitHub OAuth App skapad (dev)
- [ ] Inloggning i `/admin/` testad end-to-end mot en riktig deploy

### Cloudflare Pages
- [ ] Pages-projekt skapat, kopplat till repot
- [ ] Build-konfiguration satt (`hugo --minify`, output `public`,
      `HUGO_VERSION`)
- [ ] `GITHUB_OAUTH_CLIENT_ID`/`GITHUB_OAUTH_CLIENT_SECRET` satta som
      env-vars
- [ ] Första lyckade deploy verifierad

### Bokning (extern, alf.io)
- [ ] `bokning.gubbangenskladbyte.se` uppsatt och driftsatt (utanför
      detta repo)
- [ ] `bokningsurl`-fältet på "Boka shoppingtid" pekar mot skarp
      instans

### Domän
- [ ] DNS för `gubbangenskladbyte.se` pekad mot Cloudflare Pages
- [ ] Gammal wordpress.com-sajt avslutad/redirectad (om möjligt via
      WordPress.coms inställningar)

### Repo-ägarskap (dev → produktion)
- [ ] Repo flyttat till egen GitHub-organisation
- [ ] Ny GitHub OAuth App under organisationen
- [ ] Cloudflare Pages ompekad mot org-repot
- [ ] Env-vars uppdaterade till den nya OAuth-appen
- [ ] `repo:` i `static/admin/config.yml` uppdaterad till
      `<organisation>/gubbangenskladbyte.se`
- [ ] Redaktörernas skrivbehörighet verifierad i org-repot

Se README.md, avsnittet "Repo-ägarskap: dev vs. produktion", för
detaljerad checklista kring flytten.
