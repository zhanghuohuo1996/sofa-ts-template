import { Action } from 'redux';
import { Map } from 'immutable';

// 可见性；
export type Visibility = 'hidden' | 'show';
// 动作类型；
export type OperateType = 'create' | 'edit';

// 权限码
export type AuthCode = string | number;

// 菜单项；
export interface IMenuItem {
  key: string;
  icon?: string;
  children?: IMenuItem[];
  text?: string;
  visibilityChild?: Visibility;
  auth?: number | string;
};

// 表格等分页配置；
export interface IPagination {
  page?: number;
  total?: number;
  pageSize?: number;
  showTotal?: boolean;
  onChange?: () => any;
}

// 弹窗数据格式；
export interface IModalData {
  show?: boolean;
  type?: OperateType;
  data?: {
    [key: string]: any;
  };
  [key: string]: any;
};

// redux action creator
type SofaActionCreator = (params?: any) => SofaAction;

// action
export type SofaAction = Action & { 
  payload?: any;
  loadingAction?: (loading: boolean) => SofaAction;
  service?: (params?: object) => void;
  params?: object;
  success?: (SofaAction | SofaActionCreator);
};

// state
export type SofaState = Map<string, any>;
