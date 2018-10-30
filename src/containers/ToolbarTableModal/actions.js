import { UPDATE_SEARCH_CONDITION } from './constants';

export function updateSearchCondition(payload) {
  return {
    type: UPDATE_SEARCH_CONDITION,
    payload,
  };
}

export default {};
