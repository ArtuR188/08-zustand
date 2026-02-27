import { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api/notes';
import NotePreview from '@/components/NotePreview/NotePreview';
import css from './page.module.css';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const note = await fetchNoteById(id);
    return {
      title: `${note.title} | NoteHub`,
      description: note.content?.slice(0, 160) ?? `View note "${note.title}" on NoteHub.`,
      openGraph: {
        title: `${note.title} | NoteHub`,
        description: note.content?.slice(0, 160) ?? `View note "${note.title}" on NoteHub.`,
        url: `https://your-app.vercel.app/notes/${id}`,
        images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' }],
      },
    };
  } catch {
    return { title: 'Note Not Found | NoteHub' };
  }
}

export default async function NoteDetailPage({ params }: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <main className={css.main}>
      <div className={css.container}>
        <NotePreview note={note} />
      </div>
    </main>
  );
}
