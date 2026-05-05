import Editor from "./Editor";

export default function Home() {
  return (
    <main style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Eddyter + Next.js</h1>
      <p style={{ marginTop: 0 }}>AI-native rich text editor. Start typing below.</p>
      <div style={{ marginTop: "1.5rem" }}>
        <Editor />
      </div>
    </main>
  );
}
