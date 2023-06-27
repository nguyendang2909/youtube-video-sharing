import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';

import { ShareButton } from '../ShareButton';

describe('#ShareButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Test render share button', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: !(query === '(max-width: 1000px)'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    render(
      <BrowserRouter>
        <ShareButton />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('shareLinkDesktop')).toBeInTheDocument();
    expect(screen.getByTestId('shareIconButtonDesktop')).toBeInTheDocument();
    expect(screen.getByText('Share a video')).toBeInTheDocument();
  });

  it('Should redirect to share page when click to share button', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: !(query === '(max-width: 1000px)'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ShareButton />} />
          <Route path="/share" element={<div>test</div>} />
        </Routes>
      </MemoryRouter>,
    );

    const linkElement = screen.getByTestId('shareLinkDesktop');
    act(() => {
      linkElement.click();
    });

    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
      //   expect(
      //     screen.getByRole('heading', { name: 'Login' }),
      //   ).toBeInTheDocument();
    });
  });
});
