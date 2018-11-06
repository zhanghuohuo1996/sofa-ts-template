import { fromJS } from 'immutable';
import commonConf from 'config/main.conf';
import { CREATE } from 'utils/constants';
import {
  UPDATE_ENTITY_MODAL,
  UPDATE_SEARCH_CONDITION,
} from './constants';

const initialState = fromJS({
  searchCondition: {
    // 这里推荐枚举出所有Field的初始值
    name: '',
    age: '',
  },
  entityModal: {
    type: CREATE,
    show: false,
    data: {},
  },
  mainData: [{
    id: 1,
    name: '李淳',
    age: 18,
    phone: '18809009900',
    email: 'yxlichun@128.com',
  }, {
    id: 2,
    name: '凤凤',
    age: 88,
    phone: '18809009900',
    email: 'fengfeng@sf-express.com',
  }, {
    id: 3,
    name: '天晴',
    age: 99,
    phone: '18809009900',
    email: 'xiaogaogao@sfmail.sfexpress.com',
  }, {
    id: 4,
    name: '肚肚疼',
    phone: '18809009900',
    age: 10,
  }],
  pagination: {
    pageSize: commonConf.table.defaultPageSize,
    total: 100,
    current: 1,
  },
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ENTITY_MODAL:
      return state
        .set('entityModal', fromJS(action.payload));
    case UPDATE_SEARCH_CONDITION:
      return state
        .set('searchCondition', fromJS(action.payload));
    default:
      break;
  }
  return state;
}

export default reducer;
