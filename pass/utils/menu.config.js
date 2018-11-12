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
    auth: 10000000,
  }, {
    key: 'authmanage',
    text: '权限管理',
    auth: 10000001,
  }, {
    key: 'authgroupmanage',
    text: '权限组管理',
    auth: 10000002,
  }],
}, {
  key: 'carowner',
  text: '司机管理',
  icon: 'idcard',
  children: [{
    key: 'drivermanage',
    text: '司机管理',
    auth: 10000003,
  }],
}];

export default menu;

function traverseArray(arr) {
  let obj = {};
  arr.forEach((item) => {
    obj[item.key] = {
      text: item.text,
      isLeaf: !item.children,
    };
    if (item.children) {
      obj = {
        ...obj,
        ...traverseArray(item.children),
      };
    }
  });
  return obj;
}

export const menuMap = traverseArray(menu);
