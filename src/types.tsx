import { Action } from 'redux';

type Visibility = 'hidden' | 'show';

export interface MenuItem {
  key: string;
  icon?: string;
  children?: MenuItem[];
  text?: string;
  visibilityChild?: Visibility;
  auth?: number | string;
};

type SofaActionCreator = (params?: any) => SofaAction;

export type SofaAction = Action & { 
  payload?: any;
  loadingAction?: (loading: boolean) => SofaAction;
  service?: (params?: object) => void;
  params?: object;
  success?: (SofaAction | SofaActionCreator);
};
