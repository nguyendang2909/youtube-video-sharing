import { Share } from '@mui/icons-material';
import { Button, Hidden, IconButton } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const ShareButton: React.FC = () => {
  return (
    <>
      <Hidden mdUp>
        <NavLink to="/share">
          <IconButton color="primary">
            <Share />
          </IconButton>
        </NavLink>
      </Hidden>
      <Hidden mdDown>
        <NavLink to="/share">
          <Button variant="contained" startIcon={<Share />}>
            Share a video
          </Button>
        </NavLink>
      </Hidden>
    </>
  );
};
