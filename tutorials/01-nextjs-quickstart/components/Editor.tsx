'use client';
import { useState } from 'react';
import { ConfigurableEditorWithAuth, EditorProvider, defaultEditorConfig } from 'eddyter';

export default function Editor() {
  const [html, setHtml] = useState('<p>Start writing...</p>');
  return (
    <EditorProvider defaultFontFamilies={defaultEditorConfig.defaultFontFamilies} currentUser={{ id: 'u1', name: 'Demo User', email: 'demo@example.com' }}>
      <ConfigurableEditorWithAuth
        apiKey={process.env.NEXT_PUBLIC_EDITOR_API_KEY!}
        initialContent={html}
        onChange={setHtml}
        onAuthSuccess={() => console.log('Editor ready!')}
        onAuthError={(e) => console.error('Auth failed:', e)}
      />
    </EditorProvider>
  );
}
