import { combineReducers } from 'redux-immutable';
import globalReducer from '../containers/Main/reducer'

export default function createReducer(injectedReducers?: object) {
  return combineReducers({
    global: globalReducer,
    ...injectedReducers,
  });
}
