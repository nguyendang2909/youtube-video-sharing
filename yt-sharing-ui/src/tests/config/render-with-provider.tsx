import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { store as appStore } from '../../store';

export function renderWithProviders(
  ui,
  { store = appStore, ...renderOptions } = {},
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
