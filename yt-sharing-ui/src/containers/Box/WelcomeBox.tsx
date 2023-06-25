import { Box, Hidden, Typography } from '@mui/material';
import { useAppSelector } from 'hooks/store.hook';
import React from 'react';

export const WelcomeBox: React.FC = () => {
  const email = useAppSelector(state => state.app.profile?.email);

  return (
    <Hidden mdDown>
      <Box>
        <Typography>Welcome {email}</Typography>
      </Box>
    </Hidden>
  );
};
