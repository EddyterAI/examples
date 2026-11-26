# Tutorial 1: Add Eddyter to a Next.js app

The finished code from the Eddyter tutorial video **"Add an AI rich text editor to Next.js"**.

## Run it

```bash
npm install
cp .env.example .env.local   # paste your API key
npm run dev
```

Open http://localhost:3000. Get a free API key at [eddyter.com/user/license-key](https://eddyter.com/user/license-key).

## What's inside

| File | What it does |
| --- | --- |
| `app/layout.tsx` | Imports `eddyter/style.css` once for the whole app |
| `components/Editor.tsx` | The editor in a `'use client'` component, with its HTML kept in React state |
| `app/page.tsx` | Renders `<Editor />` on the page |
| `.env.example` | Where your `NEXT_PUBLIC_EDITOR_API_KEY` goes (copy to `.env.local`, never commit it) |

Tested with Next.js 16.4, React 19 and eddyter 1.4.27.

## More

- [Documentation](https://eddyter.com/docs)
- [The minimal Next.js example](../../nextjs)
