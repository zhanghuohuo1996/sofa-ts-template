import { DEFAULT_LOCALE } from 'utils/constants';
import { Mystore } from '../index';


setTimeout(() => {
    console.log('store==', Mystore);
    Mystore.subscribe(() => {
        let state = Mystore.getState();
        console.log(state);//这就是你获取到的数据state tree，由于使用了subscribe，当数据更改时会重新获取
    });
}, 3000);

const menu = [
  {
    key: 'homePage',
    icon: 'home',
    text: DEFAULT_LOCALE === 'zh' ? '首页' : 'Home Page',
  },
  {
    key: 'system',
    text: DEFAULT_LOCALE === 'zh' ? '系统管理' : 'System Management',
    icon: 'setting',
    children: [
      {
        key: 'userManage',
        text: DEFAULT_LOCALE === 'zh' ? '用户管理' : 'User Management',
      },
      {
        key: 'authManage',
        text: DEFAULT_LOCALE === 'zh' ? '权限管理' : 'Auth Management',
      },
      {
        key: 'authGroupManage',
        text: DEFAULT_LOCALE === 'zh' ? '权限管理' : 'Auth Group Management',
      },
    ],
  },
  {
    key: 'example',
    text: DEFAULT_LOCALE === 'zh' ? '通用示例' : 'Common Example',
    icon: 'setting',
    children: [
      {
        key: 'toolbarTableModal',
        text: DEFAULT_LOCALE === 'zh' ? '工具箱-表-弹窗' : 'Toolbar-Table-Modal',
      },
    ],
  },
];

function getMap(menuData) {
  let obj = {};
  menuData.forEach((element) => {
    obj[element.key] = element.text;
    if (element.children) {
      const subMap = getMap(element.children);
      obj = Object.assign({}, obj, subMap);
    }
  });
  return obj;
}
export const menuMap = getMap(menu);
export default menu;
