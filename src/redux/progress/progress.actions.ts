import progressActionsTypes from './progress.types';

export const progressTracking = (progress: number) => ({
  type: progressActionsTypes.PROGRESS_TRACKING,
  payload: progress,
});

export const progressRefresh = () => ({
  type: progressActionsTypes.PROGRESS_REFRESH,
});

export const customTextAddAction = (text: string) => ({
  type: progressActionsTypes.CUSTOM_TEXT_ADD,
  payload: text,
});

export const saveProgress = (payload: object) => ({
  type: progressActionsTypes.SAVE_PROGRESS,
  payload: payload,
});

export const errorTracking = (error: object) => ({
  type: progressActionsTypes.ERROR_TRACKING,
  payload: error,
});

export const fetchPoemStart = () => ({
  type: progressActionsTypes.FETCH_POEM_START,
});

export const fetchPoemFinish = () => ({
  type: progressActionsTypes.FETCH_POEM_FINISH,
});

export const fetchPoemError = () => ({
  type: progressActionsTypes.FETCH_POEM_ERROR,
});

export const fetchPoem = (data: object) => ({
  type: progressActionsTypes.FETCH_POEM,
  payload: data,
});
