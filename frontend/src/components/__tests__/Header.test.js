import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

test('renders Café Fausse logo text', () => {
  render(<Header />);
  expect(screen.getByText('Café Fausse')).toBeInTheDocument();
});

test('renders all navigation links', () => {
  render(<Header />);
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('About Us')).toBeInTheDocument();
  expect(screen.getByText('Menu')).toBeInTheDocument();
  expect(screen.getByText('Reservations')).toBeInTheDocument();
  expect(screen.getByText('Gallery')).toBeInTheDocument();
});

test('menu toggle button exists', () => {
  render(<Header />);
  expect(screen.getByLabelText('Toggle navigation menu')).toBeInTheDocument();
});
