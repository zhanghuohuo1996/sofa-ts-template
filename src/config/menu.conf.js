import { DEFAULT_LOCALE } from 'utils/constants';
import { translationMessages } from '../i18n';

const menu = [
  {
    key: 'homePage',
    icon: 'home',
    text: translationMessages[DEFAULT_LOCALE]['sofa.config.homePage'],
  },
  {
    key: 'system',
    text: translationMessages[DEFAULT_LOCALE]['sofa.config.system'],
    icon: 'setting',
    children: [
      {
        key: 'userManage',
        text: translationMessages[DEFAULT_LOCALE]['sofa.config.userManage'],
      },
      {
        key: 'authManage',
        text: translationMessages[DEFAULT_LOCALE]['sofa.config.authManage'],
      },
      {
        key: 'authGroupManage',
        text: translationMessages[DEFAULT_LOCALE]['sofa.config.authGroupManage'],
      },
    ],
  },
  {
    key: 'example',
    text: translationMessages[DEFAULT_LOCALE]['sofa.config.example'],
    icon: 'setting',
    children: [
      {
        key: 'toolbarTableModal',
        text: translationMessages[DEFAULT_LOCALE]['sofa.config.toolbarTableModal'],
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
