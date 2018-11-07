import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

export const selectLoading = createSelector(
  selectGlobal,
  subState => subState.get('loading'),
);

export default {};
