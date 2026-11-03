# Eddyter + Vanilla JS

Two ways to add the [Eddyter](https://eddyter.com) AI rich text editor without a framework, using [`@eddyter/core`](https://www.npmjs.com/package/@eddyter/core):

| File | How it loads |
|---|---|
| `index.html` + `src/main.ts` | npm package through a bundler (Vite here; Webpack, esbuild or Parcel work too) |
| `cdn.html` | A single `<script>` tag, with no npm and no build step |

Get an API key from [eddyter.com/user/license-key](https://eddyter.com/user/license-key).

## Option 1: bundler

```bash
npm install
cp .env.example .env       # paste your API key
npm run dev
```

Open http://localhost:5173.

```ts
import { init } from "@eddyter/core";
import "@eddyter/core/style.css";

const instance = init({
  container: "#editor", // CSS selector or HTMLElement
  apiKey: import.meta.env.VITE_EDDYTER_API_KEY,
  mode: "edit",
  initialContent: "<p>Start writing...</p>",
  onChange: (html) => console.log(html),
  onReady: () => console.log("Ready"),
  onAuthError: (err) => console.error(err),
});

instance.update({ darkMode: true }); // change options without remounting
// instance.destroy();               // clean up when removing the editor
```

## Option 2: script tag

Open `cdn.html`, replace `YOUR_API_KEY`, and open the file in a browser (or serve the folder with any static server). The bundle injects its own stylesheet.

```html
<div id="editor"></div>
<script src="https://unpkg.com/@eddyter/core@1.0.4/dist/editor.iife.js"></script>
<script>
  const instance = Eddyter.init({
    container: "#editor",
    apiKey: "YOUR_API_KEY",
    initialContent: "<p>Start writing...</p>",
    onChange: (html) => console.log(html),
  });
</script>
```

Pin the version in production, as above. This is also how to use Eddyter from server-rendered stacks such as Django, Rails or WordPress. Laravel has a dedicated package, [`eddyter/laravel`](https://github.com/EddyterAI/laravel).

## More

- [Vanilla JS guide](https://github.com/EddyterAI/eddyter/blob/main/docs/vanilla-js.md)
- [Full documentation](https://eddyter.com/docs)
