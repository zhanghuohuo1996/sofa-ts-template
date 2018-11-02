import { LOADING_DATA_ERROR } from 'utils/constants';

export function loadingDataError(payload) {
  return {
    type: LOADING_DATA_ERROR,
    payload,
  };
}

export default {};
