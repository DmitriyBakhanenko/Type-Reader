import axios from 'axios';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fetchRandomFact, fetchRandomFactError, fetchRandomFactFinish } from './progress.actions';
import progressActionsTypes from './progress.types';
import { stringFilter } from '../../components/helper.methods'

const takeLatest_any: any = takeLatest;

export function* fetchRandomFactStart() {
  try {
    const response: { data: any } = yield axios.get(
      "https://catfact.ninja/fact"
    );

    const text = stringFilter(response.data.fact)
    yield put(
      fetchRandomFact({
        text,
        title: 'Random Facts About Cats',
        author: 'na',
      })
    );
  } catch (error: any) {
    yield put(fetchRandomFactError());
    console.error(error.message);
  }
  yield put(fetchRandomFactFinish());
}

export function* onFetchRandomFactStart() {
  yield takeLatest_any(progressActionsTypes.FETCH_RANDOM_FACT_START, fetchRandomFactStart);
}

export function* progressSagas() {
  yield all([call(onFetchRandomFactStart)]);
}
