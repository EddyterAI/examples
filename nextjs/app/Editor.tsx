"use client";

import {
  ConfigurableEditorWithAuth,
  EditorProvider,
} from "eddyter";

export default function Editor() {
  const apiKey = process.env.NEXT_PUBLIC_EDITOR_API_KEY as string;
  const handleContentChange = (html: string) => {
    console.log("Eddyter content (HTML):", html);
  };

  return (
    <EditorProvider>
      <ConfigurableEditorWithAuth
        apiKey={apiKey}
        onChange={handleContentChange}
        initialContent="<p>Start writing... try selecting text and clicking <strong>Ask AI</strong>.</p>"
      />
    </EditorProvider>
  );
}
