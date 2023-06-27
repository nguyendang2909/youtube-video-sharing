import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store as appStore } from '../../../store';
import { HomePageContent } from '../HomePageContent';

describe('#HomePageContent', () => {
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

  it('Should see shared videos without login', async () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HomePageContent />
        </PersistGate>
      </Provider>,
    );

    expect(screen.getByTestId('sharedVideoContent')).toBeInTheDocument();
  });
});
