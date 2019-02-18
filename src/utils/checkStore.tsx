import { conformsTo, isFunction, isObject } from 'lodash';

export default function checkStore(store: any) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    injectedReducers: isObject,
    // injectedSagas: isObject,
  };

  // invariant(
  //   conformsTo(store, shape),
  //   'injectors: Expected a valid redux store',
  // );
}
