import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { AboutPage, GalleryPage, HomePage, MenuPage, ReservationsPage } from './components/Pages';
import './App.css';

const pages = {
  '/': HomePage,
  '/menu': MenuPage,
  '/reservations': ReservationsPage,
  '/about': AboutPage,
  '/gallery': GalleryPage,
};

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const Page = pages[path] || HomePage;
  const title = path === '/' ? 'Café Fausse' : `${path.slice(1).replace(/^./, (letter) => letter.toUpperCase())} | Café Fausse`;
  document.title = title;
  return <div className="App"><Header currentPath={path} /><main><Page /></main><Footer /></div>;
}

export default App;
