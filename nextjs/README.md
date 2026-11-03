# Eddyter + Next.js

A minimal Next.js (App Router) app showing how to add the [Eddyter](https://eddyter.com) AI rich text editor with the [`eddyter`](https://www.npmjs.com/package/eddyter) package.

## Setup

```bash
npm install
cp .env.example .env.local   # paste your API key
npm run dev
```

Open http://localhost:3000. Get an API key from [eddyter.com/user/license-key](https://eddyter.com/user/license-key).

## The whole integration

The editor uses the DOM, so it lives in a client component.

`app/Editor.tsx`:

```tsx
"use client";

import { ConfigurableEditorWithAuth, EditorProvider } from "eddyter";

export default function Editor() {
  const apiKey = process.env.NEXT_PUBLIC_EDITOR_API_KEY as string;

  return (
    <EditorProvider>
      <ConfigurableEditorWithAuth
        apiKey={apiKey}
        onChange={(html) => console.log(html)}
        initialContent="<p>Start writing...</p>"
      />
    </EditorProvider>
  );
}
```

`app/layout.tsx` imports the stylesheet once for the whole app:

```tsx
import "eddyter/style.css";
```

`app/page.tsx` stays a server component and renders `<Editor />`.

## Pages Router

The same component works in the Pages Router. If you see hydration or `window is not defined` errors, load it with `next/dynamic` and `ssr: false`:

```tsx
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../components/Editor"), { ssr: false });
```

## More

- [React & Next.js guide](https://github.com/EddyterAI/eddyter/blob/main/docs/react.md): all props, theming, version history and more
- [Full documentation](https://eddyter.com/docs)
