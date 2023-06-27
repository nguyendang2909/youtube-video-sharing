import { toast } from 'react-toastify';

import { setError } from '../set-error';

describe('#setError', () => {
  it('Should toast an API error', () => {
    jest.spyOn(toast, 'error').mockReturnValue('');

    const result = setError();

    expect(result).toBeUndefined();
    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith('Error, try again!');
  });
});
