import { Close, Login } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  AppBar,
  Box,
  Dialog,
  DialogContent,
  Hidden,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { setError } from 'utils/set-error';
import * as Yup from 'yup';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const SignInBox: React.FC = () => {
  const [submitSignIn] = api.useSignInMutation();
  const [isOpenDialogSignIn, setOpenDialogSignIn] = useState<boolean>(false);
  const handleOpenDialogSignIn = () => {
    setOpenDialogSignIn(true);
  };
  const handleCloseDialogSignIn = () => {
    setOpenDialogSignIn(false);
  };
  const formik = useFormik<{ email: string; password: string }>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(8).required(),
    }),
    onSubmit: async values => {
      try {
        await submitSignIn(values).unwrap();
        if (isOpenDialogSignIn) {
          setOpenDialogSignIn(false);
        }
        toast.info('Sign in successfully');
      } catch (err) {
        setError(err);
      }
    },
  });
  return (
    <>
      <Hidden mdUp>
        <IconButton onClick={handleOpenDialogSignIn} color="primary">
          <Login />
        </IconButton>
        <Dialog
          fullScreen
          open={isOpenDialogSignIn}
          onClose={handleCloseDialogSignIn}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseDialogSignIn}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Sign in
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Box>
                <TextField
                  autoFocus
                  fullWidth
                  error={!!formik.errors.email}
                  id="email"
                  {...formik.getFieldProps('email')}
                  size="small"
                  placeholder="Email"
                  type="email"
                  helperText={formik.errors.email || ' '}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  error={!!formik.errors.password}
                  id="password"
                  {...formik.getFieldProps('password')}
                  size="small"
                  placeholder="Password"
                  type="password"
                  helperText={formik.errors.password || ' '}
                />
              </Box>
              <Box>
                <LoadingButton
                  fullWidth
                  loading={formik.isSubmitting}
                  type="submit"
                  className="h-10"
                  variant="contained"
                >
                  Login / Register
                </LoadingButton>
              </Box>
            </form>
          </DialogContent>
        </Dialog>
      </Hidden>
      <Hidden mdDown>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Box className="flex gap-2 items-start">
            <Box>
              <TextField
                autoFocus
                sx={{ maxWidth: '200px' }}
                error={!!formik.errors.email}
                id="email"
                {...formik.getFieldProps('email')}
                size="small"
                placeholder="Email"
                type="email"
                helperText={formik.errors.email || ' '}
              />
            </Box>
            <Box>
              <TextField
                sx={{ maxWidth: '200px' }}
                error={!!formik.errors.password}
                id="password"
                {...formik.getFieldProps('password')}
                size="small"
                placeholder="Password"
                type="password"
                helperText={formik.errors.password || ' '}
              />
            </Box>
            <Box>
              <LoadingButton
                loading={formik.isSubmitting}
                type="submit"
                className="h-10"
                variant="contained"
              >
                Login / Register
              </LoadingButton>
            </Box>
          </Box>
        </form>
      </Hidden>
    </>
  );
};
