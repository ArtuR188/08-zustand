import type { Metadata } from 'next';
import css from './CreateNote.module.css';
import CreateNoteClient from './CreateNoteClient';

export const metadata: Metadata = {
  title: 'Create Note | NoteHub',
  description: 'Create a new note on NoteHub',
  openGraph: {
    title: 'Create Note | NoteHub',
    description: 'Create a new note on NoteHub',
    url: 'https://your-app.vercel.app/notes/action/create',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <CreateNoteClient />
      </div>
    </main>
  );
}