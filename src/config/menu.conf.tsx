import { MenuItem } from '../types';

const menu: MenuItem[] = [
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
