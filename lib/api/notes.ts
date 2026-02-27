import axios from 'axios';
import { Note, CreateNotePayload, NotesResponse } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes(params?: {
  tag?: string;
  search?: string;
  page?: number;
  perPage?: number;
}): Promise<NotesResponse> {
  const { data } = await api.get('/notes', { params });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get(`/notes/${id}`);
  return data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const { data } = await api.post('/notes', payload);
  return data;
}

export async function deleteNote(id: string): Promise<void> {
  await api.delete(`/notes/${id}`);
}