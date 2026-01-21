# 🎨 Premium Casino Design System

## Vision
**Premium casino feel** • **Instant clarity** • **Motion-first feedback** • **Mobile-first scaling**

---

## 🎨 Color Palette

### Background & Base
```css
--bg-primary:    #0B1220  /* Deep navy - main background */
--bg-dark:       #070A12  /* Darker navy - shadows */
--bg-card:       #1a2332  /* Card/panel background */
```

### Felt Table
```css
--felt-primary:  #0E4D3C  /* Classic green felt */
--felt-light:    #145A4A  /* Highlight areas */
--felt-dark:     #0C3B31  /* Shadow areas */
--felt-glow:     #1A6B54  /* Glow effect */
```

### Outcome Colors
```css
--win-primary:   #1ED760  /* Spotify green - wins */
--win-glow:      #2EE770  /* Glow effect */
--loss-primary:  #E63946  /* Red - losses */
--loss-glow:     #F04955  /* Glow effect */
--gold:          #FFD700  /* Blackjack celebrations */
```

### UI Elements
```css
--primary:       #3B82F6  /* Blue - CTAs */
--text-default:  #E5E7EB  /* Light gray text */
--text-muted:    #9CA3AF  /* Subdued text */
--text-bright:   #F9FAFB  /* Emphasized text */
```

### Chip Colors
```css
--chip-1:    #6B7280  /* $1 - Gray */
--chip-5:    #E63946  /* $5 - Red */
--chip-10:   #3B82F6  /* $10 - Blue */
--chip-25:   #FFD700  /* $25 - Gold */
--chip-50:   #10B981  /* $50 - Green */
--chip-100:  #000000  /* $100 - Black */
```

---

## 🎭 Typography

### Font Stack
```css
font-display: 'Outfit', 'Inter', sans-serif;  /* Headers, outcomes */
font-body:    'Inter', system-ui, sans-serif; /* Body text */
```

### Scale
```
Outcome/Win:     text-4xl (36px) font-bold
Balance:         text-2xl (24px) font-semibold
Card Value:      text-xl (20px) font-bold
Button Labels:   text-base (16px) font-medium
Status Messages: text-sm (14px)
```

---

## 📐 Layout System

### Header (Status Bar)
```
Height: 80px (mobile) → 100px (desktop)
Layout: Flex, space-between
Padding: 4 (mobile) → 6 (desktop)

[Blackjack]          [Balance: $1,240]
─────────────────────────────────────
WIN +$200 • Dealer Bust
```

### Table Area
```
Shape: Rounded rectangle with soft edges
Padding: 8 (mobile) → 12 (desktop)
Background: Radial gradient (top-center to edges)
Shadow: Inset shadow for depth
```

### Bottom Dock (Actions)
```
Fixed to bottom on mobile
Centered on desktop
Padding: 6
Max-width: 600px
```

---

## ✨ Motion System

### Card Animations

####  Deal Animation
```typescript
from: translateX(-200px) translateY(-100px) rotate(-25deg) scale(0.8)
via:  translateX(10px) translateY(5px) rotate(2deg) scale(1.05)
to:   translateX(0) translateY(0) rotate(0) scale(1)
duration: 0.5s
easing: cubic-bezier(0.34, 1.56, 0.64, 1)
```

#### Flip Animation
```typescript
from: rotateY(0deg)
to:   rotateY(180deg)
duration: 0.6s
easing: ease-in-out
```

#### Bust Shake
```typescript
keyframes: translateX(-5px) → 5px (oscillate)
iterations: 5
duration: 0.5s
```

### Chip Animations

#### Stack Animation
```typescript
from: translateY(20px) scale(0.8) opacity(0)
via:  translateY(-5px) scale(1.1) opacity(1)
to:   translateY(0) scale(1) opacity(1)
duration: 0.3s
```

#### Fly to Balance
```typescript
from: translate(0, 0) scale(1)
via:  translate(x, y) scale(0.5) rotate(360deg)
to:   translate(x, y) scale(0.2) opacity(0)
duration: 0.8s
```

### Outcome Animations

#### Win Celebration
```typescript
keyframes:
  scale(1) → scale(1.15) rotate(-3deg) →
  scale(1.1) rotate(2deg) → scale(1)
duration: 0.6s
with: glow-pulse animation
```

#### Glow Pulse
```typescript
boxShadow oscillates:
  0%:   0 0 20px rgba(win, 0.4)
  50%:  0 0 40px rgba(win, 0.8)
  100%: 0 0 20px rgba(win, 0.4)
duration: 1.5s
infinite
```

#### Count-Up (Balance)
```typescript
from: scale(0.9) opacity(0.5)
via:  scale(1.1) opacity(1)
to:   scale(1) opacity(1)
duration: 0.8s
```

---

## 🧩 Component Patterns

### Card Component
```
Size: 80px × 112px (mobile) → 100px × 140px (desktop)
Border radius: 8px
Shadow: 0 4px 12px rgba(0,0,0,0.3)
Background: White (face up) | Blue gradient (face down)

Face up:
  - Rank + suit in corners
  - Large suit in center
  - Red for ♥♦, black for ♠♣

Face down:
  - Blue gradient background
  - Repeating pattern
```

### Chip Component
```
Size: 48px diameter (mobile) → 56px (desktop)
Border: 3px solid lighter shade
Shadow: 0 2px 8px rgba(0,0,0,0.4)
        inset 0 1px 0 rgba(255,255,255,0.2)
Text: Bold, white, centered

States:
  - Default: Normal
  - Hover: scale(1.1) + glow
  - Selected: ring-4 ring-yellow-400
  - Disabled: opacity-50 grayscale
```

### Button Variants

#### Primary (Filled)
```css
background: linear-gradient(135deg, #3B82F6, #2563EB)
color: white
padding: 12px 32px (mobile) → 16px 48px (desktop)
border-radius: 12px
shadow: 0 4px 14px rgba(0,0,0,0.25)
hover: scale(1.05) brightness(1.1)
```

#### Secondary (Outline)
```css
background: transparent
border: 2px solid #3B82F6
color: #3B82F6
hover: background #3B82F6, color white
```

#### Danger (Red)
```css
background: linear-gradient(135deg, #E63946, #DC2626)
hover: scale(1.05)
```

#### Success (Green)
```css
background: linear-gradient(135deg, #1ED760, #16A34A)
hover: scale(1.05) + glow-pulse
```

---

## 📱 Responsive Breakpoints

```css
mobile:  < 640px   (portrait phones)
tablet:  640-1024px (landscape phones, tablets)
desktop: > 1024px  (laptops, desktops)
```

### Scaling Rules

#### Mobile (< 640px)
- Single column layout
- Cards: 80px × 112px
- Chips: 48px diameter
- Bottom dock: Fixed, full width
- Padding: 4-6 units
- Font scale: 0.875x

#### Tablet (640-1024px)
- Flexible layout
- Cards: 90px × 126px
- Chips: 52px diameter
- Bottom dock: Centered, max 600px
- Padding: 6-8 units
- Font scale: 1x

#### Desktop (> 1024px)
- Spacious layout
- Cards: 100px × 140px
- Chips: 56px diameter
- Max container width: 1200px
- Padding: 8-12 units
- Font scale: 1x

---

## 🎯 UX Patterns

### Outcome Clarity
```
Format: [OUTCOME] [AMOUNT] • [REASON]
Examples:
  WIN +$200 • Dealer Bust
  LOSS -$100 • Dealer 20
  BLACKJACK +$150 • Natural 21
  PUSH $0 • Both 18

Colors:
  WIN: --win-primary with glow-pulse
  LOSS: --loss-primary with fade
  BLACKJACK: --gold with glow-gold
  PUSH: --text-muted
```

### Loading States
```
Deal button:
  Click → "Dealing..." → Disabled + spinner

Card reveal:
  Progressive: Dealer → Player → Outcome
  Timing: 300ms between each card

Balance update:
  Immediate: Subtract bet
  After win: Count-up animation
```

### Error States
```
Insufficient balance:
  - Shake balance display
  - Show red border
  - Display message: "Not enough balance"

Invalid action:
  - Shake button
  - Show tooltip
  - Haptic feedback (mobile)
```

### Success States
```
Blackjack:
  - Gold glow on cards
  - Celebration animation
  - Confetti (optional)
  - Sound effect

Big win (>$500):
  - Extended celebration
  - Larger glow radius
  - Special sound
```

---

## 🔊 Sound Design (Future)

### Card Sounds
- Deal: Soft whoosh + snap
- Flip: Quick flip sound
- Hit: Similar to deal

### Chip Sounds
- Select: Light clink
- Place bet: Heavier clink
- Win: Chips cascading

### Outcome Sounds
- Win: Pleasant chime
- Blackjack: Special fanfare
- Loss: Subtle descending tone
- Push: Neutral beep

### UI Sounds
- Button click: Soft tap
- Error: Short buzz
- Navigation: Soft swoosh

---

## 🎨 Visual Hierarchy

### Z-Index Layers
```
Layer 10: Modals, toasts
Layer 9:  Dropdown menus
Layer 8:  Sticky header/dock
Layer 5:  Floating chips (animations)
Layer 3:  Cards (active hand)
Layer 2:  Table surface
Layer 1:  Background
```

### Focus Priority
```
Primary: Outcome message
Secondary: Player hand value
Tertiary: Action buttons
Quaternary: Balance, dealer hand
```

---

## ♿ Accessibility

### Color Contrast
```
Text on dark bg: 4.5:1 minimum (WCAG AA)
Win/loss colors: Distinct for colorblind users
Use icons + text for outcomes
```

### Keyboard Navigation
```
Tab order:
  1. Action buttons (Hit, Stand, etc.)
  2. Chip selector
  3. Bet amount controls
  4. New round button
  5. Settings
```

### Screen Readers
```
All buttons: Descriptive aria-labels
Card values: Announced on deal
Outcomes: Immediate announcement
Balance changes: Announced with context
```

### Motion Preferences
```
@media (prefers-reduced-motion) {
  - Disable chip fly animations
  - Use simple fades instead
  - Keep essential feedback
  - Reduce duration by 50%
}
```

---

## 📝 Implementation Checklist

### Phase 1: Design Tokens ✅
- [x] Color system in Tailwind
- [x] Animation keyframes
- [x] Typography scale
- [x] Shadow system

### Phase 2: Core Components
- [ ] Redesigned Card component
- [ ] New Chip component
- [ ] Premium Button variants
- [ ] Status bar header

### Phase 3: Layout
- [ ] Felt table with gradient
- [ ] Bottom action dock
- [ ] Responsive grid system
- [ ] Mobile-first scaling

### Phase 4: Animations
- [ ] Card deal with bounce
- [ ] Chip stacking
- [ ] Win celebration
- [ ] Balance count-up

### Phase 5: Polish
- [ ] Outcome clarity system
- [ ] Sound toggle
- [ ] Settings panel
- [ ] History drawer

---

**Status**: Design system complete, ready for component implementation
**Last Updated**: 2026-01-20
