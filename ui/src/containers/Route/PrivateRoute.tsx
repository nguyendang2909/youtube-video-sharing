import { useAppSelector } from 'hooks/store.hook';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const accessToken = useAppSelector(state => state.app.accessToken);

  return accessToken ? <>{children}</> : <Navigate to="/" />;
};
