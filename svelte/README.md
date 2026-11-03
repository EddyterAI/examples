# Eddyter + Svelte

A minimal Vite + Svelte 5 + TypeScript app showing how to add the [Eddyter](https://eddyter.com) AI rich text editor with [`@eddyter/svelte`](https://www.npmjs.com/package/@eddyter/svelte). The same component works in SvelteKit.

## Setup

```bash
npm install
cp .env.example .env       # paste your API key
npm run dev
```

Open http://localhost:5173. Get an API key from [eddyter.com/user/license-key](https://eddyter.com/user/license-key).

## The whole integration

`src/App.svelte`:

```svelte
<script lang="ts">
  import Eddyter from "@eddyter/svelte";

  const apiKey = import.meta.env.VITE_EDDYTER_API_KEY ?? "";
  let content = $state("<p>Start writing...</p>");
</script>

<Eddyter
  {apiKey}
  value={content}
  mode="edit"
  toolbar={{ mode: "static" }}
  onChange={(html) => (content = html)}
  onReady={() => console.log("ready")}
  onAuthSuccess={() => console.log("auth ok")}
  onAuthError={(err) => console.error(err)}
/>
```

The component imports the editor stylesheet for you. If styles are missing in a production build, add `import "@eddyter/core/style.css";`.

## Props

| Prop | Notes |
|---|---|
| `apiKey` | Your Eddyter API key. **Required.** |
| `value` | Initial / current HTML. |
| `onChange` | `(html, meta?) => void`, fires on every edit. |
| `user` | `{ id, name, email?, avatar? }`, used by inline comments. |
| `mode` | `"edit"` (default) or `"preview"`. |
| `toolbar` | For example `{ mode: "static" }`. |
| `mentionUserList` | Names offered when typing `@`. |
| `darkMode` | Boolean. |
| `customVerifyKey` | `async (key) => ({ success, message })` to verify the key through your own backend. |
| `onReady`, `onAuthSuccess`, `onAuthError` | Lifecycle callbacks. `onAuthError` receives a message string. |

Use `bind:this` to call `getInstance()`, or `saveVersion()` if your plan includes version history.

In SvelteKit, render the editor only in the browser (for example inside `{#if browser}` with `browser` from `$app/environment`), because it needs the DOM.

## More

- [Svelte guide](https://github.com/EddyterAI/eddyter/blob/main/docs/svelte.md)
- [Full documentation](https://eddyter.com/docs)
