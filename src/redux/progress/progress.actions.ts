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

export const fetchRandomFactStart = () => ({
  type: progressActionsTypes.FETCH_RANDOM_FACT_START,
});

export const fetchRandomFactFinish = () => ({
  type: progressActionsTypes.FETCH_RANDOM_FACT_FINISH,
});

export const fetchRandomFactError = () => ({
  type: progressActionsTypes.FETCH_RANDOM_FACT_ERROR,
});

export const fetchRandomFact = (data: object) => ({
  type: progressActionsTypes.FETCH_RANDOM_FACT,
  payload: data,
});
