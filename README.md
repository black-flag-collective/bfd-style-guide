# Black Flag Design Style Guide

Brand guidelines for Black Flag Design. Static site built with Astro 5 and React, deployed to Cloudflare Pages.

## URLs

- **Production**: https://brand.blackflag.design
- **Staging**: https://brand-staging.blackflag.design
- **Pages**: https://bfd-style-guide.pages.dev

## Tech Stack

- **Framework**: Astro 5 (static output)
- **Components**: React 18 islands (framer-motion, lucide-react)
- **Styling**: Tailwind CSS v4
- **Hosting**: Cloudflare Pages
- **CI/CD**: GitHub Actions (push to `main` deploys production, push to `staging` deploys staging)

## Development

```bash
npm install
npm run dev
```

Dev server runs on **port 4350** (fixed to avoid collision with other Astro projects).

## Build

```bash
npm run build
npm run preview
```

Static output is generated in `dist/`.

## Deployment

Deployment is automatic via GitHub Actions:

- Push to `main` -> deploys to production (`brand.blackflag.design`)
- Push to `staging` -> deploys to staging (`brand-staging.blackflag.design`)

Manual deployment:

```bash
npx wrangler pages deploy dist --project-name=bfd-style-guide --branch=main
```

## Project Structure

```
bfd-style-guide/
├── src/
│   ├── components/
│   │   ├── Navigation/
│   │   ├── Footer/
│   │   ├── BrandLogo/
│   │   ├── effects/        # ScrollBackground, MenuOverlay, AngularGeometry
│   │   ├── sections/       # Hero, Logo, Color, Typography, Motion, Components, Voice
│   │   └── ui/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css      # Tailwind v4 @theme + BFD brand tokens
│   └── App.tsx
├── public/                  # Static assets (logos, favicons)
├── astro.config.mjs
├── wrangler.toml
├── tsconfig.json
└── package.json
```

## Brand Colors

| Role | Hex | Token | Usage |
|------|-----|-------|-------|
| **Text** | `#171717` | `--bf-color-text` | Primary text, logo dark variant |
| Surface | `#FAFAFA` | `--bf-color-surface` | Card/surface fill |
| Muted | `#737373` | `--bf-color-muted` | Secondary text |
| Border | `#E5E5E5` | `--bf-color-border` | Borders, dividers |
| Accent | `#181B20` | `--bf-color-accent` | Brand ink |
| Paper | `#F8F7F6` | `--bf-color-paper` | Off-white paper bg |
| Note Yellow | `#FFC800` | `--bf-note-warning` | Playful accent |
| Note Green | `#5AE09A` | `--bf-note-success` | Playful accent |
| Note Purple | `#7B3EC4` | `--bf-note-highlight` | Playful accent |

## Typography

- **Sans**: Montserrat (Google Fonts, weights 400/500/600/700/900)
- **Mono**: JetBrains Mono (Google Fonts, weights 400/500)
- **Headings**: weight 400–500, letter-spacing -0.02em
- **Body**: weight 400, 0.875rem/1.6
- **Corners**: subtle rounding (4px/8px/12px)
