import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import queryString from 'query-string';
import { FetchData } from 'types/api.type';
import { User } from 'types/entities.type';
import { RootState } from 'types/store.type';

export const API_URL = process.env.REACT_APP_API_URL;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    paramsSerializer: (params: Record<string, any>) => {
      return queryString.stringify(params);
    },
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState)?.app.accessToken;

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
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
    // loginByGoogle: builder.mutation<
    //   ApiResponse.Logged,
    //   ApiRequest.LoginByGoogle
    // >({
    //   query: body => ({
    //     url: API_URL.loginByGoogle,
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // loginByFacebook: builder.mutation<
    //   ApiResponse.Logged,
    //   ApiRequest.LoginByFacebook
    // >({
    //   query: body => ({
    //     url: API_URL.loginByFacebook,
    //     method: 'POST',
    //     body,
    //   }),
    // }),
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
