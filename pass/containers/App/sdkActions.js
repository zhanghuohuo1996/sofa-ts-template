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
  REFRESH_CAPTCHA_PASS,
  LOGIN_PWD_PASS,
  REFRESH_VCODE_BY_PHONE_V2_PASS,
  VALID_VCODE_BY_PHONE_PASS,
  RESET_PWD_PASS,
  EDIT_PWD_PASS,
  CHECK_SSN_PASS,
  GET_STOKEN_PASS,
  LOGIN_VCODE_PASS,
  SET_PWD_PASS,
  LOGOUT_PASS,
  CHANGE_BIND_PHONE_STATUS_PASS,
  REFRESH_VCODE_BY_SSN_V2_PASS,
  VALID_VCODE_BY_SSN_PASS,
  CHANGE_BIND_PHONE_COMMIT_PASS,
} from './constants';

export function refreshCaptchaPass() {
  return {
    type: REFRESH_CAPTCHA_PASS,
  };
}

export function loginPwdPass() {
  return {
    type: LOGIN_PWD_PASS,
  };
}

export function refreshVcodeByPhoneV2Pass() {
  return {
    type: REFRESH_VCODE_BY_PHONE_V2_PASS,
  };
}

export function validVcodeByPhonePass() {
  return {
    type: VALID_VCODE_BY_PHONE_PASS,
  };
}

export function resetPwdPass() {
  return {
    type: RESET_PWD_PASS,
  };
}

export function editPwdPass() {
  return {
    type: EDIT_PWD_PASS,
  };
}

export function logoutPass() {
  return {
    type: LOGOUT_PASS,
  };
}

export function checkSsnPass() {
  return {
    type: CHECK_SSN_PASS,
  };
}

export function getStokenPass() {
  return {
    type: GET_STOKEN_PASS,
  };
}

export function loginVcodePass() {
  return {
    type: LOGIN_VCODE_PASS,
  };
}

export function setPwdPass() {
  return {
    type: SET_PWD_PASS,
  };
}

export function changeBindPhoneStartPass() {
  return {
    type: CHANGE_BIND_PHONE_STATUS_PASS,
  };
}

export function refreshVcodeBySsnV2Pass() {
  return {
    type: REFRESH_VCODE_BY_SSN_V2_PASS,
  };
}

export function validVcodeBySsnPass() {
  return {
    type: VALID_VCODE_BY_SSN_PASS,
  };
}

export function changeBindPhoneCommitPass() {
  return {
    type: CHANGE_BIND_PHONE_COMMIT_PASS,
  };
}
