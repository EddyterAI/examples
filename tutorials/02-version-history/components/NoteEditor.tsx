'use client';
import { useRef, useState } from 'react';
import { ConfigurableEditorWithAuth, EditorProvider, defaultEditorConfig, type EddyterEditorHandle } from 'eddyter';
import { saveNote, type Note } from '../lib/notes';

export default function NoteEditor({ note, onSaved }: { note: Note | null; onSaved: (note: Note) => void }) {
  const editorRef = useRef<EddyterEditorHandle>(null);
  const [content, setContent] = useState(note?.content ?? '<p>Start writing...</p>');
  const [status, setStatus] = useState('');

  const handleSave = async () => {
    // 1) Save to your own backend first. For a new note, this is where its id is created.
    const saved = await saveNote({ id: note?.id, title: note?.title ?? 'New note', content });

    // 2) Then snapshot a version. Pass the id explicitly so a new note's first save becomes version 1.
    try {
      const outcome = await editorRef.current?.saveVersion({ documentId: saved.id });
      if (!outcome || 'skipped' in outcome) setStatus('Saved (version history is not active on this plan)');
      else if (outcome.deduped) setStatus('Saved (no changes since the last version)');
      else setStatus(`Saved as version ${outcome.version.versionNo}`);
    } catch (err) {
      console.error('Version save failed:', err); // the note itself is already saved
      setStatus('Saved (version not stored)');
    }
    onSaved(saved);
  };

  return (
    <section>
      <header style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>{note ? 'Edit note' : 'New note'}</h2>
        <button onClick={handleSave}>Save</button>
        <code>documentId: {note?.id ?? '(created on first save)'}</code>
        <span>{status}</span>
      </header>
      <EditorProvider defaultFontFamilies={defaultEditorConfig.defaultFontFamilies} currentUser={{ id: 'u1', name: 'Demo User', email: 'demo@example.com' }}>
        <ConfigurableEditorWithAuth
          key={note?.id ?? 'new-note'} // remount when switching notes
          ref={editorRef}
          apiKey={process.env.NEXT_PUBLIC_EDITOR_API_KEY!}
          documentId={note?.id}
          initialContent={content}
          onChange={setContent}
        />
      </EditorProvider>
    </section>
  );
}
