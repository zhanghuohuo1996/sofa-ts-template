import { getRequest, postRequest } from 'utils/request';

export const getDataListService = (params: object) => getRequest('/test/getUserList', params);

export const postCreateEntityService = (params: object) => postRequest('/test/create', params);

export const postEditEntityService = (params: object) => postRequest('/test/edit', params);

export const getPrivilegeListService = (params: object) => getRequest('/user/basic/getprivilegelist', params);

export const getUserInfoService = (params: object) => getRequest('/user/account/getuserinfo', params);
export const getLoginUserInfoService = () => getRequest('/user/basic/getuserauth');
export const getFullAuthAndAuthGroupService = () => getRequest('/user/basic/getauthlist');

export default {};
