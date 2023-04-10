import React from 'react';
import css from './footer.module.css';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={css.footer}>
      <p>Copyright © {year}</p>
    </footer>
  )
}

export default Footer