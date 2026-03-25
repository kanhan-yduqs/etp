# Design System Specification: Observatório Nacional ETP

## 1. Overview & Creative North Star: "The Digital Curator"

The Creative North Star for this design system is **The Digital Curator**. Unlike standard dashboards that overwhelm with "noise," this system treats data as a high-end editorial exhibit. It moves away from the "software" look toward a "publication" feel—where every data point is intentional, and white space is used as a structural element rather than just a gap.

To break the "template" look, we employ **Intentional Asymmetry**. Instead of rigid 12-column grids, we use staggered layouts where text blocks and data visualizations overlap subtly, creating a sense of depth and sophisticated motion. This system prioritizes the "Protagonist Data" approach: if a number is important, it is granted the scale of a headline.

---

## 2. Colors & Surface Philosophy

The palette is anchored in `#0D3B4C` (Deep Navy/Teal), providing a foundation of institutional trust. All combinations are strictly WCAG 2.1 AA compliant to ensure accessibility for all users.

### The "No-Line" Rule
**Prohibition:** 1px solid borders are strictly prohibited for sectioning or grouping. 
**Implementation:** Boundaries must be defined solely through background color shifts. Use `surface-container-low` for secondary sections and `surface-container-high` for highlighted data clusters. The eye should perceive structure through tonal contrast, not "caging" lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine, heavy-weight paper.
- **Base:** `surface` (#fcf9f6)
- **Primary Content Area:** `surface-container-low` (#f6f3f1)
- **Interactive/Raised Cards:** `surface-container-lowest` (#ffffff)
- **Deep Utility/Navigation:** `surface-container-highest` (#e5e2e0)

### The Glass & Gradient Rule
For floating elements (modals, persistent filters, or mobile navigation), use **Glassmorphism**. Apply `surface_variant` at 70% opacity with a `24px` backdrop-blur. This ensures the background data "bleeds through," maintaining the context of the research. main CTAs should utilize a subtle linear gradient from `primary` (#002532) to `primary_container` (#0d3b4c) at a 135° angle to add "visual soul" and professional polish.

---

## 3. Typography: Editorial Authority

The typography pairs the geometric precision of **Plus Jakarta Sans** for high-impact displays with the utilitarian clarity of **Inter** for data-heavy reading.

| Level | Token | Font | Size | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Plus Jakarta Sans | 3.5rem | High-impact data points/Hero stats |
| **Headline** | `headline-md` | Plus Jakarta Sans | 1.75rem | Section intros with editorial tone |
| **Title** | `title-lg` | Inter | 1.375rem | Component headers |
| **Body** | `body-md` | Inter | 0.875rem | Primary research text & analysis |
| **Label** | `label-sm` | Inter | 0.6875rem | Metadata, Sparkline captions, Micro-copy |

**Editorial Note:** To achieve the Anthropic-inspired look, use `display-lg` for "Big Numbers" (e.g., "81k") with a tighter letter-spacing (-0.04em) to create a monolithic, authoritative presence.

---

## 4. Elevation & Depth: Tonal Layering

We reject traditional shadows in favor of **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` card placed on a `surface-container-low` section creates a natural, soft lift.
- **Ambient Shadows:** Only use shadows for "Floating" elements (e.g., a bottom-sheet on mobile). Shadow color must be `on-surface` at 6% opacity with a `32px` blur and `8px` Y-offset.
- **The "Ghost Border" Fallback:** If a border is required for high-risk data separation, use the `outline-variant` token at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components: Data as Protagonist

### Big Numbers & Sparklines
Instead of large, complex charts, use "Big Numbers" paired with a minimalist `secondary` (#2d6195) sparkline. 
- **Style:** Sparklines should have a stroke-width of `2px` with no fill, positioned immediately below the `display-lg` typography.

### Progressive Disclosure (Collapsibles)
Use for methodology or detailed breakdowns.
- **Style:** No borders. Use a `surface-container-low` background for the header and transition to `surface` for the expanded body. Use a simple `24px` chevron in `primary`.

### Navigation
- **Mobile-First:** A bottom "Dock" using Glassmorphism. Icons in `on_surface_variant`, transitioning to `primary` when active.
- **Desktop:** A high-offset left rail with ample whitespace. No vertical divider line; use a `surface-container` background shift to separate the nav from the main stage.

### Cards & Lists
**Rule:** Forbid the use of divider lines.
- Use the **Spacing Scale** `8` (2.75rem) to separate list items. 
- Use `surface-container-highest` for the background of an "active" or "hovered" list item to signify selection.

### Buttons
- **Primary:** Gradient-filled (`primary` to `primary_container`), `0.375rem` (md) corner radius.
- **Tertiary (Ghost):** No border. `primary` text color. On hover, background shifts to `surface-container-high`.

---

## 6. Do's and Don'ts

### Do
- **Do** treat "Big Numbers" as the most important visual element on the page.
- **Do** use `tertiary` (#172600) and its variants for "Success" or "Positive Growth" data—it provides a sophisticated alternative to "Standard Green."
- **Do** use asymmetric margins (e.g., 10% left, 20% right) on desktop to create an editorial layout.

### Don't
- **Don't** use 1px solid lines to separate content. Let the whitespace and background colors do the work.
- **Don't** use "Drop Shadows" with high opacity or black/gray colors. Use tinted ambient glows.
- **Don't** crowd the interface. If a screen feels full, increase the spacing scale by two increments.
- **Don't** use rounded corners larger than `0.75rem` (xl). This system is sophisticated and architectural, not "bubbly."

---

## 7. Spacing & Rhythm
The system uses a soft 0.7rem-based grid (Scale `2`). Always prioritize **Vertical Whitespace** over horizontal density to ensure the "Editorial" feel. When in doubt, increase padding using the `16` (5.5rem) or `20` (7rem) tokens to create "breathing rooms" between major data clusters.