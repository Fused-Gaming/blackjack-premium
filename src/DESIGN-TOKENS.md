# ACE Blackjack Premium — Design Tokens Reference

**Last Updated:** April 29, 2026  
**Source:** ACE Design System (161 Tokens)  
**Integration:** CSS Custom Properties + Tailwind Classes

---

## Quick Start

Design tokens are available in two ways:

### 1. CSS Custom Properties
Use directly in CSS/styled components:
```css
background-color: var(--brand);
color: var(--text);
border-radius: var(--r-lg);
box-shadow: var(--shadow-button);
```

### 2. Tailwind Classes
Use via Tailwind utility classes:
```jsx
<button className="bg-brand-DEFAULT text-text-bright rounded-lg shadow-button">
  Click me
</button>
```

---

## Token Categories

### 🎨 COLOR SYSTEM

#### Brand Colors
```css
--brand:           #F59E0B  /* Primary amber gold */
--brand-light:     #FBBF24
--brand-dark:      #D97706
--brand-glow:      #FCD34D
```

#### Surfaces (Background Layers)
```css
--bg:              #050A0F  /* Page background */
--bg-dark:         #02050A  /* Deepest layer */
--bg-card:         #0D1B2A  /* Card surfaces */
--bg-panel:        #111F30  /* Panel backgrounds */
--bg-elevated:     #162840  /* Elevated UI elements */
--bg-radial:       radial-gradient(...)  /* Page background gradient */
```

#### Borders
```css
--border:          #1E3A5F  /* Default border */
--border-subtle:   #132538  /* Subtle dividers */
--border-bright:   #2A4F80  /* Prominent borders */
```

#### Felt Table (Casino Green)
```css
--felt:            #0A3D26  /* Main felt color */
--felt-light:      #0F5132
--felt-dark:       #073520
--felt-glow:       #1A6B54
--felt-rim:        #0C4530  /* Rim color */
--felt-radial:     radial-gradient(...)  /* Felt texture */
```

#### Outcome States
```css
/* WIN (Green) */
--win:             #10B981
--win-glow:        #34D399
--win-dark:        #059669
--win-muted:       #064E3B

/* LOSS (Red) */
--loss:            #EF4444
--loss-glow:       #F87171
--loss-dark:       #DC2626
--loss-muted:      #450A0A

/* PUSH (Gold) */
--push:            #F59E0B
--push-muted:      #451A03
```

#### Chip Denominations
```css
--chip-1:    #6B7280   /* $1   - Gray */
--chip-5:    #EF4444   /* $5   - Red */
--chip-10:   #3B82F6   /* $10  - Blue */
--chip-25:   #F59E0B   /* $25  - Amber/Brand */
--chip-50:   #10B981   /* $50  - Green */
--chip-100:  #1A1A1A   /* $100 - Black */
--chip-500:  #7C3AED   /* $500 - Purple */
```

#### Text & Foreground
```css
--text:            #E2E8F0  /* Primary text */
--text-bright:     #F8FAFC  /* High contrast */
--text-muted:      #64748B  /* Secondary text */
--text-subtle:     #475569  /* Tertiary text */
--text-gold:       #F59E0B  /* Accent text */
--text-mono:       #94A3B8  /* Monospace text */

/* Semantic aliases */
--fg1:  var(--text-bright)  /* H1, labels */
--fg2:  var(--text)         /* Body text */
--fg3:  var(--text-muted)   /* Secondary */
--fg4:  var(--text-subtle)  /* Disabled, hints */
```

---

### 🔤 TYPOGRAPHY

#### Font Families
```css
--font-sans:    'Inter', system-ui, sans-serif
--font-display: 'Outfit', 'Inter', sans-serif
--font-mono:    'JetBrains Mono', 'Fira Code', monospace
--font-serif:   Georgia, 'Times New Roman', serif
```

#### Static Type Scale
```css
--text-2xs:   0.625rem   /* 10px */
--text-xs:    0.75rem    /* 12px */
--text-sm:    0.875rem   /* 14px */
--text-base:  1rem       /* 16px */
--text-lg:    1.125rem   /* 18px */
--text-xl:    1.25rem    /* 20px */
--text-2xl:   1.5rem     /* 24px */
--text-3xl:   1.875rem   /* 30px */
--text-4xl:   2.25rem    /* 36px */
```

#### Responsive Type Scale (Clamped)
```css
--text-clamp-xs:    clamp(10px, 1.2vw, 12px)    /* Labels */
--text-clamp-sm:    clamp(12px, 1.5vw, 14px)    /* Secondary */
--text-clamp-base:  clamp(14px, 1.8vw, 16px)    /* Body text */
--text-clamp-lg:    clamp(16px, 2.2vw, 20px)    /* Section labels */
--text-clamp-xl:    clamp(20px, 2.8vw, 28px)    /* Headers */
--text-clamp-2xl:   clamp(24px, 3.5vw, 36px)    /* Major headers */
--text-clamp-3xl:   clamp(30px, 4.5vw, 48px)    /* Page titles */
```

#### Font Weights
```css
--fw-light:      300
--fw-normal:     400
--fw-medium:     500
--fw-semibold:   600
--fw-bold:       700
--fw-extrabold:  800
--fw-black:      900
```

#### Semantic Typography Classes
```css
.h1, h1              /* Font: Display 900, size: clamp(2rem, 4vw, 3rem) */
.h2, h2              /* Font: Display 800, size: clamp(1.5rem, 3vw, 2.25rem) */
.h3, h3              /* Font: Display 700, size: 1.5rem */
.display, .display-bj /* Font: Display 900, gradient text, size: clamp(3rem, 8vw, 6rem) */
.eyebrow             /* Font: Mono 500, uppercase, letter-spacing: 0.18em */
.eyebrow-brand       /* Font: Display 700, uppercase, color: brand */
.p, p                /* Font: Sans, size: base, line-height: 1.55 */
.small               /* Font: Sans, size: sm, color: muted */
.code, code          /* Font: Mono, tabular-nums */
.label               /* Font: Mono 2xs, uppercase, letter-spacing: 0.18em */
.balance             /* Font: Display 700, lg, tabular-nums */
.outcome-win         /* Color: win */
.outcome-loss        /* Color: loss */
.outcome-push        /* Color: push */
```

---

### 📐 LAYOUT & SPACING

#### Static Spacing Scale (4px base)
```css
--s-1:   4px
--s-2:   8px
--s-3:   12px
--s-4:   16px
--s-5:   20px
--s-6:   24px
--s-8:   32px
--s-10:  40px
--s-12:  48px
--s-16:  64px
```

#### Responsive Spacing Scale (Clamped)
```css
--sp-clamp-xs:   clamp(4px,  0.5vw, 8px)     /* Micro spacing */
--sp-clamp-sm:   clamp(8px,  1vw,   12px)    /* Extra small */
--sp-clamp-md:   clamp(12px, 1.5vw, 20px)    /* Small */
--sp-clamp-lg:   clamp(16px, 2.5vw, 32px)    /* Medium */
--sp-clamp-xl:   clamp(24px, 4vw,   48px)    /* Large */
--sp-clamp-2xl:  clamp(32px, 5vw,   64px)    /* Extra large */
```

#### Border Radius
```css
--r-sm:    0.375rem   /* 6px */
--r-md:    0.5rem     /* 8px */
--r-lg:    0.75rem    /* 12px - buttons */
--r-xl:    1rem       /* 16px - panels */
--r-2xl:   1.25rem    /* 20px - cards */
--r-3xl:   1.5rem     /* 24px - modals */
--r-4xl:   2rem       /* 32px */
--r-5xl:   2.5rem     /* 40px - felt table */
--r-pill:  9999px     /* Fully rounded */
```

---

### ✨ SHADOWS & ELEVATION

#### Box Shadows
```css
--shadow-card:        0 4px 16px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.3)
--shadow-card-hover:  0 8px 24px rgba(0,0,0,0.5)
--shadow-chip:        0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18)
--shadow-button:      0 4px 14px rgba(0,0,0,0.3)
--shadow-panel:       0 8px 32px rgba(0,0,0,0.4)
--shadow-modal:       0 24px 64px rgba(0,0,0,0.7)
--shadow-felt:        inset 0 0 60px rgba(0,0,0,0.5)
--shadow-felt-rim:    0 0 0 3px rgba(255,215,0,0.12), inset 0 0 80px rgba(0,0,0,0.4)
--shadow-inner-glow:  inset 0 0 24px rgba(255,255,255,0.06)
```

#### Glow Effects
```css
--glow-win:    0 0 24px rgba(16,185,129,0.5),  0 0 50px rgba(16,185,129,0.2)
--glow-loss:   0 0 24px rgba(239,68,68,0.5),   0 0 50px rgba(239,68,68,0.2)
--glow-gold:   0 0 24px rgba(245,158,11,0.6),  0 0 50px rgba(245,158,11,0.3)
--glow-brand:  0 0 20px rgba(245,158,11,0.45)
```

---

### 🎬 MOTION

#### Easing Functions
```css
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1)   /* Card deal, modal-in */
--ease-out:     cubic-bezier(0.16, 1, 0.3, 1)       /* Standard easing */
--ease-flip:    cubic-bezier(0.4, 0, 0.2, 1)        /* Card flip */
```

#### Duration Presets
```css
--d-fast:        150ms
--d-base:        250ms
--d-slow:        500ms
--d-card-flip:   600ms
--d-card-deal:   500ms
```

#### Animation Examples
```css
/* Card deal animation */
animation: deal var(--d-card-deal) var(--ease-spring);

/* Card flip */
animation: flip var(--d-card-flip) var(--ease-flip);

/* Glow pulse */
animation: glowPulse 2s ease-in-out infinite;
```

---

## Usage Patterns

### Button Styling
```jsx
<button
  className="
    bg-brand-DEFAULT hover:bg-brand-light
    text-text-bright
    rounded-lg shadow-button
    px-5 py-3
    transition-all duration-250
    active:scale-95
  "
>
  Submit
</button>
```

### Card Component
```jsx
<div
  className="
    bg-bg-card border border-border
    rounded-2xl shadow-card
    p-6 gap-4
  "
>
  {/* Card content */}
</div>
```

### Felt Table
```jsx
<div
  className="
    bg-felt-DEFAULT
    rounded-5xl
    shadow-felt
  "
  style={{
    backgroundImage: 'var(--felt-radial)',
  }}
>
  {/* Table layout */}
</div>
```

### Glass Morphism Panel
```jsx
<div className="glass rounded-2xl p-6">
  {/* Transparent content with blur effect */}
</div>
```

### Outcome Text
```jsx
<div className="outcome-win text-xl font-bold">
  You Win!
</div>
```

### Responsive Typography
```jsx
<h1 className="h1">Page Title</h1>
<p className="text-clamp-base">Responsive body text</p>
```

---

## Integration Checklist

- [x] CSS custom properties defined in :root
- [x] Tailwind theme extended with design tokens
- [x] Semantic typography styles implemented
- [x] Glass morphism utilities available
- [x] Motion/animation presets defined
- [x] Color system integrated (brand, surfaces, outcomes, chips)
- [x] Responsive spacing scale (clamped values)
- [x] Shadow and elevation system
- [x] Font families with fallbacks

---

## Component Library Status

### Implemented
- Card flip system with CSS tokens
- Glass morphism panels
- Chip base styles
- Action button base
- Panel card component

### Planned
- Button variants (primary, secondary, outline)
- Badge components
- Typography components
- Layout components
- Form components
- Modal/dialog system

---

## References

- **Design Tokens Master Inventory:** `design-conversation/DESIGN-TOKENS-MASTER-INVENTORY.md`
- **Design Tokens Quick Reference:** `design-conversation/DESIGN-TOKENS-QUICK-REFERENCE.md`
- **Design Explorer:** `design-conversation/blackjack-design-explorer.html`
- **Tailwind Config:** `tailwind.config.js`
- **CSS Tokens:** `src/index.css` (`:root` section)

---

## Responsive Design Philosophy

All responsive values use **CSS `clamp()`** for fluid scaling:
```css
font-size: clamp(min, preferred, max);
```

This provides:
- **Smooth scaling** between mobile and desktop
- **No breakpoints** needed for typography/spacing
- **Automatic adaptation** to viewport size
- **Accessibility** through proportional sizing

---

## Contributing

When adding new components or features:
1. **Always use design tokens** instead of hardcoded values
2. **Prefer CSS custom properties** for dynamic theming
3. **Use Tailwind classes** for utility-first styling
4. **Test responsive behavior** with clamped values
5. **Document new tokens** in this file

---

**Generated:** April 29, 2026  
**Version:** 1.0 (ACE Design System v1.0)
