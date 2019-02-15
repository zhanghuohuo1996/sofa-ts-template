import { getFormattedMessages } from 'utils/i18n';
import menu from '../config/menu.conf';

interface Obj{
  [key: string]: any;
}

function getText(lang: string, key: string) {
  return getFormattedMessages(lang, `sofa.config.${key}`);
}

/**
 * 非纯函数，会改变传入参数的值，需要注意；
 * @param {*} menuData
 * @param {*} lang
 */
function buildIntlMenu(menuData: any[], lang: string) {
  menuData.forEach((element) => {
    const text = getText(lang, element.key);
    // eslint-disable-next-line
    element.text = text;
    if (element.children) {
      buildIntlMenu(element.children, lang);
    }
  });
  return menuData;
}

export function getMenuData(lang: string) {
  return buildIntlMenu(menu, lang);
}

export function getMenuMap(lang: string, menuData?: any[]) {
  // eslint-disable-next-line
  menuData = menuData || getMenuData(lang);
  let obj: Obj = {};
  menuData.forEach((element) => {
    obj[element.key] = element.key;
    if (element.children) {
      const subMap = getMenuMap(lang, element.children);
      obj = {
        ...obj,
        ...subMap,
      }
    }
  });
  return obj;
}

export default {};
