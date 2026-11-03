# Eddyter Examples

Runnable starter projects showing how to drop [**Eddyter**](https://eddyter.com) — the AI-native rich text editor SDK — into your stack in **10 minutes**.

> **Looking for the editor itself?** It ships as the [**`eddyter`**](https://www.npmjs.com/package/eddyter) npm package for React, with official packages for other frameworks. Grab a free API key from [eddyter.com/user/license-key](https://eddyter.com/user/license-key).

## Available examples

| Framework | Package | Folder |
|---|---|---|
| **React** (Vite) | [`eddyter`](https://www.npmjs.com/package/eddyter) | [`react/`](./react) |
| **Next.js** (App Router) | [`eddyter`](https://www.npmjs.com/package/eddyter) | [`nextjs/`](./nextjs) |
| **Vue 3** | [`@eddyter/vue`](https://www.npmjs.com/package/@eddyter/vue) | [`vue/`](./vue) |
| **Svelte 5** | [`@eddyter/svelte`](https://www.npmjs.com/package/@eddyter/svelte) | [`svelte/`](./svelte) |
| **Angular** (17–21) | [`@eddyter/angular`](https://www.npmjs.com/package/@eddyter/angular) | [`angular/`](./angular) |
| **Vanilla JS** (bundler or `<script>` tag) | [`@eddyter/core`](https://www.npmjs.com/package/@eddyter/core) | [`vanilla-js/`](./vanilla-js) |
| **React Native** (Expo dev build) | [`@eddyter/react-native`](https://www.npmjs.com/package/@eddyter/react-native) | [`react-native/`](./react-native) |
| **PHP / Laravel** | [`eddyter/laravel`](https://github.com/EddyterAI/laravel) (Composer) | Coming soon |

## Quick start

```bash
git clone https://github.com/EddyterAI/examples.git
cd examples/react        # or nextjs, vue, svelte, angular, vanilla-js, react-native
npm install
cp .env.example .env     # paste your Eddyter API key
npm run dev
```

Each folder's README covers its own setup. Next.js uses `.env.local`, Angular reads the key from `src/environments/environment.ts`, and React Native needs a native build.

## What you get out of the box

Every example wires the editor with the same set of features available on your plan:

- ✍️  Rich text editing (headings, lists, tables, code blocks)
- 🤖 AI rewrite, summarize, translate, change tone
- 🎨 AI image generation
- ⚡ Inline autocomplete
- 🎙 Voice → text transcription
- 💬 Inline comments

## Need an API key?

[Sign up free at eddyter.com](https://eddyter.com) — you get credits to play with on the spot. No credit card required.

## Resources

- 📘 [Documentation](https://eddyter.com/docs)
- 🎮 [Live demo](https://eddyter.com)
- 🐛 [Report a bug](https://github.com/EddyterAI/eddyter/issues)
- 💬 [Discord community](https://discord.com/channels/1457444571104542803/1457444572081819690)

## Contributing

Built an integration we should showcase? Open a PR adding it under a clearly-named folder, or post a link in [Discussions](https://github.com/EddyterAI/eddyter/discussions). Integrations for other stacks are especially welcome.
