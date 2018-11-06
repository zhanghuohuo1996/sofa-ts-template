import { getRequest, postRequest } from 'utils/request';

export const getDataListService = params => getRequest('/common/getopencitylist', params);

export const postFormDataService = params => postRequest('/common/testpost', params);

export const postCreateEntityService = params => postRequest('/common/create', params);

export const postEditEntityService = params => postRequest('/common/edit', params);

export default {};
