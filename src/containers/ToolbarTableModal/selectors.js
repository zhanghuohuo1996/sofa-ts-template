import { createSelector } from 'reselect';
import { NAMESPACE } from './constants';

const selectNamespace = state => state.get(NAMESPACE);

export const selectSearchCondition = createSelector(
  selectNamespace,
  subState => subState.get('searchCondition').toJS(),
);

export const selectPagination = createSelector(
  selectNamespace,
  subState => subState.get('pagination').toJS(),
);

export default {};
