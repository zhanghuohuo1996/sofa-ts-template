import { DEFAULT_LOCALE } from 'utils/constants';
import { Mystore } from '../index';
import { translationMessages } from '../i18n';

let state = '';
setTimeout(() => {
  if (Mystore) {
    state = Mystore.getState();
    Mystore.subscribe(() => {
      console.log(state.get('global').get('lang'));//这就是你获取到的数据state tree，由于使用了subscribe，当数据更改时会重新获取
    });
  }
}, 3000);

function getText(key) {
  return translationMessages[DEFAULT_LOCALE][`sofa.config.${key}`];
}

const menu = [
  {
    key: 'homePage',
    icon: 'home',
    text: getText('homePage'),
  },
  {
    key: 'system',
    text: getText('system'),
    icon: 'setting',
    children: [
      {
        key: 'userManage',
        text: getText('userManage'),
      },
      {
        key: 'authManage',
        text: getText('authManage'),
      },
      {
        key: 'authGroupManage',
        text: getText('authGroupManage'),
      },
    ],
  },
  {
    key: 'example',
    text: getText('example'),
    icon: 'setting',
    children: [
      {
        key: 'toolbarTableModal',
        text: getText('toolbarTableModal'),
      },
      {
        key: 'print',
        text: '打印示例',
      },
    ],
  },
];
function getMap(menuData) {
  let obj = {};
  menuData.forEach((element) => {
    obj[element.key] = getText(element.key);
    if (element.children) {
      const subMap = getMap(element.children);
      obj = Object.assign({}, obj, subMap);
    }
  });
  return obj;
}
export const menuMap = getMap(menu);
export default menu;
