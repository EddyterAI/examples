import {
  ConfigurableEditorWithAuth,
  EditorProvider,
  defaultEditorConfig,
} from "eddyter";
import "eddyter/style.css";

const currentUser = {
  id: "user-123",
  name: "Akash",
  email: "akash@example.com",
};

export default function App() {
  const apiKey = import.meta.env.VITE_EDDYTER_API_KEY as string;

  const handleContentChange = (html: string) => {
    // Persist to your backend, or push to component state
    console.log("Editor content (HTML):", html);
  };

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Eddyter + React</h1>
      <p>Plug-and-play AI rich text editor. Start typing below.</p>

      <EditorProvider
        defaultFontFamilies={defaultEditorConfig.defaultFontFamilies}
        currentUser={currentUser}
      >
        <ConfigurableEditorWithAuth
          apiKey={apiKey}
          onChange={handleContentChange}
          initialContent="<p>Start writing... try selecting text and clicking <strong>Ask AI</strong>.</p>"
          mentionUserList={["Alice", "Bob", "Charlie"]}
          onAuthSuccess={() => console.log("Editor ready")}
          onAuthError={(err) => console.error("Editor auth failed:", err)}
        />
      </EditorProvider>
    </div>
  );
}
