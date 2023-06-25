import { SignInForm } from 'containers/Form/SignInForm';
import { useAppSelector } from 'hooks/store.hook';
import React from 'react';

import { UserBox } from './UserBox';

export const HeaderRightBox: React.FC = () => {
  const accessToken = useAppSelector(state => state.app.accessToken);

  if (accessToken) {
    return <UserBox />;
  }

  return <SignInForm />;
};
