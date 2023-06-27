import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { appActions } from 'store/app.store';

import { persistor, store as appStore } from '../../../store';
import { LogoutButton } from '../LogoutButton';

describe('#LogoutButton', () => {
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
    store.dispatch(appActions.updateToken({ accessToken: 'access-token' }));
  });

  it('Test render logout button', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: !(query === '(max-width: 1000px)'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LogoutButton />
        </PersistGate>
      </Provider>,
    );

    expect(screen.getByTestId('logoutButtonDesktop')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('Should logout when click logout button', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: !(query === '(max-width: 1000px)'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LogoutButton />
        </PersistGate>
      </Provider>,
    );
    const logoutButton = screen.getByText('Logout');
    act(() => {
      logoutButton.click();
    });

    await waitFor(() => {
      expect(store.getState().app.accessToken).toBeNull();
    });
  });
});
