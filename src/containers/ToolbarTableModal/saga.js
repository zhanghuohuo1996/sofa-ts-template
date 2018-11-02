/**
 * 使用saga进行流程处理；
 */

import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { FATCH_ACTION_SUCCESS_PREFIX, PER_PAGE } from 'utils/constants';

import { loadingDataError } from '../../state/actions';
import { getDriverList, updateSelectedRows } from './actions';
import { makeSelectSearchCondition } from './selectors';
import { POST_DRIVER_ACCOUNT_STATUS } from './constants';

export function* trainSuccess() {
  try {
    yield delay(200);
    const searchCondition = yield select(makeSelectSearchCondition());
    yield put(getDriverList({
      ...searchCondition,
      page: 1,
      perpage: PER_PAGE,
    }));
    yield put(updateSelectedRows([]));
  } catch (err) {
    yield put(loadingDataError(err));
  }
}

export function* watcher(type, process) {
  yield takeLatest(type, process);
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield [
    call(() => watcher(`${FATCH_ACTION_SUCCESS_PREFIX}${POST_DRIVER_ACCOUNT_STATUS}`, trainSuccess)),
  ];
}
