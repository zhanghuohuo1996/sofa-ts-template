import {
  LOADING_DATA_ERROR,
  SHOW_LOADING,
  TOOGLE_LANG
} from 'utils/constants';


export function loadingDataError(payload) {
  return {
    type: LOADING_DATA_ERROR,
    payload,
  };
}

export function showLoading(payload) {
  return {
    type: SHOW_LOADING,
    payload,
  };
}

export function toggleLang(payload) {
  return {
    type: TOOGLE_LANG,
    payload,
  };
}

export function showDownloadListModal() {

}

export function updatePlatformAuth() {

}

export function updateFix() {

}

export default {};
