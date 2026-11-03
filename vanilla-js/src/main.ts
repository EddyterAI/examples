import { init } from "@eddyter/core";
import "@eddyter/core/style.css";

const apiKey = import.meta.env.VITE_EDDYTER_API_KEY ?? "";

const instance = init({
  container: "#editor", // CSS selector or HTMLElement
  apiKey,
  mode: "edit",
  user: { id: "user-123", name: "Jane Doe", email: "jane@example.com" },
  mentionUserList: ["Alice", "Bob", "Charlie"],
  initialContent:
    "<p>Start writing... try selecting text and clicking <strong>Ask AI</strong>.</p>",
  onChange: (html) => console.log("Editor content (HTML):", html),
  onReady: () => console.log("Editor ready"),
  onAuthSuccess: () => console.log("Authenticated"),
  onAuthError: (err) => console.error("Editor auth failed:", err),
});

// Change options later without remounting the editor.
let darkMode = false;
document.getElementById("toggle-dark")?.addEventListener("click", () => {
  darkMode = !darkMode;
  instance.update({ darkMode });
});

// Call instance.destroy() when you remove the editor from the page.
