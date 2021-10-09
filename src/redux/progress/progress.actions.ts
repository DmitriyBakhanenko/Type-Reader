import progressActionsTypes from './progress.types';

export const progressTracking = (progress: number) => ({
  type: progressActionsTypes.PROGRESS_TRACKING,
  payload: progress,
});

export const progressRefresh = () => ({
  type: progressActionsTypes.PROGRESS_REFRESH,
});
