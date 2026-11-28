'use client';
import { useEffect, useState } from 'react';
import NoteEditor from '../components/NoteEditor';
import { loadNotes, type Note } from '../lib/notes';

export default function Page() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  useEffect(() => setNotes(loadNotes()), []);
  const active = notes.find((n) => n.id === activeId) ?? null;

  return (
    <main style={{ display: 'flex', gap: 24, maxWidth: 1200, margin: '40px auto' }}>
      <aside style={{ width: 220 }}>
        <h1>Notes</h1>
        <button onClick={() => setActiveId(null)}>+ New note</button>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notes.map((n) => (
            <li key={n.id}>
              <button onClick={() => setActiveId(n.id)} style={{ fontWeight: n.id === activeId ? 700 : 400 }}>{n.title} ({n.id})</button>
            </li>
          ))}
        </ul>
      </aside>
      <div style={{ flex: 1 }}>
        <NoteEditor
          key={activeId ?? 'new-note'}
          note={active}
          onSaved={(saved) => { setNotes(loadNotes()); setActiveId(saved.id); }}
        />
      </div>
    </main>
  );
}
