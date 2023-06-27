export type FetchData<T = any, R extends Record<string, any> = {}> = {
  [P in keyof R]?: R[P];
} & {
  data?: T;
  type?: string;
};
