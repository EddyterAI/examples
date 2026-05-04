# Eddyter + React

A minimal Vite + React + TypeScript app showing how to drop the [Eddyter](https://eddyter.com) AI rich text editor into a React project.

## Setup

```bash
npm install
cp .env.example .env       # paste your API key from eddyter.com
npm run dev
```

Open http://localhost:5173.

> **Get an API key**: sign up at [eddyter.com](https://eddyter.com), then grab your key from **License Keys** in your dashboard.

## The whole integration

`src/App.tsx`:

```tsx
import {
  ConfigurableEditorWithAuth,
  EditorProvider,
  defaultEditorConfig,
} from "eddyter";
import "eddyter/style.css";

const currentUser = {
  id: "user-123",
  name: "Akash",
  email: "akash@example.com",
};

export default function App() {
  const apiKey = import.meta.env.VITE_EDDYTER_API_KEY as string;

  return (
    <EditorProvider
      defaultFontFamilies={defaultEditorConfig.defaultFontFamilies}
      currentUser={currentUser}
    >
      <ConfigurableEditorWithAuth
        apiKey={apiKey}
        onChange={(html) => console.log(html)}
        initialContent="<p>Start writing...</p>"
      />
    </EditorProvider>
  );
}
```

That's it. AI rewrite, image generation, transcription, autocomplete, and inline comments are all on by default. Configure features through your plan in the [eddyter.com](https://eddyter.com) dashboard.

## What the props do

### `EditorProvider`

| Prop | Type | Notes |
|---|---|---|
| `defaultFontFamilies` | `string[]` | Pass `defaultEditorConfig.defaultFontFamilies` for sane defaults. |
| `currentUser` | `{ id, name, email, avatar? }` | Required for the inline comments feature. |

### `ConfigurableEditorWithAuth`

| Prop | Type | Notes |
|---|---|---|
| `apiKey` | `string` | Your Eddyter API key. **Required.** |
| `onChange` | `(html: string) => void` | Fires on every edit. The argument is the editor's HTML output — persist to your backend on a debounce. |
| `initialContent` | `string` | Initial HTML to load into the editor. |
| `mentionUserList` | `string[]` | Names that appear when typing `@` in the editor. |
| `onAuthSuccess` | `() => void` | Fires once your API key is verified. |
| `onAuthError` | `(error: Error) => void` | Fires when key verification fails (invalid key, expired plan, etc.). |
| `customVerifyKey` | `async (key) => { success, message }` | Optional — verify the key through your own backend instead of calling Eddyter directly. |
| `className` | `string` | Applied to the editor's outer container. |

## Persisting content

`onChange` gives you the editor's HTML string. Send it to your API on a debounce:

```tsx
import { useDebouncedCallback } from "use-debounce"; // or your own debounce

const persist = useDebouncedCallback(async (html: string) => {
  await fetch("/api/posts/123", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ content: html }),
  });
}, 800);

<ConfigurableEditorWithAuth apiKey={apiKey} onChange={persist} />;
```

## Using in Next.js

The same `eddyter` package works in Next.js (App Router or Pages). Because the editor uses `contenteditable` and DOM-only APIs, mark the page as a client component and dynamic-import the editor with `ssr: false`:

```tsx
"use client";

import dynamic from "next/dynamic";
import "eddyter/style.css";

const Editor = dynamic(
  () => import("./Editor").then((m) => m.Editor),
  { ssr: false },
);

export default function Page() {
  return <Editor />;
}
```

A dedicated Next.js example is on the roadmap.

## Other frameworks

Eddyter currently ships as a React component. **Vue and Svelte wrappers are planned** — follow [`eddyter` on npm](https://www.npmjs.com/package/eddyter) or [join Discord](https://discord.com/channels/1457444571104542803/1457444572081819690) for release notifications.

## Need help?

- 📘 [Documentation](https://eddyter.com/docs)
- 🐛 [Report a bug](https://github.com/EddyterAI/eddyter/issues/new?template=bug_report.yml)
- 💬 [Discord](https://discord.com/channels/1457444571104542803/1457444572081819690)
