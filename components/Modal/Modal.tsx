'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import css from './Modal.module.css';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [router]);

  return (
    <div className={css.backdrop} onClick={() => router.back()}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={() => router.back()}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
