# WebDesk

A hybrid portfolio that looks like a desktop: projects are folders, content opens in draggable windows.
Live at https://julieisobelle.github.io/ClaudeCodeTest/ (GitHub Pages, deployed from `main`, repo root).

## Stack

- Vanilla HTML, CSS and JavaScript only. No frameworks, no build step, no npm dependencies for the site itself.
- Fonts from Google Fonts (Space Grotesk, JetBrains Mono).

## Structure

```
index.html      Markup
css/style.css   Styles, design tokens on :root, dark mode, mobile layout
js/main.js      Interactions (typewriter, windows, dragging, icons, toast, clock)
```

## Naming conventions

- **camelCase for every name we choose:** JS variables and functions, CSS classes, ids, CSS custom properties and keyframes.
  - Classes: `windowBar`, `iconLabel`, `taskbarClock`
  - Variants: base class plus a camelCase variant class, e.g. `class="btn btnPrimary"`, `class="iconImg iconImgFolder"`
  - State classes toggled by JS: `isHidden`, `isVisible`, `isSelected`, `isDragged`
  - CSS variables: `--inkSoft`, `--accentInk`
- Exceptions, where HTML or CSS require otherwise:
  - CSS properties and `aria-*` attributes
  - `data-*` attributes stay kebab-case (`data-drag-handle`, read in JS as `dataset.dragHandle`)
- File and folder names: lowercase (kebab-case if more than one word), because GitHub Pages is case-sensitive.

## Patterns

- HTML provides hooks (ids, `data-*` attributes), JS toggles state classes, CSS handles all visuals. Avoid setting styles from JS except for positions while dragging.
- Colors, fonts and shadows come from the variables on `:root`; dark mode only redefines those variables.
- Use `<button>` for anything clickable that isn't a link, and keep `aria-*` labels on icon-only controls.
- Respect `prefers-reduced-motion` for any new animation.
- Keep the mobile layout (`max-width: 640px`) working for new features.

## Workflow

- Never commit directly to `main`. Work on a branch and open a pull request; the owner reviews and merges.
- Merging to `main` updates the live site.
- Before committing UI changes, open the page in a browser (Playwright/Chromium) at desktop and mobile widths, in light and dark mode, and check the console for errors.

## Working with the owner

- The owner writes code too and prefers to understand every change. Explain what changed and why, in plain language.
- When the owner asks for hints only, give guidance and pointers instead of writing the code.
