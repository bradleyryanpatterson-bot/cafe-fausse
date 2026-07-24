import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GalleryLightbox from '../GalleryLightbox';

test('opens and closes the accessible image lightbox', () => {
  render(<GalleryLightbox />);
  fireEvent.click(screen.getByRole('button', { name: /enlarge image: elegant restaurant/i }));
  expect(screen.getByRole('dialog', { name: /enlarged gallery image/i })).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
