import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import invariant from 'invariant';
import conformsTo from 'lodash/conformsTo';

import checkStore from './checkStore';

import {
  DAEMON,
  ONCE_TILL_UNMOUNT,
  RESTART_ON_REMOUNT,
} from './constants';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

const checkKey = key => invariant(
  isString(key) && !isEmpty(key),
  'injectSaga: Expected `key` to be a non empty string',
);

const checkDescriptor = (descriptor) => {
  const shape = {
    saga: isFunction,
    mode: (mode) => isString(mode) && allowedModes.includes(mode),
  };

  invariant(
    conformsTo(descriptor, shape),
    'injectSaga: Expected a valid saga descriptor',
  );
};

export function injectSagaFactory(store, isValid) {
  return function injectSaga(key, descriptor = {}, args) {
    if (!isValid) checkStore(store);

    const newDescriptor = { ...descriptor, mode: descriptor.mode || RESTART_ON_REMOUNT };
  }
}




// function injectSaga(key, obj, props, store) {
//   const { saga, mode } = obj;
//   store.run(saga);
// }

// function ejectSaga(key, store) {

// }

// function getInjectors(store) {
//   return {
//     injectSaga: (key, obj, props) => injectSaga(key, obj, props, store),
//     ejectSaga: key => ejectSaga(key, store),
//   };
// }

// export default getInjectors;
