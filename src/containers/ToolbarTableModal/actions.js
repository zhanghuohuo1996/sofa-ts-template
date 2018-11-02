import {
  UPDATE_SEARCH_CONDITION,
  GET_DATA_LIST,
} from './constants';

import { getDataListService } from './services';

export function updateSearchCondition(payload) {
  return {
    type: UPDATE_SEARCH_CONDITION,
    payload,
  };
}

export function getDataList(params) {
  return {
    type: GET_DATA_LIST,
    service: getDataListService,
    params,
  };
}

export default {};
