import { IMenuItem } from '../types';

const menu: IMenuItem[] = [
  {
    key: 'homePage',
    icon: 'home',
  },
  {
    key: 'system',
    icon: 'setting',
    children: [
      { key: 'userManage' },
      { key: 'authGroupManage' },
      { key: 'authManage' },
    ],
  },
  {
    key: 'example',
    icon: 'setting',
    children: [{ key: 'toolbarTableModal' }],
  },
];
export default menu;
