import '@testing-library/jest-dom';

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';
import { Provider } from 'react-redux';
import { server } from 'tests/config/server';

import { store as appStore } from '../../../store';
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
        <SignInBox />
      </Provider>,
    );

    expect(screen.getByTestId('emailInputDesktop')).toBeInTheDocument();
    expect(screen.getByTestId('passwordInputDesktop')).toBeInTheDocument();
    expect(screen.getByTestId('signInButtonDesktop')).toBeInTheDocument();
  });

  it('Should login successfully', async () => {
    server.use(
      rest.post('/auth/sign-in', (req, res, ctx) => {
        return res(
          ctx.json({
            type: 'signIn',
            data: {
              accessToken: 'access-token',
              profile: {
                id: 'user123',
                email: 'quynh@gmail.com',
              },
            },
          }),
        );
      }),
    );
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
        <SignInBox />
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
        target: { value: 'quynh@gmail.com' },
      });
      fireEvent.click(signInButtonElement);
    });

    await waitFor(() => {
      expect(store.getState().app.accessToken).toBe('access-token');
    });
  });
});
