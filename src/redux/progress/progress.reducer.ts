import progressActionsTypes from './progress.types';

const INITIAL_STATE = {
  progress: 0,
  error: null,
  isLoading: false,
};

const progressReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case progressActionsTypes.READ_USER_PROGRESS_START:
    case progressActionsTypes.WRITE_USER_PROGRESS_START:
      return {
        ...state,
      };
    case progressActionsTypes.PROGRESS_TRACKING:
      return {
        ...state,
        progress: action.payload,
      };
    case progressActionsTypes.PROGRESS_REFRESH:
      return {
        ...state,
        progress: 0,
      };

    default:
      return {
        ...state,
      };
  }
};

export default progressReducer;
