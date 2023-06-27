import { store } from 'store';

import { User, YtSharedVideo } from './entities.type';

export type RootState = ReturnType<typeof store.getState>;

export type PersistedAppState = {
  accessToken: string | null;
  profile: User;
};

export type YtSharedVideoState = {
  data: YtSharedVideo[];
};
