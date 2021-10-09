import { createSelector } from 'reselect';

const selectProgress = (state: any) => state.progress;

export const selectCurrentProgress = createSelector(
  [selectProgress],
  (progress) => progress.progress
);
