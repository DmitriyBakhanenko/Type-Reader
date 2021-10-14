import progressActionsTypes from './progress.types';

const INITIAL_STATE = {
  progress: 0,
  error: null,
  isLoading: false,
  customText: '',
  time: 0,
  errors: {},
  wpm: 0,
  poet: {},
  startTime: 0,
};

const progressReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case progressActionsTypes.READ_USER_PROGRESS_START:
    case progressActionsTypes.WRITE_USER_PROGRESS_START:
      return {
        ...state,
      };
    case progressActionsTypes.PROGRESS_TIME_START:
      return {
        ...state,
        startTime: action.payload,
      };
    case progressActionsTypes.FETCH_POEM_START:
      return {
        ...state,
        isLoading: true,
      };
    case progressActionsTypes.FETCH_POEM_FINISH:
      return {
        ...state,
        isLoading: false,
      };
    case progressActionsTypes.FETCH_POEM:
      return {
        ...state,
        customText: action.payload.text,
        poet: { name: action.payload.author, title: action.payload.title },
      };
    case progressActionsTypes.PROGRESS_TRACKING:
      return {
        ...state,
        progress: action.payload,
      };
    case progressActionsTypes.ERROR_TRACKING:
      return {
        ...state,
        errors: action.payload,
      };
    case progressActionsTypes.PROGRESS_REFRESH:
      return {
        ...state,
        progress: 0,
        errors: {},
        time: 0,
        wpm: 0,
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
      };

    default:
      return {
        ...state,
      };
  }
};

export default progressReducer;
