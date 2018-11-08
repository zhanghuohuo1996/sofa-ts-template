import { DEFAULT_LOCALE } from 'utils/constants';
import { translationMessages } from '../i18n';

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
