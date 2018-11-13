import { PROMISE_REJECT } from './constants';

// eslint-disable-next-line
const PASSICSDK = window._PASSICSDK;

// 1.更新图片验证码方法
export function refreshCaptchaPromise() {
  return new Promise((resolve, reject) => {
    try {
      const refreshCaptchaCallback = (args) => {
        resolve({
          type: 'refreshCaptcha',
          data: args.url,
        });
      };
      const config = {
        color: '000000',
      };
      PASSICSDK.refreshCaptcha(refreshCaptchaCallback, config);
    } catch (e) {
      reject({
        type: PROMISE_REJECT,
        data: e,
      });
    }
  });
}

// 2.账户+密码方式登录方法
export function loginPwdPromise(userName, password, vcode) {
  return new Promise((resolve, reject) => {
    try {
      const loginSuccessCallback = () => {
        resolve({
          type: 'success',
        });
      };
      const loginFailCallback = (args) => {
        resolve({
          type: 'fail',
          data: args.errmsg,
        });
      };
      const freshCaptchaCallback = () => {
      };
      const riskPwdCallback = (args) => {
        resolve({
          type: 'risk',
          data: args.token,
        });
      };
      PASSICSDK.loginPwd(userName, password, vcode, loginSuccessCallback, loginFailCallback, freshCaptchaCallback, riskPwdCallback);
    } catch (e) {
      reject(e);
    }
  });
}

// 3.发送短信验证码方法
export function refreshVcodeByPhoneV2Promise(userPhone, imgCode) {
  return new Promise((resolve, reject) => {
    try {
      const startIntervalCallback = (args) => {
        resolve({
          type: 'startInterval',
          data: args.count,
        });
      };
      const intervalsCallback = () => {
      };
      const endIntervalCallback = () => {
      };
      const failCallback = (args) => {
        resolve({
          type: 'fail',
          data: args.errmsg,
        });
      };
      const refreshCaptchaCallBack = (args) => {
        resolve({
          type: 'refreshCaptcha',
          data: args,
        });
      };
      PASSICSDK.refreshVcodeByPhone_v2(userPhone, failCallback, startIntervalCallback, intervalsCallback, endIntervalCallback, imgCode, refreshCaptchaCallBack);
    } catch (e) {
      reject({
        type: PROMISE_REJECT,
        data: e,
      });
    }
  });
}

// 4.设置密码方法(密码存在风险强制修改)
export function setPwdPromise(password, token) {
  return new Promise((resolve, reject) => {
    try {
      const loginSuccessCallback = () => {
        resolve({
          type: 'success',
        });
      };
      const failCallback = (args) => {
        resolve({
          type: 'fail',
          data: args.errmsg,
        });
      };
      const tokenExpiredCallback = () => {
        resolve({
          type: 'expire',
          data: '',
        });
      };
      PASSICSDK.setPwd(password, token, loginSuccessCallback, tokenExpiredCallback, failCallback);
    } catch (e) {
      reject({
        type: PROMISE_REJECT,
        data: e,
      });
    }
  });
}

// 5.手机号+短信验证码登录方法
export function loginVcodePromise(userPhone, phoneCode) {
  return new Promise((resolve, reject) => {
    try {
      const loginSuccessCallback = () => {
        resolve({
          type: 'success',
        });
      };
      const loginFailCallback = (args) => {
        resolve({
          type: 'fail',
          data: args.errmsg,
        });
      };
      const riskPwdCallback = (args) => {
        resolve({
          type: 'risk',
          data: args.token,
        });
      };
      PASSICSDK.loginVcode(userPhone, phoneCode, loginSuccessCallback, loginFailCallback, riskPwdCallback);
    } catch (e) {
      reject({
        type: PROMISE_REJECT,
        data: e,
      });
    }
  });
}

// 6.登出方法
export function logoutPromise() {
  return new Promise((resolve, reject) => {
    try {
      const callback = () => {
        resolve({
          type: 'success',
        });
      };
      PASSICSDK.logout(callback);
    } catch (e) {
      reject({
        type: PROMISE_REJECT,
        data: e,
      });
    }
  });
}

// 7.短信验证码验证输入手机号方法
export function validVcodeByPhonePromise(userPhone, phoneCode) {
  return new Promise((resolve, reject) => {
    try {
      const succCallback = (args) => {
        resolve({
          type: 'success',
          data: args.token,
        });
      };
      const failCallback = (args) => {
        resolve({
          type: 'fail',
          data: args.errmsg,
        });
      };
      PASSICSDK.validVcodeByPhone(userPhone, phoneCode, succCallback, failCallback);
    } catch (e) {
      reject({
        type: PROMISE_REJECT,
        data: e,
      });
    }
  });
}

// 8.未登录用户找回密码方法
export function resetPwdPromise(password, token) {
  return new Promise((resolve, reject) => {
    try {
      const resetSuccCallback = () => {
        resolve({
          type: 'success',
        });
      };
      const resetTokenExpireCallback = () => {
        resolve({
          type: 'expire',
        });
      };
      const resetFailCallback = (args) => {
        resolve({
          type: 'fail',
          data: args.errmsg,
        });
      };
      PASSICSDK.resetPwd(password, token, resetSuccCallback, resetTokenExpireCallback, resetFailCallback);
    } catch (e) {
      reject({
        type: PROMISE_REJECT,
        data: e,
      });
    }
  });
}

// 9.给当前登录的用户发送短信验证码
export function refreshVcodeBySsnV2Promise(vcode) {
  return new Promise((resolve, reject) => {
    try {
      const invalidSessionCallback = () => {
        resolve({
          type: 'invalid',
        });
      };
      const startIntervalCallback = () => {
        resolve({
          type: 'startInterval',
        });
      };
      const intervalsCallback = () => {
      };
      const endIntervalCallback = () => {
      };
      const refreshCaptchaCallBack = () => {
        resolve({
          type: 'refreshCaptcha',
        });
      };
      const failCallback = (args) => {
        resolve({
          type: 'fail',
          data: args.errmsg,
        });
      };
      PASSICSDK.refreshVcodeBySsn_v2(invalidSessionCallback, failCallback, startIntervalCallback, intervalsCallback,
        endIntervalCallback, vcode, refreshCaptchaCallBack);
    } catch (e) {
      reject({
        type: PROMISE_REJECT,
        data: e,
      });
    }
  });
}

// 10.验证当前登录用户的短信验证码
export function validVcodeBySsnPromise(phoneCode) {
  return new Promise((resolve, reject) => {
    try {
      const succCallback = (args) => {
        resolve({
          type: 'success',
          data: args.token,
        });
      };
      const invalidSessionCallback = () => {
        resolve({
          type: 'invalid',
        });
      };
      const failCallback = (args) => {
        resolve({
          type: 'fail',
          data: args.errmsg,
        });
      };
      PASSICSDK.validVcodeBySsn(phoneCode, succCallback, invalidSessionCallback, failCallback);
    } catch (e) {
      reject({
        type: PROMISE_REJECT,
        data: e,
      });
    }
  });
}

// 11.用户修改密码方法
export function modifyPwdPromise(pwd, newPwd) {
  return new Promise((resolve, reject) => {
    try {
      const succCallback = () => {
        resolve({
          type: 'success',
        });
      };
      const failCallback = (args) => {
        resolve({
          type: 'fail',
          data: args.errmsg,
        });
      };
      const invalidSessionCallback = () => {
        resolve({
          type: 'invalid',
        });
      };
      PASSICSDK.modifyPwd(pwd, newPwd, succCallback, invalidSessionCallback, failCallback);
    } catch (e) {
      reject({
        type: PROMISE_REJECT,
        data: e,
      });
    }
  });
}

// 12.更换手机号方法1
export function changeBindPhoneStartPromise() {
  return new Promise((resolve, reject) => {
    try {
      const haveBindPhoneCallback = (args) => {
        // 返回手机号
        resolve({
          type: 'bind',
          data: args.phone,
        });
      };
      const noBindPhoneCallback = () => {
        resolve({
          type: 'nobind',
        });
      };
      const invalidSessionCallback = () => {
        resolve({
          type: 'invalid',
        });
      };
      PASSICSDK.changeBindPhoneStart(haveBindPhoneCallback, noBindPhoneCallback, invalidSessionCallback);
    } catch (e) {
      reject({
        type: PROMISE_REJECT,
        data: e,
      });
    }
  });
}

// 13.更换手机号方法2
export function changeBindPhoneCommitPromise(userPhone, phoneCode, token) {
  return new Promise((resolve, reject) => {
    try {
      const succCallback = () => {
        resolve({
          type: 'success',
        });
      };
      const tokenExpiredCallback = () => {
        resolve({
          type: 'expire',
        });
      };
      const invalidSessionCallback = () => {
        resolve({
          type: 'invalid',
        });
      };
      const failCallback = (args) => {
        resolve({
          type: 'fail',
          data: args.errmsg,
        });
      };
      PASSICSDK.changeBindPhoneCommit(userPhone, phoneCode, token, succCallback, tokenExpiredCallback, invalidSessionCallback, failCallback);
    } catch (e) {
      reject({
        type: PROMISE_REJECT,
        data: e,
      });
    }
  });
}

// 14. 重新获取STOKEN
export function getStokenPromise() {
  return new Promise((resolve, reject) => {
    try {
      const succCallback = () => {
        // 返回stoken
        resolve({
          type: 'success',
        });
      };
      const failCallback = () => {
        resolve({
          type: 'fail',
        });
      };
      PASSICSDK.getStoken(succCallback, failCallback);
    } catch (e) {
      reject({
        type: PROMISE_REJECT,
        data: e,
      });
    }
  });
}

// 15. 获取用户登录状态
export function checkSsnPromise() {
  return new Promise((resolve, reject) => {
    try {
      const validSessionCallback = (args) => {
        ;
        resolve({
          type: 'valid',
          data: args,
        });
      };
      const inValidSessionCallback = () => {
        ;
        resolve({
          type: 'fail',
        });
      };
      const failCallback = () => {
        ;
        resolve({
          type: 'fail',
        });
      };
      PASSICSDK.checkSsn(validSessionCallback, inValidSessionCallback, failCallback);
    } catch (e) {
      ;
      reject({
        type: PROMISE_REJECT,
        data: e,
      });
    }
  });
}
