import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import progressReducer from './progress/progress.reducer';
import userReducer from './user/user.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['progress'],
};

const rootReducer = combineReducers({
  user: userReducer,
  progress: progressReducer,
});

export default persistReducer(persistConfig, rootReducer);
