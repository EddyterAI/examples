// A tiny stand-in for "your backend": notes live in localStorage.
// In a real app, replace these with calls to your API or database.
export type Note = { id: string; title: string; content: string };

const KEY = 'eddyter-tutorial-notes';

export function loadNotes(): Note[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? '[]');
  } catch {
    return [];
  }
}

// Creates the note when it has no id yet, otherwise updates it. Returns the saved record.
export async function saveNote(input: { id?: string; title: string; content: string }): Promise<Note> {
  const notes = loadNotes();
  const saved: Note = { id: input.id ?? `note_${crypto.randomUUID().slice(0, 8)}`, title: input.title, content: input.content };
  const next = notes.some((n) => n.id === saved.id) ? notes.map((n) => (n.id === saved.id ? saved : n)) : [...notes, saved];
  window.localStorage.setItem(KEY, JSON.stringify(next));
  return saved;
}
