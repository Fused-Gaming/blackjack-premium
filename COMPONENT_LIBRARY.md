# Blackjack Premium — Component Library

**Status:** Foundation Established  
**Last Updated:** 2026-04-26  
**Version:** 1.0

---

## Overview

This document outlines the component library for Blackjack Premium, built using React, TypeScript, Tailwind CSS, and Framer Motion. All components follow the ACE Brand Design System for consistency, accessibility, and premium user experience.

---

## Component Directory

| Component | Purpose | File | Status |
|-----------|---------|------|--------|
| **Button** | Primary actions (Hit, Stand, Deal, etc.) | `components/ui/Button.tsx` | 🟡 Needs audit |
| **Input** | Bet amounts, wallet input | `components/ui/Input.tsx` | 🟡 Needs creation |
| **Card** | Game cards (display only, animation handled elsewhere) | `components/game/Card.tsx` | ✅ Exists |
| **Chip** | Betting chips, chip stacks | `components/ui/Chip.tsx` | ✅ Exists |
| **Badge** | Hand values, status indicators | `components/ui/Badge.tsx` | 🟡 Needs creation |
| **Modal** | Insurance prompts, wallet connect, game over | `components/ui/Modal.tsx` | 🟡 Needs creation |
| **Hand** | Player hand display container | `components/game/Hand.tsx` | ✅ Exists |
| **Table** | Main game table layout | `components/game/Table.tsx` | ✅ Exists |
| **Header** | Game title, branding, settings | `components/layout/Header.tsx` | ✅ Exists |
| **StatusBar** | Player info, balance, bet | `components/layout/StatusBar.tsx` | ✅ Exists |
| **ActionButtons** | Hit/Stand/Double/Split controls | `components/controls/ActionButtons.tsx` | ✅ Exists |
| **BetControls** | Chip selection, bet placement | `components/controls/BetControls.tsx` | ✅ Exists |
| **InsurancePrompt** | Insurance yes/no modal | `components/controls/InsurancePrompt.tsx` | ✅ Exists |
| **WalletButton** | Connect wallet button | `components/wallet/WalletButton.tsx` | ✅ Exists |
| **WalletModal** | Wallet connection flow | `components/wallet/WalletModal.tsx` | ✅ Exists |

---

## Core Components

### 1. Button Component

**Purpose:** Primary action button for game actions (Hit, Stand, Deal, etc.)  
**Variants:**
- `primary` — Main action (amber background)
- `secondary` — Alternative action (outline)
- `danger` — Destructive action (red)
- `success` — Positive action (green)

**States:** default, hover, active, disabled, loading

**File Location:** `components/ui/Button.tsx` *(to be created/audited)*

**Implementation Example:**
```tsx
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  children,
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-amber-500 hover:bg-amber-600 text-white',
    secondary: 'border border-border-bright hover:bg-bg-quaternary text-text-primary',
    danger: 'bg-error hover:bg-error-dark text-white',
    success: 'bg-success hover:bg-success-dark text-white',
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm rounded-lg',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        font-display font-semibold tracking-wide
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-button
        ${variantClasses[variant]}
        ${sizeClasses[size]}
      `}
    >
      {loading ? <span className="animate-spin">⌛</span> : children}
    </motion.button>
  );
}
```

**Usage:**
```tsx
<Button variant="primary" onClick={handleHit}>Hit</Button>
<Button variant="secondary" onClick={handleStand}>Stand</Button>
<Button variant="danger" disabled={true}>Split</Button>
<Button variant="success" size="lg">Place Bet</Button>
```

---

### 2. Input Component

**Purpose:** Player input (bet amounts, nickname, wallet interaction)  
**Types:** text, number, password  
**States:** default, hover, focus, error, disabled

**File Location:** `components/ui/Input.tsx` *(to be created)*

**Implementation Pattern:**
```tsx
interface InputProps {
  type?: 'text' | 'number' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  label?: string;
  rightElement?: React.ReactNode;
}

export function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled,
  label,
  rightElement,
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-text-primary mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-2
            bg-bg-secondary border rounded-lg
            text-text-primary placeholder:text-text-tertiary
            transition-all duration-200
            ${error ? 'border-error focus:border-error' : 
              'border-border-default focus:border-amber-500 focus:shadow-[0_0_12px_rgba(245,158,11,0.3)]'}
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        />
        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-error mt-1">{error}</p>
      )}
    </div>
  );
}
```

---

### 3. Card Component

**Purpose:** Display game cards with flip animation  
**States:** faceUp (boolean), animated

**File Location:** `components/game/Card.tsx` *(already exists, check for design system compliance)*

**Key Features:**
- CSS-driven flip animation using `--card-flip-duration` and `--card-flip-easing`
- Perspective 3D effect
- Backface visibility hidden for flip effect
- Shadow using `--shadow-card`

**Design System Compliance Checklist:**
- [ ] Uses `--shadow-card` token
- [ ] Responsive sizing (max-width constraint)
- [ ] Proper hover state (no interaction, visual only)
- [ ] Flip animation uses CSS variables

---

### 4. Chip Component

**Purpose:** Display betting chips with denomination styling  
**Denominations:** 1, 5, 10, 25, 50, 100, 500

**File Location:** `components/ui/Chip.tsx` *(already exists, audit required)*

**Implementation Pattern:**
```tsx
interface ChipProps {
  denomination: 1 | 5 | 10 | 25 | 50 | 100 | 500;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onClick?: () => void;
}

const denominationMap = {
  1: { color: 'var(--chip-1-color)', label: '$1' },
  5: { color: 'var(--chip-5-color)', label: '$5' },
  10: { color: 'var(--chip-10-color)', label: '$10' },
  25: { color: 'var(--chip-25-color)', label: '$25' },
  50: { color: 'var(--chip-50-color)', label: '$50' },
  100: { color: 'var(--chip-100-color)', label: '$100' },
  500: { color: 'var(--chip-500-color)', label: '$500' },
};

export function Chip({
  denomination,
  count = 1,
  size = 'md',
  interactive = false,
  onClick,
}: ChipProps) {
  const { color, label } = denominationMap[denomination];
  const sizeMap = { sm: 'w-12 h-12 text-xs', md: 'w-16 h-16 text-sm', lg: 'w-20 h-20 text-base' };

  return (
    <motion.div
      whileHover={interactive ? { scale: 1.08 } : {}}
      whileTap={interactive ? { scale: 0.95 } : {}}
      onClick={interactive ? onClick : undefined}
      className={`
        chip-base ${sizeMap[size]}
        flex flex-col items-center justify-center
        text-white font-bold
        shadow-chip
        ${interactive ? 'cursor-pointer' : 'cursor-default'}
      `}
      style={{ background: color } as React.CSSProperties}
    >
      <div>{label}</div>
      {count > 1 && <div className="text-2xs opacity-80">×{count}</div>}
    </motion.div>
  );
}
```

---

### 5. Badge Component

**Purpose:** Display hand values, status indicators, outcomes  
**Color Variants:** neutral, success, error, warning, brand

**File Location:** `components/ui/Badge.tsx` *(to be created)*

**Implementation Pattern:**
```tsx
interface BadgeProps {
  variant?: 'neutral' | 'success' | 'error' | 'warning' | 'brand';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Badge({
  variant = 'neutral',
  size = 'md',
  children,
}: BadgeProps) {
  const variantClasses = {
    neutral: 'bg-bg-tertiary text-text-secondary',
    success: 'bg-success/20 text-success',
    error: 'bg-error/20 text-error',
    warning: 'bg-warning/20 text-warning',
    brand: 'bg-amber-500/20 text-amber-400',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full font-semibold
        ${variantClasses[variant]}
        ${sizeClasses[size]}
      `}
    >
      {children}
    </span>
  );
}
```

---

### 6. Modal Component

**Purpose:** Insurance prompts, wallet connection, game messages  
**States:** closed, opening, open, closing

**File Location:** `components/ui/Modal.tsx` *(to be created)*

**Implementation Pattern:**
```tsx
interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  closeButton?: boolean;
  actions?: React.ReactNode;
}

export function Modal({
  isOpen,
  title,
  children,
  onClose,
  closeButton = true,
  actions,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.88, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.88, y: 16, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="
              fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              bg-bg-secondary border border-border-default
              rounded-2xl shadow-modal z-50
              max-w-md w-full mx-4
              p-8
            "
          >
            {title && (
              <h2 className="text-2xl font-display font-bold text-text-bright mb-4">
                {title}
              </h2>
            )}

            <div className="mb-6">{children}</div>

            <div className="flex gap-4">
              {actions || (
                <>
                  <Button variant="secondary" onClick={onClose} className="flex-1">
                    Cancel
                  </Button>
                  <Button variant="primary" className="flex-1">
                    Confirm
                  </Button>
                </>
              )}
            </div>

            {closeButton && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-bg-tertiary rounded-lg transition"
              >
                ✕
              </button>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

## Design System Implementation Checklist

For each new component, ensure:

### Styling
- [ ] Uses Tailwind CSS exclusively (no inline styles)
- [ ] Applies design tokens via CSS variables
- [ ] Follows color palette (no hardcoded colors except in tokens)
- [ ] Proper shadow levels from `--shadow-*` tokens
- [ ] Border radius from `--radius-*` scale
- [ ] Spacing from `--space-*` multiples

### Interaction
- [ ] Hover states smooth and intentional
- [ ] Focus states visible with 2px outline
- [ ] Active/pressed states clear
- [ ] Disabled states reduce opacity + prevent interaction
- [ ] Transitions use `--duration-*` and `--ease-*` tokens

### Animation
- [ ] Complex animations use Framer Motion
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Performance: GPU-accelerated (transform, opacity only)
- [ ] Timings use `--duration-*` tokens

### Accessibility
- [ ] Semantic HTML (buttons are `<button>`, links are `<a>`)
- [ ] ARIA labels for icon-only buttons
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Color contrast ≥4.5:1 for text, ≥3:1 for graphics
- [ ] Touch targets ≥44px minimum

### Responsive
- [ ] Mobile-first approach (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- [ ] Text size adjusts for readability on small screens
- [ ] Spacing scales appropriately
- [ ] Touch-friendly hit zones on mobile

---

## Token Usage Reference

### Button Styling Example
```tsx
// Primary button
className="
  px-4 py-2 rounded-lg
  bg-amber-500 hover:bg-amber-600
  text-white font-display font-semibold
  shadow-button
  transition-all duration-200
  active:scale-95
  disabled:opacity-50
"

// Equivalent using tokens
className="
  px-[var(--space-4)] py-[var(--space-2)] rounded-[var(--radius-lg)]
  bg-[var(--color-amber-500)] hover:bg-[var(--color-amber-600)]
  text-[var(--color-white)]
  shadow-[var(--shadow-button)]
  transition-all [duration:var(--duration-base)] [ease:var(--ease-in-out)]
  active:scale-95
  disabled:opacity-50
"
```

### Card Styling Example
```tsx
className="
  p-6 rounded-xl
  bg-bg-secondary border border-border-default
  shadow-card
  transition-all duration-200
  hover:shadow-card-hover hover:-translate-y-1
"
```

---

## File Structure

```
src/components/
├── ui/
│   ├── Button.tsx          ← Core action button
│   ├── Input.tsx           ← Text/number input
│   ├── Badge.tsx           ← Status/value badges
│   ├── Modal.tsx           ← Overlay dialogs
│   └── Chip.tsx            ← Betting chips (EXISTS)
├── game/
│   ├── Card.tsx            ← Game cards (EXISTS)
│   ├── Hand.tsx            ← Player hand container (EXISTS)
│   └── Table.tsx           ← Main game layout (EXISTS)
├── controls/
│   ├── ActionButtons.tsx   ← Hit/Stand/Double (EXISTS)
│   ├── BetControls.tsx     ← Chip selection (EXISTS)
│   └── InsurancePrompt.tsx ← Insurance modal (EXISTS)
├── layout/
│   ├── Header.tsx          ← Game header (EXISTS)
│   └── StatusBar.tsx       ← Player info bar (EXISTS)
└── wallet/
    ├── WalletButton.tsx    ← Connect button (EXISTS)
    └── WalletModal.tsx     ← Connection flow (EXISTS)
```

---

## Next Steps

1. **Audit Existing Components** — Ensure Card, Chip, Hand, Table, etc. follow design system
2. **Create Missing Components** — Button, Input, Badge, Modal with full documentation
3. **Test Responsive Design** — Verify all components work on mobile/tablet/desktop
4. **Accessibility Pass** — WCAG 2.1 AA compliance for all interactive elements
5. **Animation Performance** — Profile animations, ensure 60fps on mobile
6. **Documentation** — Component Storybook or visual guide

---

**Version:** 1.0  
**Last Updated:** 2026-04-26  
**Maintained By:** AI Design System Team
