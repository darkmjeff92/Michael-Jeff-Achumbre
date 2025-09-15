# Responsive Design Documentation

**Michael Jeff Achumbre Portfolio - Extended Device Support**

This document outlines the responsive breakpoints added to extend the portfolio's device support.

---

## 📱 Device Support Added

Extended responsive support for additional device types while maintaining the original Lightning Design System.

### Breakpoints Added:

| Breakpoint | Min Width | Target Devices | CSS Prefix |
|------------|-----------|----------------|------------|
| **fold** | 280px | Fold phones, compact devices | `fold:` |
| **mobile** | 375px | Standard mobile devices | `xs:` |
| **tablet** | 900px | Tablet portrait mode | `tablet:` |
| **tablet-lg** | 1200px | Large tablets, small laptops | `tablet-lg:` |
| **ultra** | 2560px | 4K displays, ultra-wide monitors | `ultra:` |

### Implementation

Added custom CSS media queries in `src/app/globals.css` for the new breakpoints:

```css
@media (min-width: 280px) { /* fold devices */ }
@media (min-width: 375px) { /* mobile devices */ }
@media (min-width: 900px) { /* tablet portrait */ }
@media (min-width: 1200px) { /* large tablets */ }
@media (min-width: 2560px) { /* 4K displays */ }
```

### Usage

Components now scale across all device types:

```tsx
// Example: Responsive grid
<div className="grid grid-cols-1 tablet:grid-cols-2 tablet-lg:grid-cols-3 gap-4 tablet:gap-6">
  {/* Content scales from 1 column on mobile to 3 on large tablets */}
</div>

// Example: Responsive typography
<h1 className="fold:text-2xl text-4xl tablet:text-6xl ultra:text-9xl">
  {/* Text scales from small on fold devices to very large on 4K displays */}
</h1>
```

This enhancement ensures the portfolio works perfectly on any device while preserving the original design and Lightning theme.