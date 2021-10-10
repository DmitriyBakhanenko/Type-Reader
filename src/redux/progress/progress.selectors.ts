import { createSelector } from 'reselect';

export const selectProgress = (state: any) => state.progress;

export const selectCurrentProgress = createSelector(
  [selectProgress],
  (state) => state.progress
);

export const selectCustomText = createSelector(
  [selectProgress],
  (state) => state.customText
);
