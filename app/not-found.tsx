import { Metadata } from 'next';
import Link from 'next/link';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: '404 — Page Not Found | NoteHub',
  description: 'The page you are looking for does not exist.',
  openGraph: {
    title: '404 — Page Not Found | NoteHub',
    description: 'The page you are looking for does not exist.',
    url: 'https://your-app.vercel.app/404',
    images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' }],
  },
};

export default function NotFound() {
  return (
    <main className={css.main}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/notes/filter/all" className={css.link}>
        Go to Notes
      </Link>
    </main>
  );
}
