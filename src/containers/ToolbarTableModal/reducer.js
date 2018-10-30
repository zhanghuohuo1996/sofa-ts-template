import { fromJS } from 'immutable';

const initialState = fromJS({
  searchCondition: {
    name: 'lichun',
    age: '',
  },
});

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      break;
  }
  return state;
}

export default reducer;
