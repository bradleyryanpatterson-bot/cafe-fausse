import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsletterSignup from '../NewsletterSignup';

test('renders newsletter heading', () => {
  render(<NewsletterSignup />);
  expect(screen.getByText('Subscribe to Our Newsletter')).toBeInTheDocument();
});

test('renders email input', () => {
  render(<NewsletterSignup />);
  expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
});

test('renders subscribe button', () => {
  render(<NewsletterSignup />);
  expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
});

test('email input is required', () => {
  render(<NewsletterSignup />);
  const input = screen.getByPlaceholderText('Enter your email');
  expect(input).toHaveAttribute('aria-required', 'true');
});
