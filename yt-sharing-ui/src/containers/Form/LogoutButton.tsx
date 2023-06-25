import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { appActions } from 'store/app.store';

export const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(appActions.logout());
  };

  return (
    <Button variant="outlined" onClick={handleLogout}>
      Logout
    </Button>
  );
};
