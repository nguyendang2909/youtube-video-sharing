import { Box, Container } from '@mui/material';
import { SharedVideoBox } from 'containers/Box/SharedVideoBox';
import { useAppSelector } from 'hooks/store.hook';
import React from 'react';
import { api } from 'services/api';

export const HomePageContent: React.FC = () => {
  const ytSharedVideos = useAppSelector(state => state.ytSharedVideo.data);

  const { refetch } = api.useGetSharedVideosQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <Box mt={4} data-testid="sharedVideoContent">
      <Container>
        <Box className="flex gap-6 flex-col">
          {ytSharedVideos.map(item => {
            return (
              <SharedVideoBox key={item.id} data={item} refetch={refetch} />
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};
