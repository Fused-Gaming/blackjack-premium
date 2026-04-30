# ACE Design Tokens — Quick Reference Guide
**Generated:** April 29, 2026 | **Version:** 1.0  
**For:** Designers & Developers | **Format:** Quick Lookup

---

## BY USE CASE

### 🎯 "I'm styling a button"
**Color:**
- Primary (brand): `--brand` (#F59E0B)
- Secondary: `--primary` (#3B82F6)
- Hover: `--brand-light` (#FBBF24)
- Active: `--brand-dark` (#D97706)

**Typography:**
- Font: `--font-display` (Outfit)
- Weight: `--fw-semibold` (600)
- Size: `--text-base` (16px) or `--text-clamp-base`

**Spacing:**
- Padding: `var(--s-3) var(--s-5)` (12px 20px)
- Gap: `var(--s-2)` (8px) for icon+text

**Radius:** `--r-lg` (12px — button signature)

**Shadow:** `--shadow-button` (0 4px 14px rgba(0,0,0,0.3))

**Motion:**
- Hover: scale(1.04) + `--glow-brand`
- Active: scale(0.96)
- Duration: `--d-base` (250ms)
- Easing: `--ease-out`

---

### 🎰 "I'm styling the felt table"
**Color:**
- Base: `--felt` (#0A3D26)
- Gradient: `--felt-radial`
- Rim: `--felt-rim` (#0C4530)

**Shadow:** 
- Table depth: `--shadow-felt` (inset)
- Rim glow: `--shadow-felt-rim`

**Radius:** `--r-5xl` (40px — felt signature)

---

### 🏆 "I'm showing a WIN/LOSS/PUSH outcome"

**WIN:**
- Text color: `--win` (#10B981)
- Glow: `--glow-win`
- Background: `--win-muted` (#064E3B)

**LOSS:**
- Text color: `--loss` (#EF4444)
- Glow: `--glow-loss`
- Background: `--loss-muted` (#450A0A)

**PUSH:**
- Text color: `--push` (#F59E0B — matches brand)
- Glow: `--glow-gold`
- Background: `--push-muted` (#451A03)

---

### 💰 "I'm styling poker chips"

**Colors by denomination:**
```
$1   → --chip-1    (#6B7280 — gray)
$5   → --chip-5    (#EF4444 — red)
$10  → --chip-10   (#3B82F6 — blue)
$25  → --chip-25   (#F59E0B — amber/brand)
$50  → --chip-50   (#10B981 — green)
$100 → --chip-100  (#1A1A1A — black)
$500 → --chip-500  (#7C3AED — purple)
```

**Styling:**
- Shape: border-radius `--r-pill` (9999px)
- Shadow: `--shadow-chip` (3D effect)
- Hover scale: `--scale-hover-chip` (1.1)
- Active scale: `--scale-active-chip` (0.97)

---

### 🎨 "I'm building a modal/dialog"

**Background:** `--bg-elevated` (#162840)

**Glass effect** (optional):
```css
background: var(--glass-bg);
backdrop-filter: blur(16px);
border: var(--glass-border);
```

**Shadow:** `--shadow-modal` (0 24px 64px rgba(0,0,0,0.7))

**Radius:** `--r-3xl` (24px)

**Z-index:** `--z-modal` (50) — when added

**Motion:** Enter with `--ease-spring` at `--d-slow` (500ms)

---

### 📱 "I'm laying out responsive spacing"

**Fixed spacing:**
Use `--s-1` through `--s-16` for static designs.

**Responsive spacing:**
Use `--sp-clamp-*` for fluid spacing between breakpoints.

**Example:**
```css
padding: var(--sp-clamp-md);        /* 12px → 20px */
margin-bottom: var(--sp-clamp-lg);  /* 16px → 32px */
gap: var(--sp-clamp-sm);            /* 8px → 12px */
```

---

### 🔤 "I'm choosing typography"

**Display text (hero, large headlines):**
- Font: `--font-display` (Outfit)
- Weight: `--fw-black` (900)
- Size: `--text-clamp-3xl` (30px–48px responsive)
- Letter-spacing: `--letter-spacing-display` (-0.04em) — *recommended*
- Color: `--text-bright` (fg1)

**Body text:**
- Font: `--font-sans` (Inter)
- Weight: `--fw-normal` (400)
- Size: `--text-clamp-base` (14px–16px responsive)
- Line-height: `--lh-normal` (1.5) — *recommended*
- Color: `--text` (fg2)

**Labels & small text:**
- Font: `--font-mono` (JetBrains Mono)
- Weight: `--fw-medium` (500)
- Size: `--text-2xs` (10px) or `--text-xs` (12px)
- Letter-spacing: `--letter-spacing-label` (0.18em) — *recommended*
- Color: `--text-muted` (fg3)

**Card values (game-relevant numbers):**
- Font: `--font-mono` (monospace, tabular-nums)
- Weight: `--fw-bold` (700)
- Color: `--text-bright` (fg1)

---

### 🌓 "I'm working with the color hierarchy"

**Text contrast hierarchy:**
```
--text-bright (--fg1)  ← 100% contrast, headings
--text (--fg2)         ← 85-90%, body
--text-muted (--fg3)   ← 70-75%, secondary
--text-subtle (--fg4)  ← 55-60%, disabled/hints
```

**Background hierarchy:**
```
--bg              (darkest, page base)
--bg-card         (panels, cards)
--bg-panel        (secondary content)
--bg-elevated     (modals, dropdowns)
```

---

## BY CATEGORY

### 🎨 Colors (10 groups)
- **Brand:** `--brand`, `--brand-light`, `--brand-dark`, `--brand-glow`
- **Gold:** `--gold`, `--gold-light`, `--gold-dark`, `--gold-amber`
- **Surfaces:** `--bg`, `--bg-dark`, `--bg-card`, `--bg-panel`, `--bg-elevated`, `--bg-radial`
- **Felt:** `--felt`, `--felt-light`, `--felt-dark`, `--felt-glow`, `--felt-rim`, `--felt-radial`
- **Borders:** `--border`, `--border-subtle`, `--border-bright`
- **Outcomes:** `--win`, `--win-glow`, `--win-dark`, `--win-muted`, `--loss`, `--loss-glow`, `--loss-dark`, `--loss-muted`, `--push`, `--push-muted`
- **Primary Action:** `--primary`, `--primary-dark`, `--primary-light`
- **Chips:** `--chip-1`, `--chip-5`, `--chip-10`, `--chip-25`, `--chip-50`, `--chip-100`, `--chip-500`
- **Text:** `--text`, `--text-bright`, `--text-muted`, `--text-subtle`, `--text-gold`, `--text-mono`, `--fg1`–`--fg4`

### 🔤 Typography (26 tokens)
- **Fonts:** `--font-sans`, `--font-display`, `--font-mono`, `--font-serif`
- **Static scale:** `--text-2xs` → `--text-4xl`
- **Responsive scale:** `--text-clamp-xs` → `--text-clamp-3xl`
- **Weights:** `--fw-light` → `--fw-black`
- **Recommended (not yet added):** letter-spacing, line-height scales

### 📦 Spacing (16 tokens)
- **Fixed:** `--s-1` (4px) → `--s-16` (64px)
- **Responsive:** `--sp-clamp-xs` (4–8px) → `--sp-clamp-2xl` (32–64px)

### 🔲 Radius (9 tokens)
- `--r-sm` (6px) → `--r-5xl` (40px), `--r-pill` (circle)

### ⬇️ Shadows (12 tokens)
- Card: `--shadow-card`, `--shadow-card-hover`
- Chip: `--shadow-chip`
- Button: `--shadow-button`
- Panel: `--shadow-panel`
- Modal: `--shadow-modal`
- Felt: `--shadow-felt`, `--shadow-felt-rim`
- Inner: `--shadow-inner-glow`

### ✨ Glows (4 tokens)
- `--glow-win`, `--glow-loss`, `--glow-gold`, `--glow-brand`

### ⏱️ Motion (8 tokens)
- **Easing:** `--ease-spring`, `--ease-out`, `--ease-flip`
- **Duration:** `--d-fast` (150ms), `--d-base` (250ms), `--d-slow` (500ms), `--d-card-flip` (600ms), `--d-card-deal` (500ms)

---

## SEMANTIC ALIASES

These tokens have multiple names for clarity:

```css
--fg1 = --text-bright     /* Maximum contrast headings */
--fg2 = --text           /* Body text default */
--fg3 = --text-muted     /* Secondary text */
--fg4 = --text-subtle    /* Tertiary/disabled text */

--text-gold = --brand     /* When gold used as text */
--chip-25 = --brand      /* $25 chip matches brand color */
```

---

## DEPRECATION CANDIDATES

These tokens should be consolidated or removed:

```css
/* Redundant — same as --brand */
--gold-amber: #F59E0B;

/* Alternative scaling — consolidate with --s-* */
--spacing-xs through --spacing-2xl

/* Alternative radii — consolidate with --r-* */
--radius-sm, --radius-md, --radius-lg, --radius-xl

/* Motion timing offset */
--transition-smooth (300ms) differs from --d-base (250ms)
```

---

## COMMONLY USED COMBINATIONS

### Button (brand)
```css
background: var(--brand);
color: white;
padding: var(--s-3) var(--s-5);
border-radius: var(--r-lg);
box-shadow: var(--shadow-button);
font-family: var(--font-display);
font-weight: var(--fw-semibold);
font-size: var(--text-base);
transition: all var(--d-base) var(--ease-out);
```

### Card Panel
```css
background: var(--bg-card);
border: 1px solid var(--border);
border-radius: var(--r-2xl);
box-shadow: var(--shadow-card);
padding: var(--s-6);
```

### Felt Table
```css
background: var(--felt-radial);
border-radius: var(--r-5xl);
box-shadow: var(--shadow-felt), var(--shadow-felt-rim);
```

### Win Badge
```css
background: var(--win-muted);
color: var(--win);
padding: var(--s-3);
border-radius: var(--r-xl);
box-shadow: var(--glow-win);
```

### Responsive Body Text
```css
font-family: var(--font-sans);
font-size: var(--text-clamp-base);
line-height: var(--lh-normal);
color: var(--text);
```

---

## HOW TO ADD NEW TOKENS

**Format:** Always use CSS custom properties (CSS variables)

```css
:root {
  /* Group title in comment block */
  --token-name: value;  /* Usage description */
}
```

**Naming convention:**
- Prefix by category: `--color-`, `--font-`, `--shadow-`, etc.
- Use hyphens, no camelCase
- Semantic names when possible
- Include units (px, rem, ms, em) in comments

---

**Need more detail?** See DESIGN-TOKENS-MASTER-INVENTORY.md

**Last Updated:** April 29, 2026
