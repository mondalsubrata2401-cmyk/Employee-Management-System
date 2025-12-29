# Quick Color Reference

## Common Patterns

### Backgrounds
```jsx
// Main background
className="bg-[rgb(var(--background))]"

// Card/Panel background
className="bg-[rgb(var(--card))]"

// Subtle background (hover states)
className="bg-[rgb(var(--muted))]"

// Accent background
className="bg-[rgb(var(--accent))]"
```

### Text Colors
```jsx
// Primary text
className="text-[rgb(var(--foreground))]"
className="text-[rgb(var(--text-primary))]"

// Secondary text
className="text-[rgb(var(--text-secondary))]"

// Muted/tertiary text
className="text-[rgb(var(--muted-foreground))]"
className="text-[rgb(var(--text-tertiary))]"
```

### Borders
```jsx
// Standard border
className="border-[rgb(var(--border))]"

// Input border
className="border-[rgb(var(--input))]"
```

### Interactive Elements
```jsx
// Primary button
className="bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgb(var(--primary-hover))]"

// Focus ring
className="focus:ring-[rgb(var(--ring))]"

// Hover states
className="hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--text-primary))]"
```

### Status Indicators
```jsx
// Success
className="bg-[rgb(var(--success-bg))] text-[rgb(var(--success))]"

// Warning
className="bg-[rgb(var(--warning-bg))] text-[rgb(var(--warning))]"

// Error
className="bg-[rgb(var(--error-bg))] text-[rgb(var(--error))]"

// Info
className="bg-[rgb(var(--info-bg))] text-[rgb(var(--info))]"
```

## Changing Theme Colors

Edit `Frontend/src/index.css`:

```css
:root {
  /* Example: Change to a green theme */
  --primary: 34 197 94; /* emerald-500 */
  --primary-foreground: 255 255 255;
  --primary-hover: 22 163 74; /* emerald-600 */
  
  --accent: 236 253 245; /* emerald-50 */
  --accent-foreground: 34 197 94; /* emerald-500 */
  
  --ring: 34 197 94; /* emerald-500 */
}

.dark {
  /* Dark mode green theme */
  --primary: 52 211 153; /* emerald-400 */
  --primary-hover: 110 231 183; /* emerald-300 */
  --accent-foreground: 110 231 183; /* emerald-300 */
}
```

## RGB to Tailwind Conversion

Common Tailwind colors in RGB format:

### Slate
- slate-50: `248 250 252`
- slate-100: `241 245 249`
- slate-200: `226 232 240`
- slate-300: `203 213 225`
- slate-400: `148 163 184`
- slate-500: `100 116 139`
- slate-600: `71 85 105`
- slate-700: `51 65 85`
- slate-800: `30 41 59`
- slate-900: `15 23 42`

### Indigo
- indigo-50: `238 242 255`
- indigo-400: `129 140 248`
- indigo-500: `99 102 241`
- indigo-600: `79 70 229`
- indigo-700: `67 56 202`

### Emerald
- emerald-50: `236 253 245`
- emerald-500: `34 197 94`
- emerald-600: `22 163 74`
- emerald-700: `21 128 61`

### Amber
- amber-50: `255 251 235`
- amber-500: `245 158 11`
- amber-600: `217 119 6`

### Rose
- rose-50: `255 241 242`
- rose-500: `239 68 68`
- rose-600: `225 29 72`

### Blue
- blue-50: `239 246 255`
- blue-500: `59 130 246`
- blue-600: `37 99 235`
