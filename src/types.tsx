import { Action } from 'redux';

type Visibility = 'hidden' | 'show';

export interface MenuItem {
  key: string;
  icon?: string;
  children?: MenuItem[];
  text?: string;
  visibilityChild?: Visibility;
  auth?: number | string;
}

export type SofaAction = Action & { payload: any };
