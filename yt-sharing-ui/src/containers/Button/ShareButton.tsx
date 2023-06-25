import { Share } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Hidden,
  IconButton,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { setError } from 'utils/set-error';
import * as Yup from 'yup';

export const ShareButton: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const [submitShareYoutubeVideo] = api.useShareYoutubeVideoMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        if (open) {
          handleClose();
        }
        formik.resetForm();

        toast.info('Share video successfully');
      } catch (err: any) {
        setError(err);
      }
    },
  });
  return (
    <>
      <Hidden mdUp>
        <IconButton color="primary" onClick={handleClickOpen}>
          <Share />
        </IconButton>
      </Hidden>
      <Hidden mdDown>
        <Button
          variant="contained"
          startIcon={<Share />}
          onClick={handleClickOpen}
        >
          Share a video
        </Button>
      </Hidden>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share youtube video</DialogTitle>
        <form noValidate onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Input youtube video to share with all members in Funny Movies
            </DialogContentText>
            <TextField
              error={!!formik.errors.url}
              {...formik.getFieldProps('url')}
              autoFocus
              margin="dense"
              id="url"
              placeholder="Youtube video url"
              type="text"
              fullWidth
              variant="outlined"
              helperText={formik.errors.url || ' '}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Share
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
