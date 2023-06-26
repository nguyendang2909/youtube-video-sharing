import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import { UserBox } from '../UserBox';

jest.mock('../WelcomeBox.tsx');
jest.mock('../../Button/ShareButton.tsx');
jest.mock('../../Button/LogoutButton.tsx');

describe('#UserBox', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Test render user box', () => {
    render(<UserBox />);

    expect(screen.getByTestId('userBox')).toBeInTheDocument();
  });
});
