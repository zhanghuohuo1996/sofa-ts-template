import { Action } from 'redux';
import { Map } from 'immutable';

type Visibility = 'hidden' | 'show';

export interface MenuItem {
  key: string;
  icon?: string;
  children?: MenuItem[];
  text?: string;
  visibilityChild?: Visibility;
  auth?: number | string;
};

export interface Pagination {
  page?: number;
  total?: number;
  pageSize?: number;
  showTotal?: boolean;
  onChange?: () => any;
}

type OperateType = 'create' | 'edit';

export interface ModalData {
  show?: boolean;
  type?: OperateType;
  data?: {
    [key: string]: any;
  };
  [key: string]: any;
};

type SofaActionCreator = (params?: any) => SofaAction;

export type SofaAction = Action & { 
  payload?: any;
  loadingAction?: (loading: boolean) => SofaAction;
  service?: (params?: object) => void;
  params?: object;
  success?: (SofaAction | SofaActionCreator);
};

export type SofaState = Map<string, any>;
