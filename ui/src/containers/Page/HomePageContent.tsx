import { ThumbUpOffAlt } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';
import { useAppSelector } from 'hooks/store.hook';
import React from 'react';

export const HomePageContent: React.FC = () => {
  const ytSharedVideos = useAppSelector(state => state.ytSharedVideo.data);

  return (
    <Box mt={4} data-testid="sharedVideoContent">
      <Container>
        <Box className="flex gap-6 flex-col">
          {ytSharedVideos.map(item => {
            const { id, title, user, videoId, description, likeCount } = item;

            return (
              <Box key={id} data-testid="videoBox">
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Box>
                    <Box
                      className="relative w-full h-0"
                      sx={{ paddingBottom: '56.25%' }}
                    >
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        width="100%"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={title}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Box px={2}>
                      <Box>
                        <Typography data-testid="videoTitle" color="red">
                          {title}
                        </Typography>
                      </Box>
                      <Box data-testid="sharedUser">
                        Shared by: {user?.email}
                      </Box>
                      <Box>
                        <ThumbUpOffAlt /> {likeCount}
                      </Box>
                      <Box
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: '2',
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {description}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};
