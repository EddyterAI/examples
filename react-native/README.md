# Eddyter + React Native

A minimal Expo (TypeScript) app showing how to add the [Eddyter](https://eddyter.com) AI rich text editor with [`@eddyter/react-native`](https://www.npmjs.com/package/@eddyter/react-native). The editor runs inside a `WebView` and talks to React Native through a bridge.

> **Expo Go won't work.** The SDK needs native modules (`react-native-webview`, `react-native-device-info`, `react-native-blob-util`, `react-native-share`), so this example uses an Expo **development build**. Bare React Native 0.72+ works too.

## Setup

1. Get an API key from [eddyter.com/user/license-key](https://eddyter.com/user/license-key) and **bind it to this app's bundle ID**. Native apps have no web domain, so the license is tied to the iOS bundle ID / Android `applicationId`. This example uses `com.example.eddyter` (see `app.json`); change it to your own.
2. Install and configure:

   ```bash
   npm install
   cp .env.example .env       # paste your API key
   ```

3. Build and run on a device or emulator:

   ```bash
   npm run android            # or: npm run ios  (macOS + Xcode)
   ```

   After the first native build, `npm start` starts the dev server for the installed app.

## The whole integration

`App.tsx`:

```tsx
import { useRef, useState } from "react";
import { Eddyter, type EddyterRef } from "@eddyter/react-native";

export default function App() {
  const editorRef = useRef<EddyterRef>(null);
  const [html, setHtml] = useState("<p>Start writing...</p>");

  return (
    <Eddyter
      ref={editorRef}
      apiKey={process.env.EXPO_PUBLIC_EDDYTER_API_KEY ?? ""}
      user={{ id: "1", name: "Sam" }}
      initialContent={html}
      onChange={setHtml}
      onError={(error) => console.warn("Eddyter:", error)}
      containerStyle={{ flex: 1 }}
    />
  );
}
```

No stylesheet import is needed.

## Things to know

- **Content:** passing `onChange` output back into `initialContent` never reloads the editor. To switch documents, change the component `key`.
- **Ref methods:** `getContent()`, `reload()`, and `saveVersion(options?)` for version history (on plans that include it).
- **No `customVerifyKey`:** key verification always goes through Eddyter, using the bundle ID.
- **Permissions:** speech-to-text needs microphone access. `app.json` already sets `NSMicrophoneUsageDescription` (iOS) and `RECORD_AUDIO` + `MODIFY_AUDIO_SETTINGS` (Android).
- **Network:** the editor loads on first launch and the key is validated online.

## More

- [React Native guide](https://github.com/EddyterAI/eddyter/blob/main/docs/react-native.md)
- [Full documentation](https://eddyter.com/docs)
