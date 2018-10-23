const menu = [{
  key: 'homepage',
  icon: 'home',
  text: '首页',
}, {
  key: 'system',
  text: '系统管理',
  icon: 'setting',
  children: [{
    key: 'usermanage',
    text: '用户管理',
  }, {
    key: 'authmanage',
    text: '权限管理',
  }, {
    key: 'authgroupmanage',
    text: '权限组管理',
  }],
}];

export default menu;
