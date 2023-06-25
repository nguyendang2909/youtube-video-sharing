import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import queryString from 'query-string';
import { appActions } from 'store/app.store';
import { FetchData } from 'types/api.type';
import { User, YtSharedVideo } from 'types/entities.type';
import { RootState } from 'types/store.type';

export const API_URL = process.env.REACT_APP_API_URL;

const baseQuery = fetchBaseQuery({
  paramsSerializer: (params: Record<string, any>) => {
    return queryString.stringify(params);
  },
  baseUrl: API_URL,
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
    // loginByPhoneNumber: builder.mutation<
    //   ApiResponse.Logged,
    //   ApiRequest.LoginByPhoneNumber
    // >({
    //   query: body => ({
    //     url: API_URL.loginByPhoneNumber,
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // // User api
    // getNearbyUsers: builder.query<ApiResponse.UserData[], void>({
    //   query: () => ({
    //     url: API_URL.nearbyUsers,
    //     method: 'GET',
    //     params: {
    //       fields: [
    //         '_id',
    //         '_interestIds',
    //         'about',
    //         'age',
    //         'avatar',
    //         'birthdate',
    //         'distance',
    //         'dringking',
    //         'company',
    //         'educationLevel',
    //         'email',
    //         'gallery',
    //         'gender',
    //         'geolocation',
    //         'jobTitle',
    //         'interests',
    //         'location',
    //         'lookingForGender',
    //         'nickname',
    //         'role',
    //         'school',
    //         'smoking',
    //         'workout',
    //         'createdAt',
    //         'updatedAt',
    //       ],
    //     },
    //   }),
    //   providesTags: (result, error, id) => {
    //     if (result) {
    //       return ['MyProfile'];
    //     }
    //     if (error?.status === 401) {
    //       return ['UNAUTHORIZED'];
    //     }
    //     return ['UNKNOWN_ERROR'];
    //   },
    // }),
    // getMyProfile: builder.query<ApiResponse.UserData, void>({
    //   query: () => ({
    //     url: API_URL.myProfile,
    //     method: 'GET',
    //     params: {
    //       fields: [
    //         '_id',
    //         '_interestIds',
    //         'about',
    //         'age',
    //         'avatar',
    //         'birthdate',
    //         'dringking',
    //         'company',
    //         'educationLevel',
    //         'email',
    //         'gallery',
    //         'gender',
    //         'geolocation',
    //         'jobTitle',
    //         'interests',
    //         'location',
    //         'lookingForGender',
    //         'nickname',
    //         'role',
    //         'school',
    //         'smoking',
    //         'workout',
    //         'createdAt',
    //         'updatedAt',
    //       ],
    //     },
    //   }),
    //   providesTags: (result, error, id) => {
    //     if (result) {
    //       return ['MyProfile'];
    //     }
    //     if (error?.status === 401) {
    //       return ['UNAUTHORIZED'];
    //     }
    //     return ['UNKNOWN_ERROR'];
    //   },
    // }),
    // updateProfile: builder.mutation<
    //   ApiResponse.UserData,
    //   ApiRequest.UpdateProfile
    // >({
    //   query: body => ({
    //     url: API_URL.myProfile,
    //     method: 'PATCH',
    //     body: body,
    //   }),
    //   invalidatesTags: ['MyProfile'],
    // }),
    // // Data interest
    // getDataInterests: builder.query<
    //   ApiResponse.FetchData<ApiResponse.DataInterest[]>,
    //   void
    // >({
    //   query: () => ({
    //     url: API_URL.dataInterests,
    //     method: 'GET',
    //     params: {
    //       fields: ['_id', 'tag', 'title'],
    //     },
    //   }),
    // }),
    // // Gallery
    // createPhoto: builder.mutation<ApiResponse.Logged, ApiRequest.CreatePhoto>({
    //   query: body => {
    //     const { file, isPrivate } = body;
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     if (isPrivate) {
    //       formData.append('isPrivate', isPrivate.toString());
    //     }
    //     return {
    //       url: API_URL.galleryPhoto,
    //       method: 'POST',
    //       body: formData,
    //     };
    //   },
    //   invalidatesTags: ['MyProfile'],
    // }),
    // // getMyPhotos: builder.query<
    // //   ApiResponse.FetchData<ApiResponse.MediaFile[]>,
    // //   {}
    // // >({
    // //   query: () => {
    // //     return {
    // //       url: API_URL.gallery,
    // //       method: 'GET',
    // //       params: {
    // //         fields: ['_id', 'url', 'isPrivate'],
    // //       },
    // //     };
    // //   },
    // // }),
    // deletePhoto: builder.mutation<ApiResponse.Logged, string>({
    //   query: id => {
    //     return {
    //       url: `${API_URL.gallery}/${id}`,
    //       method: 'DELETE',
    //     };
    //   },
    //   invalidatesTags: ['MyProfile'],
    // }),
    // // Conversation
    // getConversations: builder.query<
    //   ApiResponse.FetchData<ApiResponse.Conversation[]>,
    //   ApiRequest.FindManyConversations
    // >({
    //   query: params => {
    //     return {
    //       url: API_URL.conversations,
    //       method: 'GET',
    //       params: { fields: ['_id', 'members'], ...params },
    //     };
    //   },
    // }),
    // getConversation: builder.query<
    //   ApiResponse.FetchData<ApiResponse.Conversation>,
    //   string
    // >({
    //   query: id => {
    //     return {
    //       url: `${API_URL.conversations}/${id}`,
    //       method: 'GET',
    //       params: { fields: ['_id', 'members'] },
    //     };
    //   },
    // }),
    // // Messages
    // getMessages: builder.query<
    //   ApiResponse.FetchData<ApiResponse.Message[], { _conversationId: string }>,
    //   ApiRequest.FindManyMessages
    // >({
    //   query: params => {
    //     return {
    //       url: API_URL.messages,
    //       method: 'GET',
    //       params: {
    //         fields: [
    //           '_id',
    //           'text',
    //           '_conversationId',
    //           'createdAt',
    //           'updatedAt',
    //           'createdBy',
    //         ],
    //         ...params,
    //       },
    //     };
    //   },
    // }),
  }),
});
