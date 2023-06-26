import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from 'services/api';
import { User } from 'types/entities.type';
import { PersistedAppState } from 'types/store.type';

const initialState: PersistedAppState = {
  accessToken: null,
  profile: {},
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
    logout: state => {
      state.accessToken = null;
      state.profile = {};
    },
    updateProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(api.endpoints.signIn.matchFulfilled, (state, action) => {
      const accessToken = action.payload.data?.accessToken;
      const profile = action.payload.data?.profile;
      if (accessToken && profile) {
        state.accessToken = accessToken;
        state.profile = profile;
      }
    });
  },
});

export const appActions = appSlice.actions;

const appReducer = appSlice.reducer;

const persistConfig = {
  key: 'localStorage',
  storage,
  blacklist: [],
};

export const persistedAppReducer = persistReducer(persistConfig, appReducer);
