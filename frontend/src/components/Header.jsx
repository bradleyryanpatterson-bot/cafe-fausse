import React, { useState } from 'react';

function Header({ currentPath = '/' }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="logo">
          <span className="logo-icon">🍽️</span>
          <span className="logo-text">Café Fausse</span>
        </a>

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {[['/', 'Home'], ['/menu', 'Menu'], ['/reservations', 'Reservations'], ['/about', 'About Us'], ['/gallery', 'Gallery']].map(([href, label]) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)} aria-current={currentPath === href ? 'page' : undefined}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
