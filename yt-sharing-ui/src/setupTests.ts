import '@testing-library/jest-dom/extend-expect';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'jest-styled-components';
import 'whatwg-fetch';

import { api } from 'services/api';
import { store } from 'store';
import { server } from 'tests/config/server';

beforeAll(() => {
  process.env.REACT_APP_API_URL = 'http://localhost:8330';

  server.listen();
});

afterEach(() => {
  server.resetHandlers();

  store.dispatch(api.util.resetApiState());
});

afterAll(() => server.close());
