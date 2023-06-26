import { toast } from 'react-toastify';

export const setError = (err?: any) => {
  toast.error(err?.data?.message || 'Error, try again!');
};
