'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
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
  const searchParams = useSearchParams();
  const page: number = Number(searchParams.get('page') ?? 1);
  const search: string = searchParams.get('search') ?? '';

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
        <SearchBox />
        <Link href="/notes/action/create" className={css.createButton}>
          Create note +
        </Link>
      </div>

      {isLoading && <p className={css.status}>Loading...</p>}
      {isError && <p className={css.status}>Something went wrong.</p>}
      {data && (
        <>
          <NoteList notes={data.notes} />
          <Pagination totalPages={data.totalPages} />
        </>
      )}
    </div>
  );
}