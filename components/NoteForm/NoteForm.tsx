'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNoteStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api/notes';
import { CreateNotePayload } from '@/types/note';
import css from './NoteForm.module.css';

const TAG_OPTIONS: string[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const tagRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (titleRef.current) titleRef.current.value = draft.title;
    if (contentRef.current) contentRef.current.value = draft.content;
    if (tagRef.current) tagRef.current.value = draft.tag;
  }, [draft.title, draft.content, draft.tag]);

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CreateNotePayload) => createNote(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
    onError: (error: Error) => {
      console.error('Failed to create note:', error);
    },
  });

  const handleChange = (): void => {
    setDraft({
      title: titleRef.current?.value ?? '',
      content: contentRef.current?.value ?? '',
      tag: tagRef.current?.value ?? 'Todo',
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as string;

    mutate({
      title,
      content,
      tag: tag as 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping',
    });
  };

  const handleCancel = (): void => {
    router.back();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.field}>
        <label className={css.label} htmlFor="title">
          Title
        </label>
        <input
          ref={titleRef}
          className={css.input}
          id="title"
          name="title"
          type="text"
          placeholder="Enter note title"
          defaultValue={draft.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.field}>
        <label className={css.label} htmlFor="content">
          Content
        </label>
        <textarea
          ref={contentRef}
          className={css.textarea}
          id="content"
          name="content"
          placeholder="Enter note content"
          defaultValue={draft.content}
          onChange={handleChange}
          rows={6}
          required
        />
      </div>

      <div className={css.field}>
        <label className={css.label} htmlFor="tag">
          Tag
        </label>
        <select
          ref={tagRef}
          className={css.select}
          id="tag"
          name="tag"
          defaultValue={draft.tag}
          onChange={handleChange}
        >
          {TAG_OPTIONS.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}