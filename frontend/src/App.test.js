import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders Café Fausse heading', () => {
  render(<App />);
  expect(screen.getAllByText('Café Fausse').length).toBeGreaterThan(0);
});

test('renders Make a Reservation elements', () => {
  render(<App />);
  expect(screen.getAllByText('Make a Reservation').length).toBeGreaterThan(0);
});

test('renders reservation form submit button', () => {
  window.history.pushState({}, '', '/reservations');
  render(<App />);
  expect(screen.getByRole('button', { name: 'Submit Reservation' })).toBeInTheDocument();
  window.history.pushState({}, '', '/');
});

test('renders newsletter section', () => {
  render(<App />);
  expect(screen.getByText('Subscribe to Our Newsletter')).toBeInTheDocument();
});

test('renders contact section', () => {
  render(<App />);
  expect(screen.getByText('Fine Dining, Thoughtfully Made')).toBeInTheDocument();
});

test('renders the exact SRS menu on the menu route', () => {
  window.history.pushState({}, '', '/menu');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Our Menu' })).toBeInTheDocument();
  expect(screen.getByText('Bruschetta')).toBeInTheDocument();
  expect(screen.getByText('Espresso')).toBeInTheDocument();
  window.history.pushState({}, '', '/');
});
