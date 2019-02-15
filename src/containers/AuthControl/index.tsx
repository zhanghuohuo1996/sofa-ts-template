import { Component } from 'react';

/**
 * 权限检查
 * @param {*} authCode 权限码
 * @param {*} authList 用户权限列表，在store.global中有存储
 * @use { checkAuth(authCode, authList)(<Button />) }
 */
export function checkAuth(authCode: number | string, authList: number[] | string[]) {
  return (component: Component | JSX.Element) => {
    if (!authCode) {
      return component;
    }
    const authCodeNumber = parseInt(authCode.toString(), 10);
    const authCodeString = authCode.toString();

    if ((authList as number[]).indexOf(authCodeNumber) > -1 || (authList as string[]).indexOf(authCodeString) > -1) {
      return component;
    }
    return '';
  };
}

export default {};
