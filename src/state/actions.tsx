import {
  LOADING_DATA_ERROR,
  SHOW_LOADING,
  TOOGLE_LANG,
  GET_LOGIN_USER_INFO,
  UPDATE_PLATFORM_AUTH,
} from 'utils/constants';

import {
  getLoginUserInfoService,
} from './services';

export function loadingDataError(payload: any) {
  return {
    type: LOADING_DATA_ERROR,
    payload,
  };
}

export function showLoading(payload: any) {
  return {
    type: SHOW_LOADING,
    payload,
  };
}

export function toggleLang(payload: any) {
  return {
    type: TOOGLE_LANG,
    payload,
  };
}

export function getLoginUserInfo() {
  return {
    type: GET_LOGIN_USER_INFO,
    service: getLoginUserInfoService,
  };
}

export function updatePlatformAuth(payload: any) {
  return {
    type: UPDATE_PLATFORM_AUTH,
    payload,
  };
}

export default {};
