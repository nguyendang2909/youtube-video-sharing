import { Box, Button, Typography } from '@mui/material';
import { LogoutButton } from 'containers/Form/LogoutButton';
import { useAppSelector } from 'hooks/store.hook';
import React from 'react';

export const UserBox: React.FC = () => {
  const email = useAppSelector(state => state.app.profile?.email);

  return (
    <>
      <Box className="flex items-center gap-3">
        <Box>
          <Typography>Welcome {email}</Typography>
        </Box>
        <Box>
          <Button variant="contained">Share a video</Button>
        </Box>
        <Box>
          <LogoutButton />
        </Box>
      </Box>
    </>
  );
};
