# Eddyter + Angular

A minimal Angular 21 standalone app showing how to add the [Eddyter](https://eddyter.com) AI rich text editor with [`@eddyter/angular`](https://www.npmjs.com/package/@eddyter/angular).

> `@eddyter/angular` supports Angular 17 to 21.

## Setup

```bash
npm install
```

Paste your API key from [eddyter.com/user/license-key](https://eddyter.com/user/license-key) into `src/environments/environment.ts`, then:

```bash
npm start
```

Open http://localhost:4200.

## The whole integration

`src/styles.css` (the stylesheet must be global):

```css
@import '@eddyter/angular/styles.css';
```

`src/app/app.ts`:

```ts
import { Component } from '@angular/core';
import { Eddyter } from '@eddyter/angular';

@Component({
  selector: 'app-root',
  imports: [Eddyter],
  template: `
    <eddyter
      [apiKey]="apiKey"
      [(value)]="content"
      mode="edit"
      [toolbar]="{ mode: 'static' }"
      (ready)="onReady()"
      (authSuccess)="onAuthSuccess()"
      (authError)="onAuthError($event)"
    />
  `,
})
export class App {
  apiKey = 'YOUR_API_KEY';
  content = '<p>Start writing...</p>';
  onReady() {}
  onAuthSuccess() {}
  onAuthError(message: string) { console.error(message); }
}
```

Bind content with `[(value)]`. `<eddyter>` also implements `ControlValueAccessor` for `[(ngModel)]` and reactive forms, but in `@eddyter/angular` 1.0.3 the form value arrives after the editor has mounted, so the **initial** content is not shown. Use `[(value)]` until that is fixed.

## Inputs and outputs

| Input | Notes |
|---|---|
| `apiKey` | Your Eddyter API key. **Required.** |
| `value` | The editor HTML; use `[(value)]` for two-way binding. |
| `user` | `{ id, name, email?, avatar? }`, used by inline comments. |
| `mode` | `'edit'` (default) or `'preview'`. |
| `toolbar` | For example `{ mode: 'static' }`. |
| `mentionUserList` | Names offered when typing `@`. |
| `darkMode` | Boolean. |
| `customVerifyKey` | `async (key) => ({ success, message })` to verify the key through your own backend. |

Outputs: `valueChange`, `contentChange` (`{ html, meta }`), `ready`, `focus`, `blur`, `heightChange`, `authSuccess`, `authError` (`string`), `previewClick`.

## Bundle budget

The editor adds roughly 7 MB (about 1.5 MB transferred) to the initial bundle, so `angular.json` raises the production `initial` budget from Angular's default 1 MB to 10 MB. Without that, `ng build` fails.

## More

- [Angular guide](https://github.com/EddyterAI/eddyter/blob/main/docs/angular.md)
- [Full documentation](https://eddyter.com/docs)
