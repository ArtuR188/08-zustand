'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import css from './SearchBox.module.css';

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  }, 400);

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes..."
      defaultValue={searchParams.get('search') ?? ''}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
