import { useAppSelector } from 'hooks/store.hook';
import React from 'react';
import { useDispatch } from 'react-redux';
import { disconnectWebSocket } from 'store/saga';

export const Socket: React.FC = () => {
  const dispatch = useDispatch();
  const accessToken = useAppSelector(state => state.app.accessToken);

  React.useEffect(() => {
    if (accessToken) {
      dispatch({ type: 'INITIALIZE_WEB_SOCKET' });
    }

    return () => {
      disconnectWebSocket();
    };
  }, [dispatch, accessToken]);

  return <></>;
};
