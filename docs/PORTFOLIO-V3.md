# Portfolio v3 — AOE case studies (Nov 2026)

PRD: https://claude.ai/artifact/DF9tdGj3ZP3MyLJCmQ4bRg · Audit: https://claude.ai/artifact/T3eqVgee1zrq6nzGF5KAHJ

## How case studies work
- `web/app/data/caseStudies.json` — the 14 AOE Creative case studies (chapter layout, stats, video). Generated once from Markel Lee's site data, then rewritten in Nabil's voice (role = Co-Founder & CTO). Edit this file directly from now on.
- `web/app/data/projects.json` — the legacy projects. `web/lib/caseStudies.ts` adapts them into the same shape so every slug uses one template. Tags for legacy entries live in `LEGACY_TAGS`.
- `web/components/case/` — `CaseStudy` (layout), `MediaItem` (MP4 loop/controls + click-to-load YouTube), `CaseImage`, `Reveal`.
- `web/public/media/aoe/` — re-encoded WebP (640/1280/1920) + MP4 + posters copied from markel-lee-website.
- Portfolio hero: `web/components/portfolio/PortfolioHero.*`, ported from npc-homepage-redesign. No "Consulting" text.

## Sprints (Definition of Done)
| Sprint | Done when | Status |
|---|---|---|
| 1 Layout | All slugs build in the chapter layout, video works, pushed | Done |
| 2 Hero | Ripple/shimmer/sheen hero, reduced-motion safe, no "Consulting" | Done |
| 3 New AOE cases | 8 new cases with media + stats, Nabil voice | Done (shipped in Sprint 1) |
| 4 Expand + tags | 6 shared cases replaced, 5-tag filters, no empty media on IGoP/OW sub-pages | Done |
| 5 QA + ship | Build passes, docs, Netlify deploy from main | Build passes; Lighthouse run pending on live site |

## Deviations from the PRD
- Sprints 3–4 content landed in Sprint 1: the data import produced all 14 cases at once, so splitting them added no value.
- Added a 5th tag, "Product & Web", for non-AOE product/app work (PRD listed 4).
- Task/approach/work bullets keep the shared project wording; Role and Challenge are rewritten in Nabil's voice. Campaign awards removed; only agency award (3× Best Esports Agency of the Year Finalist) appears, in the portfolio hero.
- Legacy pages show "Product & Project Lead" as role title (estimate — confirm).
- Media adds ~225 MB to the repo (largest file 30 MB). Consider Git LFS later.
- Local builds need Google Fonts network access (next/font); Netlify builds are unaffected.
