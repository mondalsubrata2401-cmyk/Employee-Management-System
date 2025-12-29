# Theme System Guide

## Overview
This project uses a CSS variable-based theming system similar to shadcn/ui, allowing easy customization and dark mode support.

## Color Palette Structure

All colors are defined as CSS variables in `src/index.css` using RGB values without the `rgb()` wrapper. This allows for easy opacity modifications using Tailwind's opacity utilities.

### Usage in Components

```jsx
// Use CSS variables with rgb() wrapper
className="bg-[rgb(var(--background))]"
className="text-[rgb(var(--foreground))]"
className="border-[rgb(var(--border))]"

// With opacity
className="bg-[rgb(var(--primary))]/50"  // 50% opacity
```

## Available Color Variables

### Background & Foreground
- `--background` - Main background color
- `--foreground` - Main text color

### Card
- `--card` - Card background
- `--card-foreground` - Card text color

### Primary (Brand Color)
- `--primary` - Primary brand color
- `--primary-foreground` - Text on primary color
- `--primary-hover` - Primary hover state

### Secondary
- `--secondary` - Secondary background
- `--secondary-foreground` - Secondary text

### Muted
- `--muted` - Muted background (subtle)
- `--muted-foreground` - Muted text

### Accent
- `--accent` - Accent background
- `--accent-foreground` - Accent text

### Border & Input
- `--border` - Border color
- `--input` - Input border color
- `--ring` - Focus ring color

### Status Colors
- `--success` / `--success-foreground` / `--success-bg`
- `--warning` / `--warning-foreground` / `--warning-bg`
- `--error` / `--error-foreground` / `--error-bg`
- `--info` / `--info-foreground` / `--info-bg`

### Text Hierarchy
- `--text-primary` - Primary text
- `--text-secondary` - Secondary text
- `--text-tertiary` - Tertiary/muted text

### Component-Specific
- `--sidebar-bg` / `--sidebar-foreground` / `--sidebar-active` / `--sidebar-active-foreground`
- `--navbar-bg` / `--navbar-foreground`
- `--scrollbar-track` / `--scrollbar-thumb` / `--scrollbar-thumb-hover`

## Customizing Colors

To change the color scheme, edit the CSS variables in `src/index.css`:

```css
:root {
  /* Change primary brand color */
  --primary: 79 70 229; /* indigo-600 */
  
  /* Change to blue */
  --primary: 37 99 235; /* blue-600 */
}

.dark {
  /* Customize dark mode colors */
  --primary: 99 102 241; /* indigo-500 */
}
```

## Dark Mode

Dark mode is controlled by the `.dark` class on the root element. The theme toggle in the Navbar automatically:
1. Adds/removes the `.dark` class
2. Saves preference to localStorage
3. Respects system preference on first load

### Using Dark Mode in Custom Components

The theme system automatically handles dark mode through CSS variables. No additional logic needed in components.

## Best Practices

1. **Always use CSS variables** instead of hardcoded colors
2. **Use semantic names** (e.g., `--primary` instead of `--blue-500`)
3. **Test both themes** when adding new components
4. **Maintain contrast ratios** for accessibility
5. **Use the status colors** for consistent feedback (success, warning, error, info)

## Converting Existing Components

Replace hardcoded Tailwind colors with CSS variables:

```jsx
// Before
className="bg-white text-slate-900 border-slate-200"

// After
className="bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] border-[rgb(var(--border))]"
```

## RGB Format

Colors are stored as RGB triplets (e.g., `255 255 255`) to allow:
- Easy opacity modifications: `rgb(var(--primary) / 0.5)`
- Compatibility with Tailwind's color system
- Better performance than HSL conversions
