'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? 1);

  const handlePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className={css.pagination}>
      <button
        className={css.btn}
        onClick={() => handlePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Prev
      </button>

      <span className={css.info}>
        {currentPage} / {totalPages}
      </span>

      <button
        className={css.btn}
        onClick={() => handlePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  );
}
