---
name: Obsidian Precision
colors:
   surface: '#131315'
   surface-dim: '#131315'
   surface-bright: '#39393b'
   surface-container-lowest: '#0e0e10'
   surface-container-low: '#1c1b1d'
   surface-container: '#201f22'
   surface-container-high: '#2a2a2c'
   surface-container-highest: '#353437'
   on-surface: '#e5e1e4'
   on-surface-variant: '#c4c7c8'
   inverse-surface: '#e5e1e4'
   inverse-on-surface: '#313032'
   outline: '#8e9192'
   outline-variant: '#444748'
   surface-tint: '#c6c6c7'
   primary: '#ffffff'
   on-primary: '#2f3131'
   primary-container: '#e2e2e2'
   on-primary-container: '#636565'
   inverse-primary: '#5d5f5f'
   secondary: '#c8c6c9'
   on-secondary: '#303033'
   secondary-container: '#47464a'
   on-secondary-container: '#b6b4b8'
   tertiary: '#ffffff'
   on-tertiary: '#303037'
   tertiary-container: '#e3e1ea'
   on-tertiary-container: '#64646b'
   error: '#ffb4ab'
   on-error: '#690005'
   error-container: '#93000a'
   on-error-container: '#ffdad6'
   primary-fixed: '#e2e2e2'
   primary-fixed-dim: '#c6c6c7'
   on-primary-fixed: '#1a1c1c'
   on-primary-fixed-variant: '#454747'
   secondary-fixed: '#e4e1e5'
   secondary-fixed-dim: '#c8c6c9'
   on-secondary-fixed: '#1b1b1e'
   on-secondary-fixed-variant: '#47464a'
   tertiary-fixed: '#e3e1ea'
   tertiary-fixed-dim: '#c7c5ce'
   on-tertiary-fixed: '#1b1b21'
   on-tertiary-fixed-variant: '#46464d'
   background: '#131315'
   on-background: '#e5e1e4'
   surface-variant: '#353437'
typography:
   headline-xl:
      fontFamily: Geist
      fontSize: 32px
      fontWeight: '600'
      lineHeight: 40px
      letterSpacing: -0.025em
   headline-xl-mobile:
      fontFamily: Geist
      fontSize: 24px
      fontWeight: '600'
      lineHeight: 32px
      letterSpacing: -0.02em
   headline-lg:
      fontFamily: Geist
      fontSize: 24px
      fontWeight: '600'
      lineHeight: 32px
      letterSpacing: -0.02em
   headline-md:
      fontFamily: Geist
      fontSize: 20px
      fontWeight: '500'
      lineHeight: 28px
      letterSpacing: -0.015em
   headline-sm:
      fontFamily: Geist
      fontSize: 16px
      fontWeight: '500'
      lineHeight: 24px
      letterSpacing: -0.01em
   body-lg:
      fontFamily: Geist
      fontSize: 16px
      fontWeight: '400'
      lineHeight: 24px
      letterSpacing: 0em
   body-md:
      fontFamily: Geist
      fontSize: 14px
      fontWeight: '400'
      lineHeight: 20px
      letterSpacing: 0em
   body-sm:
      fontFamily: Geist
      fontSize: 13px
      fontWeight: '400'
      lineHeight: 18px
      letterSpacing: 0.005em
   label-md:
      fontFamily: Geist
      fontSize: 12px
      fontWeight: '500'
      lineHeight: 16px
      letterSpacing: 0.01em
   label-sm:
      fontFamily: Geist
      fontSize: 11px
      fontWeight: '500'
      lineHeight: 14px
      letterSpacing: 0.02em
   code-md:
      fontFamily: JetBrains Mono
      fontSize: 13px
      fontWeight: '400'
      lineHeight: 18px
      letterSpacing: 0em
   code-sm:
      fontFamily: JetBrains Mono
      fontSize: 11px
      fontWeight: '400'
      lineHeight: 14px
      letterSpacing: 0em
rounded:
   sm: 0.125rem
   DEFAULT: 0.25rem
   md: 0.375rem
   lg: 0.5rem
   xl: 0.75rem
   full: 9999px
spacing:
   gutter: 1rem
   gutter-desktop: 1.5rem
   margin: 1rem
   margin-desktop: 2rem
   space-2xs: 0.125rem
   space-xs: 0.25rem
   space-sm: 0.5rem
   space-md: 0.75rem
   space-lg: 1rem
   space-xl: 1.5rem
   space-2xl: 2rem
---

## Brand & Style

This design system embodies high-density, terminal-grade precision inspired by contemporary developer productivity tools and foundational engineering consoles. The aesthetic is ruthlessly functional, restrained, and anti-ornamental: eliminating playful gradients, rounded pill surfaces, blurred translucencies, and skeuomorphic flourishes in favor of geometric clarity and information density.

The target audience consists of software engineers, systems architects, and technical operators who value low latency, spatial economy, keyboard-driven navigation, and high typographic legibility under sustained viewing. The visual character communicates stability, absolute control, and razor-sharp craftsmanship through crisp single-pixel hair lines, strictly structured tonal tiers, and disciplined white space.

## Colors

The palette is calibrated strictly within a deep neutral slate/zinc chromatic scale to prioritize contrast and long-duration eye comfort:

- **Canvas & Backgrounds:**
   - Base canvas: `#09090b` (deep near-black / zinc-950).
   - Sub-surface / low elevation: `#121215` (zinc-900 at 50% luminance drop).
   - Elevated surfaces / cards / popovers: `#18181b` (zinc-900).
   - Hover / active row states: `#27272a` (zinc-800 at 50% opacity or solid fill).

- **Borders & Dividers:**
   - Standard structural border: `1px solid #27272a` (zinc-800).
   - Subtle divider / inactive border: `1px solid rgba(39, 39, 42, 0.6)`.
   - Focused / active edge: `1px solid #71717a` (zinc-500).

- **Text & Foregrounds:**
   - Primary text: `#fafafa` (zinc-50 / off-white, high contrast).
   - Secondary / muted text: `#a1a1aa` (zinc-400).
   - Tertiary / disabled / metadata text: `#71717a` (zinc-500).

- **Interactive Primary:**
   - Primary interactive surface: `#fafafa` (off-white fill).
   - Primary interactive text/icon: `#09090b` (deep near-black).
   - Primary interactive hover: `#e4e4e7` (zinc-200).

## Typography

Typography is anchored by Geist for all navigational, narrative, and operational UI labels, with JetBrains Mono designated for tabular data, code snippets, git hashes, system metrics, and numeric readouts.

Key typographic rules:

- Enable `font-feature-settings: "cv02", "cv03", "cv04", "cv11", "tnum"` on all tabular and metric layouts to enforce uniform glyph widths and vertical alignment across rapid data changes.
- Apply negative tracking (`-0.015em` to `-0.025em`) to all headings larger than 16px to maintain compact visual density.
- Restrict uppercase text exclusively to micro-labels, keyboard shortcuts, and status tags (`label-sm`).

## Layout & Spacing

The layout follows a fluid-inside-fixed shell model:

- Outer application layouts adapt to desktop displays with fixed or collapsible tool sidebars (240px default width), an optional secondary panel (280px to 320px), and a fluid central viewport.
- Internal content conforms to an 8-point base spatial rhythm, augmented with strict 4px increments (`space-xs: 4px`, `space-sm: 8px`, `space-md: 12px`, `space-lg: 16px`) for component internals.
- Responsive breakpoints are defined at `mobile` (< 640px), `tablet` (640px–1023px), and `desktop` (>= 1024px). On mobile viewports, sidebars convert to full-bleed sliding drawer layers, horizontal margins compress to `1rem`, and data tables switch to compact vertical block feeds.

## Elevation & Depth

This design system strictly avoids ambient drop shadows, blurred glass effects, and elevated light sources. Spatial separation is created through low-contrast surface contrast and razor-thin perimeter boundaries:

- **Layer 0 (Canvas):** `#09090b` — Application background, primary gutter space.
- **Layer 1 (Recessed/Input):** `#121215` with `1px solid #27272a` — Form inputs, code blocks, search bars.
- **Layer 2 (Resting Cards):** `#18181b` with `1px solid #27272a` — Dashboards, item panels, list containers.
- **Layer 3 (Floating Overlays/Dropdowns/Dialogs):** `#18181b` with `1px solid #3f3f46` and a crisp, restrained drop: `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6)`. No tinting or glow is permitted.

## Shapes

Geometry is disciplined, boxy, and architectural. The default corner radius is strictly `6px` (`rounded-md`), scaling up to `8px` (`rounded-lg`) exclusively for larger structural modal dialogues and outer card frames.

Pill shapes, circular containers (except strictly circular user avatars), and variable fluid curves are explicitly barred. Badges, tags, and micro-buttons inherit a tighter `4px` (`rounded-sm`) radius to prevent visual bloat in high-density listings.

## Components

- **Buttons:**
   - _Primary:_ `#fafafa` surface, `#09090b` text, `font-weight: 500`, `border-radius: 6px`, height 36px (compact: 32px). Hover state: `#e4e4e7`.
   - _Secondary / Outline:_ Transparent or `#18181b` background, `1px solid #27272a`, `#fafafa` text. Hover state: `#27272a` surface with text `#ffffff`.
   - _Ghost:_ Transparent background, `#a1a1aa` text. Hover state: `#18181b` surface with `#fafafa` text.
   - _Destructive:_ Transparent or `#18181b` background with `1px solid #7f1d1d`, text `#f87171`. Hover state: `#450a0a`.

- **Input Fields & Textareas:**
   - Background `#121215`, border `1px solid #27272a`, text `#fafafa`, placeholder `#71717a`.
   - Height: 36px. Border radius: 6px. Inner padding: 8px 12px.
   - Focus state: Border switches to `#a1a1aa` with an immediate `box-shadow: 0 0 0 1px #a1a1aa`. No chromatic blue or purple rings.

- **Checkboxes & Radios:**
   - Base: 16x16px container, background `#121215`, border `1px solid #27272a`, radius 4px (checkboxes) or circular (radios).
   - Selected state: Background `#fafafa`, glyph color `#09090b`. Focus ring matches input style.

- **Cards & Data Panels:**
   - Background `#18181b`, border `1px solid #27272a`, radius 8px.
   - Header, body, and footer sections separated by crisp `1px solid #27272a` borders. No internal drop shadows.

- **Badges, Chips & Status Tags:**
   - Height: 20px. Radius: 4px. Font: `label-sm` (11px, JetBrains Mono or Geist 500).
   - Neutral variant: Background `#27272a`, text `#a1a1aa`, border `1px solid #3f3f46`.
   - Indicator dots: 6px solid unblurred circles preceding label text.

- **Lists & Data Tables:**
   - Header row: Height 36px, background `#09090b`, text `#71717a`, uppercase `label-sm`, border-bottom `1px solid #27272a`.
   - Body row: Height 40px, text `#fafafa`, border-bottom `1px solid rgba(39, 39, 42, 0.5)`.
   - Row hover state: Background `#121215`.

- **Command Palette & Dropdowns:**
   - Background `#18181b`, border `1px solid #3f3f46`, radius 8px, box shadow `0 8px 24px rgba(0,0,0,0.8)`.
   - Item height: 32px. Item hover/highlight: `#27272a` surface with crisp off-white text and keyboard shortcut badge (`1px solid #3f3f46`, radius 3px).
