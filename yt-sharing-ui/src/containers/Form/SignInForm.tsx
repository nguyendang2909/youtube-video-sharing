import { Login } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Hidden, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import * as Yup from 'yup';

export const SignInForm: React.FC = () => {
  const [submitSignIn] = api.useSignInMutation();
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
      } catch (err) {
        toast.error('Error, try again!');
      }
    },
  });
  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Hidden mdUp>
        <IconButton>
          <Login />
        </IconButton>
      </Hidden>
      <Hidden mdDown>
        <Box className="flex gap-2 items-start">
          <Box>
            <TextField
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
      </Hidden>
    </form>
  );
};
