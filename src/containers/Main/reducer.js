import { fromJS } from 'immutable';
import {
  SHOW_LOADING,
  TOOGLE_LANG,
} from 'utils/constants';

import { getLanguage } from 'utils/i18n';

const initialState = fromJS({
  loading: false,
  lang: getLanguage(),
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
