import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import queryString from 'query-string';
import { appActions } from 'store/app.store';
import { FetchData } from 'types/api.type';
import { User, YtSharedVideo } from 'types/entities.type';
import { RootState } from 'types/store.type';

const baseQuery = fetchBaseQuery({
  paramsSerializer: (params: Record<string, any>) => {
    return queryString.stringify(params);
  },
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState)?.app.accessToken;

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      api.dispatch(appActions.logout());
    }

    return result;
  },
  tagTypes: ['MyProfile', 'UNAUTHORIZED', 'UNKNOWN_ERROR'],
  endpoints: builder => ({
    signIn: builder.mutation<
      FetchData<{ accessToken?: string; profile?: User }>,
      { email: string; password: string }
    >({
      query: body => ({
        url: '/auth/sign-in',
        method: 'POST',
        body,
      }),
    }),
    shareYoutubeVideo: builder.mutation<
      FetchData<YtSharedVideo>,
      { url: string }
    >({
      query: body => ({
        url: '/messages',
        method: 'POST',
        body,
      }),
    }),
    getSharedVideos: builder.query<FetchData<YtSharedVideo[]>, undefined>({
      query: () => ({
        url: '/messages',
        method: 'GET',
      }),
    }),
  }),
});
