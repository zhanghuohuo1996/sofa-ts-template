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
      // {
      //   key: 'authManage',
      //   text: '权限管理',
      // },
    ],
  },
  // {
  //   key: 'example',
  //   icon: 'setting',
  //   children: [{ key: 'toolbarTableModal' }, { key: 'print' }],
  // },
];
export default menu;
