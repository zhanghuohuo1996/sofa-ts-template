/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import {
  LOAD_ERROR,
  UPDATE_STEP,
  UPDATE_USER_ACCOUNT,
  UPDATE_PHONE_CODE,
  UPDATE_PHONE_CODE_BUTTON_TEXT,
  UPDATE_IMG_CODE,
  UPDATE_IMAGE_URL,
  UPDATE_SHOW_REFRESH_CAPTCHA_MODAL,
  UPDATE_MESSAGE_DATA,
  UPDATE_PASSWORD,
  UPDATE_NEW_PASSWORD,
  UPDATE_REPEAT_PASSWORD,
  UPDATE_TOKEN,
  UPDATE_USER_INFO,
  UPDATE_SHOW_LOGIN,
  UPDATE_LOGIN_BY_PHONE,
  UPDATE_SHOW_RISK_PWD_MODAL,
  UPDATE_BIND_PHONE_STATUS,
  UPDATE_PHONE_NUMBER,
  UPDATE_SHOW_PHONE_NUMBER,
  UPDATE_SSN_CODE_BUTTON_TEXT,
  UPDATE_SEND_MESSAGE,
} from './constants';

export function repoLoadingError(error) {
  return {
    type: LOAD_ERROR,
    error,
  };
}

export function updateUserAccount(payload) {
  return {
    type: UPDATE_USER_ACCOUNT,
    payload,
  };
}

export function updatePhoneCode(payload) {
  return {
    type: UPDATE_PHONE_CODE,
    payload,
  };
}

export function updatePhoneCodeButtonText(payload) {
  return {
    type: UPDATE_PHONE_CODE_BUTTON_TEXT,
    payload,
  };
}

export function updateStep(payload) {
  return {
    type: UPDATE_STEP,
    payload,
  };
}

export function updateImgCode(payload) {
  return {
    type: UPDATE_IMG_CODE,
    payload,
  };
}


export function updateImageUrl(payload) {
  return {
    type: UPDATE_IMAGE_URL,
    payload,
  };
}

export function updateShowRefreshCaptureModal(payload) {
  return {
    type: UPDATE_SHOW_REFRESH_CAPTCHA_MODAL,
    payload,
  };
}

export function updateMessageData(payload) {
  return {
    type: UPDATE_MESSAGE_DATA,
    payload,
  };
}

export function updatePassword(payload) {
  return {
    type: UPDATE_PASSWORD,
    payload,
  };
}

export function updateNewPassword(payload) {
  return {
    type: UPDATE_NEW_PASSWORD,
    payload,
  };
}

export function updateRepeatPassword(payload) {
  return {
    type: UPDATE_REPEAT_PASSWORD,
    payload,
  };
}

export function updateToken(payload) {
  return {
    type: UPDATE_TOKEN,
    payload,
  };
}

export function updateUserInfo(payload) {
  return {
    type: UPDATE_USER_INFO,
    payload,
  };
}

export function updateShowLogin(payload) {
  return {
    type: UPDATE_SHOW_LOGIN,
    payload,
  };
}

export function updateLoginByPhone(payload) {
  return {
    type: UPDATE_LOGIN_BY_PHONE,
    payload,
  };
}

export function updateShowRiskPwdModal(payload) {
  return {
    type: UPDATE_SHOW_RISK_PWD_MODAL,
    payload,
  };
}

export function updateBindPhoneStatus(payload) {
  return {
    type: UPDATE_BIND_PHONE_STATUS,
    payload,
  };
}

export function updatePhoneNumber(payload) {
  return {
    type: UPDATE_PHONE_NUMBER,
    payload,
  };
}

export function updateShowPhoneNumber(payload) {
  return {
    type: UPDATE_SHOW_PHONE_NUMBER,
    payload,
  };
}

export function updateSsnCodeButtonText(payload) {
  return {
    type: UPDATE_SSN_CODE_BUTTON_TEXT,
    payload,
  };
}

export function updateSendMessage(payload) {
  return {
    type: UPDATE_SEND_MESSAGE,
    payload,
  };
}
