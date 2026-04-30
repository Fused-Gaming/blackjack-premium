# DESIGN TOKENS BY GROUP — Complete Inventory
**ACE Blackjack Premium | April 29, 2026**

---

## 📊 QUICK STATS
- **Total Tokens:** 161
- **Color Tokens:** 90+
- **Typography Tokens:** 26
- **Spacing Tokens:** 16
- **Radius Tokens:** 9
- **Shadow Tokens:** 12
- **Motion Tokens:** 8
- **System Completeness:** 75%

---

## 🎨 COLOR TOKENS (90+ tokens)

### GROUP 1: BRAND — Amber Gold (4 tokens)
```
--brand           → #F59E0B (Primary accent, buttons)
--brand-light     → #FBBF24 (Hover states)
--brand-dark      → #D97706 (Pressed states)
--brand-glow      → #FCD34D (Glow overlays)
```

### GROUP 2: GOLD ACCENTS (4 tokens)
```
--gold            → #FFD700 (Felt rim, badges)
--gold-light      → #FFED4E (Secondary glows)
--gold-dark       → #DAA520 (Dark variant)
--gold-amber      → #F59E0B (Alias of --brand) ⚠️ REDUNDANT
```

### GROUP 3: SURFACES — Deep Navy (6 tokens)
```
--bg              → #050A0F (Page base)
--bg-dark         → #02050A (Deepest fallback)
--bg-card         → #0D1B2A (Card/panel backgrounds)
--bg-panel        → #111F30 (Secondary panels)
--bg-elevated     → #162840 (Modals, dropdowns)
--bg-radial       → radial-gradient(...) (Full-page gradient)
```

### GROUP 4: FELT TABLE — Casino Green (6 tokens)
```
--felt            → #0A3D26 (Base felt color)
--felt-light      → #0F5132 (Radial center)
--felt-dark       → #073520 (Radial edge)
--felt-glow       → #1A6B54 (Highlight)
--felt-rim        → #0C4530 (Border variant)
--felt-radial     → radial-gradient(...) (3D depth)
```

### GROUP 5: BORDERS (3 tokens)
```
--border          → #1E3A5F (Default border)
--border-subtle   → #132538 (Almost invisible)
--border-bright   → #2A4F80 (Hover/active)
```

### GROUP 6: OUTCOMES — WIN (4 tokens)
```
--win             → #10B981 (Text, glow primary)
--win-glow        → #34D399 (Glow secondary)
--win-dark        → #059669 (Dark variant)
--win-muted       → #064E3B (Background)
```

### GROUP 7: OUTCOMES — LOSS (4 tokens)
```
--loss            → #EF4444 (Text, glow primary)
--loss-glow       → #F87171 (Glow secondary)
--loss-dark       → #DC2626 (Dark variant)
--loss-muted      → #450A0A (Background)
```

### GROUP 8: OUTCOMES — PUSH (2 tokens)
```
--push            → #F59E0B (Text, matches brand)
--push-muted      → #451A03 (Background)
```

### GROUP 9: PRIMARY ACTION — Blue (3 tokens)
```
--primary         → #3B82F6 (Default action buttons)
--primary-dark    → #2563EB (Pressed state)
--primary-light   → #60A5FA (Hover state)
```

### GROUP 10: CHIP DENOMINATIONS (7 tokens)
```
--chip-1          → #6B7280 ($1 Gray)
--chip-5          → #EF4444 ($5 Red)
--chip-10         → #3B82F6 ($10 Blue)
--chip-25         → #F59E0B ($25 Amber)
--chip-50         → #10B981 ($50 Green)
--chip-100        → #1A1A1A ($100 Black)
--chip-500        → #7C3AED ($500 Purple)
```

### GROUP 11: TEXT / FOREGROUND (6 tokens)
```
--text            → #E2E8F0 (Primary text, body)
--text-bright     → #F8FAFC (Brightest, headings)
--text-muted      → #64748B (Secondary text)
--text-subtle     → #475569 (Tertiary text)
--text-gold       → #F59E0B (Gold accent, matches brand)
--text-mono       → #94A3B8 (Monospace color)
```

### GROUP 12: SEMANTIC ALIASES (4 tokens)
```
--fg1             → var(--text-bright) (100% contrast)
--fg2             → var(--text) (85-90% contrast)
--fg3             → var(--text-muted) (70-75% contrast)
--fg4             → var(--text-subtle) (55-60% contrast)
```

### GROUP 13: ALTERNATIVE ACTION COLORS ⚠️ (from Action_buttons.md)
```
--color-hit       → #00D4FF (Cyan, not in primary design)
--color-stand     → #00FF88 (Lime green, not in primary)
--color-double    → #FF6B35 (Orange, not in primary)
--color-split     → #FFD700 (Gold, matches primary)
--color-surrender → #FF4757 (Red, not in primary)
--color-insurance → #A855F7 (Purple, not in primary)
--color-allin     → #FF9FF3 (Pink, not in primary)
```

**STATUS:** Exploration variant, not integrated into main system

---

## 🔤 TYPOGRAPHY TOKENS (26 tokens)

### GROUP 1: FONT FAMILIES (4 tokens)
```
--font-sans       → 'Inter', system-ui (Body text)
--font-display    → 'Outfit', 'Inter' (Headlines, CTAs)
--font-mono       → 'JetBrains Mono', 'Fira Code' (Code, labels)
--font-serif      → Georgia, 'Times New Roman' (Card faces)
```

### GROUP 2: TYPE SCALE — STATIC (8 tokens)
```
--text-2xs        → 0.625rem (10px)
--text-xs         → 0.75rem  (12px)
--text-sm         → 0.875rem (14px)
--text-base       → 1rem     (16px)
--text-lg         → 1.125rem (18px)
--text-xl         → 1.25rem  (20px)
--text-2xl        → 1.5rem   (24px)
--text-3xl        → 1.875rem (30px)
--text-4xl        → 2.25rem  (36px)
```

### GROUP 3: TYPE SCALE — RESPONSIVE/CLAMPED (7 tokens)
```
--text-clamp-xs   → clamp(10px, 1.2vw, 12px)
--text-clamp-sm   → clamp(12px, 1.5vw, 14px)
--text-clamp-base → clamp(14px, 1.8vw, 16px)
--text-clamp-lg   → clamp(16px, 2.2vw, 20px)
--text-clamp-xl   → clamp(20px, 2.8vw, 28px)
--text-clamp-2xl  → clamp(24px, 3.5vw, 36px)
--text-clamp-3xl  → clamp(30px, 4.5vw, 48px)
```

### GROUP 4: FONT WEIGHTS (7 tokens)
```
--fw-light        → 300 (Rare, decorative)
--fw-normal       → 400 (Body text default)
--fw-medium       → 500 (Labels, emphasis)
--fw-semibold     → 600 (Button text, strong)
--fw-bold         → 700 (Headings)
--fw-extrabold    → 800 (Display headings)
--fw-black        → 900 (Hero display)
```

### GROUP 5: LETTER SPACING ⚠️ RECOMMENDED (not yet added)
```
--letter-spacing-title   → -0.02em (Headings)
--letter-spacing-display → -0.04em (Hero text)
--letter-spacing-label   → 0.18em  (Labels)
--letter-spacing-eyebrow → 0.25em  (Eyebrows)
```

### GROUP 6: LINE HEIGHT ⚠️ RECOMMENDED (not yet added)
```
--lh-tight        → 1.2  (Headlines)
--lh-normal       → 1.5  (Body)
--lh-relaxed      → 1.6  (Content)
--lh-loose        → 1.75 (Long-form)
```

---

## 📦 SPACING TOKENS (16 tokens)

### GROUP 1: FIXED SPACING (10 tokens, 4px base)
```
--s-1             → 4px   (Micro spacing)
--s-2             → 8px   (Extra small)
--s-3             → 12px  (Small)
--s-4             → 16px  (Standard)
--s-5             → 20px  (Medium)
--s-6             → 24px  (Medium+)
--s-8             → 32px  (Large)
--s-10            → 40px  (Extra large)
--s-12            → 48px  (Extra large+)
--s-16            → 64px  (Massive)
```

### GROUP 2: RESPONSIVE SPACING — CLAMPED (6 tokens)
```
--sp-clamp-xs     → clamp(4px, 0.5vw, 8px)
--sp-clamp-sm     → clamp(8px, 1vw, 12px)
--sp-clamp-md     → clamp(12px, 1.5vw, 20px)
--sp-clamp-lg     → clamp(16px, 2.5vw, 32px)
--sp-clamp-xl     → clamp(24px, 4vw, 48px)
--sp-clamp-2xl    → clamp(32px, 5vw, 64px)
```

### GROUP 3: ALTERNATIVE SPACING ⚠️ (from Action_buttons.md)
```
--spacing-xs      → 4px   (Micro, matches --s-1)
--spacing-sm      → 8px   (Small, matches --s-2)
--spacing-md      → 12px  (Medium, matches --s-3)
--spacing-lg      → 16px  (Large, matches --s-4)
--spacing-xl      → 24px  (Extra large, matches --s-6)
--spacing-2xl     → 32px  (Extra large+, matches --s-8)
```

**STATUS:** Candidate for consolidation

---

## 🔲 BORDER RADIUS TOKENS (9 tokens)

### GROUP 1: CORNER RADIUS SCALE
```
--r-sm            → 0.375rem (6px)
--r-md            → 0.5rem   (8px)
--r-lg            → 0.75rem  (12px)  ⭐ BUTTON SIGNATURE
--r-xl            → 1rem     (16px)
--r-2xl           → 1.25rem  (20px)
--r-3xl           → 1.5rem   (24px)
--r-4xl           → 2rem     (32px)
--r-5xl           → 2.5rem   (40px)  ⭐ FELT TABLE SIGNATURE
--r-pill          → 9999px   (Perfect circle)
```

### GROUP 2: ALTERNATIVE RADIUS ⚠️ (from Action_buttons.md)
```
--radius-sm       → 4px  (6px offset, candidate for removal)
--radius-md       → 8px  (matches --r-md)
--radius-lg       → 12px (matches --r-lg)
--radius-xl       → 16px (matches --r-xl)
```

---

## ⬇️ SHADOW & GLOW TOKENS (12 tokens)

### GROUP 1: LAYERED SHADOWS (8 tokens)
```
--shadow-card         → 0 4px 16px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.3)
--shadow-card-hover   → 0 8px 24px rgba(0,0,0,0.5)
--shadow-chip         → 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18)
--shadow-button       → 0 4px 14px rgba(0,0,0,0.3)
--shadow-panel        → 0 8px 32px rgba(0,0,0,0.4)
--shadow-modal        → 0 24px 64px rgba(0,0,0,0.7)
--shadow-felt         → inset 0 0 60px rgba(0,0,0,0.5)
--shadow-felt-rim     → 0 0 0 3px rgba(255,215,0,0.12), inset 0 0 80px rgba(0,0,0,0.4)
--shadow-inner-glow   → inset 0 0 24px rgba(255,255,255,0.06)
```

### GROUP 2: OUTCOME GLOWS (4 tokens)
```
--glow-win            → 0 0 24px rgba(16,185,129,0.5), 0 0 50px rgba(16,185,129,0.2)
--glow-loss           → 0 0 24px rgba(239,68,68,0.5), 0 0 50px rgba(239,68,68,0.2)
--glow-gold           → 0 0 24px rgba(245,158,11,0.6), 0 0 50px rgba(245,158,11,0.3)
--glow-brand          → 0 0 20px rgba(245,158,11,0.45)
```

### GROUP 3: GLASS/BACKDROP ⚠️ RECOMMENDED
```
--glass-bg            → rgba(13, 27, 42, 0.75)
--glass-bg-light      → rgba(22, 40, 64, 0.6)
--glass-blur          → 16px
--glass-blur-sm       → 12px
--glass-border        → 1px solid rgba(30, 58, 95, 0.5)
--glass-border-light  → 1px solid rgba(42, 79, 128, 0.35)
```

**STATUS:** Currently hardcoded in CSS, should be extracted

---

## ⏱️ MOTION TOKENS (8 tokens)

### GROUP 1: EASING FUNCTIONS (3 tokens)
```
--ease-spring         → cubic-bezier(0.34, 1.56, 0.64, 1)  (Spring bounce)
--ease-out            → cubic-bezier(0.16, 1, 0.3, 1)      (Ease-out)
--ease-flip           → cubic-bezier(0.4, 0, 0.2, 1)       (Card flip)
```

### GROUP 2: DURATION (5 tokens)
```
--d-fast              → 150ms
--d-base              → 250ms
--d-slow              → 500ms
--d-card-flip         → 600ms
--d-card-deal         → 500ms
```

### GROUP 3: ALTERNATIVE MOTION ⚠️ (from Action_buttons.md)
```
--transition-fast     → 0.15s cubic-bezier(0.4, 0, 0.2, 1)      (matches --d-fast)
--transition-smooth   → 0.3s cubic-bezier(0.4, 0, 0.2, 1)       (differs from --d-base)
--transition-bounce   → 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)  (custom duration)
```

**STATUS:** Slight timing differences, recommend standardization

---

## ⚠️ TOKEN CONFLICTS & REDUNDANCIES

### EXACT DUPLICATES
| Primary | Alternative | Status |
|---------|-------------|--------|
| `--brand` | `--gold-amber` | Remove alias |
| `--brand` | `--chip-25` | Keep (semantic) |
| `--brand` | `--text-gold` | Keep (semantic) |
| `--primary` | `--chip-10` | Keep (semantic) |
| `--win` | `--chip-50` | Keep (semantic) |
| `--loss` | `--chip-5` | Keep (semantic) |

### NEAR-DUPLICATES (different scales)
| Primary Scale | Alternative Scale | Diff | Action |
|---------------|-------------------|------|--------|
| `--s-*` | `--spacing-*` | Same values | Consolidate |
| `--r-sm` through `--r-4xl` | `--radius-sm` through `--radius-xl` | Slight offset | Consolidate |
| `--d-base` (250ms) | `--transition-smooth` (300ms) | 50ms | Standardize |

---

## 📝 RECOMMENDED ADDITIONS (Priority Ordered)

### PRIORITY 1: CRITICAL
```
✓ --focus-ring: #FCD34D (WCAG compliance)
✓ --focus-ring-offset: 2px
✓ --focus-ring-width: 4px
✓ --disabled-opacity: 0.4
✓ --disabled-grayscale: 1
✓ Extract --glass-* tokens from CSS
```

### PRIORITY 2: HIGH
```
✓ --letter-spacing-* scale (4 tokens)
✓ --lh-* line-height scale (4 tokens)
✓ --z-base: 0
✓ --z-dropdown: 10
✓ --z-sticky: 40
✓ --z-modal: 50
✓ --z-tooltip: 100
```

### PRIORITY 3: MEDIUM
```
✓ --scale-hover: 1.04
✓ --scale-hover-chip: 1.1
✓ --scale-active: 0.95
✓ --scale-active-chip: 0.97
✓ --aspect-card: 5 / 7
✓ --aspect-chip: 1 / 1
```

### PRIORITY 4: FUTURE
```
• System message colors (error, success, warning, info)
• Input field states (focus, error, disabled)
• Loading state indicators
• Skeleton screen colors
```

---

## 📊 SUMMARY BY CATEGORY

| Category | Count | Status | Completeness |
|----------|-------|--------|--------------|
| Colors | 90+ | ✓ Complete | 85% |
| Typography | 26 | ⚠️ Partial | 80% |
| Spacing | 16 | ✓ Complete | 95% |
| Radius | 9 | ✓ Complete | 100% |
| Shadows | 12 | ✓ Complete | 95% |
| Motion | 8 | ✓ Complete | 100% |
| **Accessibility** | **0** | **❌ Missing** | **0%** |
| **State Modifiers** | **0** | **❌ Missing** | **0%** |
| **Z-Index** | **0** | **❌ Missing** | **0%** |
| **Glass/Backdrop** | **0** | **⚠️ Hardcoded** | **0%** |
| **TOTAL** | **161** | **75% Complete** | **—** |

---

**Last Updated:** April 29, 2026 | **Version:** 1.0  
**Maintenance:** See DESIGN-TOKENS-MASTER-INVENTORY.md for detailed docs
