# Design System Documentation: The Editorial Data-Stream

## 1. Overview & Creative North Star

This design system is engineered to transform raw educational data into a high-impact narrative experience. Moving away from the "dashboard-itis" of typical data platforms, our Creative North Star is **"The Editorial Data-Stream."**

We treat data not as a static resource, but as the protagonist of a story. This system breaks the "template" look by utilizing intentional asymmetry, expansive white space, and a sophisticated hierarchy of "surfaces" rather than lines. The goal is to provide a sense of institutional authority (The "Observatório") combined with modern, progressive storytelling (The "81k Interviews" inspiration). We prioritize **Progressive Disclosure**: only showing the user what they need, exactly when they need it, ensuring the UI never feels cluttered or overwhelming.

---

## 2. Colors & Surface Philosophy

The palette is rooted in a deep, trustworthy foundation with vibrant, data-driven accents. We rely on the Material Design token logic but apply it with an editorial eye.

### The "No-Line" Rule
Standard UI relies on 1px borders to separate content. **In this system, 1px solid borders for sectioning are prohibited.** Boundaries must be defined solely through background color shifts or subtle tonal transitions. 
- Use `surface-container-low` (#f5f4ec) against a `surface` (#fbfaf1) background to define a sidebar.
- Use `surface-container-highest` (#e4e3db) to highlight a specific data insight.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine paper. 
- **Base:** `surface` (#fbfaf1)
- **Nested Content:** `surface-container-low` (#f5f4ec)
- **Interactive Elements:** `surface-container-high` (#e9e8e0) or `surface-container-highest` (#e4e3db)

### The Glass & Gradient Rule
For hero sections or primary calls to action, use a subtle linear gradient from `primary` (#002532) to `primary_container` (#0d3b4c). For floating navigation or data tooltips, apply a **Glassmorphism** effect: use a semi-transparent version of the surface color with a `backdrop-blur` of 12px to 20px. This ensures the layout feels integrated and "airy."

---

## 3. Typography: The Voice of Authority

Typography is the backbone of our editorial style. We use a high-contrast scale to create rhythm and focus.

- **Headlines (Inter):** Headlines use the deep `primary` color. `display-lg` (3.5rem) should be used for singular, high-impact data points or section introductions.
- **Body (Inter):** Set in `on-surface-variant` (#41484c) to reduce eye strain and maintain a sophisticated, softer contrast than pure black.
- **Technical Meta-Data (Space Grotesk):** All labels, captions, and data-visualization numbers use Space Grotesk (`label-md`). This typeface provides a "technical" feel that reinforces the data-driven nature of the platform.

**Hierarchy Tip:** Always skip at least two sizes in the scale when placing text side-by-side to create "Visual Tension" (e.g., an `h1` next to `body-sm`).

---

## 4. Elevation & Depth

We convey hierarchy through **Tonal Layering** rather than traditional structural lines or heavy shadows.

- **The Layering Principle:** Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f5f4ec) section. This creates a soft, natural "lift."
- **Ambient Shadows:** Shadows are reserved only for "floating" elements like modals or dropdowns. They must be extra-diffused.
    - *Spec:* Blur: 32px, Y-Offset: 8px, Color: `on-surface` at 5% opacity. 
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at 20% opacity. Never use 100% opaque borders.

---

## 5. Components

### Big Numbers (Data Callouts)
The "Protagonist" of our UI. 
- **Style:** Use `display-lg` in `secondary` (#476800). 
- **Layout:** Pair with a `label-md` in `on-surface-variant` placed either directly above or with an asymmetrical 1.7rem (`spacing-5`) offset to the right.

### Cards & Lists
- **Rule:** Forbid divider lines. 
- **Execution:** Use `spacing-8` (2.75rem) of vertical white space to separate list items. Cards should have a `border-radius: xl` (0.75rem) and use background color shifts (`surface-container-low`) to define their boundaries.

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `on-primary` text, `border-radius: md`.
- **Secondary:** Transparent background, `primary` text, and a "Ghost Border" (outline-variant at 20%).
- **Interaction:** On hover, primary buttons should shift slightly in hue, not just brightness.

### Interactive Charts
- **Palette:** Use `secondary` (#476800), `tertiary` (#0d2335), and `on-secondary-container` (#4a6d00) for categorical data.
- **Interaction:** Use a `backdrop-blur` tooltip that appears on hover, displaying the data point with `label-md` typography.

### Input Fields
- **Style:** Minimalist. No four-sided boxes. Use a single bottom stroke using `outline-variant` (#c1c7cc).
- **Focus State:** Stroke changes to `primary` (#002532) with a thickness of 2px.

---

## 6. Do's and Don'ts

### Do:
- **Use Asymmetry:** Align a large headline to the left and a small data point to the far right with a massive gap in between.
- **Embrace White Space:** If a section feels "tight," double the spacing token (e.g., move from `spacing-10` to `spacing-20`).
- **Prioritize Legibility:** Ensure all text on colored backgrounds passes WCAG 2.1 AA using the provided `on-` color tokens.

### Don't:
- **Don't use 1px Dividers:** Use background color steps (Surface -> Surface Low) instead.
- **Don't use Pure Black:** Always use `primary` or `on-surface` to keep the palette feeling "premium" and tailored.
- **Don't Crowd the Data:** One major insight per screen "scroll" or section. Use progressive disclosure (e.g., "Click to expand details") to keep the initial view clean.

---

## 7. Token Reference Summary

| Token Category | Key Value | Usage |
| :--- | :--- | :--- |
| **Primary Color** | #002532 | Navigation, Headings, Primary Actions |
| **Accent Color** | #476800 | Key Data Highlights, Success States |
| **Base Surface** | #fbfaf1 | Main page background |
| **Container Surface**| #f5f4ec | Section backgrounds, card groupings |
| **Rounding (XL)** | 0.75rem | Main cards and data containers |
| **Spacing (Default)** | 1rem | Base unit for component internal padding |
| **Display Font** | Inter | Large headers and narrative text |
| **Data Font** | Space Grotesk | Numbers, labels, and technical data |