import { getRequest, postRequest } from 'utils/request';

export const getDataListService = params => getRequest('/test/getlist', params);

export const postCreateEntityService = params => postRequest('/test/create', params);

export const postEditEntityService = params => postRequest('/test/edit', params);

// 系统管理
export const getUserAuthService = params => getRequest('/user/basic/getuserauth', params);
export const getUserListService = params => getRequest('/user/account/getuserlist', params);
export const getAuthListService = params => getRequest('/user/basic/getauthlist', params);

export default {};
