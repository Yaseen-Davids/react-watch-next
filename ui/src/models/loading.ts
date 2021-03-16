export type LoadingType = {
  loading: boolean;
  loaded: boolean;
  error?: Error | null;
};

export const defaultLoading: LoadingType = {
  loading: false,
  loaded: false,
  error: undefined,
};
