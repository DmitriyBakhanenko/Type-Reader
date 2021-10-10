import progressActionsTypes from './progress.types';

const INITIAL_STATE = {
  progress: 0,
  error: null,
  isLoading: false,
  customText: '',
  time: 0,
  errors: null,
  wpm: 0,
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
    case progressActionsTypes.CUSTOM_TEXT_ADD:
      return {
        ...state,
        customText: action.payload,
      };
    case progressActionsTypes.SAVE_PROGRESS:
      return {
        ...state,
        time: action.payload.time,
        wpm: action.payload.wpm,
        errors: action.payload.errors,
      };

    default:
      return {
        ...state,
      };
  }
};

export default progressReducer;
