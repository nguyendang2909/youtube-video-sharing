import React from 'react';
import { api } from 'services/api';

export const HomePageContent: React.FC = () => {
  const { data } = api.useGetSharedVideosQuery(undefined);
  console.log(data);
  return (
    <>
      asdasdasdasd
      <br />
      dasda <br />
      dasda <br />
      dasda <br />
      dasda <br />
      dasda <br />
      dasda <br />
      dasda
    </>
  );
};
