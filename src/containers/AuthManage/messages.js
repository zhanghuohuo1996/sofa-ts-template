/*
 * HomePage Messages
 *
 * This contains all the text for the SystemManage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  authManage: {
    createAuth: {
      id: 'sofa.containers.authManage.createAuth',
      defaultMessage: '新建权限',
    },
    editAuth: {
      id: 'sofa.containers.authManage.editAuth',
      defaultMessage: '修改权限',
    },
    authName: {
      id: 'sofa.containers.authManage.authName',
      defaultMessage: '权限名称',
    },
    authId: {
      id: 'sofa.containers.authManage.authId',
      defaultMessage: '权限Id',
    },
    status: {
      id: 'sofa.containers.authManage.status',
      defaultMessage: '权限状态',
    },
    statusMap: {
      0: {
        id: 'sofa.containers.authManage.statusMap.0',
        defaultMessage: '有效',
      },
      1: {
        id: 'sofa.containers.authManage.statusMap.1',
        defaultMessage: '无效',
      },
    },
    modifyInfo: {
      id: 'sofa.containers.authManage.modifyInfo',
      defaultMessage: '修改信息',
    },
  },
});
