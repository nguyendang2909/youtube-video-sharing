import { Share } from '@mui/icons-material';
import { Button, Hidden, IconButton } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const ShareButton: React.FC = () => {
  return (
    <>
      <Hidden mdUp>
        <Link data-testid="shareLinkMobile" to="/share">
          <IconButton data-testid="shareIconButtonMobile" color="primary">
            <Share />
          </IconButton>
        </Link>
      </Hidden>
      <Hidden mdDown>
        <Link data-testid="shareLinkDesktop" to="/share">
          <Button
            data-testid="shareIconButtonDesktop"
            variant="contained"
            startIcon={<Share />}
          >
            Share a video
          </Button>
        </Link>
      </Hidden>
    </>
  );
};
