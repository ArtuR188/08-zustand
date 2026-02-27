'use client';
import NotePreview from '@/components/NotePreview/NotePreview';
import { Note } from '@/types/note';

export default function NotePreviewClient({ note }: { note: Note }) {
  return <NotePreview note={note} />;
}