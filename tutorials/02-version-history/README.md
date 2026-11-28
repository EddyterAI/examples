# Tutorial 2: Version history

Code from the Eddyter video tutorial "Add Version History to Your Editor: Save, Preview and Restore". It builds on [Tutorial 1](../01-nextjs-quickstart).

A small notes app: each note is a document, and each note keeps its own version history.

## Run it

```bash
npm install
cp .env.example .env.local   # paste your Eddyter API key
npm run dev
```

Open http://localhost:3000, write a note and click **Save**. Then open the history button in the editor toolbar.

Version history is included from the Pro plan onwards (Pro, AI BYOK and AI Pro Managed).

## How it works

1. **`documentId`** (`components/NoteEditor.tsx`): the editor gets the note's id, so each note has its own history. Use your record's primary key and pass the same id every time that document opens.
2. **`saveVersion()`**: the Save button first stores the note in "your backend" (`lib/notes.ts`, which uses localStorage here), then calls `editorRef.current.saveVersion({ documentId: saved.id })`. For a new note, this captures version 1.
3. **Preview and restore** are built into the editor's history panel. Restoring keeps a snapshot of the content you had before, so nothing is lost.

Saving unchanged content does not create a duplicate version. To name a version from code, pass a label: `saveVersion({ documentId, label: 'Before review' })`.

Replace `lib/notes.ts` with your own API or database calls in a real app.
