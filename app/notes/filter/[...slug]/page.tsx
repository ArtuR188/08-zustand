import { Metadata } from 'next';
import { Suspense } from 'react';
import NotesClient from '@/components/NotesClient/NotesClient';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.[0] === 'all' ? 'All' : (slug?.[0] ?? 'All');

  return {
    title: `Notes: ${filter} | NoteHub`,
    description: `Browse notes filtered by: ${filter}.`,
    openGraph: {
      title: `Notes: ${filter} | NoteHub`,
      description: `Browse notes filtered by: ${filter}.`,
      url: `https://your-app.vercel.app/notes/filter/${slug?.join('/')}`,
      images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' }],
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0];

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NotesClient tag={tag} />
    </Suspense>
  );
}
