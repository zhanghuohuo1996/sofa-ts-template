import { getRequest, postRequest } from 'utils/request';

export const getDataListService = (params: object) => getRequest('/user/basic/getprivilegelist', params);

export const postCreateEntityService = (params: object) => postRequest('/test/create', params);

export const postEditEntityService = (params: object) => postRequest('/test/edit', params);

export default {};
