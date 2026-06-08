# framer-ds-test

React design system for use in Framer via code components. Keep the source in a **private GitHub repo**, publish the built bundle to **public npm** on version tags, and import in Framer via esm.sh.

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

## Build the library

```bash
pnpm build:lib
```

Outputs to `dist/`:

- `framer-ds-test.js` — ESM bundle (React/ReactDOM are peer deps)
- `style.css` — compiled Tailwind styles

## Publish (push to GitHub)

Publishing is automated via GitHub Actions when you push a version tag. The repo can stay private; only the built npm package is public.

### One-time setup

1. Create an npm account and ensure the package name `framer-ds-test` is available (or rename in `package.json`)
2. Create an npm **Automation** or **Publish** token
3. Add it to your GitHub repo as a secret: **Settings → Secrets → `NPM_TOKEN`**

### Release a new version

```bash
pnpm version patch   # bumps version, syncs framer.index.jsx URLs, commits
git push origin main --tags
```

GitHub Actions will build `dist/` and run `npm publish` automatically when a `v*` tag is pushed.

You can also bump manually:

```bash
pnpm sync:framer     # sync URLs from package.json version
git tag v0.1.0
git push origin main --tags
```

### CI

Every push to `main` runs lint and `build:lib` (no publish). See [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## Use in Framer

Each component folder contains a `framer.index.jsx` that imports the published package via esm.sh:

```jsx
import "https://esm.sh/framer-ds-test@0.1.0/style.css";
import { Badge } from "https://esm.sh/framer-ds-test@0.1.0?external=react,react-dom";
```

### Setup steps

1. Push a version tag so GitHub Actions publishes to npm (see above)
2. Copy `framer.index.jsx` from a component folder into a Framer code file (Assets → Code → +)
3. Drop the code component onto the canvas

After a new release, re-copy updated wrappers or update the version in your Framer code files.

### CSS note

Styles only apply when the wrapper imports `style.css`. If the esm.sh CSS import fails in Framer, inject a `<link>` tag pointing at `https://unpkg.com/framer-ds-test@VERSION/dist/style.css` instead.
