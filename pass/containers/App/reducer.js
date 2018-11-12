/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_ERROR,
  UPDATE_USER_ACCOUNT,
  UPDATE_PHONE_CODE,
  UPDATE_STEP,
  UPDATE_IMG_CODE,
  UPDATE_IMAGE_URL,
  UPDATE_PHONE_CODE_BUTTON_TEXT,
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

// The initial state of the App
const initialState = fromJS({
  error: false, // 全局错误处理
  userAccount: '', // 手机号或用户名
  phoneCode: '', // 手机验证码
  phoneCodeButtonText: '', // 获取手机验证码button名称（普通手机号）
  ssnCodeButtonText: '', // 获取手机验证码button名称 （已登录手机号，用在换绑手机号）
  step: 0,
  imgCode: '',
  imageUrl: '',
  showRefreshCaptchaModal: false,
  showRiskPwdModal: false,
  messageData: {
    key: 'sdk', // 区分是SDK提示的错误，还是自定义错误，自定义错误值是messages中定义的key
    type: 'empty',
    msg: '',
  },
  password: '',
  newPassword: '',
  repeatPassword: '',
  token: '',
  userInfo: {
    userName: '',
    userPhone: '',
  },
  showLogin: false,
  loginByPhone: true,
  bindPhoneStatus: 0,
  phoneNumber: '',
  showPhoneNumber: false,
  sendMessage: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ERROR:
      return state
        .set('error', fromJS(action.error));
    case UPDATE_USER_ACCOUNT:
      return state
        .set('userAccount', action.payload);
    case UPDATE_PHONE_CODE:
      return state
        .set('phoneCode', action.payload);
    case UPDATE_PHONE_CODE_BUTTON_TEXT:
      return state
        .set('phoneCodeButtonText', action.payload);
    case UPDATE_STEP:
      return state
        .set('step', action.payload);
    case UPDATE_IMG_CODE:
      return state
        .set('imgCode', action.payload);
    case UPDATE_IMAGE_URL:
      return state
        .set('imageUrl', action.payload);
    case UPDATE_SHOW_REFRESH_CAPTCHA_MODAL:
      return state
        .set('showRefreshCaptchaModal', action.payload);
    case UPDATE_MESSAGE_DATA:
      return state
        .set('messageData', fromJS(action.payload));
    case UPDATE_PASSWORD:
      return state
        .set('password', action.payload);
    case UPDATE_NEW_PASSWORD:
      return state
        .set('newPassword', action.payload);
    case UPDATE_REPEAT_PASSWORD:
      return state
        .set('repeatPassword', action.payload);
    case UPDATE_TOKEN:
      return state
        .set('token', action.payload);
    case UPDATE_USER_INFO:
      return state
        .set('userInfo', fromJS(action.payload));
    case UPDATE_SHOW_LOGIN:
      return state
        .set('showLogin', action.payload);
    case UPDATE_LOGIN_BY_PHONE:
      return state
        .set('loginByPhone', action.payload);
    case UPDATE_SHOW_RISK_PWD_MODAL:
      return state
        .set('showRiskPwdModal', action.payload);
    case UPDATE_BIND_PHONE_STATUS:
      return state
        .set('bindPhoneStatus', action.payload);
    case UPDATE_PHONE_NUMBER:
      return state
        .set('phoneNumber', action.payload);
    case UPDATE_SHOW_PHONE_NUMBER:
      return state
        .set('showPhoneNumber', action.payload);
    case UPDATE_SSN_CODE_BUTTON_TEXT:
      return state
        .set('ssnCodeButtonText', action.payload);
    case UPDATE_SEND_MESSAGE:
      return state
        .set('sendMessage', action.payload);
    default:
      return state;
  }
}

export default appReducer;
