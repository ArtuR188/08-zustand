'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api/notes';
import css from './NoteForm.module.css';

const TAG_OPTIONS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const tagRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (titleRef.current) titleRef.current.value = draft.title;
    if (contentRef.current) contentRef.current.value = draft.content;
    if (tagRef.current) tagRef.current.value = draft.tag;
  }, []);

  const handleChange = () => {
    setDraft({
      title: titleRef.current?.value ?? '',
      content: contentRef.current?.value ?? '',
      tag: tagRef.current?.value ?? 'Todo',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as string;

    try {
      await createNote({
        title,
        content,
        tag: tag as 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping',
      });
      clearDraft();
      router.back();
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const handleCancel = () => {
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
          {TAG_OPTIONS.map((option) => (
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
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
