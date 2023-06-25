import { Box } from '@mui/material';
import { LogoutButton } from 'containers/Button/LogoutButton';
import { ShareButton } from 'containers/Button/ShareButton';
import React from 'react';

import { WelcomeBox } from './WelcomeBox';

export const UserBox: React.FC = () => {
  return (
    <>
      <Box className="flex items-center gap-3">
        <Box>
          <WelcomeBox />
        </Box>
        <Box>
          <ShareButton />
        </Box>
        <Box>
          <LogoutButton />
        </Box>
      </Box>
    </>
  );
};
