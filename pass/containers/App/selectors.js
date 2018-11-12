/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectUserAccount = () => createSelector(
  selectGlobal,
  (subState) => subState.get('userAccount')
);

const makeSelectPhoneCode = () => createSelector(
  selectGlobal,
  (subState) => subState.get('phoneCode')
);

const makeSelectPhoneCodeButtonText = () => createSelector(
  selectGlobal,
  (subState) => subState.get('phoneCodeButtonText')
);

const makeSelectImgCode = () => createSelector(
  selectGlobal,
  (subState) => subState.get('imgCode')
);

const makeSelectStep = () => createSelector(
  selectGlobal,
  (subState) => subState.get('step')
);

const makeSelectImageUrl = () => createSelector(
  selectGlobal,
  (subState) => subState.get('imageUrl')
);

const makeSelectShowRefreshCaptchaModal = () => createSelector(
  selectGlobal,
  (subState) => subState.get('showRefreshCaptchaModal')
);

const makeSelectMessageData = () => createSelector(
  selectGlobal,
  (subState) => subState.get('messageData').toJS()
);

const makeSelectPassword = () => createSelector(
  selectGlobal,
  (subState) => subState.get('password')
);

const makeSelectNewPassword = () => createSelector(
  selectGlobal,
  (subState) => subState.get('newPassword')
);

const makeSelectRepeatPassword = () => createSelector(
  selectGlobal,
  (subState) => subState.get('repeatPassword')
);

const makeSelectToken = () => createSelector(
  selectGlobal,
  (subState) => subState.get('token')
);

const makeSelectUserInfo = () => createSelector(
  selectGlobal,
  (subState) => subState.get('userInfo').toJS()
);

const makeSelectShowLogin = () => createSelector(
  selectGlobal,
  (subState) => subState.get('showLogin')
);

const makeSelectLoginByPhone = () => createSelector(
  selectGlobal,
  (subState) => subState.get('loginByPhone')
);

const makeSelectShowRiskPwdModal = () => createSelector(
  selectGlobal,
  (subState) => subState.get('showRiskPwdModal')
);

const makeSelectBindPhoneStatus = () => createSelector(
  selectGlobal,
  (subState) => subState.get('bindPhoneStatus')
);

const makeSelectPhoneNumber = () => createSelector(
  selectGlobal,
  (subState) => subState.get('phoneNumber')
);

const makeSelectShowPhoneNumber = () => createSelector(
  selectGlobal,
  (subState) => subState.get('showPhoneNumber')
);

const makeSelectSsnCodeButtonText = () => createSelector(
  selectGlobal,
  (subState) => subState.get('ssnCodeButtonText')
);

const makeSelectSendMessage = () => createSelector(
  selectGlobal,
  (subState) => subState.get('sendMessage')
);

export {
  makeSelectError,
  selectGlobal,
  makeSelectUserAccount,
  makeSelectPhoneCode,
  makeSelectPhoneCodeButtonText,
  makeSelectStep,
  makeSelectImgCode,
  makeSelectImageUrl,
  makeSelectShowRefreshCaptchaModal,
  makeSelectMessageData,
  makeSelectPassword,
  makeSelectNewPassword,
  makeSelectRepeatPassword,
  makeSelectToken,
  makeSelectUserInfo,
  makeSelectShowLogin,
  makeSelectLoginByPhone,
  makeSelectShowRiskPwdModal,
  makeSelectBindPhoneStatus,
  makeSelectPhoneNumber,
  makeSelectShowPhoneNumber,
  makeSelectSsnCodeButtonText,
  makeSelectSendMessage,
};
