'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import { fetchNotes } from '@/lib/api/notes';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from '@/components/NotesClient/NotesClient.module.css';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  const handleSearch = useDebouncedCallback((value: string): void => {
    setSearch(value);
    setPage(1);
  }, 400);

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { tag, page, search }],
    queryFn: () =>
      fetchNotes({
        tag: tag === 'all' ? undefined : tag,
        page,
        search: search || undefined,
        perPage: 12,
      }),
  });

  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        <Link href="/notes/action/create" className={css.createButton}>
          Create note +
        </Link>
      </div>

      {isLoading && <p className={css.status}>Loading...</p>}
      {isError && <p className={css.status}>Something went wrong.</p>}
      {data && (
        <>
          <NoteList notes={data.notes} />
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}