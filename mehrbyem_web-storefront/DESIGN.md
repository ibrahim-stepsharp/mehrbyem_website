# Design System Strategy: The Modern Heirloom

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Atelier."** 

In the context of premium Pakistani womenswear, we are not just building an e-commerce platform; we are creating a digital sanctuary that mirrors the tactile, artisanal experience of a high-end boutique. This system rejects the "template" look of standard retail. It embraces **Intentional Asymmetry** and **Editorial Breathing Room**. 

We move beyond the rigid grid by allowing imagery to overlap containers and using high-contrast typography scales that feel like a fashion editorial. The layout should feel "curated" rather than "calculated," using tonal depth to guide the user’s eye through the craftsmanship of the garments.

## 2. Colors & Tonal Architecture
The palette is rooted in Earth tones and soft florals, led by the primary accent of #d8b6b8.

*   **Primary (#72585a) & Primary Container (#d8b6b8):** These represent the core brand identity—the deep shade of aged rose and the soft, dusty hue of "Fae Blue." Use these to draw attention to high-value actions.
*   **The "No-Line" Rule:** We do not use 1px solid borders to define sections. Boundaries must be organic. Separate a product showcase from a story section by shifting from `surface` (#fbf9f8) to `surface-container-low` (#f5f3f2).
*   **Surface Hierarchy & Nesting:** Treat the UI as a series of stacked fine papers. 
    *   Base Layer: `surface`
    *   Secondary Content: `surface-container`
    *   Interactive Cards: `surface-container-low` placed on a `surface` background to create a "recessed" or "lifted" feel without artificial lines.
*   **The "Glass & Gradient" Rule:** For floating navigation or quick-buy overlays, use glassmorphism: `surface` color at 85% opacity with a 12px backdrop-blur. 
*   **Signature Textures:** For primary CTAs, do not use flat fills. Apply a subtle linear gradient from `primary` (#72585a) to `primary_container` (#d8b6b8) at a 45-degree angle. This adds "visual soul" and mimics the sheen of silk.

## 3. Typography
The typography is an interplay between the traditional (Noto Serif) and the functional (Inter).

*   **Display (Noto Serif):** Use `display-lg` and `display-md` for collection titles. These should often be center-aligned with generous tracking to convey luxury.
*   **Headline & Title (Noto Serif):** Use these for storytelling. The weight of Noto Serif provides the "artisanal" authority the brand requires.
*   **Body (Noto Serif):** Unlike standard apps, we use a serif for body text (`body-lg`) to maintain the editorial, high-end magazine feel.
*   **Labels (Inter):** All functional UI (buttons, price tags, filters) uses Inter. This provides a clean, modern contrast to the serif headings, ensuring the interface remains "high-tech" despite the "high-touch" aesthetic.

## 4. Elevation & Depth
We define hierarchy through **Tonal Layering** rather than structural shadows.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` (#ffffff) card sitting on a `surface-container` (#efedec) section creates a soft, natural lift.
*   **Ambient Shadows:** If an element must float (e.g., a modal), use an ultra-diffused shadow. 
    *   *Formula:* `0px 10px 30px rgba(27, 28, 27, 0.04)`. The shadow color is a low-opacity version of `on-surface` to mimic natural ambient light.
*   **The "Ghost Border" Fallback:** If accessibility requires a container definition, use the "Ghost Border": the `outline-variant` (#d3c3c3) token at 15% opacity. Never use 100% opaque borders.

## 5. Components

### Buttons
*   **Primary:** Background gradient (`primary` to `primary_container`), `on-primary` text, `0.25rem` (sm) corner radius. Use `label-md` (Inter) for the text to ensure legibility.
*   **Tertiary:** No background or border. Use `primary` text with a 1px underline that only appears on hover.

### Input Fields
*   **Style:** Minimalist. No enclosing box. Use a bottom-border only using `outline-variant`. 
*   **States:** On focus, the bottom border transitions to `primary` (#72585a) with a subtle `primary_container` glow.

### Cards & Lists
*   **The "No-Divider" Rule:** Forbid the use of divider lines. Separate list items using 16px or 24px of vertical white space from the spacing scale.
*   **Product Cards:** Use `surface-container-lowest` with a "Ghost Border" on hover. Images should have a `0.25rem` (sm) radius to look like trimmed fabric samples.

### Editorial Tooltips
*   Use `inverse-surface` with `inverse-on-surface` text. Keep corners sharp (`none` or `sm`) to maintain a high-fashion, "architectural" edge.

### Floating Action Navigation
*   For mobile, use a pill-shaped bottom nav (`full` roundedness) with a Glassmorphism effect and `surface-variant` icons.

## 6. Do's and Don'ts

### Do:
*   **Embrace Whitespace:** Treat it as a luxury material. The more space around an item, the more expensive it feels.
*   **Use Tonal Shifts:** Use `surface-container` tiers to group related items instead of boxes.
*   **Textural Overlays:** Allow Noto Serif `display` text to slightly overlap product imagery for a "Vogue" editorial style.

### Don't:
*   **No Pure Black:** Never use #000000. Use `on-surface` (#1b1c1b) for all "black" text to maintain softness.
*   **No Default Shadows:** Avoid the "drop shadow" look. If it looks like a standard web app, it’s too heavy.
*   **No High-Contrast Dividers:** Avoid using `outline` (#817474) at full opacity; it breaks the "Modern Heirloom" flow. Use `outline-variant` or whitespace instead.