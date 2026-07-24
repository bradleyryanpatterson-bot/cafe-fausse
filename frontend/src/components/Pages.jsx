import React from 'react';
import ReservationForm from './ReservationForm';
import NewsletterSignup from './NewsletterSignup';
import GalleryLightbox from './GalleryLightbox';
import { menuCategories } from '../siteData';

export function HomePage() {
  return <>
    <section className="hero">
      <div className="hero-overlay">
        <img src="/images/home-cafe-fausse.webp" alt="Café Fausse restaurant interior" className="hero-image" />
        <div className="hero-content">
          <h1>Café Fausse</h1>
          <p className="hero-tagline">A Journey Through Culinary Artistry</p>
          <a href="/reservations" className="btn btn-primary btn-large">Make a Reservation</a>
        </div>
      </div>
    </section>
    <section className="section"><div className="section-container">
      <h2>Fine Dining, Thoughtfully Made</h2>
      <p className="section-subtitle">Traditional Italian flavors, modern culinary innovation, and an unforgettable evening in Washington, DC.</p>
      <a href="/menu" className="btn btn-secondary">Explore the Menu</a>
    </div></section>
    <NewsletterSignup />
  </>;
}

export function MenuPage() {
  return <section className="section page-top"><div className="section-container">
    <h1>Our Menu</h1>
    <p className="section-subtitle">Italian classics prepared with care and seasonal ingredients.</p>
    <div className="menu-grid">{menuCategories.map((category) => <article className="menu-category" key={category.name}>
      <h2>{category.name}</h2><ul>{category.items.map(([name, description, price]) => <li key={name}><div><strong>{name}</strong><p>{description}</p></div><span className="price">{price}</span></li>)}</ul>
    </article>)}</div>
  </div></section>;
}

export function AboutPage() {
  return <section className="section page-top"><div className="section-container prose">
    <h1>About Café Fausse</h1>
    <p className="section-subtitle">Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends traditional Italian flavors with modern culinary innovation. Our mission is to provide an unforgettable dining experience that reflects both quality and creativity.</p>
    <div className="about-features">
      <article className="feature"><h2>Chef Antonio Rossi</h2><p>Chef Rossi brings a devotion to Italian technique, exceptional food, and locally sourced ingredients to every plate. His menus celebrate the seasons while honoring the recipes that inspired his career.</p></article>
      <article className="feature"><h2>Maria Lopez</h2><p>Restaurateur Maria Lopez shapes the warm, attentive experience around each meal. Her hospitality vision makes every guest feel welcomed for an evening of memorable food and conversation.</p></article>
      <article className="feature"><h2>Our Commitment</h2><p>From carefully selected local producers to precise service, we pursue excellent food and an unforgettable dining experience in every detail.</p></article>
    </div>
  </div></section>;
}

export function GalleryPage() {
  return <section className="section page-top"><div className="section-container">
    <h1>Gallery</h1><p className="section-subtitle">A glimpse into the Café Fausse experience. Select an image to view it in detail.</p>
    <GalleryLightbox />
    <div className="recognition-grid">
      <article><h2>Awards</h2><ul><li>Culinary Excellence Award — 2022</li><li>Restaurant of the Year — 2023</li><li>Best Fine Dining Experience — Foodie Magazine, 2023</li></ul></article>
      <article><h2>Guest Reviews</h2><blockquote>“Exceptional ambiance and unforgettable flavors.”<cite>— Gourmet Review</cite></blockquote><blockquote>“A must-visit restaurant for food enthusiasts.”<cite>— The Daily Bite</cite></blockquote></article>
    </div>
  </div></section>;
}

export function ReservationsPage() {
  return <section className="page-top"><ReservationForm /></section>;
}
