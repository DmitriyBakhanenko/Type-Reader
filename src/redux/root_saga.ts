import { all, call } from 'redux-saga/effects';

import { progressSagas } from './progress/progress.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(progressSagas)]);
}
