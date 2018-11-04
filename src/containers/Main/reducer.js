import { fromJS } from 'immutable';
import {
  SHOW_LOADING,
} from 'utils/constants';

const initialState = fromJS({
  loading: false,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return state.set('loading', action.payload);
    default:
      break;
  }
  return state;
}

export default reducer;
