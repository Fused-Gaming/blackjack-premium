# Blackjack Premium — Design System

**Version:** 1.0  
**Brand:** ACE (Amber, Casino, Elegant)  
**Theme:** SaaS-style dark premium with casino elegance  
**Target Audience:** Professional players, crypto enthusiasts, premium gamers  

---

## 🎨 Brand Identity

### Brand Values
- **Professional** — Clean, modern, trustworthy
- **Elegant** — Refined dark theme with premium finishes
- **Transparent** — Clear information hierarchy, readable at a glance
- **Fair** — Provably fair casino UX, honest odds display

### Color Philosophy
- **Primary Brand:** Amber/Gold (`#F59E0B`) — ACE acronym, warm/welcoming
- **Surfaces:** Deep navy/charcoal (`#050A0F` to `#162840`) — luxury, focus
- **Outcomes:** Green (`#10B981`) for wins, Red (`#EF4444`) for losses
- **Felt Table:** Authentic casino green (`#0A3D26`)
- **Text:** High contrast light grays (`#E2E8F0`, `#F8FAFC`)

---

## 🎯 Design Tokens

### **Tier 1: Primitives**

#### Colors

**Neutrals (Grayscale)**
```
--color-white:        #F8FAFC
--color-gray-100:     #F1F5F9
--color-gray-200:     #E2E8F0
--color-gray-300:     #CBD5E1
--color-gray-400:     #94A3B8
--color-gray-500:     #64748B
--color-gray-600:     #475569
--color-gray-700:     #334155
--color-gray-800:     #1E293B
--color-gray-900:     #0F172A
--color-black:        #000000
```

**Brand Accent (Amber)**
```
--color-amber-50:     #FFFBEB
--color-amber-100:    #FEF3C7
--color-amber-200:    #FDE68A
--color-amber-300:    #FCD34D
--color-amber-400:    #FBBF24
--color-amber-500:    #F59E0B (PRIMARY)
--color-amber-600:    #D97706
--color-amber-700:    #B45309
--color-amber-800:    #92400E
--color-amber-900:    #78350F
```

**Semantic Outcome Colors**
```
--color-success:      #10B981 (Win - Emerald)
--color-success-dark: #059669
--color-success-glow: #34D399
--color-success-muted:#064E3B

--color-error:        #EF4444 (Loss - Red)
--color-error-dark:   #DC2626
--color-error-glow:   #F87171
--color-error-muted:  #450A0A

--color-warning:      #F59E0B (Push - Amber)
--color-warning-muted:#451A03
```

**Background Layers (Dark Theme)**
```
--bg-primary:    #050A0F (Darkest - Main background)
--bg-secondary:  #0D1B2A (Cards, panels)
--bg-tertiary:   #111F30 (Lower elevation)
--bg-quaternary: #162840 (Highest elevation)
--bg-table:      #0A3D26 (Felt table)
--bg-overlay:    rgba(5, 10, 15, 0.8) (Modals, overlays)
```

**Borders**
```
--border-default: #1E3A5F (Standard borders)
--border-subtle:  #132538 (Subtle dividers)
--border-bright:  #2A4F80 (Prominent borders)
```

### **Tier 2: Semantic**

#### Typography

**Font Families**
```
--font-sans:    'Inter', system-ui, -apple-system, sans-serif
--font-display: 'Outfit', 'Inter', sans-serif
--font-mono:    'JetBrains Mono', 'Fira Code', monospace
```

**Font Sizes**
```
--text-2xs:     0.625rem (10px)  / 0.875rem line-height
--text-xs:      0.75rem   (12px) / 1rem line-height
--text-sm:      0.875rem  (14px) / 1.25rem line-height
--text-base:    1rem      (16px) / 1.5rem line-height
--text-lg:      1.125rem  (18px) / 1.75rem line-height
--text-xl:      1.25rem   (20px) / 1.75rem line-height
--text-2xl:     1.5rem    (24px) / 2rem line-height
--text-3xl:     1.875rem  (30px) / 2.25rem line-height
--text-4xl:     2.25rem   (36px) / 2.5rem line-height
```

**Font Weights**
```
--font-weight-light:   300
--font-weight-normal:  400
--font-weight-medium:  500
--font-weight-semibold: 600
--font-weight-bold:    700
--font-weight-extrabold: 800
```

**Text Colors**
```
--text-primary:   #E2E8F0 (Primary text)
--text-secondary: #64748B (Secondary text, muted)
--text-tertiary:  #475569 (Tertiary text, subtle)
--text-bright:    #F8FAFC (Brightest text, headings)
--text-gold:      #F59E0B (Brand text accent)
--text-mono:      #94A3B8 (Monospace/code text)
```

#### Spacing

**Scale (4px base unit)**
```
--space-0:   0
--space-1:   0.25rem (4px)
--space-2:   0.5rem  (8px)
--space-3:   0.75rem (12px)
--space-4:   1rem    (16px)
--space-6:   1.5rem  (24px)
--space-8:   2rem    (32px)
--space-10:  2.5rem  (40px)
--space-12:  3rem    (48px)
--space-16:  4rem    (64px)
--space-20:  5rem    (80px)
--space-24:  6rem    (96px)
```

#### Shadows

**Depth Levels**
```
--shadow-sm:      0 2px 4px rgba(0, 0, 0, 0.1)
--shadow-base:    0 4px 12px rgba(0, 0, 0, 0.2)
--shadow-md:      0 8px 24px rgba(0, 0, 0, 0.3)
--shadow-lg:      0 12px 32px rgba(0, 0, 0, 0.4)
--shadow-xl:      0 16px 48px rgba(0, 0, 0, 0.5)
--shadow-2xl:     0 24px 64px rgba(0, 0, 0, 0.7)
```

**Game-Specific**
```
--shadow-felt:        inset 0 0 60px rgba(0, 0, 0, 0.5)
--shadow-felt-rim:    0 0 0 3px rgba(255, 215, 0, 0.12), inset 0 0 80px rgba(0,0,0,0.4)
--shadow-glow-win:    0 0 24px rgba(16, 185, 129, 0.5), 0 0 50px rgba(16, 185, 129, 0.2)
--shadow-glow-loss:   0 0 24px rgba(239, 68, 68, 0.5), 0 0 50px rgba(239, 68, 68, 0.2)
--shadow-glow-gold:   0 0 24px rgba(245, 158, 11, 0.6), 0 0 50px rgba(245, 158, 11, 0.3)
--shadow-card:        0 4px 16px rgba(0, 0, 0, 0.45), 0 1px 4px rgba(0,0,0,0.3)
--shadow-card-hover:  0 8px 24px rgba(0, 0, 0, 0.5)
--shadow-chip:        0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18)
```

#### Border Radius

**Semantic Scale**
```
--radius-sm:     0.25rem  (4px)   - buttons, small elements
--radius-md:     0.5rem   (8px)   - cards, panels, standard
--radius-lg:     1rem     (16px)  - large cards, modals
--radius-xl:     1.5rem   (24px)  - rounded containers
--radius-2xl:    2rem     (32px)  - large emphasis elements
--radius-full:   9999px           - pills, circles
```

#### Transitions

**Durations**
```
--duration-fast:     150ms (quick interactions)
--duration-base:     200ms (standard)
--duration-slow:     300ms (complex animations)
--duration-slower:   500ms (card deals, flips)
--duration-slowest:  800ms (celebration animations)
```

**Easing**
```
--ease-linear:       linear
--ease-in:           cubic-bezier(0.4, 0, 1, 1)
--ease-out:          cubic-bezier(0, 0, 0.2, 1)
--ease-in-out:       cubic-bezier(0.4, 0, 0.2, 1)
--ease-bounce:       cubic-bezier(0.34, 1.56, 0.64, 1)
```

### **Tier 3: Components**

#### Button Sizes & States

**Size Variants**
```
sm   → 8px padding, 12px text, 20px height
md   → 12px padding, 14px text, 40px height (default)
lg   → 16px padding, 16px text, 48px height
xl   → 20px padding, 18px text, 56px height
```

**States**
```
default    → Full opacity, normal shadow
hover      → 1.05x scale, elevated shadow
active     → Opacity 0.95
disabled   → Opacity 0.5, no pointer
loading    → Spinner, no interaction
```

#### Input Fields

**Height Variants**
```
sm   → 32px
md   → 40px (default)
lg   → 48px
```

**States**
```
default   → Border: --border-default, BG: --bg-secondary
hover     → Border: --border-bright
focus     → Border: --color-amber-500, outline: none, shadow: glow
error     → Border: --color-error
disabled  → BG: --bg-tertiary, cursor: not-allowed
```

#### Card Component

**Standard Card**
```
- Padding: 24px (--space-6)
- Background: --bg-secondary (#0D1B2A)
- Border: 1px solid --border-default
- BorderRadius: --radius-lg
- BoxShadow: --shadow-card
- Transition: all 200ms ease-out

Hover State:
- Transform: translateY(-4px)
- BoxShadow: --shadow-card-hover
```

#### Badge Component

**Size Variants**
```
sm   → 10px padding, 12px text
md   → 12px padding, 14px text (default)
lg   → 14px padding, 16px text
```

**Color Variants**
```
neutral  → BG: --bg-tertiary,  Text: --text-secondary
success  → BG: --color-success-muted, Text: --color-success
error    → BG: --color-error-muted, Text: --color-error
warning  → BG: --color-warning-muted, Text: --color-warning
brand    → BG: --bg-quaternary, Text: --color-amber-500
```

---

## 🧩 Component Library

### Core Components

#### 1. Button
**Usage:** Primary actions, player decisions, navigation  
**Variants:** primary (brand), secondary (outline), tertiary (ghost), danger  
**States:** default, hover, active, disabled, loading  
**Example:**
```tsx
<button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg font-semibold 
  text-white transition-all duration-200 active:scale-95 disabled:opacity-50">
  Hit
</button>
```

#### 2. Input
**Usage:** Bet amounts, search, settings  
**Types:** text, number, password  
**States:** default, hover, focus, error, disabled  
**Example:**
```tsx
<input className="w-full px-4 py-2 bg-background-card border border-border-default 
  rounded-lg text-text-primary focus:border-amber-500 focus:shadow-glow-gold 
  transition-all placeholder:text-text-muted" />
```

#### 3. Card
**Usage:** Game hands, profile cards, panels  
**Variants:** standard, highlighted, interactive  
**Example:**
```tsx
<div className="p-6 bg-background-card border border-border-default 
  rounded-xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all">
  {/* Content */}
</div>
```

#### 4. Badge
**Usage:** Hand values, status indicators, chips  
**Variants:** neutral, success, error, warning, brand  
**Example:**
```tsx
<span className="px-3 py-1 bg-success/20 text-success rounded-full text-sm font-semibold">
  +$245
</span>
```

#### 5. Modal
**Usage:** Insurance prompts, wallet connect, game over  
**States:** closed, opening, open, closing  
**Example:**
```tsx
<div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center">
  <div className="p-8 bg-background-card rounded-2xl shadow-modal border border-border-default
    max-w-md animate-modal-in">
    {/* Content */}
  </div>
</div>
```

#### 6. Chip
**Usage:** Betting, payout display  
**Variants:** denominational (1, 5, 10, 25, 50, 100, 500)  
**Colors:** Pre-defined per denomination  
**Example:**
```tsx
<div className="w-16 h-16 rounded-full flex items-center justify-center font-bold 
  text-white bg-gradient-to-br from-amber-500 to-amber-700 
  shadow-chip border-2 border-amber-400">
  $25
</div>
```

#### 7. Text/Typography
**Semantic Usage:**
- `heading-1` (`text-4xl bold display-font`) — Page titles
- `heading-2` (`text-3xl bold display-font`) — Section headers
- `heading-3` (`text-2xl semibold display-font`) — Subsections
- `body-lg` (`text-lg base`) — Rich content, descriptions
- `body-base` (`text-base base`) — Standard body text
- `body-sm` (`text-sm base`) — Secondary text, labels
- `mono-base` (`text-base mono`) — Code, values, monospace

---

## 🎮 Game UI Specific Patterns

### **Felt Table**
- Background: Authentic casino green with inset shadow
- Borders: Gold rim effect (0 0 0 3px gold/12%)
- Elevation: Inset shadow creates depth

### **Card Display**
- Size: Proportional to viewport (max 140px width on desktop)
- Animation: Deal animation from top-left, flip on reveal
- Shadow: Realistic card shadow (--shadow-card)
- Overlap: 20px stack offset for multiple cards

### **Hand Value Display**
- Position: Bottom-right of hand group
- Badge: Circular, large (40px diameter)
- Color: Brand color (amber) with glow
- Font: Mono, bold, white text

### **Chip Stack**
- Layout: Grid stacked vertically
- Animation: Chip stack bounce on placement
- Shadow: Individual chip shadow with inset highlight

### **Outcome Banner**
- Position: Below dealer hand
- States: Win (green glow), Loss (red glow), Push (neutral)
- Content: Outcome label + payout amount
- Animation: Fade in + scale celebration

---

## 📐 Layout & Spacing

### **Game Table Layout**
```
┌─────────────────────────────────────┐
│         Dealer Area                 │  (top 30%)
│  [Dealer Hand] [Value]              │
├─────────────────────────────────────┤
│                                     │
│         Player Play Area            │  (middle 40%)
│     [Hand 1] [Hand 2] [Hand 3]      │
│     [Buttons: Hit/Stand/...]        │
│                                     │
├─────────────────────────────────────┤
│  Bet Controls    │    Status        │  (bottom 30%)
│  [Chips] [Bet]   │  Chips, Balance  │
└─────────────────────────────────────┘
```

### **Vertical Rhythm**
- Component padding: Multiples of 4px (8, 12, 16, 24, 32)
- Section margins: 16px - 48px depending on hierarchy
- Line height: 1.5 (body), 1.25 (headings)

---

## 🌙 Dark Mode Implementation

All colors use CSS custom properties for consistency:
```css
:root {
  --color-primary: #F59E0B;
  --color-text-primary: #E2E8F0;
  --color-bg-primary: #050A0F;
  /* ... etc */
}
```

No separate light mode needed (premium dark casino aesthetic only).

---

## ♿ Accessibility Guidelines

- **Color Contrast:** WCAG AA minimum (4.5:1 for text, 3:1 for graphics)
- **Touch Targets:** 44px minimum for interactive elements
- **Focus Indicators:** Visible 2px outline with amber color
- **Semantic HTML:** Buttons, inputs, form labels properly structured
- **ARIA Labels:** Game-critical information labeled (insurance prompt, hand totals)
- **Keyboard Navigation:** Tab order matches visual hierarchy
- **Motion:** Reduced motion respected (prefers-reduced-motion media query)

---

## 🚀 Implementation Checklist

- [ ] CSS custom properties defined in `:root`
- [ ] Tailwind extended with design tokens
- [ ] All colors use token scale (no hardcoded hex except in tokens)
- [ ] Shadows applied consistently (design-system-based)
- [ ] Typography follows semantic hierarchy
- [ ] Button component: All states working (hover, active, disabled, loading)
- [ ] Input component: Focus state with glow, error state
- [ ] Card component: Hover elevation, shadow
- [ ] Badge component: All color variants
- [ ] Modal: Animation in/out, backdrop
- [ ] Chip component: All denominations, styling
- [ ] Accessibility: Focus indicators, labels, contrast
- [ ] Responsive design: Mobile (320px), tablet (768px), desktop (1024px)
- [ ] Dark theme: All colors high contrast on dark background
- [ ] Animation performance: GPU-accelerated, <60fps
- [ ] Documentation: Component library guide with examples

---

## 🎬 Animation Library

All animations use custom keyframes defined in tailwind.config.js:

**Card Animations:**
- `deal` — 0.5s entrance from top-left with rotation
- `flip` — 0.6s rotateY card reveal
- `slide-in` — 0.3s translateY entrance
- `slide-up` — 0.4s translateY entrance with spring easing

**Outcome Animations:**
- `win-celebration` — 0.6s scale bounce
- `bust-shake` — 0.5s horizontal shake
- `count-up` — 0.8s scale + fade entrance
- `glow-pulse` — 2s infinite glow for win state
- `glow-pulse-gold` — 2s infinite glow for brand accent

**UI Animations:**
- `scale-in` — 0.2s scale entrance
- `modal-in` — 0.3s scale + translate entrance
- `fade-in` — 0.25s opacity entrance
- `chip-fly` — 0.8s arc flight animation to payout position

---

## 📚 Usage Examples

### Button with All States
```tsx
const states = ['default', 'hover', 'active', 'disabled'];
<button className={`
  px-4 py-2 rounded-lg font-semibold
  bg-amber-500 text-white
  hover:bg-amber-600 hover:shadow-button
  active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all duration-200
`}>
  Click Me
</button>
```

### Game Outcome Card
```tsx
<motion.div
  animate={{ scale: 1 }}
  className="p-6 rounded-xl border border-success/40 bg-success/10">
  <p className="text-success font-display font-bold text-2xl">Blackjack!</p>
  <p className="text-text-muted text-lg">+$245</p>
</motion.div>
```

### Responsive Grid Layout
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

---

## 📖 References

- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion
- Accessible Colors: https://webaim.org/articles/contrast/
- Casino UI Best Practices: Player clarity, outcome salience, chip feedback

---

**Last Updated:** 2026-04-26  
**Next Review:** After component library implementation
