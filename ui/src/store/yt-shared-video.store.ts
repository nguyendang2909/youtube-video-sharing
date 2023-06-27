import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'services/api';
import { YtSharedVideo } from 'types/entities.type';
import { YtSharedVideoState } from 'types/store.type';

const initialState: YtSharedVideoState = {
  data: [],
};

const ytSharedVideoSlice = createSlice({
  name: 'ytSharedVideos',
  initialState,
  reducers: {
    updateSharedYtVideo: (state, action: PayloadAction<YtSharedVideo>) => {
      const ytSharedVideo = action.payload;
      if (ytSharedVideo) {
        state.data = [ytSharedVideo, ...state.data];
      }
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.getSharedVideos.matchFulfilled,
      (state, action) => {
        if (action.payload.data) {
          state.data = action.payload.data;
        }
      },
    );
  },
});

export const ytSharedVideoActions = ytSharedVideoSlice.actions;

export const ytSharedVideoReducer = ytSharedVideoSlice.reducer;
