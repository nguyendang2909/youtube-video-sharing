import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { setError } from 'utils/set-error';
import * as Yup from 'yup';

export const ShareYtVideoPageContent: React.FC = () => {
  const navigate = useNavigate();
  const [submitShareYoutubeVideo] = api.useShareYoutubeVideoMutation();

  const formik = useFormik({
    initialValues: {
      url: '',
    },
    validationSchema: Yup.object().shape({
      url: Yup.string().required(),
    }),
    onSubmit: async values => {
      try {
        await submitShareYoutubeVideo(values).unwrap();
        formik.resetForm();
        navigate('/');
        toast.info('Share video successfully');
      } catch (err: any) {
        setError(err);
      }
    },
  });

  return (
    <Box
      className="flex items-center w-full"
      sx={{ height: 'calc(100vh - 80px)' }}
    >
      <Container>
        <Box className="flex justify-center">
          <Card className="w-full sm:max-w-[700px]">
            <CardHeader title="Share a Youtube movie"></CardHeader>
            <CardContent>
              <form noValidate onSubmit={formik.handleSubmit}>
                <TextField
                  inputProps={{ 'data-testid': 'youtubeVideoUrlInput' }}
                  error={!!formik.errors.url}
                  {...formik.getFieldProps('url')}
                  autoFocus
                  margin="dense"
                  id="url"
                  placeholder="Youtube video url"
                  type="text"
                  fullWidth
                  variant="outlined"
                  helperText={
                    <span data-testid="urlInputError">
                      {formik.errors.url || ' '}
                    </span>
                  }
                />

                <Button
                  data-testid="shareYtVideoButton"
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Share
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};
