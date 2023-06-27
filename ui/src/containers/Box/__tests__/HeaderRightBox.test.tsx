import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { appActions } from 'store/app.store';

import { store as appStore } from '../../../store';
import { HeaderRightBox } from '../HeaderRightBox';

describe('#HeaderRightBox', () => {
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

  it('Should show user box when user logged in', async () => {
    render(
      <Provider store={store}>
        <HeaderRightBox />
      </Provider>,
    );
    act(() => {
      store.dispatch(appActions.updateToken({ accessToken: 'access-token' }));
    });

    await waitFor(() => {
      expect(store.getState().app.accessToken).toBe('access-token');
      expect(screen.getByTestId('userBox')).toBeInTheDocument();
      expect(screen.queryByTestId('signInBox')).toBeNull();
    });
  });

  it('Should show sign in box when user not logged in or log out', async () => {
    render(
      <Provider store={store}>
        <HeaderRightBox />
      </Provider>,
    );

    act(() => {
      store.dispatch(appActions.logout());
    });

    await waitFor(() => {
      expect(store.getState().app.accessToken).toBeNull();
      expect(screen.queryByTestId('userBox')).toBeNull();
      expect(screen.getByTestId('signInBox')).toBeInTheDocument();
    });
  });
});
