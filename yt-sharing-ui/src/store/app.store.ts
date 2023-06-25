import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from 'services/api';
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
    // builder.addMatcher(
    //   api.endpoints.loginByPhoneNumber.matchFulfilled,
    //   (state, action) => {
    //     const accessToken = action.payload.data?.accessToken;
    //     if (accessToken) {
    //       state.accessToken = action.payload.data?.accessToken;
    //       state.isLogged = true;
    //     }
    //   },
    // );
    // builder.addMatcher(
    //   api.endpoints.getMyProfile.matchFulfilled,
    //   (state, action) => {
    //     state.isLogged = true;
    //   },
    // );
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
