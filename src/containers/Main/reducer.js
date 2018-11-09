import { fromJS } from 'immutable';
import {
  SHOW_LOADING,
  TOOGLE_LANG,
  DEFAULT_LOCALE,
} from 'utils/constants';

const initialState = fromJS({
  loading: false,
  lang: DEFAULT_LOCALE,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return state.set('loading', action.payload);
    case TOOGLE_LANG:
      return state.set('lang', action.payload);
    default:
      break;
  }
  return state;
}

export default reducer;
