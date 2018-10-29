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
}, {
  key: 'example',
  text: '通用示例',
  icon: 'setting',
  children: [{
    key: 'toolbartablemodal',
    text: '工具箱-表-弹窗',
  }],
}];

export default menu;

function getMap(menuData) {
  let obj = {};
  menuData.forEach((element) => {
    obj[element.key] = element.text;
    if (element.children) {
      const subMap = getMap(element.children);
      obj = {
        ...obj,
        ...subMap,
      };
    }
  });
  return obj;
}

export const menuMap = getMap(menu);
