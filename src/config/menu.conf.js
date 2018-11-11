const menu = [
  {
    key: 'homePage',
    icon: 'home',
  },
  {
    key: 'system',
    icon: 'setting',
    children: [
      {
        key: 'userManage',
      },
      {
        key: 'authManage',
      },
      {
        key: 'authGroupManage',
      },
    ],
  },
  {
    key: 'example',
    icon: 'setting',
    children: [
      {
        key: 'toolbarTableModal',
      },
      {
        key: 'print',
      },
    ],
  },
];

export default menu;
