import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store as appStore } from '../../../store';
import { PageHeader } from '../PageHeader';

jest.mock('../../Box/HeaderRightBox.tsx');

describe('#PageHeader', () => {
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

  it('Should show app bar and app title in page header', async () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PageHeader />
        </PersistGate>
      </Provider>,
    );

    expect(screen.getByTestId('appBar')).toBeInTheDocument();
    expect(screen.getByTestId('appTitle')).toBeInTheDocument();
  });
});
