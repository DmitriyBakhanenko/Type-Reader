import { createSelector } from 'reselect';

export const selectProgress = (state: any) => state.progress;

export const selectCurrentProgress = createSelector(
  [selectProgress],
  (state) => state.progress
);

export const selectCurrentErrors = createSelector(
  [selectProgress],
  (state) => state.errors
);

export const selectStartTime = createSelector(
  [selectProgress],
  (state) => state.startTime
);

export const selectCustomText = createSelector(
  [selectProgress],
  (state) => state.customText
);

export const selectIsLoading = createSelector(
  [selectProgress],
  (state) => state.isLoading
);
