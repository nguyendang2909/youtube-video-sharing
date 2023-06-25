import { PrivateRoute } from 'containers/Route/PrivateRoute';
import { Socket } from 'containers/Socket';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { api } from 'services/api';
import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { ShareYtVideoPage } from './pages/ShareYtVideoPage';

export function App() {
  api.useGetSharedVideosQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Youtube share video app"
        defaultTitle="Youtube video share app"
      >
        <meta name="description" content="Youtube share video app" />
      </Helmet>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/share"
          element={
            <PrivateRoute>
              <ShareYtVideoPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
      <Socket />
    </BrowserRouter>
  );
}
