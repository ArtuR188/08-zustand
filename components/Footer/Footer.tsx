import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <p className={css.text}>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
