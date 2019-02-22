import { createSelector } from 'reselect';
import { NAMESPACE } from './constants';
import { SofaState } from '../../types';

const selectNamespace = (state: SofaState) => state.get(NAMESPACE);

export const selectSearchCondition = createSelector(
  selectNamespace,
  subState => subState.get('searchCondition').toJS(),
);

export const selectPagination = createSelector(
  selectNamespace,
  subState => subState.get('pagination').toJS(),
);

export const selectEntityModal = createSelector(
  selectNamespace,
  subState => subState.get('entityModal').toJS(),
);

export const selectEntityModalType = createSelector(
  selectNamespace,
  subState => subState.get('entityModal').toJS().type,
);

export const selectTableData = createSelector(
  selectNamespace,
  subState => subState.get('tableData').toJS(),
);

export default {};
