import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Modal,
  Form,
  Transfer,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { TransferItem } from 'antd/lib/transfer';
import { createStructuredSelector } from 'reselect';
import { injectIntl, InjectedIntl } from 'react-intl';

import commonMessages from 'utils/commonMessages';

import { IModalData } from '../../../types';

import messages from '../messages';
import {
  updateAuthModal,
  getPrivilegeList,
  getFullAuthAndAuthGroup,
  getLoginUserInfo,
} from '../actions';
import {
  selectOperationAuth,
  selectUserAuthList,
  selectUserAuthGroupList,
  selectLoginAuthList,
  selectLoginAuthGroupList,
  selectAuthModal,
} from '../selectors';

const FormItem = Form.Item;

interface IProps extends FormComponentProps {
  authModal: IModalData;
  operationAuth: string[] | number[];
  intl: InjectedIntl;
  type: string;
  loginAuthList: TransferItem[];
  loginAuthGroupList:  TransferItem[];
  userAuthList: string[];
  userAuthGroupList: string[];
  updateAuthModal: (params: object) => any;
  postUserAuthModify: (params: object) => any;
  getFullAuthAndAuthGroup: () => any;
  getLoginUserInfo: () => any;
  getPrivilegeList: () => any;
}

class OperationAuthSelectModal extends React.PureComponent<IProps, object> {
  componentDidMount() {
    this.props.getPrivilegeList();
    this.props.getFullAuthAndAuthGroup();
    this.props.getLoginUserInfo();
  }

  handleChangeAuthSelect = (targetKeys: any[]) => {
    const { userAuthGroupList, authModal } = this.props;
    const newAuth = targetKeys.concat(userAuthGroupList);
    this.props.updateAuthModal({
      ...authModal,
      show: true,
      data: newAuth,
    });
  }

  handleChangeAuthGroupSelect = (targetKeys: any[]) => {
    const { userAuthList, authModal } = this.props;
    const newAuth = targetKeys.concat(userAuthList);
    this.props.updateAuthModal({
      ...authModal,
      show: true,
      data: newAuth,
    });
  }

  handleOk = () => {
    const { authModal } = this.props;
    this.props.postUserAuthModify({
      pass_uid: authModal.pass_uid,
      role_ids: authModal.data.join(),
    });
  }

  handleCancel = () => {
    this.props.updateAuthModal({
      show: false,
      data: [],
    });
  }

  render() {
    const {
      authModal, intl, loginAuthList, loginAuthGroupList, userAuthList, userAuthGroupList,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    return (
      <div>
        <Modal
          width={600}
          title={intl.formatMessage(messages.modifyAuth)}
          visible={authModal.show}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={intl.formatMessage(commonMessages.ok)}
          cancelText={intl.formatMessage(commonMessages.cancel)}
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(messages.operationAuth)}
            >
              <Transfer
                dataSource={loginAuthList}
                showSearch={true}
                targetKeys={userAuthList}
                onChange={this.handleChangeAuthSelect}
                render={item => item.title}
                searchPlaceholder={intl.formatMessage(commonMessages.inputPlaceholder)}
                notFoundContent={intl.formatMessage(commonMessages.dataNotFound)}
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(messages.operationAuth)}
            >
              <Transfer
                dataSource={loginAuthGroupList}
                showSearch={true}
                targetKeys={userAuthGroupList}
                onChange={this.handleChangeAuthGroupSelect}
                render={item => item.title}
                searchPlaceholder={intl.formatMessage(commonMessages.inputPlaceholder)}
                notFoundContent={intl.formatMessage(commonMessages.dataNotFound)}
              />
            </FormItem>
          </Form>
        </Modal>
      </div>);
  }
}

export default compose(
  injectIntl,
  connect(
    createStructuredSelector({ // 实用reselect性能有明显的提升；
      authModal: selectAuthModal,
      operationAuth: selectOperationAuth,
      userAuthList: selectUserAuthList,
      userAuthGroupList: selectUserAuthGroupList,
      loginAuthList: selectLoginAuthList,
      loginAuthGroupList: selectLoginAuthGroupList,
    }),
    { // 其实这里可以处理掉，当前每引入一个action,需要更新props绑定，更新PropsType，
      // 实际可以直接将action全量引入，但是出于对性能及规范开发的要求，这里仍然使用单独引入的方式；
      updateAuthModal,
      getPrivilegeList,
      getLoginUserInfo,
      getFullAuthAndAuthGroup,
    },
  ),
  Form.create({
    mapPropsToFields: props => ({
      // 这里埋个坑，没空细看到底发生了什么……
      // email: Form.createFormField({ value: props.entityModal.data.email || '' }),
    }),
  }),
)(OperationAuthSelectModal);
