<script setup lang="ts">
import { ref } from "vue";
import { Eddyter } from "@eddyter/vue";

const apiKey = import.meta.env.VITE_EDDYTER_API_KEY ?? "";
const content = ref(
  "<p>Start writing... try selecting text and clicking <strong>Ask AI</strong>.</p>",
);

const currentUser = { id: "user-123", name: "Jane Doe", email: "jane@example.com" };
</script>

<template>
  <main style="max-width: 900px; margin: 2rem auto; padding: 0 1rem">
    <h1>Eddyter + Vue</h1>
    <p>Plug-and-play AI rich text editor. Start typing below.</p>

    <Eddyter
      v-model="content"
      :api-key="apiKey"
      :user="currentUser"
      mode="edit"
      :toolbar="{ mode: 'static' }"
      :mention-user-list="['Alice', 'Bob', 'Charlie']"
      @ready="() => console.log('Editor ready')"
      @auth-success="() => console.log('Authenticated')"
      @auth-error="(err: string) => console.error('Editor auth failed:', err)"
    />

    <details style="margin-top: 1.5rem">
      <summary>Current HTML (v-model)</summary>
      <pre style="white-space: pre-wrap">{{ content }}</pre>
    </details>
  </main>
</template>
