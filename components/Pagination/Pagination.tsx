'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = currentPage ?? Number(searchParams.get('page') ?? 1);

  const handlePage = (newPage: number): void => {
    if (onPageChange) {
      onPageChange(newPage);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className={css.pagination}>
      <button
        className={css.btn}
        onClick={() => handlePage(page - 1)}
        disabled={page === 1}
      >
        ← Prev
      </button>

      <span className={css.info}>
        {page} / {totalPages}
      </span>

      <button
        className={css.btn}
        onClick={() => handlePage(page + 1)}
        disabled={page === totalPages}
      >
        Next →
      </button>
    </div>
  );
}