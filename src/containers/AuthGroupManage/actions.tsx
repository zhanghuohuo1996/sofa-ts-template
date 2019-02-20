import {
  UPDATE_SEARCH_CONDITION,
  UPDATE_ENTITY_MODAL,
  GET_DATA_LIST,
  POST_CREATE_ENTITY,
  POST_EDIT_ENTITY,
  GET_PRIVILEGE_LIST,
} from './constants';

import {
  getDataListService,
  postCreateEntityService,
  postEditEntityService,
  getPrivilegeListService,
} from './services';

import { showLoading } from '../../state/actions';

export function updateSearchCondition(payload: object) {
  return {
    type: UPDATE_SEARCH_CONDITION,
    payload,
  };
}

export function updateEntityModal(payload: object) {
  return {
    type: UPDATE_ENTITY_MODAL,
    payload,
  };
}

export function getDataList(params: object) {
  return {
    type: GET_DATA_LIST,
    service: getDataListService,
    loadingAction: showLoading,
    params,
  };
}

export function getPrivilegeList(params: object) {
  return {
    type: GET_PRIVILEGE_LIST,
    service: getPrivilegeListService,
    loadingAction: showLoading,
    params,
  };
}

export function postCreateEntity(params: object) {
  return {
    type: POST_CREATE_ENTITY,
    service: postCreateEntityService,
    params,
  };
}

export function postEditEntity(params: object) {
  return {
    type: POST_EDIT_ENTITY,
    service: postEditEntityService,
    params,
  };
}

export default {};
