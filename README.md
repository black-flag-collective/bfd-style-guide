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
| Ink | `#171717` | `--bf-text` | Primary text and dark logo |
| Paper | `#F4F4F5` | `--bf-bg` | Page canvas |
| Card | `#FAFAFA` | `--bf-paper` | Reading surfaces and cards |
| Border | `#D4D4D8` | `--bf-border` | Rules and structure |
| Muted | `#71717A` | `--bf-muted` | Secondary text, subject to contrast checks |
| Cobalt | `#3B6CE7` | `--bf-cobalt` | Links, focus, information |
| Gold | `#FFC800` | `--bf-gold` | Attention and caution |
| Mint | `#5AE09A` | `--bf-mint` | Healthy and complete states |

The [current BFD site](https://bfd.studio/) also uses a print palette for editorial artwork: blue `#2759D6`, coral `#EE6950`, yellow `#EAC74D`, and pale blue wash `#E5EAF5`. Use the `--bf-print-*` tokens for illustration and occasional editorial accents. Do not use them in place of product status colors.

## Typography

- **Sans**: Montserrat (Google Fonts, weights 400/500/600/700/800/900)
- **Mono**: JetBrains Mono (Google Fonts, weights 400/500)
- **Editorial headings**: bold Montserrat with tight tracking; occasional Georgia italic words give the marketing site its print character.
- **Product UI**: lead with the work itself. Do not add page banners, eyebrows, or editorial heading stacks to Agora. Use short labels only when they help someone navigate, understand a state, or take an action.
- **Body**: weight 400, 0.875rem/1.6
- **Corners**: subtle rounding (4px/8px/12px)

## Product surfaces

Agora is a shared workspace, not a generic dashboard. Home opens directly on projects and delivery, without a page banner or eyebrow. A project card shows the actual project or client logo, name, purpose, and direct link. Project and client marks sit on a solid light surface at full opacity, with a neutral fallback when no logo exists. Activity cards keep vendor marks recognizable without hover, expose a clear Open action, and show enough conversation context to decide whether to read further. Search and secondary controls open when needed; source and date remain quick to reach.

Do not hide a useful record behind a label that describes a database event. Use the person's action and the project it affected. Keep missing owners, stale sources, and incomplete checks visible in plain words. At mobile widths, keep navigation, context, and primary actions available rather than relying on hover. Storybook states should cover ready, loading, empty, error, and narrow-screen views.
