import css from './layout.module.css';

export default function NotesLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className={css.layout}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.main}>{children}</main>
    </div>
  );
}
