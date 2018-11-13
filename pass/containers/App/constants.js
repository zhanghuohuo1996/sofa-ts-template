/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const DEFAULT_LOCALE = 'en';
export const PROMISE_RESOLVE = 'resolve';
export const PROMISE_REJECT = 'reject';

export const UPDATE_STEP = 'UPDATE_STEP';
export const UPDATE_USER_ACCOUNT = 'UPDATE_USER_ACCOUNT';
export const UPDATE_PHONE_CODE = 'UPDATE_PHONE_CODE';
export const UPDATE_PHONE_CODE_BUTTON_TEXT = 'UPDATE_PHONE_CODE_BUTTON_TEXT';
export const UPDATE_IMG_CODE = 'UPDATE_IMG_CODE';
export const UPDATE_IMAGE_URL = 'UPDATE_IMAGE_URL';
export const UPDATE_SHOW_REFRESH_CAPTCHA_MODAL = 'UPDATE_SHOW_REFRESH_CAPTCHA_MODAL';
export const UPDATE_MESSAGE_DATA = 'UPDATE_MESSAGE_DATA';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_NEW_PASSWORD = 'UPDATE_NEW_PASSWORD';
export const UPDATE_REPEAT_PASSWORD = 'UPDATE_REPEAT_PASSWORD';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const UPDATE_SHOW_LOGIN = 'UPDATE_SHOW_LOGIN';
export const UPDATE_LOGIN_BY_PHONE = 'UPDATE_LOGIN_BY_PHONE';
export const UPDATE_SHOW_RISK_PWD_MODAL = 'UPDATE_SHOW_RISK_PWD_MODAL';
export const UPDATE_BIND_PHONE_STATUS = 'UPDATE_BIND_PHONE_STATUS';
export const UPDATE_PHONE_NUMBER = 'UPDATE_PHONE_NUMBER';
export const UPDATE_SHOW_PHONE_NUMBER = 'UPDATE_SHOW_PHONE_NUMBER';
export const UPDATE_SSN_CODE_BUTTON_TEXT = 'UPDATE_SSN_CODE_BUTTON_TEXT';
export const UPDATE_SEND_MESSAGE = 'UPDATE_SEND_MESSAGE';

export const REFRESH_CAPTCHA_PASS = 'REFRESH_CAPTCHA_PASS';
export const REFRESH_VCODE_BY_PHONE_V2_PASS = 'REFRESH_VCODE_BY_PHONE_V2_PASS';
export const VALID_VCODE_BY_PHONE_PASS = 'VALID_VCODE_BY_PHONE_PASS';
export const RESET_PWD_PASS = 'RESET_PWD_PASS';
export const EDIT_PWD_PASS = 'EDIT_PWD_PASS'; // 修改密码
export const CHECK_SSN_PASS = 'CHECK_SSN_PASS';
export const GET_STOKEN_PASS = 'GET_STOKEN_PASS';
export const LOGIN_VCODE_PASS = 'LOGIN_VCODE_PASS';
export const SET_PWD_PASS = 'SET_PWD_PASS';
export const LOGIN_PWD_PASS = 'LOGIN_PWD_PASS';
export const LOGOUT_PASS = 'LOGOUT_PASS';
export const CHANGE_BIND_PHONE_STATUS_PASS = 'CHANGE_BIND_PHONE_STATUS_PASS';
export const REFRESH_VCODE_BY_SSN_V2_PASS = 'REFRESH_VCODE_BY_SSN_V2_PASS';
export const VALID_VCODE_BY_SSN_PASS = 'VALID_VCODE_BY_SSN_PASS';
export const CHANGE_BIND_PHONE_COMMIT_PASS = 'CHANGE_BIND_PHONE_COMMIT_PASS';

export const HOME_PAGE_URL = '/homepage';
export const LOGIN_PAGE_URL = '/static/pass.html#/login';
export const RESET_PWD_URL = '/static/pass.html#/resetpwd';
