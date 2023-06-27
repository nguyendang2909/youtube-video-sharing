export type User = {
  id?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type YtSharedVideo = {
  id?: string;
  user?: User;
  url?: string;
  videoId?: string;
  title?: string;
  viewCount?: number;
  likeCount?: number;
  favoriteCount?: number;
  commentCount?: number;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
};
