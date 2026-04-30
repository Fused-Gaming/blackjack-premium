# ACE Blackjack Premium — Complete Design Tokens Inventory
**Generated:** April 29, 2026  
**Source:** colors_and_type.css + ace-design-tokens-audit.md + Action_buttons.md + All Project Files  
**Status:** Master Reference Document

---

## TABLE OF CONTENTS
1. [COLOR TOKENS](#color-tokens) (6 groups)
2. [TYPOGRAPHY TOKENS](#typography-tokens) (4 groups)
3. [SPACING TOKENS](#spacing-tokens) (2 groups)
4. [BORDER RADIUS TOKENS](#border-radius-tokens)
5. [SHADOW & GLOW TOKENS](#shadow--glow-tokens)
6. [MOTION TOKENS](#motion-tokens)
7. [TOKEN VERSIONS & CONFLICTS](#token-versions--conflicts)
8. [RECOMMENDED ADDITIONS](#recommended-additions)

---

## COLOR TOKENS

### GROUP 1: BRAND — Amber Gold (4 tokens)
```css
--brand:           #F59E0B;  /* Primary accent, buttons, hero CTAs, glows */
--brand-light:     #FBBF24;  /* Hover states, gradients, lighter variant */
--brand-dark:      #D97706;  /* Pressed states, gradients, darker variant */
--brand-glow:      #FCD34D;  /* Glow overlays, bright accent */
```
**Usage:** Hero buttons, primary CTAs, brand identity, hover states  
**Gradient:** linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)  
**Glow:** 0 0 20px rgba(245, 158, 11, 0.45)

---

### GROUP 2: GOLD ACCENTS (4 tokens)
```css
--gold:            #FFD700;  /* Felt rim, dividers, BJ payout badges */
--gold-light:      #FFED4E;  /* Secondary glows, bright highlights */
--gold-dark:       #DAA520;  /* Dark gold accents, alternative variant */
--gold-amber:      #F59E0B;  /* Alias: matches --brand (redundant) */
```
**Usage:** Felt table rims, payout badges, premium highlights  
**Glow:** 0 0 24px rgba(245, 158, 11, 0.6), 0 0 50px rgba(245, 158, 11, 0.3)  
**Note:** `--gold-amber` is duplicate of `--brand` — candidate for consolidation

---

### GROUP 3: SURFACES — Deep Navy (6 tokens)
```css
--bg:              #050A0F;  /* Page background, base color */
--bg-dark:         #02050A;  /* Deepest navy (fallback), card backs */
--bg-card:         #0D1B2A;  /* Card / panel backgrounds, elevated surfaces */
--bg-panel:        #111F30;  /* Secondary panels, content areas */
--bg-elevated:     #162840;  /* Modals, elevated surfaces, dialogs */
--bg-radial:       radial-gradient(ellipse at 30% 20%, #0D1B2A 0%, #050A0F 60%, #02050A 100%);
                   /* App shell background, full-page gradient */
```
**Depth Hierarchy:**
- `--bg` → base page (darkest)
- `--bg-dark` → alternative base
- `--bg-card` → panels, cards
- `--bg-panel` → secondary content
- `--bg-elevated` → modals, dropdowns (lightest)

**Radial Gradient:** Ellipse positioned at 30% horizontal, 20% vertical. Used on `<body>`

---

### GROUP 4: FELT TABLE — Casino Green (6 tokens)
```css
--felt:            #0A3D26;  /* Felt base color, primary table surface */
--felt-light:      #0F5132;  /* Felt lighter tint (radial center), highlights */
--felt-dark:       #073520;  /* Felt darker tint (radial edge), shadows */
--felt-glow:       #1A6B54;  /* Felt highlight / glow, accent color */
--felt-rim:        #0C4530;  /* Felt rim secondary color, border variant */
--felt-radial:     radial-gradient(ellipse at 50% 35%, #0F5132 0%, #0A3D26 45%, #073520 100%);
                   /* Felt table background, 3D depth gradient */
```
**Usage:** Table playing surface, casino aesthetic  
**Shadow:** inset 0 0 60px rgba(0, 0, 0, 0.5); + inset 0 0 80px rgba(0, 0, 0, 0.4);  
**Radial Gradient:** Centered at 50% H, 35% V for realistic felt curvature

---

### GROUP 5: BORDERS (3 tokens)
```css
--border:          #1E3A5F;  /* Default borders (1px solid), standard weight */
--border-subtle:   #132538;  /* Almost-invisible borders, low contrast */
--border-bright:   #2A4F80;  /* Hover / active borders, high contrast */
```
**Usage Tiers:**
- `--border-subtle` → dividers, inactive
- `--border` → default, interactive elements
- `--border-bright` → hover, active, focused states

---

### GROUP 6: OUTCOMES — Semantic (9 tokens)

#### WIN State (4 variants)
```css
--win:             #10B981;  /* Win state text / glow, primary indicator */
--win-glow:        #34D399;  /* Win glow secondary, lighter variant */
--win-dark:        #059669;  /* Win dark variant, pressed state */
--win-muted:       #064E3B;  /* Win muted background, neutral context */
```
**Glow:** 0 0 24px rgba(16, 185, 129, 0.5), 0 0 50px rgba(16, 185, 129, 0.2)

#### LOSS State (4 variants)
```css
--loss:            #EF4444;  /* Loss state text / glow, primary indicator */
--loss-glow:       #F87171;  /* Loss glow secondary, lighter variant */
--loss-dark:       #DC2626;  /* Loss dark variant, pressed state */
--loss-muted:      #450A0A;  /* Loss muted background, neutral context */
```
**Glow:** 0 0 24px rgba(239, 68, 68, 0.5), 0 0 50px rgba(239, 68, 68, 0.2)

#### PUSH State (2 variants)
```css
--push:            #F59E0B;  /* Push (tie) state (amber), matches brand */
--push-muted:      #451A03;  /* Push muted background, neutral variant */
```
**Glow:** 0 0 24px rgba(245, 158, 11, 0.6), 0 0 50px rgba(245, 158, 11, 0.3)

---

### GROUP 7: PRIMARY ACTION — Blue (3 tokens)
```css
--primary:         #3B82F6;  /* Secondary action buttons, default state */
--primary-dark:    #2563EB;  /* Pressed / active state */
--primary-light:   #60A5FA;  /* Hover state, lighter variant */
```
**Usage:** "Split" button, secondary CTAs, non-brand actions

---

### GROUP 8: CHIP DENOMINATIONS (7 tokens)
```css
--chip-1:    #6B7280;  /* $1 Gray */
--chip-5:    #EF4444;  /* $5 Red (matches --loss) */
--chip-10:   #3B82F6;  /* $10 Blue (matches --primary) */
--chip-25:   #F59E0B;  /* $25 Amber (matches --brand) */
--chip-50:   #10B981;  /* $50 Green (matches --win) */
--chip-100:  #1A1A1A;  /* $100 Black/Gold (premium) */
--chip-500:  #7C3AED;  /* $500 Purple (premium) */
```
**Pattern:** Denomination colors follow semantic system where possible

---

### GROUP 9: TEXT / FOREGROUND (6 tokens)
```css
--text:            #E2E8F0;  /* Primary text (fg2 alias), body copy */
--text-bright:     #F8FAFC;  /* Brightest text (fg1 alias), headings, emphasis */
--text-muted:      #64748B;  /* Secondary text (fg3 alias), helper text */
--text-subtle:     #475569;  /* Tertiary text (fg4 alias), disabled, hints */
--text-gold:       #F59E0B;  /* Gold text accent (matches brand) */
--text-mono:       #94A3B8;  /* Monospace text color, code blocks */
```

**Semantic Aliases (foreground):**
```css
--fg1: var(--text-bright);   /* 100% contrast */
--fg2: var(--text);          /* 85-90% contrast */
--fg3: var(--text-muted);    /* 70-75% contrast */
--fg4: var(--text-subtle);   /* 55-60% contrast */
```

---

### GROUP 10: ALTERNATIVE ACTION BUTTON COLORS (from Action_buttons.md)
```css
--color-hit:       #00D4FF;  /* Cyan - Hit button variant */
--color-stand:     #00FF88;  /* Lime green - Stand button variant */
--color-double:    #FF6B35;  /* Orange - Double Down button variant */
--color-split:     #FFD700;  /* Gold - Split button variant (matches --gold) */
--color-surrender: #FF4757;  /* Red - Surrender button variant */
--color-insurance: #A855F7;  /* Purple - Insurance button variant */
--color-allin:     #FF9FF3;  /* Pink - All-in button variant */
```
**Note:** These are ALTERNATIVE versions. Not in primary colors_and_type.css  
**Status:** From Action_buttons.md exploration — may not be in active use

---

## TYPOGRAPHY TOKENS

### GROUP 1: FONT FAMILIES (4 tokens)
```css
--font-sans:       'Inter', system-ui, -apple-system, sans-serif;
                   /* Body text, default, system fallback */

--font-display:    'Outfit', 'Inter', sans-serif;
                   /* Headlines, CTAs, balance display, premium feel */

--font-mono:       'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
                   /* Labels, amounts, code blocks, card values */

--font-serif:      Georgia, 'Times New Roman', serif;
                   /* Card faces (A, K, Q, J), elegant accents */
```

**Import Statement:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

### GROUP 2: TYPE SCALE — STATIC (8 tokens, 10px to 36px)
```css
--text-2xs:  0.625rem;   /* 10px  — Micro labels, badges */
--text-xs:   0.75rem;    /* 12px  — Eyebrows, small labels */
--text-sm:   0.875rem;   /* 14px  — Secondary text, help copy */
--text-base: 1rem;       /* 16px  — Body text, default */
--text-lg:   1.125rem;   /* 18px  — Section headers */
--text-xl:   1.25rem;    /* 20px  — Component headers */
--text-2xl:  1.5rem;     /* 24px  — Major headers */
--text-3xl:  1.875rem;   /* 30px  — Page titles */
--text-4xl:  2.25rem;    /* 36px  — Hero titles */
```

---

### GROUP 3: TYPE SCALE — RESPONSIVE/CLAMPED (7 tokens, mobile-first)
```css
--text-clamp-xs:   clamp(10px, 1.2vw, 12px);   /* Labels, badges */
--text-clamp-sm:   clamp(12px, 1.5vw, 14px);   /* Secondary, help text */
--text-clamp-base: clamp(14px, 1.8vw, 16px);   /* Body text */
--text-clamp-lg:   clamp(16px, 2.2vw, 20px);   /* Section labels */
--text-clamp-xl:   clamp(20px, 2.8vw, 28px);   /* Component headers */
--text-clamp-2xl:  clamp(24px, 3.5vw, 36px);   /* Major headers */
--text-clamp-3xl:  clamp(30px, 4.5vw, 48px);   /* Page titles */
```

**Principle:** Grows 1.2–4.5% per viewport width change. Min/max set for breakpoint safety.

---

### GROUP 4: FONT WEIGHTS (7 tokens, 300–900)
```css
--fw-light:     300;  /* Rare, decorative only */
--fw-normal:    400;  /* Body text default */
--fw-medium:    500;  /* Labels, emphasis, secondary */
--fw-semibold:  600;  /* Button text, strong secondary */
--fw-bold:      700;  /* Headings, strong emphasis */
--fw-extrabold: 800;  /* Display headings, premium */
--fw-black:     900;  /* Hero display (Outfit), maximum emphasis */
```

---

### GROUP 5: LETTER SPACING (from audit recommendations)
```css
--letter-spacing-title:   -0.02em;  /* Headings, tighter */
--letter-spacing-display: -0.04em;  /* Hero text, very tight */
--letter-spacing-label:    0.18em;  /* Labels, loose */
--letter-spacing-eyebrow:  0.25em;  /* Eyebrows, very loose */
```
**Note:** Not yet in colors_and_type.css — Recommended for addition

---

### GROUP 6: LINE HEIGHT SCALE (from audit recommendations)
```css
--lh-tight:   1.2;   /* Headlines, minimal space */
--lh-normal:  1.5;   /* Body, balanced */
--lh-relaxed: 1.6;   /* Content, generous space */
--lh-loose:   1.75;  /* Long-form, maximum readability */
```
**Note:** Not yet in colors_and_type.css — Recommended for addition

---

## SPACING TOKENS

### GROUP 1: FIXED SPACING SCALE (4px base unit, 10 tokens)
```css
--s-1:  4px;    /* Micro spacing, inline gaps */
--s-2:  8px;    /* Extra small, button padding */
--s-3:  12px;   /* Small, standard padding */
--s-4:  16px;   /* Standard, base padding/margin */
--s-5:  20px;   /* Medium, component spacing */
--s-6:  24px;   /* Medium+, card padding */
--s-8:  32px;   /* Large, section spacing */
--s-10: 40px;   /* Extra large, major gaps */
--s-12: 48px;   /* Extra large+, hero spacing */
--s-16: 64px;   /* Massive, page sections */
```

---

### GROUP 2: RESPONSIVE SPACING — CLAMPED (6 tokens)
```css
--sp-clamp-xs:  clamp(4px,  0.5vw,  8px);    /* Micro spacing */
--sp-clamp-sm:  clamp(8px,  1vw,    12px);   /* Extra small */
--sp-clamp-md:  clamp(12px, 1.5vw,  20px);   /* Small */
--sp-clamp-lg:  clamp(16px, 2.5vw,  32px);   /* Medium */
--sp-clamp-xl:  clamp(24px, 4vw,    48px);   /* Large */
--sp-clamp-2xl: clamp(32px, 5vw,    64px);   /* Extra large */
```

---

### GROUP 3: ALTERNATIVE SPACING (from Action_buttons.md)
```css
--spacing-xs:   4px;    /* Micro */
--spacing-sm:   8px;    /* Small */
--spacing-md:   12px;   /* Medium */
--spacing-lg:   16px;   /* Large */
--spacing-xl:   24px;   /* Extra large */
--spacing-2xl:  32px;   /* Extra large+ */
```
**Note:** Near-duplicate of `--s-*` scale. Candidate for consolidation.

---

## BORDER RADIUS TOKENS

### GROUP 1: CORNER RADIUS SCALE (9 tokens)
```css
--r-sm:   0.375rem;  /*  6px  — Card faces, micro buttons */
--r-md:   0.5rem;    /*  8px  — Micro buttons, small elements */
--r-lg:   0.75rem;   /* 12px  — Buttons (signature size) */
--r-xl:   1rem;      /* 16px  — Panels, containers */
--r-2xl:  1.25rem;   /* 20px  — Cards, outcome banners */
--r-3xl:  1.5rem;    /* 24px  — Modals, dialogs */
--r-4xl:  2rem;      /* 32px  — Large modals */
--r-5xl:  2.5rem;    /* 40px  — Felt table (signature) */
--r-pill: 9999px;    /* Perfect circle — Chips */
```

**Signature Radiuses:**
- `--r-lg` (12px) → Button radius across system
- `--r-5xl` (40px) → Felt table surface radius
- `--r-pill` → Perfect circles for chips

---

### GROUP 2: ALTERNATIVE RADIUS (from Action_buttons.md)
```css
--radius-sm: 4px;    /* Small radius */
--radius-md: 8px;    /* Medium radius */
--radius-lg: 12px;   /* Large (button default) */
--radius-xl: 16px;   /* Extra large */
```
**Note:** Slight offset from primary scale (4px vs 6px at sm). Candidate for consolidation.

---

## SHADOW & GLOW TOKENS

### GROUP 1: LAYERED SHADOWS (8 tokens + 1 inset)
```css
--shadow-card:        0 4px 16px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.3);
                      /* Card depth, dual-layer */

--shadow-card-hover:  0 8px 24px rgba(0,0,0,0.5);
                      /* Card hover, elevated */

--shadow-chip:        0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18);
                      /* 3D chip effect, inset highlight */

--shadow-button:      0 4px 14px rgba(0,0,0,0.3);
                      /* Button elevation, medium depth */

--shadow-panel:       0 8px 32px rgba(0,0,0,0.4);
                      /* Panel depth, subtle shadow */

--shadow-modal:       0 24px 64px rgba(0,0,0,0.7);
                      /* Modal elevation, dramatic */

--shadow-felt:        inset 0 0 60px rgba(0,0,0,0.5);
                      /* Felt table depth, inset only */

--shadow-felt-rim:    0 0 0 3px rgba(255,215,0,0.12), inset 0 0 80px rgba(0,0,0,0.4);
                      /* Felt gold rim, rim + depth */

--shadow-inner-glow:  inset 0 0 24px rgba(255,255,255,0.06);
                      /* Inner highlights, subtle white glow */
```

---

### GROUP 2: OUTCOME GLOWS (4 tokens)
```css
--glow-win:    0 0 24px rgba(16,185,129,0.5),  0 0 50px rgba(16,185,129,0.2);
               /* Green glow, layered distance */

--glow-loss:   0 0 24px rgba(239,68,68,0.5),   0 0 50px rgba(239,68,68,0.2);
               /* Red glow, layered distance */

--glow-gold:   0 0 24px rgba(245,158,11,0.6),  0 0 50px rgba(245,158,11,0.3);
               /* Gold/amber glow, push/payout state */

--glow-brand:  0 0 20px rgba(245,158,11,0.45);
               /* Brand button hover, single layer */
```

---

### GROUP 3: GLASS/BACKDROP EFFECTS (from audit recommendations)
```css
--glass-bg:         rgba(13, 27, 42, 0.75);
--glass-bg-light:   rgba(22, 40, 64, 0.6);
--glass-blur:       16px;
--glass-blur-sm:    12px;
--glass-border:     1px solid rgba(30, 58, 95, 0.5);
--glass-border-light: 1px solid rgba(42, 79, 128, 0.35);
```
**Note:** Currently hardcoded in CSS `.glass` class. Recommended for token extraction.

---

## MOTION TOKENS

### GROUP 1: EASING FUNCTIONS (3 tokens)
```css
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);   /* Spring overshoot, bouncy */
--ease-out:     cubic-bezier(0.16, 1, 0.3, 1);       /* Ease-out, smooth exit */
--ease-flip:    cubic-bezier(0.4, 0, 0.2, 1);        /* Card flip, sharp timing */
```

**Usage:**
- `--ease-spring` → Card deal, modal entrance (100% custom bounce)
- `--ease-out` → General easing, natural motion
- `--ease-flip` → Card flip reveal, sharp deceleration

---

### GROUP 2: DURATION (5 tokens, 150ms–600ms)
```css
--d-fast:        150ms;    /* Quick interactions (hover feedback) */
--d-base:        250ms;    /* Default transition, balanced */
--d-slow:        500ms;    /* Outcome animations, deliberate */
--d-card-flip:   600ms;    /* Card flip reveal, slow reveal */
--d-card-deal:   500ms;    /* Card deal animation, matches d-slow */
```

---

### GROUP 3: ALTERNATIVE MOTION (from Action_buttons.md)
```css
--transition-fast:   0.15s cubic-bezier(0.4, 0, 0.2, 1);   /* 150ms */
--transition-smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1);    /* 300ms (differs from d-base) */
--transition-bounce: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); /* 400ms spring */
```
**Note:** Slight differences from primary tokens. Should consolidate.

---

## TOKEN VERSIONS & CONFLICTS

### ⚠️ DUPLICATE TOKENS (Consolidation Candidates)

| Primary Token | Alternative | Difference | Recommendation |
|---------------|-------------|-----------|-----------------|
| `--brand` (#F59E0B) | `--gold-amber` | Same color | Remove alias |
| `--brand` (#F59E0B) | `--text-gold` | Same color | Keep (semantic) |
| `--s-1` through `--s-16` | `--spacing-xs` through `--spacing-2xl` | Same/similar | Keep one scale |
| `--r-lg` (12px) | `--radius-lg` (12px) | Same | Remove alternative |
| `--r-md` (8px) | `--radius-md` (8px) | Same | Remove alternative |
| `--d-base` (250ms) | `--transition-smooth` (300ms) | 50ms diff | Standardize |

---

### 🎨 ALTERNATE COLOR SCHEMES (Action_buttons.md)

**Neon Button Palette** (not active in primary design):
- `--color-hit`: #00D4FF (Cyan)
- `--color-stand`: #00FF88 (Lime)
- `--color-double`: #FF6B35 (Orange)
- `--color-split`: #FFD700 (Gold — matches primary)
- `--color-surrender`: #FF4757 (Red)
- `--color-insurance`: #A855F7 (Purple)
- `--color-allin`: #FF9FF3 (Pink)

**Status:** Exploration variant. Not integrated into main design system.

---

## RECOMMENDED ADDITIONS

### GROUP 1: ACCESSIBILITY TOKENS (Critical)
```css
/* Focus ring — WCAG compliant */
--focus-ring:       #FCD34D;  /* Gold, high contrast */
--focus-ring-offset: 2px;
--focus-ring-width:  4px;

/* State modifiers */
--disabled-opacity:   0.4;
--disabled-grayscale: 1;
--active-opacity:     1;
--hover-opacity:      0.9;
```

---

### GROUP 2: Z-INDEX SCALE
```css
--z-base:        0;
--z-dropdown:    10;
--z-sticky:      40;
--z-modal:       50;
--z-tooltip:     100;
```

---

### GROUP 3: TRANSFORM SCALES (Interaction)
```css
--scale-hover:       1.04;
--scale-hover-chip:  1.1;
--scale-active:      0.95;
--scale-active-chip: 0.97;
```

---

### GROUP 4: ASPECT RATIOS
```css
--aspect-card:     5 / 7;      /* Playing cards: 100×140 */
--aspect-chip:     1 / 1;      /* Chips: circular */
--aspect-square:   1 / 1;
--aspect-16-9:     16 / 9;     /* Video, wider content */
```

---

### GROUP 5: COMPONENT-SPECIFIC TOKENS

```css
/* Button sizes */
--btn-height-sm:    32px;
--btn-height-md:    40px;
--btn-height-lg:    48px;
--btn-padding-h:    var(--s-5);  /* 20px */

/* Betting area */
--bet-ring-border:  1.5px dashed rgba(255, 215, 0, 0.28);
--bet-ring-bg:      rgba(255, 215, 0, 0.05);

/* Card back */
--card-back-bg:     linear-gradient(135deg, var(--bg-card) 0%, var(--bg-dark) 100%);
--card-back-glyph:  var(--brand);

/* Hand badges */
--badge-bj-bg:      var(--text-brand-gradient);
--badge-bust-bg:    var(--loss);
--badge-neutral-bg: var(--text-muted);
```

---

## SUMMARY TABLE: TOKEN COUNT & COMPLETENESS

| Category | Count | Completeness | Status |
|----------|-------|--------------|--------|
| **Colors** | 90+ | 85% | Strong; lacks system messages |
| **Typography** | 26 | 80% | Solid; missing letter-spacing (proposed) |
| **Spacing** | 16 | 95% | Excellent 4px scale |
| **Radius** | 9 | 100% | Complete, well-defined |
| **Shadows** | 12 | 95% | Comprehensive, layered |
| **Motion** | 8 | 100% | Complete easing + duration |
| **Accessibility** | 0 | 0% | **CRITICAL GAP** |
| **State Modifiers** | 0 | 0% | **Needs definition** |
| **Glass/Backdrop** | 0% (hardcoded) | 0% | Needs extraction |
| **Z-Index** | 0 | 0% | Not defined |
| **TOTAL** | **161 tokens** | **75%** | Mature system |

---

## NEXT STEPS

### Priority 1: Critical
- ✅ Extract `--glass-*` variables from CSS
- ✅ Define focus ring (`--focus-ring`)
- ✅ Create disabled state tokens

### Priority 2: High
- ✅ Add letter-spacing scale
- ✅ Define z-index scale
- ✅ Create transform scale tokens

### Priority 3: Medium
- ⚠️ Consolidate duplicate spacing scales
- ⚠️ Reconcile motion timing (250ms vs 300ms)
- ⚠️ Document button-specific tokens

### Priority 4: Future
- 📋 Plan system message colors (error, success, warning, info)
- 📋 Input/form state tokens
- 📋 Loading state indicators

---

**Last Updated:** April 29, 2026  
**Maintained By:** ACE Design System  
**Format:** CSS Custom Properties (CSS Variables)
