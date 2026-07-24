import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReservationForm from '../ReservationForm';
import { api } from '../../api';

jest.mock('../../api', () => ({
  api: { get: jest.fn() },
  securePost: jest.fn()
}));

test('renders reservation heading', () => {
  render(<ReservationForm />);
  expect(screen.getByText('Make a Reservation')).toBeInTheDocument();
});

test('renders all form fields', () => {
  render(<ReservationForm />);
  expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/preferred date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/preferred time/i)).toBeInTheDocument();
});

test('renders submit button', () => {
  render(<ReservationForm />);
  expect(screen.getByRole('button', { name: /submit reservation/i })).toBeInTheDocument();
});

test('time select is disabled until date is chosen', () => {
  render(<ReservationForm />);
  const timeSelect = screen.getByLabelText(/preferred time/i);
  expect(timeSelect).toBeDisabled();
});

test('time select shows placeholder when no date selected', () => {
  render(<ReservationForm />);
  expect(screen.getByText('Select a date first')).toBeInTheDocument();
});

test('newsletter checkbox exists', () => {
  render(<ReservationForm />);
  expect(screen.getByText('Sign me up for the newsletter')).toBeInTheDocument();
});

test('help text not visible initially', () => {
  render(<ReservationForm />);
  expect(screen.queryByText('Please enter your full name')).not.toBeInTheDocument();
  expect(screen.queryByText('Please select a time')).not.toBeInTheDocument();
});

test('uses Sunday operating hours if availability lookup fails', async () => {
  api.get.mockRejectedValueOnce(new Error('Network unavailable'));
  render(<ReservationForm />);

  fireEvent.change(screen.getByLabelText(/preferred date/i), {
    target: { value: '2026-07-26' }
  });

  await waitFor(() => expect(screen.getByRole('option', { name: '8:00 PM' })).toBeInTheDocument());
  expect(screen.queryByRole('option', { name: '9:00 PM' })).not.toBeInTheDocument();
  expect(screen.queryByRole('option', { name: '10:00 PM' })).not.toBeInTheDocument();
});
