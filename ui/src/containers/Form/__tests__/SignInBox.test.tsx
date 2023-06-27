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
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store as appStore } from '../../../store';
import { SignInBox } from '../SignInBox';

describe('#SignInBox', () => {
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

  it('Should login successfully', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: !(query === '(max-width: 599px)'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SignInBox />
        </PersistGate>
      </Provider>,
    );

    expect(screen.getByTestId('emailInputDesktop')).toBeInTheDocument();
    expect(screen.getByTestId('passwordInputDesktop')).toBeInTheDocument();
    expect(screen.getByTestId('signInButtonDesktop')).toBeInTheDocument();
  });

  it('Should show an error when type incorrect password', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: !(query === '(max-width: 599px)'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SignInBox />
        </PersistGate>
      </Provider>,
    );
    const inputEmailElement = await screen.findByTestId('emailInputDesktop');
    const inputPasswordElement = await screen.findByTestId(
      'passwordInputDesktop',
    );
    const signInButtonElement = await screen.findByTestId(
      'signInButtonDesktop',
    );

    await act(async () => {
      fireEvent.change(inputEmailElement, {
        target: { value: 'quynh@gmail.com' },
      });
      fireEvent.change(inputPasswordElement, {
        target: { value: '12345' },
      });
      fireEvent.click(signInButtonElement);
    });

    await waitFor(() => {
      expect(screen.getByTestId('passwordInputError').textContent).toBe(
        'At least 8 characters',
      );
    });
  });

  it('Should show an error when type incorrect email', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: !(query === '(max-width: 599px)'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SignInBox />
        </PersistGate>
      </Provider>,
    );
    const inputEmailElement = await screen.findByTestId('emailInputDesktop');
    const inputPasswordElement = await screen.findByTestId(
      'passwordInputDesktop',
    );
    const signInButtonElement = await screen.findByTestId(
      'signInButtonDesktop',
    );

    await act(async () => {
      fireEvent.change(inputEmailElement, {
        target: { value: 'quynh' },
      });
      fireEvent.change(inputPasswordElement, {
        target: { value: '12345678' },
      });
      fireEvent.click(signInButtonElement);
    });

    await waitFor(() => {
      expect(screen.getByTestId('emailInputError').textContent).toBe(
        'Please input correct email',
      );
    });
  });
});
