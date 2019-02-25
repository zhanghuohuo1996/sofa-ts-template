import { createStore, applyMiddleware, compose, Store } from 'redux';
import { fromJS } from 'immutable';
// import createSagaMiddleware from 'redux-saga';
import SFSagaMiddleWare from 'redux-sofa-saga';
import { notification } from 'antd';

import createReducer from './reducers';

type SofaStore = Store & {
  runSaga: any,
  injectedReducers: object,
  injectedSagas: object,
};

// const sagaMiddleware = createSagaMiddleware();
const sagaConfig = {
  notification: {
    success: (options: any):void => {
      notification.success({
        message: '操作成功',
      });
    },
    error: (options: any):void => {
      notification.error({
        message: options.errmsg ? options.errmsg : '操作失败，请稍候再试',
      });
    },
  },
};
export default function storeFactory(initialState = {}) {
  const middlewares = [SFSagaMiddleWare.middleWare];
  const enhancers = [applyMiddleware(...middlewares)];

  // 在开发模式启用redux devtool
  const composeEnhancers = process.env.NODE_ENV !== 'production' 
    && typeof window === 'object'
    // eslint-disable-next-line
    && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    // eslint-disable-next-line
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
    : compose;

  const store: SofaStore = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  // SofaSaga.setConfig({ notification });
  // SofaSaga.runSaga(sagaMiddleware);

  store.runSaga = SFSagaMiddleWare.runSaga(sagaConfig);
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  return store;
}
