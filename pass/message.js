/*
 * SystemManage Messages
 *
 * This contains all the text for the SystemManage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  username: {
    id: 'boilerplate.containers.login.username',
    defaultMessage: '用户名',
  },
  phone: {
    id: 'boilerplate.containers.login.phone',
    defaultMessage: '手机号',
  },
  phoneLoginTitle: {
    id: 'boilerplate.containers.login.phoneLoginTitle',
    defaultMessage: '手机短信登录',
  },
  usingThisAccount: {
    id: 'boilerplate.containers.login.usingThisAccount',
    defaultMessage: '使用此账号进入',
  },
  usingAnotherAccount: {
    id: 'boilerplate.containers.login.usingAnotherAccount',
    defaultMessage: '其他账号登录',
  },
  NoPermissionPleaseUsingAnotherAccount: {
    id: 'boilerplate.containers.login.NoPermissionPleaseUsingAnotherAccount',
    defaultMessage: '请联系相关人员开通权限或使用其他账号登录',
  },
  login: {
    id: 'boilerplate.containers.login.login',
    defaultMessage: '登录',
  },
  logout: {
    id: 'boilerplate.containers.login.logout',
    defaultMessage: '退出登录',
  },
  alreadyLogin: {
    id: 'boilerplate.containers.login.alreadyLogin',
    defaultMessage: '系统检测到您已登录账户',
  },
  NoPermissionToVisit: {
    id: 'boilerplate.containers.login.NoPermissionToVisit',
    defaultMessage: '登录账户无权限进入系统',
  },
  passwordLogin: {
    id: 'boilerplate.containers.login.passwordLogin',
    defaultMessage: '账号密码登录',
  },
  changeToPwdLogin: {
    id: 'boilerplate.containers.login.changeToPwdLogin',
    defaultMessage: '切换为账号密码登录',
  },
  changeToPhoneSMSLogin: {
    id: 'boilerplate.containers.login.changeToPhoneSMSLogin',
    defaultMessage: '切换为手机短信登录',
  },
  weakPassword: {
    id: 'boilerplate.containers.login.weakPassword',
    defaultMessage: '密码强度太弱，请输入8到32位由字母数字组成的密码',
  },
  cancel: {
    id: 'boilerplate.containers.login.cancel',
    defaultMessage: '取消',
  },
  confirm: {
    id: 'boilerplate.containers.login.confirm',
    defaultMessage: '确认',
  },
  forgetPwd: {
    id: 'boilerplate.containers.login.forgetPwd',
    defaultMessage: '忘记密码',
  },
  nextStep: {
    id: 'boilerplate.containers.login.nextStep',
    defaultMessage: '下一步',
  },
  back: {
    id: 'boilerplate.containers.login.back',
    defaultMessage: '返回',
  },
  bindPhone: {
    id: 'boilerplate.containers.login.bindPhone',
    defaultMessage: '绑定手机号',
  },
  bindConfirm: {
    id: 'boilerplate.containers.login.bindConfirm',
    defaultMessage: '确定绑定',
  },
  bindPhoneSuccess: {
    id: 'boilerplate.containers.login.bindPhoneSuccess',
    defaultMessage: '绑定新手机号成功',
  },
  bindPhoneChangeSuccess: {
    id: 'boilerplate.containers.login.bindPhoneChangeSuccess',
    defaultMessage: '更换绑定手机号成功',
  },
  autojumpOver5s: {
    id: 'boilerplate.containers.login.autojumpOver5s',
    defaultMessage: '5秒后自动跳转',
  },
  captchaHasBeenSentTo: {
    id: 'boilerplate.containers.login.captchaHasBeenSentTo',
    defaultMessage: '验证码已发送到',
  },
  authorizedFailAndRelogin: {
    id: 'boilerplate.containers.login.authorizedFailAndRelogin',
    defaultMessage: '登录状态验证失败，请重新登录',
  },
  relogin: {
    id: 'boilerplate.containers.login.relogin',
    defaultMessage: '重新登录',
  },
  updatePwd: {
    id: 'boilerplate.containers.login.updatePwd',
    defaultMessage: '修改密码',
  },
  need8to32PwdWithNumberAndAlphabet: {
    id: 'boilerplate.containers.login.need8to32PwdWithNumberAndAlphabet',
    defaultMessage: '请输入8到32位由字母数字组成的密码',
  },
  updateConfirm: {
    id: 'boilerplate.containers.login.updateConfirm',
    defaultMessage: '确认修改',
  },
  submit: {
    id: 'boilerplate.containers.login.submit',
    defaultMessage: '提交',
  },
  validateNewPhone: {
    id: 'boilerplate.containers.login.validateNewPhone',
    defaultMessage: '验证新手机号',
  },
  finish: {
    id: 'boilerplate.containers.login.finish',
    defaultMessage: '完成',
  },
  inputPhone: {
    id: 'boilerplate.containers.login.inputPhone',
    defaultMessage: '请输入手机号',
  },
  inputCaptcha: {
    id: 'boilerplate.containers.login.inputCaptcha',
    defaultMessage: '请输入验证码',
  },
  inputAccount: {
    id: 'boilerplate.containers.login.inputAccount',
    defaultMessage: '请输入账号',
  },
  inputPwd: {
    id: 'boilerplate.containers.login.inputPwd',
    defaultMessage: '请输入密码',
  },
  inputNewPwd: {
    id: 'boilerplate.containers.login.inputNewPwd',
    defaultMessage: '请输入新密码',
  },
  resetPassword: {
    id: 'boilerplate.containers.login.resetPassword',
    defaultMessage: '重设密码',
  },
  tokenExpiredNeedRelogin: {
    id: 'boilerplate.containers.login.tokenExpiredNeedRelogin',
    defaultMessage: '登录凭据过期，请重新操作',
  },
  getCaptcha: {
    id: 'boilerplate.containers.login.getCaptcha',
    defaultMessage: '获取验证码',
  },
  captchaSent: {
    id: 'boilerplate.containers.login.captchaSent',
    defaultMessage: '验证码已发送',
  },
  getCaptchaFailed: {
    id: 'boilerplate.containers.login.getCaptchaFailed',
    defaultMessage: '获取验证码失败',
  },
  inputUsername: {
    id: 'boilerplate.containers.login.inputUsername',
    defaultMessage: '请输入用户名',
  },
  pwdMismatch: {
    id: 'boilerplate.containers.login.pwdMismatch',
    defaultMessage: '两次密码输入不一致',
  },

  oldPwd: {
    id: 'boilerplate.containers.login.oldPwd',
    defaultMessage: '旧密码',
  },
  newPwd: {
    id: 'boilerplate.containers.login.newPwd',
    defaultMessage: '新密码',
  },
  confirmNewPwd: {
    id: 'boilerplate.containers.login.confirmNewPwd',
    defaultMessage: '确认新密码',
  },
  validatePhone: {
    id: 'boilerplate.containers.login.validatePhone',
    defaultMessage: '验证手机号',
  },
  setNewPwd: {
    id: 'boilerplate.containers.login.setNewPwd',
    defaultMessage: '设置新密码',
  },
  loginStatusFailed: {
    id: 'boilerplate.containers.login.loginStatusFailed',
    defaultMessage: '登录状态失效，请重新登录后操作',
  },
  warningVcodeTitle: {
    id: 'boilerplate.containers.login.warningVcodeTitle',
    defaultMessage: '验证码输入',
  },
  warningVcodeInfo: {
    id: 'boilerplate.containers.login.warningVcodeInfo',
    defaultMessage: '请先正确输入图片验证码，才能获取手机验证码',
  },
});
