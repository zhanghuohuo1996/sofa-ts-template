import {
  UPDATE_SEARCH_CONDITION,
  UPDATE_ENTITY_MODAL,
  GET_DATA_LIST,
  POST_FORM_DATA,
  POST_CREATE_ENTITY,
  POST_EDIT_ENTITY,
} from './constants';

import {
  getDataListService,
  postFormDataService,
  postCreateEntityService,
  postEditEntityService,
} from './services';

import { showLoading } from '../../state/actions';

export function updateSearchCondition(payload) {
  return {
    type: UPDATE_SEARCH_CONDITION,
    payload,
  };
}

export function updateEntityModal(payload) {
  return {
    type: UPDATE_ENTITY_MODAL,
    payload,
  };
}

export function getDataList(params) {
  return {
    type: GET_DATA_LIST,
    service: getDataListService,
    loadingAction: showLoading,
    params,
  };
}

export function postCreateEntity(params) {
  return {
    type: POST_CREATE_ENTITY,
    service: postCreateEntityService,
    params,
  };
}

export function postEditEntity(params) {
  return {
    type: POST_EDIT_ENTITY,
    service: postEditEntityService,
    params,
  };
}

export function postFormData(params) {
  return {
    type: POST_FORM_DATA,
    service: postFormDataService,
    params,
  };
}

export default {};
