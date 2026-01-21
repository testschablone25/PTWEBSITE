# PT Website Design System

## Overview

A clean editorial design system with brutalist influences, built for the PT website MVP. The system emphasizes square edges, warm beige tones, and structured typography.

## Design Philosophy

**Purpose**: Professional portfolio website with a clean, structured editorial feel
**Tone**: Brutalist editorial - raw materials, grid-based layouts, bold typography
**Differentiation**: Warm beige palette creates warmth while maintaining structural precision

## Color System

### Light Mode (Default)
- Background: `#F4F1EB` (Warm beige)
- Foreground: `#4E4B45` (Warm dark gray)
- Accent: `#C7B299` (Muted warm accent)
- Highlight: `#F0E6D8` (Soft beige highlight)
- Border: `#D4D0CA` (Subtle border)

### Dark Mode
- Background: `#1A1A1A` (Deep charcoal)
- Foreground: `#E8E4DE` (Warm white)
- Accent: `#8B7355` (Muted warm brown)
- Highlight: `#3A342D` (Dark warm brown)
- Border: `#3A342D` (Dark border)

## Typography

### Display Font
- **Font**: Oswald
- **Usage**: Headings (h1-h6)
- **Weights**: 300, 400, 500, 600, 700
- **Characteristics**: Bold, condensed, strong editorial presence
- **Why**: Creates dramatic impact while maintaining readability

### Body Font
- **Font**: DM Sans
- **Usage**: Body text, paragraphs
- **Weights**: 400, 500, 700
- **Characteristics**: Clean, geometric, warm
- **Why**: Provides excellent readability with subtle character

### Type Scale
- H1: clamp(2rem, 5vw, 4rem) - 32px to 64px
- H2: clamp(1.75rem, 4vw, 3rem) - 28px to 48px
- H3: clamp(1.5rem, 3vw, 2.25rem) - 24px to 36px

## Components

### Container
Responsive max-width wrapper with consistent padding.

```tsx
<Container size="lg">
  {/* content */}
</Container>
```

**Sizes**: `sm`, `md`, `lg`, `xl`, `full`

### Header
Sticky navigation with locale switch.

```tsx
<Header logo="PT" showLocaleSwitch={true} />
```

**Features**:
- Sticky positioning (stays at top on scroll)
- Locale switcher (EN/DE) with uppercase styling
- Backdrop blur for modern feel
- Square edges throughout

### Footer
Footer with logo tiles grid.

```tsx
<Footer logo="PT" />
```

**Features**:
- 3-column logo tiles with hover effects
- Social/legal links
- Copyright notice
- Responsive layout (stacks on mobile)

### Section
Consistent vertical spacing for page sections.

```tsx
<Section size="lg">
  {/* content */}
</Section>
```

**Sizes**: `sm` (py-8), `md` (py-16), `lg` (py-24), `xl` (py-32)

### BlockText
Styled paragraph component for body text.

```tsx
<BlockText size="lg">
  Your content here
</BlockText>
```

**Sizes**: `sm`, `md`, `lg`

### Highlight
Text highlighting with three variants.

```tsx
<Highlight variant="subtle">highlighted text</Highlight>
```

**Variants**:
- `subtle`: Soft background highlight (default)
- `solid`: Bold background highlight
- `outline`: Underline highlight

## Design Patterns

### Square Edges
All components use minimal to no border-radius:
- Buttons: Square edges
- Cards: Square edges
- Inputs: Square edges
- No rounded corners anywhere

### Block Text
- Generous line-height (1.6)
- Large font sizes for readability
- Ample spacing between paragraphs
- Creates editorial, magazine-like feel

### Highlighted Words
Used strategically for emphasis and visual interest:
- Highlight keywords and phrases
- Use consistently throughout the site
- Avoid overuse (1-2 highlights per paragraph max)
- Creates visual rhythm in long-form content

### Dividers
Use consistent borders to create separation:
```tsx
<div className="w-full border-t border-color-border" />
```

### Grid Layouts
Example 2-column layout:
```tsx
<div className="grid gap-12 sm:grid-cols-2">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

Example 3-column layout:
```tsx
<div className="grid gap-6 sm:grid-cols-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Dark Mode

The design system automatically respects the user's system color scheme preference. Dark mode can be toggled by changing the system preference.

### Color Mapping
Light mode colors automatically map to dark mode variants:
- `color-background` → `color-dark-background`
- `color-foreground` → `color-dark-foreground`
- `color-accent` → `color-dark-accent`
- `color-border` → `color-dark-border`

### Custom Dark Mode Implementation (Future)
To add manual dark mode toggle, you'll need to:
1. Add a theme provider context
2. Store theme preference in localStorage
3. Update CSS variables dynamically
4. Add a toggle button in the header

## Usage Examples

### Hero Section
```tsx
<Section size="xl">
  <Container>
    <div className="max-w-3xl">
      <h1 className="mb-8 font-bold tracking-tight">
        Crafting <Highlight variant="subtle">digital experiences</Highlight>
      </h1>
      <BlockText size="lg">
        Your hero text here
      </BlockText>
    </div>
  </Container>
</Section>
```

### Card Grid
```tsx
<div className="grid gap-6 sm:grid-cols-3">
  {items.map((item) => (
    <div
      key={item.id}
      className="border border-color-border p-6 hover:border-color-accent"
    >
      <h3 className="mb-3 font-medium">{item.title}</h3>
      <BlockText size="sm">{item.description}</BlockText>
    </div>
  ))}
</div>
```

### Call to Action
```tsx
<a
  href="#"
  className="inline-block px-8 py-4 bg-color-foreground text-color-background font-medium hover:bg-color-accent"
>
  Get in Touch
</a>
```

## Tailwind CSS v4 Integration

The design system uses Tailwind CSS v4's new `@theme` directive for custom colors:

```css
:root {
  --color-background: #F4F1EB;
  --color-foreground: #4E4B45;
  /* ... other colors */
}
```

These are automatically available as utility classes: `bg-color-background`, `text-color-foreground`, etc.

## Accessibility

- All interactive elements have visible focus states
- Color contrast meets WCAG AA standards
- Semantic HTML elements used throughout
- Keyboard navigation support
- Focus-visible outlines for clarity

## Future Enhancements

- Manual dark mode toggle with smooth transitions
- Animation system for page transitions and micro-interactions
- Form components with validation styles
- Modal/dialog components
- Navigation menu component (mobile responsive)
- Breadcrumb component
- Pagination component
- Loading states and skeletons
- Error boundary components

## File Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and theme variables
│   ├── layout.tsx           # Root layout with font configuration
│   └── page.tsx             # Home page demonstrating components
└── components/
    ├── Container.tsx        # Max-width wrapper
    ├── Header.tsx           # Sticky navigation with locale switch
    ├── Footer.tsx           # Footer with logo tiles
    ├── Section.tsx          # Section spacing
    ├── BlockText.tsx        # Styled paragraphs
    ├── Highlight.tsx        # Text highlights
    └── index.ts             # Component exports
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Display Font**: Oswald (Google Fonts)
- **Body Font**: DM Sans (Google Fonts)

## Design Decisions

### Why These Fonts?
- **Oswald**: Bold, condensed creates strong editorial presence without feeling generic. The condensed nature is perfect for large headings and creates visual impact.
- **DM Sans**: Provides excellent readability while maintaining geometric precision. It's warm and approachable, complementing the harsh aesthetic of Oswald.

### Why This Color Palette?
- The warm beige (#F4F1EB) creates a sophisticated, organic feel
- Muted tones prevent the design from feeling sterile
- High contrast text ensures accessibility
- Works beautifully in both light and dark modes

### Why Square Edges?
- Aligns with brutalist design principles
- Creates intentional, purposeful feel
- Removes "soft" UI tropes for something more distinctive
- Feels more raw and authentic

## Credits

Design inspired by editorial brutalist design principles, with references to clean, structured portfolio sites. The system balances modern web standards with timeless design fundamentals.
