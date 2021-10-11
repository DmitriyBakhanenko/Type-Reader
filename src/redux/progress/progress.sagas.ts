import axios from 'axios';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fetchPoem, fetchPoemError, fetchPoemFinish } from './progress.actions';
import progressActionsTypes from './progress.types';

const takeLatest_any: any = takeLatest;

export function* fetchPoemStart() {
  try {
    const response: { data: any } = yield axios.get(
      'https://www.poemist.com/api/v1/randompoems'
    );
    const random = Math.floor(Math.random() * 6);

    /* eslint-disable */
    const text = response.data[random].content
      .replace(/[\n\r]+/g, ' ')
      .replace(/[\…]+/g, ':')
      .replace(/[\“\”]+/g, '"')
      .replace(/[\’]+/g, "'")
      .replace(/\s+/g, ' ');
    /* eslint-enable */
    yield put(
      fetchPoem({
        text,
        title: response.data[random].title,
        author: response.data[random].poet.name,
      })
    );
  } catch (error: any) {
    yield put(fetchPoemError());
    console.error(error.message);
  }
  yield put(fetchPoemFinish());
}

export function* onFetchPoemStart() {
  yield takeLatest_any(progressActionsTypes.FETCH_POEM_START, fetchPoemStart);
}

export function* progressSagas() {
  yield all([call(onFetchPoemStart)]);
}
