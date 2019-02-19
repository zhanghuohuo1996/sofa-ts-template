/**
 * 控制全局异步请求的基本流程，所有的get、post请求均在此进行处理；
 */

import { notification } from 'antd';
import { isFunction, isEmpty } from 'lodash';
import { SofaAction } from '../../types';

import {
  take,
  fork,
  call,
  put,
  cancel,
} from 'redux-saga/effects';

import {
  FATCH_ACTION_PREFIX,
  FATCH_ACTION_SUCCESS_PREFIX,
  FATCH_ACTION_ERROR_PREFIX,
  USER_NOT_LOGIN_ERRNO,
  USER_NOT_EXIST_ERRNO,
} from 'utils/constants';

import { gotoPass } from 'config/pass.conf';

import { updatePlatformAuth } from '../../state/actions';

export const getSagaFetchActionType = (actionType: string) => actionType && actionType.split('_')[1];

/**
 * @param {*} action {
 *  type: [string], // FATCH_ACTION_PREFIX + ....
 *  service: [function], // 异步调用的service
 *  loadingAction: [function], // actionCreator, 需要对异步设置开始结束标志位
 *  success: [actionObject | function], // actionCreator，成功后的回调，但是不太建议使用，整体流程控制会不太清晰；
 * }
 */
function* fetchSaga(action: SofaAction) {
  try {
    // 若请求需要改变loading状态或者需要对异步设置开始、结束标志位，在action中加入loadingAction参数
    yield action.loadingAction && put(action.loadingAction(true));

    // 调用Service
    const result = yield call(action.service, action.params ? action.params : {});

    // 如果有loading，终止loading
    yield action.loadingAction && put(action.loadingAction(false));

    if (result) {
      if (result.errno === 0 || result.errno === '0') { // 【成功】
        if (action.type.indexOf('_POST_') > -1) { // 预设只有post接口在正确时显示信息
          notification.success({
            message: '操作成功',
          });
        }
        // 发送成功action，reducer可据此获得异步数据，更新store；其他saga可拦截此action做进一步的流程控制；
        yield put({ type: `${FATCH_ACTION_SUCCESS_PREFIX}${action.type}`, payload: result });

        // 成功后有后续任务，写在action.success，当多级任务时，考虑使用单独的saga完成
        if (action.success) {
          if ((action.success as SofaAction).type) {
            yield put({
              ...action.success,
              payload: (action.success as SofaAction).params,
            } as SofaAction);
          }
          if (isFunction(action.success)) {
            yield put(action.success());
          }
        }
      } else { // 【失败】
        if (result.errno === USER_NOT_LOGIN_ERRNO) { // 未登录，跳转登录
          gotoPass('login');
          return;
        }
        if (result.errno === USER_NOT_EXIST_ERRNO) { // pass存在，平台不存在帐号
          yield put(updatePlatformAuth(false));
          gotoPass('login');
          return;
        }
        notification.error({ // 不同于请求成功，所有的请求都会暴露失败消息
          message: result.errmsg ? result.errmsg : '操作失败，请稍候再试',
        });
        // 发送失败action，reducer可据此更新store；其他saga可拦截此action做进一步的流程控制；
        yield put({ type: `${FATCH_ACTION_ERROR_PREFIX}${action.type}`, payload: result });
      }
    } else {
      notification.error({
        message: '网络错误，请稍候再试',
      });
      yield put({ type: `${FATCH_ACTION_ERROR_PREFIX}${action.type}`, payload: result });
    }
  } catch (error) {
    notification.error({
      message: '网络错误，请稍候再试',
    });
    yield put({ type: `${FATCH_ACTION_ERROR_PREFIX}${action.type}`, payload: error });

    yield action.loadingAction && put(action.loadingAction(false));
  }
}

// The watcher: watch actions and coordinate worker tasks
function* watchFetchRequests() {
  const taskArray: {
    [key: string]: any;
  } = {};

  while(true) {
    const action = yield take(
      (data: SofaAction) => !isEmpty(data.type.match(FATCH_ACTION_PREFIX)),
    );
    const { type } = action;
    if (!type || !action.service) {
      continue;
    }
    yield taskArray[type] && cancel(taskArray[type].task);
    const task = yield fork(fetchSaga, action);

    taskArray[action.type] = { task, action };
  }
}

export default watchFetchRequests;
