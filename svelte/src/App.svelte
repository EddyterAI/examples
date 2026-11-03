<script lang="ts">
  import Eddyter from "@eddyter/svelte";

  const apiKey = import.meta.env.VITE_EDDYTER_API_KEY ?? "";
  let content = $state(
    "<p>Start writing... try selecting text and clicking <strong>Ask AI</strong>.</p>",
  );

  const currentUser = { id: "user-123", name: "Jane Doe", email: "jane@example.com" };
</script>

<main style="max-width: 900px; margin: 2rem auto; padding: 0 1rem">
  <h1>Eddyter + Svelte</h1>
  <p>Plug-and-play AI rich text editor. Start typing below.</p>

  <Eddyter
    {apiKey}
    value={content}
    user={currentUser}
    mode="edit"
    toolbar={{ mode: "static" }}
    mentionUserList={["Alice", "Bob", "Charlie"]}
    onChange={(html) => (content = html)}
    onReady={() => console.log("Editor ready")}
    onAuthSuccess={() => console.log("Authenticated")}
    onAuthError={(err) => console.error("Editor auth failed:", err)}
  />

  <details style="margin-top: 1.5rem">
    <summary>Current HTML</summary>
    <pre style="white-space: pre-wrap">{content}</pre>
  </details>
</main>
