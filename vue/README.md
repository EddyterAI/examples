# Eddyter + Vue

A minimal Vite + Vue 3 + TypeScript app showing how to add the [Eddyter](https://eddyter.com) AI rich text editor with [`@eddyter/vue`](https://www.npmjs.com/package/@eddyter/vue).

## Setup

```bash
npm install
cp .env.example .env       # paste your API key
npm run dev
```

Open http://localhost:5173. Get an API key from [eddyter.com/user/license-key](https://eddyter.com/user/license-key).

## The whole integration

`src/App.vue`:

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Eddyter } from "@eddyter/vue";

const apiKey = import.meta.env.VITE_EDDYTER_API_KEY ?? "";
const content = ref("<p>Start writing...</p>");
</script>

<template>
  <Eddyter
    v-model="content"
    :api-key="apiKey"
    mode="edit"
    :toolbar="{ mode: 'static' }"
    @ready="() => console.log('ready')"
    @auth-success="() => console.log('auth ok')"
    @auth-error="(e: string) => console.error(e)"
  />
</template>
```

The component imports the editor stylesheet for you. If styles are missing in a production build, add `import "@eddyter/core/style.css";` to `src/main.ts`.

## Props and events

| Prop | Notes |
|---|---|
| `v-model` | The editor HTML. |
| `api-key` | Your Eddyter API key. **Required.** |
| `user` | `{ id, name, email?, avatar? }`, used by inline comments. |
| `mode` | `"edit"` (default) or `"preview"`. |
| `toolbar` | For example `{ mode: "static" }`. |
| `mention-user-list` | Names offered when typing `@`. |
| `dark-mode` | Boolean. |
| `custom-verify-key` | `async (key) => ({ success, message })` to verify the key through your own backend. |

Events: `update:modelValue`, `change` (`html, meta`), `ready`, `focus`, `blur`, `height-change`, `auth-success`, `auth-error` (`message: string`), `preview-click`.

Use a template ref to call `getInstance()`, or `saveVersion()` if your plan includes version history.

## TypeScript note

`@eddyter/vue` 1.0.4 doesn't ship type declarations yet, so [`src/eddyter-vue.d.ts`](src/eddyter-vue.d.ts) declares the module and `vue-tsc` can build. Plain JavaScript projects don't need it.

## More

- [Vue guide](https://github.com/EddyterAI/eddyter/blob/main/docs/vue.md)
- [Full documentation](https://eddyter.com/docs)
