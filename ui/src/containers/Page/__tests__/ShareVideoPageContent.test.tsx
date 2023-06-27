import '@testing-library/jest-dom';

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store as appStore } from '../../../store';
import { ShareYtVideoPageContent } from '../ShareVideoPageContent';

describe('#SharedVideoPageContent', () => {
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
          <BrowserRouter>
            <ShareYtVideoPageContent />
          </BrowserRouter>
        </PersistGate>
      </Provider>,
    );

    expect(screen.getByTestId('youtubeVideoUrlInput')).toBeInTheDocument();
    expect(screen.getByTestId('shareYtVideoButton')).toBeInTheDocument();
  });

  it('Should show error when submit without input url', async () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ShareYtVideoPageContent />
          </BrowserRouter>
        </PersistGate>
      </Provider>,
    );

    act(() => {
      fireEvent.click(screen.getByTestId('shareYtVideoButton'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('urlInputError').textContent).toBe(
        'url is a required field',
      );
    });
  });
});
