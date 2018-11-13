/**
 * Gets the repositories of the user from Github
 */

import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  HOME_PAGE_URL, LOGIN_PAGE_URL, REFRESH_CAPTCHA_PASS, REFRESH_VCODE_BY_PHONE_V2_PASS,
  VALID_VCODE_BY_PHONE_PASS, RESET_PWD_PASS, EDIT_PWD_PASS, CHECK_SSN_PASS, GET_STOKEN_PASS,
  LOGIN_VCODE_PASS, SET_PWD_PASS, LOGIN_PWD_PASS, LOGOUT_PASS, CHANGE_BIND_PHONE_STATUS_PASS,
  REFRESH_VCODE_BY_SSN_V2_PASS, VALID_VCODE_BY_SSN_PASS, CHANGE_BIND_PHONE_COMMIT_PASS,
} from './constants';
import {
  repoLoadingError, updateImageUrl, updatePhoneCodeButtonText, updateToken,
  updateMessageData, updateStep, updateShowRefreshCaptureModal, updateImgCode,
  updateUserInfo, updateShowLogin, updateShowRiskPwdModal, updateBindPhoneStatus,
  updatePhoneNumber, updateShowPhoneNumber, updateUserAccount, updatePhoneCode,
  updateSsnCodeButtonText, updateSendMessage,
} from './actions';
import {
  refreshCaptchaPromise, refreshVcodeByPhoneV2Promise, validVcodeByPhonePromise,
  resetPwdPromise, checkSsnPromise, getStokenPromise, loginVcodePromise, setPwdPromise,
  loginPwdPromise, logoutPromise, changeBindPhoneStartPromise, refreshVcodeBySsnV2Promise,
  validVcodeBySsnPromise, changeBindPhoneCommitPromise, modifyPwdPromise,
} from './sdkMethods';
import {
  makeSelectUserAccount, makeSelectPhoneCode, makeSelectImgCode, makeSelectToken,
  makeSelectNewPassword, makeSelectPassword,
} from './selectors';
import { refreshCaptchaPass } from './sdkActions';


// 1.更新图片验证码方法
function* refreshCaptcha() {
  try {
    yield delay(200);
    const result = yield call(refreshCaptchaPromise);
    switch (result.type) {
      case 'refreshCaptcha':
        yield put(updateImageUrl(result.data));
        break;
      default:
        yield put(repoLoadingError(result.data));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// 2.账户+密码方式登录方法
function* loginPwd() {
  try {
    yield delay(200);
    const userAccount = yield select(makeSelectUserAccount());
    const password = yield select(makeSelectPassword());
    const imgCode = yield select(makeSelectImgCode());
    const result = yield call(loginPwdPromise, userAccount, password, imgCode);
    switch (result.type) {
      case 'success':
        window.location.href = HOME_PAGE_URL;
        break;
      case 'fail':
        yield put(refreshCaptchaPass());
        yield put(updateMessageData({
          key: 'sdk',
          type: 'error',
          msg: result.data,
        }));
        break;
      case 'risk':
        yield put(updateShowRiskPwdModal(true));
        yield put(updateToken(result.data));
        yield put(updateMessageData({
          key: 'sdk',
          type: 'empty',
          msg: '',
        }));
        break;
      default:
        yield put(repoLoadingError(result.data));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// 3.发送短信验证码方法
function* refreshVcodeByPhoneV2() {
  try {
    yield delay(200);
    const userAccount = yield select(makeSelectUserAccount());
    const imgCode = yield select(makeSelectImgCode());
    const result = yield call(refreshVcodeByPhoneV2Promise, userAccount, imgCode);
    switch (result.type) {
      case 'startInterval':
        yield put(updatePhoneCodeButtonText(60));
        yield put(updateMessageData({
          key: 'captchaSent',
          type: 'success',
          msg: '',
        }));
        break;
      case 'fail':
        yield put(updateMessageData({
          key: 'sdk',
          type: 'error',
          msg: result.data,
        }));
        break;
      case 'refreshCaptcha':
        yield put(updateSendMessage(true));
        yield put(updateShowRefreshCaptureModal(true));
        yield put(refreshCaptchaPass());
        yield put(updateImgCode(''));
        break;
      default:
        yield put(repoLoadingError(result.data));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// 4.设置密码方法(密码存在风险强制修改)
function* setPwd() {
  try {
    yield delay(200);
    const password = yield select(makeSelectNewPassword());
    const token = yield select(makeSelectToken());
    const result = yield call(setPwdPromise, password, token);
    switch (result.type) {
      case 'success':
        window.location.href = HOME_PAGE_URL;
        yield put(updateShowRiskPwdModal(false));
        break;
      case 'fail':
        yield put(updateMessageData({
          key: 'sdk',
          type: 'error',
          msg: result.data,
        }));
        break;
      case 'expire':
        yield put(updateShowRiskPwdModal(false));
        yield put(updateMessageData({
          key: 'tokenExpiredNeedRelogin',
          type: 'error',
          msg: '',
        }));
        break;
      default:
        yield put(repoLoadingError(result.data));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// 5.手机号+短信验证码登录方法
function* loginVcode() {
  try {
    yield delay(200);
    const userAccount = yield select(makeSelectUserAccount());
    const phoneCode = yield select(makeSelectPhoneCode());
    const result = yield call(loginVcodePromise, userAccount, phoneCode);
    switch (result.type) {
      case 'success':
        window.location.href = HOME_PAGE_URL;
        break;
      case 'fail':
        yield put(updateMessageData({
          key: 'sdk',
          type: 'error',
          msg: result.data,
        }));
        break;
      case 'risk':
        yield put(updateShowRiskPwdModal(true));
        yield put(updateToken(result.data));
        yield put(updateMessageData({
          key: 'sdk',
          type: 'empty',
          msg: '',
        }));
        break;
      default:
        yield put(repoLoadingError(result.data));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// 6.登出方法
function* logout() {
  try {
    yield delay(200);
    const result = yield call(logoutPromise);
    switch (result.type) {
      case 'success':
        window.location.href = LOGIN_PAGE_URL;
        window.location.reload();
        break;
      default:
        yield put(repoLoadingError(result.data));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// 7.短信验证码验证输入手机号方法
function* validVcodeByPhone() {
  try {
    yield delay(200);
    const userAccount = yield select(makeSelectUserAccount());
    const phoneCode = yield select(makeSelectPhoneCode());
    const result = yield call(validVcodeByPhonePromise, userAccount, phoneCode);
    switch (result.type) {
      case 'success':
        yield put(updateToken(result.data));
        yield put(updateMessageData({
          key: 'sdk',
          type: 'empty',
          msg: '',
        }));
        yield put(updateStep(1));
        break;
      case 'fail':
        yield put(updateMessageData({
          key: 'sdk',
          type: 'error',
          msg: result.data,
        }));
        break;
      default:
        yield put(repoLoadingError(result.data));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// 8.未登录用户找回密码方法
function* resetPwd() {
  try {
    yield delay(200);
    const password = yield select(makeSelectNewPassword());
    const token = yield select(makeSelectToken());
    const result = yield call(resetPwdPromise, password, token);
    switch (result.type) {
      case 'success':
        window.location.href = LOGIN_PAGE_URL;
        window.location.reload();
        break;
      case 'expire':
        yield put(updateMessageData({
          key: 'tokenExpiredNeedRelogin',
          type: 'error',
          msg: '',
        }));
        break;
      case 'fail':
        yield put(updateMessageData({
          key: 'sdk',
          type: 'error',
          msg: result.data,
        }));
        break;
      default:
        yield put(repoLoadingError(result.data));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// 9.给当前登录的用户发送短信验证码
function* refreshVcodeBySsnV2() {
  try {
    yield delay(200);
    const imgCode = yield select(makeSelectImgCode());
    const result = yield call(refreshVcodeBySsnV2Promise, imgCode);
    switch (result.type) {
      case 'invalid':
        yield put(updateMessageData({
          key: 'loginStatusFailed',
          type: 'error',
          msg: '',
        }));
        break;
      case 'startInterval':
        yield put(updateShowPhoneNumber(true));
        yield put(updateSsnCodeButtonText(60));
        yield put(updateMessageData({
          key: 'captchaSent',
          type: 'success',
          msg: '',
        }));
        break;
      case 'refreshCaptcha':
        yield put(updateSendMessage(true));
        yield put(updateShowPhoneNumber(false));
        yield put(updateShowRefreshCaptureModal(true));
        yield put(refreshCaptchaPass());
        yield put(updateImgCode(''));
        break;
      case 'fail':
        yield put(updateMessageData({
          key: 'sdk',
          type: 'error',
          msg: result.data,
        }));
        break;
      default:
        yield put(repoLoadingError(result.data));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// 10.验证当前登录用户的短信验证码
function* validVcodeBySsn() {
  try {
    yield delay(200);
    const phoneCode = yield select(makeSelectPhoneCode());
    const result = yield call(validVcodeBySsnPromise, phoneCode);
    switch (result.type) {
      case 'success':
        yield put(updateStep(1));
        yield put(updateToken(result.data));
        yield put(updateUserAccount(''));
        yield put(updatePhoneCode(''));
        yield put(updateMessageData({
          key: 'sdk',
          type: 'empty',
          msg: '',
        }));
        break;
      case 'invalid':
        yield put(updateMessageData({
          key: 'loginStatusFailed',
          type: 'error',
          msg: '',
        }));
        break;
      case 'fail':
        yield put(updateMessageData({
          key: 'sdk',
          type: 'error',
          msg: result.data,
        }));
        break;
      default:
        yield put(repoLoadingError(result.data));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// 11.用户修改密码方法
function* editPwd() {
  try {
    yield delay(200);
    const password = yield select(makeSelectPassword());
    const newPassword = yield select(makeSelectNewPassword());
    const result = yield call(modifyPwdPromise, password, newPassword);
    switch (result.type) {
      case 'success':
        window.location.href = HOME_PAGE_URL;
        break;
      case 'invalid':
        yield put(updateMessageData({
          key: 'loginStatusFailed',
          type: 'error',
          msg: '',
        }));
        break;
      case 'fail':
        yield put(updateMessageData({
          key: 'sdk',
          type: 'error',
          msg: result.data,
        }));
        break;
      default:
        yield put(repoLoadingError(result.data));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// 12.更换手机号方法1
function* changeBindPhoneStart() {
  try {
    yield delay(200);
    const result = yield call(changeBindPhoneStartPromise);
    switch (result.type) {
      case 'bind':
        yield put(updateBindPhoneStatus(2));
        yield put(updatePhoneNumber(result.data));
        break;
      case 'nobind':
        yield put(updateBindPhoneStatus(1));
        break;
      case 'invalid':
        yield put(updateBindPhoneStatus(3));
        break;
      default:
        yield put(repoLoadingError(result.data));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// 13.更换手机号方法2
function* changeBindPhoneCommit() {
  try {
    yield delay(200);
    const userAccount = yield select(makeSelectUserAccount());
    const phoneCode = yield select(makeSelectPhoneCode());
    const token = yield select(makeSelectToken());
    const result = yield call(changeBindPhoneCommitPromise, userAccount, phoneCode, token);
    switch (result.type) {
      case 'success':
        yield put(updateStep(2));
        setTimeout(() => {
          window.location.href = HOME_PAGE_URL;
        }, 5000);
        break;
      case 'expire':
        yield put(updateMessageData({
          key: 'tokenExpiredNeedRelogin',
          type: 'error',
          msg: '',
        }));
        break;
      case 'invalid':
        yield put(updateMessageData({
          key: 'loginStatusFailed',
          type: 'error',
          msg: '',
        }));
        break;
      case 'fail':
        yield put(updateMessageData({
          key: 'sdk',
          type: 'error',
          msg: result.data,
        }));
        break;
      default:
        yield put(repoLoadingError(result.data));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// 14. 重新获取STOKEN
function* getStoken() {
  try {
    yield delay(200);
    const result = yield call(getStokenPromise);
    switch (result.type) {
      case 'success':
        window.location.href = HOME_PAGE_URL;
        break;
      case 'fail':
        yield put(updateShowLogin(true));
        break;
      default:
        yield put(repoLoadingError(result.data));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// 15. 获取用户登录状态
function* checkSsn() {
  try {
    yield delay(200);
    const result = yield call(checkSsnPromise);
    switch (result.type) {
      case 'valid':
        yield put(updateUserInfo({
          userName: result.data.uname,
          userPhone: result.data.phone,
        }));
        break;
      case 'fail':
        yield put(updateShowLogin(true));
        break;
      default:
        yield put(repoLoadingError(result.data));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* watcher(type, process) {
  yield takeLatest(type, process);
}
/**
 * Root saga manages watcher lifecycle
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield [
    call(() => watcher(`${REFRESH_CAPTCHA_PASS}`, refreshCaptcha)),
    call(() => watcher(`${REFRESH_VCODE_BY_PHONE_V2_PASS}`, refreshVcodeByPhoneV2)),
    call(() => watcher(`${VALID_VCODE_BY_PHONE_PASS}`, validVcodeByPhone)),
    call(() => watcher(`${RESET_PWD_PASS}`, resetPwd)),
    call(() => watcher(`${EDIT_PWD_PASS}`, editPwd)),
    call(() => watcher(`${CHECK_SSN_PASS}`, checkSsn)),
    call(() => watcher(`${GET_STOKEN_PASS}`, getStoken)),
    call(() => watcher(`${LOGIN_VCODE_PASS}`, loginVcode)),
    call(() => watcher(`${SET_PWD_PASS}`, setPwd)),
    call(() => watcher(`${LOGIN_PWD_PASS}`, loginPwd)),
    call(() => watcher(`${LOGOUT_PASS}`, logout)),
    call(() => watcher(`${CHANGE_BIND_PHONE_STATUS_PASS}`, changeBindPhoneStart)),
    call(() => watcher(`${REFRESH_VCODE_BY_SSN_V2_PASS}`, refreshVcodeBySsnV2)),
    call(() => watcher(`${VALID_VCODE_BY_SSN_PASS}`, validVcodeBySsn)),
    call(() => watcher(`${CHANGE_BIND_PHONE_COMMIT_PASS}`, changeBindPhoneCommit)),
  ];
}
