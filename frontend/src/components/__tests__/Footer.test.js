import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';

test('renders restaurant address', () => {
  render(<Footer />);
  expect(screen.getByText('1234 Culinary Ave, Suite 100')).toBeInTheDocument();
  expect(screen.getByText('Washington, DC 20002')).toBeInTheDocument();
});

test('renders operating hours', () => {
  render(<Footer />);
  expect(screen.getByText('Monday – Saturday: 5:00 PM – 11:00 PM')).toBeInTheDocument();
  expect(screen.getByText('Sunday: 5:00 PM – 9:00 PM')).toBeInTheDocument();
});

test('renders phone number', () => {
  render(<Footer />);
  expect(screen.getByText('Phone: (202) 555-4567')).toBeInTheDocument();
});

test('renders copyright', () => {
  render(<Footer />);
  expect(screen.getByText(/© 2026 Café Fausse/)).toBeInTheDocument();
});
