import { Home } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  TextField,
  Toolbar,
} from '@mui/material';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span className="font-bold">My HomePage</span>

      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Container>
            <Box className="flex">
              <Box className="flex">
                <Home />
                <Box>Home</Box>
              </Box>
              <Box className="grow"></Box>
              <Box className="flex gap-2 items-center">
                <Box>
                  <TextField size="small" placeholder="Email" type="email" />
                </Box>
                <Box>
                  <TextField
                    size="small"
                    placeholder="Password"
                    type="password"
                  />
                </Box>
                <Box>
                  <Button className="h-10" variant="contained">
                    Login / Register
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
