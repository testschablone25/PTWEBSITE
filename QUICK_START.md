# PT Website - Quick Start Guide

## 🚀 Getting Started

### 1. Start the Development Server

```bash
cd "F:\OpenCode\PT WEBSITE\pt-website"
npm run dev
```

The website will be available at **http://localhost:3000**

### 2. What You'll See

The home page showcases the complete design system with:
- **Sticky header** with locale switch (EN/DE)
- **Hero section** with large typography and highlighted text
- **About/Philosophy sections** with 2-column grid
- **Services section** with 3-column card grid
- **Highlight styles** demonstrating all 3 variants
- **CTA section** with call-to-action
- **Footer** with logo tiles and links

---

## 🎨 Design System Overview

### Color Palette

#### Light Mode
- Background: Beige (#F4F1EB)
- Text: Warm dark gray (#4E4B45)
- Accent: Muted warm (#C7B299)

#### Dark Mode
Automatically switches based on system preference

### Typography
- **Headings**: Oswald (bold, condensed)
- **Body**: DM Sans (clean, geometric)

### Components Available

```tsx
import { Container, Header, Footer, Section, BlockText, Highlight } from "@/components";
```

---

## 📦 Using Components

### Container
```tsx
<Container size="lg">
  Content
</Container>
```
Sizes: `sm`, `md`, `lg`, `xl`, `full`

### Header
```tsx
<Header logo="PT" showLocaleSwitch={true} />
```

### Footer
```tsx
<Footer logo="PT" />
```

### Section
```tsx
<Section size="lg">
  Content
</Section>
```
Sizes: `sm` (py-8), `md` (py-16), `lg` (py-24), `xl` (py-32)

### BlockText
```tsx
<BlockText size="lg">
  Your paragraph text here
</BlockText>
```
Sizes: `sm`, `md`, `lg`

### Highlight
```tsx
<Highlight variant="subtle">highlighted text</Highlight>
```
Variants: `subtle`, `solid`, `outline`

---

## 🎯 Common Patterns

### Page Structure
```tsx
export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-color-background">
      <Header logo="PT" />
      <main className="flex-1">
        <Section size="xl">
          <Container>
            {/* Your content */}
          </Container>
        </Section>
      </main>
      <Footer logo="PT" />
    </div>
  );
}
```

### Hero Section
```tsx
<Section size="xl">
  <Container>
    <h1 className="mb-8 font-bold tracking-tight">
      Crafting <Highlight variant="subtle">digital experiences</Highlight>
    </h1>
    <BlockText size="lg">
      Your hero text
    </BlockText>
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
      <BlockText size="sm">{item.desc}</BlockText>
    </div>
  ))}
</div>
```

### Divider
```tsx
<div className="w-full border-t border-color-border" />
```

---

## 🌍 Locale Switching

The locale switcher in the header is a UI component. To implement actual localization:

### 1. Install next-intl (already installed)
```bash
npm install next-intl
```

### 2. Set up locale files
```
messages/
├── en.json
└── de.json
```

### 3. Configure i18n in `next.config.ts`
```typescript
const nextConfig: NextConfig = = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};
```

### 4. Update the locale switcher
Modify `src/components/Header.tsx` to use `useLocale` and `useRouter` from `next-intl`.

---

## 📄 Creating New Pages

### Example: About Page

Create `src/app/about/page.tsx`:

```tsx
import { Header, Footer, Container, Section, BlockText } from "@/components";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-color-background">
      <Header logo="PT" />
      <main className="flex-1">
        <Section size="xl">
          <Container>
            <h1 className="mb-8 font-bold tracking-tight">About</h1>
            <BlockText size="lg">
              About content here...
            </BlockText>
          </Container>
        </Section>
      </main>
      <Footer logo="PT" />
    </div>
  );
}
```

---

## 🎨 Styling Guidelines

### Colors
Use semantic color variables:
- `bg-color-background` - page background
- `text-color-foreground` - primary text
- `text-color-foreground-muted` - secondary text
- `bg-color-accent` - accent backgrounds
- `border-color-border` - borders and dividers

### Spacing
- Use Section component for vertical spacing
- Use Container for max-width
- Grid gap: `gap-6` (cards), `gap-12` (columns)

### Typography
- Headings: Use `h1`, `h2`, `h3` (styled in globals.css)
- Body text: Use `BlockText` component
- Emphasis: Use `Highlight` component

### Borders
- All borders use `border-color-border`
- Square edges only (no rounded corners)

---

## 🌙 Dark Mode

Dark mode automatically follows system preference. To manually control:

### 1. Create a theme context (future)
2. Add toggle button in header
3. Update CSS variables based on state

---

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 📚 Documentation

- **`DESIGN_SYSTEM.md`** - Complete design system documentation
- **`IMPLEMENTATION_SUMMARY.md`** - Implementation details and checklist
- **`QUICK_START.md`** - This file

---

## ✅ Build Verification

The implementation maintains a green build:
- No new dependencies added
- No existing features removed
- All TypeScript types properly defined
- Tailwind CSS v4 properly configured

---

## 🎯 Key Features Delivered

✅ Beige background (#F4F1EB)
✅ Text color #4E4B45
✅ Square edges (no rounded corners)
✅ Block text styling
✅ Highlighted words component (3 variants)
✅ Sticky header with locale switch
✅ Footer with logo tiles
✅ Dark mode support (system preference)
✅ Clean editorial feel
✅ Works within Next.js 16 app router
✅ Tailwind utilities + globals.css variables
✅ No new dependencies
✅ No features removed

---

## 📞 Getting Help

1. **Review the demo page** - `src/app/page.tsx` has comprehensive examples
2. **Check component files** - Each component has inline TypeScript types
3. **Read design system docs** - `DESIGN_SYSTEM.md` for detailed patterns

---

**Ready to build! 🚀**
