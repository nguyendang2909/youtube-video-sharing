import { LogoutRounded } from '@mui/icons-material';
import { Button, Hidden, IconButton } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { appActions } from 'store/app.store';

export const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(appActions.logout());
  };

  return (
    <>
      <Hidden mdUp>
        <IconButton onClick={handleLogout}>
          <LogoutRounded />
        </IconButton>
      </Hidden>
      <Hidden mdDown>
        <Button
          variant="outlined"
          onClick={handleLogout}
          startIcon={<LogoutRounded />}
        >
          Logout
        </Button>
      </Hidden>
    </>
  );
};
