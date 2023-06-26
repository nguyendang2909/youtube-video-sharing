import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { appActions } from 'store/app.store';

import { store as appStore } from '../../../store';
import { WelcomeBox } from '../WelcomeBox';

describe('#WelcomeBox', () => {
  let store: any = null;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    const makeTestStore = () => {
      const _store = appStore;
      return _store;
    };
    store = makeTestStore();
  });

  it('Should show welcome message', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: !(query === '(max-width: 899px)'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    render(
      <Provider store={store}>
        <WelcomeBox />
      </Provider>,
    );
    act(() => {
      store.dispatch(
        appActions.updateProfile({
          id: 'userid-1234',
          email: 'quynh@gmail.com',
        }),
      );
    });

    await waitFor(() => {
      expect(store.getState().app.profile.email).toBe('quynh@gmail.com');
      expect(screen.getByTestId('welcomeText')).toBeInTheDocument();
      expect(screen.getByText(`Welcome quynh@gmail.com`)).toBeInTheDocument();
    });
  });
});
