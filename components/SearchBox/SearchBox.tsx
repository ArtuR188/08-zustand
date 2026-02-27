'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch?: (value: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((value: string) => {
    if (onSearch) {
      onSearch(value);
      return;
    }
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
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
    />
  );
}