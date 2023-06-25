import { Home } from '@mui/icons-material';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { HeaderRightBox } from 'containers/Box/HeaderRightBox';
import React from 'react';

export const PageHeader: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar className="h-20" />
      </AppBar>
      <AppBar position="fixed" color="inherit">
        <Toolbar className="h-20">
          <Container>
            <Box className="flex">
              <Box className="flex items-center justify-center">
                <Box className="text-4xl flex items-center">
                  <Home fontSize="inherit" color="info" />
                </Box>
                <Box className="flex items-center">
                  <Typography variant="h4">Funny Movies</Typography>
                </Box>
              </Box>
              <Box className="grow"></Box>
              <Box>
                <HeaderRightBox />
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};
