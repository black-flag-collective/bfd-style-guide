# Skill: Design Mindset — BFD Consistency Enforcement

> **READ THIS BEFORE TOUCHING ANY COMPONENT IN THIS STYLE GUIDE.** This is the mandatory design review protocol that must be applied every time a section, component, or interactive element is created or modified. Every visual decision must pass the checklist at the bottom of this document.

**Last verified: February 2026**
**Maintainer obligation: Update this file whenever a canonical pattern changes. This is the single source of truth for visual consistency.**

---

## The BFD Design DNA

Three non-negotiable principles drive every visual decision:

1. **Monochromatic confidence** — The system is built on clean neutrals (`#FFFFFF`, `#FAFAFA`, `#171717`, `#737373`, `#E5E5E5`). Color enters only as brand ink (`#181B20`, `#F8F7F6`) or playful pops (yellow, green, purple). Never mud the hierarchy with random blues, grays, or off-brand values.

2. **Active = Dark Fill** — Across the entire system, "active/selected" means `bg-bf-text text-white`. Not elevation (shadow), not underline, not border change alone. A solid dark pill with white text. This is the single most important visual consistency rule. Tabs, toggles, filters, segmented controls — ONE pattern.

3. **Confidence through restraint** — Subtle rounded corners (`rounded-md` / `rounded-lg`, never `rounded-full` on containers). Soft shadows (`shadow-card`, `shadow-sm`). No gradients on UI chrome. No inset shadows. The design breathes through whitespace, not decoration.

---

## Section Shell Canon

Every section (except Hero) follows this structure:

```tsx
<section className="relative z-[N] px-6 pt-6">
  <div style={{ height: "calc(100vh + Xpx)" }}>
    <div
      className="sticky top-6 [bg] rounded-xl [shadow] overflow-hidden"
      style={{ height: "calc(100vh - 48px)" }}
    >
      <div className="h-full px-8 md:px-12 lg:px-16 pt-24 pb-8 flex flex-col overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
          {/* Section heading */}
          <motion.div className="mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-bf-text mb-3">Title</h2>
            <p className="text-base text-bf-muted max-w-xl">Description.</p>
          </motion.div>
          {/* Content */}
        </div>
      </div>
    </div>
  </div>
</section>
```

### Required values:

| Element | Light Section | Dark Section |
|---------|--------------|--------------|
| Background | `bg-bf-bg` | `bg-bf-dark-bg` |
| Shadow | `shadow-card` | `shadow-float` |
| Content max-width | `max-w-6xl` | `max-w-6xl` |
| Inner padding | `px-4 sm:px-8 md:px-12 lg:px-16 pt-16 sm:pt-24 pb-6 sm:pb-8` | same |
| Heading | `text-3xl sm:text-4xl md:text-5xl font-bold text-bf-text mb-3` | `...text-bf-dark-text mb-3` |
| Description | `text-base text-bf-muted max-w-xl` | `...text-bf-dark-muted max-w-xl` |
| Header block mb | `mb-10` (canonical; flex 8–12 based on density) | same |

**Documented exceptions**:
- TypographySection uses `pt-6 pb-4` because the type specimen needs maximum vertical space for proportional scale display.
- Mobile responsive breakpoints (`px-4 sm:px-8`, `pt-16 sm:pt-24`, `pb-6 sm:pb-8`, `text-3xl sm:text-4xl`) are mandatory for mobile-first delivery. The values above reflect the canonical mobile-responsive pattern.

---

## Sub-Heading Pattern

Used for titled subsections within a section:

```
Light:  text-sm font-medium text-bf-text mb-4 uppercase tracking-wider
Dark:   text-sm font-medium text-bf-dark-text mb-4 uppercase tracking-wider
```

**Always `mb-4`.** Not 2, not 3, not 5. This is a hard rule.

For spec card labels (bold subsection headers within specification cards):

```
Light:  text-xs font-black text-bf-text uppercase tracking-wider
Dark:   text-xs font-black text-bf-dark-text uppercase tracking-wider
```

---

## Active State = Dark Fill (CRITICAL)

This is the most important consistency rule in the entire design system:

```
Active:   bg-bf-text text-white border-transparent
Inactive: text-bf-muted hover:text-bf-text hover:bg-white/40
```

Applies to ALL interactive selectors:
- Tab bars (secondary navigation)
- Segmented controls (mode switchers)
- Filter pills
- Toggle buttons (style guide chrome)
- Settings navigation items

**NEVER** use these for active state:
- `shadow-card` elevation (shadow as selection indicator)
- `bg-bf-bg` with shadow (white pill on white background)
- Underlines alone
- Border-only highlights without fill change

**Why**: A consistent active pattern trains the user's eye. When active always means "dark fill", the entire UI becomes scannable in milliseconds. Mixing elevation-based and fill-based active states creates cognitive load.

---

## Style Guide Chrome vs Demo Elements

### Chrome (controls the demo):
Toggles, replay buttons, mode switchers that let you interact with the style guide.

```
Active:   bg-bf-text text-white border-2 border-bf-text
Inactive: bg-transparent text-bf-muted border-2 border-bf-border hover:border-bf-text/40
```

NO comic shadows on chrome controls. Comic shadows are brand personality for sticky notes and playful callouts only.

### Demo elements (show what the admin app looks like):
These follow the spec being documented. They ARE the canonical patterns.

---

## Dark Section Card & Border Tokens

On dark backgrounds (`bg-bf-dark-bg`), use design tokens instead of raw opacity values:

| Pattern | Use Case |
|---------|----------|
| `bg-bf-dark-surface border border-bf-dark-border` | Structural containers (hierarchy cards, spec cards) |
| `bg-white/5 border border-white/10` | Very subtle containers (table headers) |
| `border-white/5` | Table row dividers (minimal visibility) |
| `border-2 border-bf-dark-border` | Prominent demo containers |

Prefer `bf-dark-surface` (#1C1C1C) and `bf-dark-border` (#333333) for structural elements. Reserve raw `white/N` opacity values only for extremely subtle or decorative elements like table stripe backgrounds.

---

## Button Text on Dark Fills

When text sits on `bg-bf-text` or any dark fill, always use `text-white`.

Never use:
- `text-bf-bg` — semantically wrong ("background color" as text color)
- `text-bf-button-text` — that token is for the button primitive definition, not for inline usage

`text-white` is the universal, unambiguous choice for white text on dark fills.

---

## Iconography

**Primary icon library: `lucide-react`** (already installed in both `bfd-style-guide` and `bfd-front-door`).

The admin app (`admin-app-convex`) uses `@tabler/icons-react` for the sidebar and `lucide-react` for everything else. For the design system and cross-platform consistency, we standardize on `lucide-react`.

### Icon Constants

| Property | Value |
|----------|-------|
| Default size | `20` (sidebar nav), `16` (breadcrumbs, inline), `14` (filter bars, secondary) |
| Stroke width | `1.75` (standard), `2` (small icons, chevrons) |
| Color | Inherits from parent `text-*` class |

### Canonical Icon Mapping (Admin Sidebar)

| Section | Icon | Import |
|---------|------|--------|
| Clients | `Building2` | `lucide-react` |
| Events | `Zap` | `lucide-react` |
| Code Gen | `DollarSign` | `lucide-react` |
| Infrastructure | `Server` | `lucide-react` |
| People | `Users` | `lucide-react` |

### Common UI Icons

| Context | Icon | Size |
|---------|------|------|
| Search | `Search` | 14 |
| Close / Dismiss | `X` | 12–16 |
| Breadcrumb separator | `ChevronRight` | 12, stroke 2 |
| Nav arrow (prev) | `ChevronLeft` | 14, stroke 2 |
| Nav arrow (next) | `ChevronRight` | 14, stroke 2 |
| Settings | `Settings` | 16 |
| Folder | `Folder` | 16 |
| Add / Create | `Plus` | 16 |
| Filter | `Filter` | 14 |
| External link | `ExternalLink` | 14 |

### Forbidden Icon Patterns

- **NEVER** use emoji characters as icons (🏢, ⚡, 💲, etc.)
- **NEVER** use text characters as arrows (‹, ›, ←, →)
- **NEVER** use CSS-generated pseudo-element icons
- **ALWAYS** use the `lucide-react` component with explicit `size` and `strokeWidth` props

---

## Spacing Constants

| Context | Value |
|---------|-------|
| Section outer padding | `px-6 pt-6` |
| Section inner padding | `px-4 sm:px-8 md:px-12 lg:px-16 pt-16 sm:pt-24 pb-6 sm:pb-8` |
| Section heading → first content | `mb-10` (canonical, flex 8–12) |
| Sub-heading → content below it | `mb-4` |
| Between major content blocks | `mb-10` or `mb-14` |
| Spec card inner padding | `p-5` or `p-6` |
| Demo container border | `border-2 border-bf-border` (light) / `border-2 border-bf-dark-border` (dark) |

---

## Animation Constants

All framer-motion transitions use the BFD signature curve:

| Property | Value |
|----------|-------|
| Easing | `[0.16, 1, 0.3, 1]` (expo-out) |
| Entry duration | 0.5–0.8s |
| Stagger per child | 0.04–0.1s |
| Hover transitions | `duration: 0.3, ease: "easeOut"` |
| whileInView | `viewport={{ once: true }}` |

Never use `ease-in`, `ease-in-out`, or linear easing for entrance animations. Expo-out is the brand's motion signature: fast start, gentle landing.

---

## Pre-Flight Checklist

Before ANY component or section is considered done, verify:

- [ ] Does every active/selected state use `bg-bf-text text-white`?
- [ ] Is the section content max-width `max-w-6xl`?
- [ ] Are all sub-heading margins exactly `mb-4`?
- [ ] Does the section heading follow `text-3xl sm:text-4xl md:text-5xl font-bold`?
- [ ] Are dark section structural containers using `bg-bf-dark-surface` / `border-bf-dark-border`?
- [ ] Is button/pill text on dark fills using `text-white` (not `text-bf-bg`)?
- [ ] Are animations using the expo-out curve `[0.16, 1, 0.3, 1]`?
- [ ] Are style guide chrome controls free of comic shadows?
- [ ] Do light sections use `shadow-card` and dark sections use `shadow-float`?
- [ ] Is the section inner padding `px-4 sm:px-8 md:px-12 lg:px-16 pt-16 sm:pt-24 pb-6 sm:pb-8`?
- [ ] Do demo elements accurately reflect the documented spec?
- [ ] Is there ONE way to indicate selection/active state? (dark fill only)
- [ ] Are ALL icons using `lucide-react` components (never emoji, never text characters)?
- [ ] Do icons have explicit `size` and `strokeWidth` props?

---

## Brand Authority

You ARE the BFD designer. You have full authority to:
- Change any color, spacing, or animation value
- Restructure any component layout
- Add or remove design tokens
- Override any previous decision

But you must:
1. Document WHY the change was made
2. Ensure the change cascades consistently across ALL sections
3. Update this skill file if a canonical pattern changes

A change in one place means a change everywhere. Inconsistency is the enemy.

---

## Related Skills

- [Design System](../design-system/SKILL.md) — Token definitions, color math, typography scale
- [Components](../components/SKILL.md) — Component tree, adding sections
- [Architecture](../architecture/SKILL.md) — Why React islands, Astro shell
