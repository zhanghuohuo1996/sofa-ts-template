import { getRequest, postRequest } from 'utils/request';

export const getDataListService = params => getRequest('/common/getopencitylist', params);

export default {};
