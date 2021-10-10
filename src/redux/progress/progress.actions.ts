import progressActionsTypes from './progress.types';

export const progressTracking = (progress: number) => ({
  type: progressActionsTypes.PROGRESS_TRACKING,
  payload: progress,
});

export const progressRefresh = () => ({
  type: progressActionsTypes.PROGRESS_REFRESH,
});

//export const saveUserProgress = (
//userAuth: any,
//progress: number,
//time: number,
//wpm: number,
//errors: object
//) => {};

export const customTextAddAction = (text: string) => ({
  type: progressActionsTypes.CUSTOM_TEXT_ADD,
  payload: text,
});

export const saveProgress = (payload: object) => ({
  type: progressActionsTypes.SAVE_PROGRESS,
  payload: payload,
});
