# framer-ds-test

React design system for use in Framer via code components. Source lives in a **public GitHub repo**; Framer imports the built bundle via [esm.sh GitHub URLs](https://esm.sh/#docs).

## Component structure

Each component lives in its own folder with two files:

```
badge/
  index.jsx         # Design system component
  framer.index.jsx  # Framer code component wrapper (copy into Framer)
```

Import URLs in `framer.index.jsx` are synced from [`src/framer/urls.js`](src/framer/urls.js) via `pnpm sync:framer`.

## Components

| Component | Path | Description |
|-----------|------|-------------|
| `Button` | `src/components/atoms/button/` | Call-to-action button with Primary/Secondary variants |
| `Badge` | `src/components/atoms/badge/` | Badge with Light/Dark variants |
| `Media` | `src/components/molecules/media/` | Image, video, or YouTube embed |
| `ProjectCard` | `src/components/molecules/project-card/` | Single project card |
| `PageHero` | `src/components/organisms/page-hero/` | Full-width hero with title, description, button slot, media slot |
| `ProjectList` | `src/components/organisms/project-list/` | Projects carousel with static fixture data |

## Develop locally

Preview all components in the Vite dev app:

```bash
pnpm dev
```

Regenerate boneyard skeleton snapshots (with dev server running):

```bash
pnpm build:boneyard
```

## Release to Framer

Build the library, sync import URLs, commit `dist/`, and push to GitHub:

```bash
pnpm release
git add dist src/framer src/components/**/framer.index.jsx src/framer.d.ts
git commit -m "Release v0.1.1"
git push origin main
```

Outputs in `dist/`:

- `framer-ds-test.js` — ESM bundle (React/ReactDOM are external)
- `style.css` — compiled Tailwind styles

Pin a git tag to lock Framer imports to a specific release:

```bash
git tag v0.1.1
git push origin v0.1.1
```

Then set `"framer": { "ref": "v0.1.1" }` in `package.json` and run `pnpm sync:framer`.

## Use in Framer

Each component folder contains a `framer.index.jsx` that imports from esm.sh via GitHub:

```jsx
import "https://esm.sh/gh/maximilianberndt/framer-ds-test@main/dist/style.css";
import { Badge } from "https://esm.sh/gh/maximilianberndt/framer-ds-test@main/dist/framer-ds-test.js?external=react,react-dom";
```

### Setup steps

1. Make the GitHub repo public and push a build (`pnpm release` + commit `dist/`)
2. Copy `framer.index.jsx` from a component folder into a Framer code file (Assets → Code → +)
3. Drop the code component onto the canvas

After changes, run `pnpm release`, commit, and push — Framer picks up updates from the `@main` ref (or your pinned tag).

### CSS note

Styles only apply when the wrapper imports `style.css`. If the esm.sh CSS import fails in Framer, inject a `<link>` tag pointing at the same GitHub path via esm.sh instead.
