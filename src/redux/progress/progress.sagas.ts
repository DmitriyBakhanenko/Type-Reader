import { takeLatest, call, all } from 'redux-saga/effects';
import progressActionsTypes from './progress.types';

export function* fetchClipboardStart(props: any) {
  yield console.log('TODO');
}

export function* onClipboardFetch() {
  yield takeLatest(progressActionsTypes.CUSTOM_TEXT_ADD, fetchClipboardStart);
}

export function* progressSagas() {
  yield all([call(onClipboardFetch)]);
}
