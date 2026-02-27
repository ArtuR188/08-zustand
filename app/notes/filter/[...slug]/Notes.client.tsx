'use client';
import NotesClient from '@/components/NotesClient/NotesClient';

export default function NotesClientWrapper({ tag }: { tag: string }) {
  return <NotesClient tag={tag} />;
}