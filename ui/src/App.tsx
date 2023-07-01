import { PrivateRoute } from 'containers/Route/PrivateRoute';
import { Socket } from 'containers/Socket';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage';
import { ShareYtVideoPage } from './pages/ShareYtVideoPage';

export function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Youtube share video app"
        defaultTitle="Youtube video share app"
      >
        <meta name="description" content="Youtube share video app" />
      </Helmet>
      <ToastContainer />
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
        <Route path="*" element={<HomePage />} />
      </Routes>
      <GlobalStyle />
      <Socket />
    </BrowserRouter>
  );
}
