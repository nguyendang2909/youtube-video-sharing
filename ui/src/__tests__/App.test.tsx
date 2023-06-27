import '@testing-library/jest-dom';

import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from 'App';
import { rest } from 'msw';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import socketIOClient from 'socket.io-client';
import MockedSocket from 'socket.io-mock';

import { persistor, store as appStore } from '../store';
import { mockMessages, mockShareVideo } from '../tests/config/mockMessages';
import { server } from '../tests/config/server';

jest.mock('socket.io-client');

describe('#App', () => {
  let store: any = null;
  let socket;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    const makeTestStore = () => {
      const _store = appStore;
      return _store;
    };
    store = makeTestStore();
    socket = new MockedSocket();
    // @ts-ignore
    socketIOClient.mockReturnValue(socket);
  });

  it('Should see shared videos without login', async () => {
    server.use(
      rest.get('/messages', (req, res, ctx) => {
        return res(ctx.json(mockMessages));
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
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </PersistGate>
      </Provider>,
    );

    expect((await screen.findAllByTestId('videoBox')).length).toEqual(
      mockMessages.data.length,
    );
    expect((await screen.findAllByTestId('videoTitle'))[0].textContent).toEqual(
      mockMessages.data[0].title,
    );
    expect((await screen.findAllByTestId('videoTitle'))[1].textContent).toEqual(
      mockMessages.data[1].title,
    );
    expect((await screen.findAllByTestId('sharedUser'))[0].textContent).toEqual(
      `Shared by: ${mockMessages.data[0].user.email}`,
    );
    expect((await screen.findAllByTestId('sharedUser'))[1].textContent).toEqual(
      `Shared by: ${mockMessages.data[1].user.email}`,
    );
  });

  it('Should login successfully and share video successfully', async () => {
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
      rest.get('/messages', (req, res, ctx) => {
        return res(ctx.json(mockMessages));
      }),
      rest.post('/messages', (req, res, ctx) => {
        return res(ctx.json(mockShareVideo));
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
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </PersistGate>
      </Provider>,
    );

    expect((await screen.findAllByTestId('videoBox')).length).toEqual(
      mockMessages.data.length,
    );

    await act(async () => {
      await userEvent.type(
        await screen.findByTestId('emailInputDesktop'),
        'quynh@gmail.com',
      );
      await userEvent.type(
        await screen.findByTestId('passwordInputDesktop'),
        '12345678',
      );
      await userEvent.click(await screen.findByTestId('signInButtonDesktop'));
    });

    await waitFor(() => {
      expect(screen.getByText('Sign in successfully')).toBeInTheDocument();
      expect(store.getState().app.accessToken).toBe('access-token');
      expect(screen.getByTestId('shareLinkDesktop')).toBeInTheDocument();
      expect(screen.getByTestId('welcomeText')).toBeInTheDocument();
    });
    await userEvent.click(await screen.findByTestId('shareLinkDesktop'));

    await waitFor(() => {
      expect(screen.getByTestId('youtubeVideoUrlInput')).toBeInTheDocument();
    });

    await act(async () => {
      await userEvent.type(
        await screen.findByTestId('youtubeVideoUrlInput'),
        'https://www.youtube.com/watch?v=yoYv_ezmvqI&ab_channel=Ho%C3%A0ngD%C5%A9ng',
      );
      await userEvent.click(await screen.findByTestId('shareYtVideoButton'));
    });

    await waitFor(() => {
      expect(screen.getByText('Share video successfully')).toBeInTheDocument();
    });
  });

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
});
