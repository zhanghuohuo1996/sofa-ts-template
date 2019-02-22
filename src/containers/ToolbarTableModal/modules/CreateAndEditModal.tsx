import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Modal,
  Form,
  Input,
  Select,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { createStructuredSelector } from 'reselect';
import { injectIntl, InjectedIntl } from 'react-intl';

import { CREATE, EDIT } from 'utils/constants';
import commonMessages from 'utils/commonMessages';

import { IModalData } from '../../../types';

import { updateEntityModal, postCreateEntity, postEditEntity } from '../actions';
import { selectEntityModal, selectEntityModalType } from '../selectors';

const FormItem = Form.Item;
const { Option } = Select;

function isModify(type: string) {
  return type === EDIT;
}

interface IProps extends FormComponentProps {
  entityModal: IModalData;
  updateEntityModal: (params: object) => any;
  postCreateEntity: (params: object) => any;
  postEditEntity: (params: object) => any;
  intl: InjectedIntl;
  type: string;
}

class CreateAndEditModal extends React.PureComponent<IProps, object> {
  handleOk = (e: any) => {
    e.preventDefault();
    const { type } = this.props.entityModal;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (type === CREATE) {
          this.props.postCreateEntity(values);
        } else if (type === EDIT) {
          this.props.postEditEntity(values);
        }
      }
    });
  }

  handleCancel = () => {
    this.props.updateEntityModal({
      type: CREATE,
      show: false,
      data: {},
    });
  }

  render() {
    const { entityModal, intl, type } = this.props;
    const { data } = entityModal;

    const { getFieldDecorator } = this.props.form;

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
          width={700}
          title={isModify(type)
            ? intl.formatMessage(commonMessages.edit)
            : intl.formatMessage(commonMessages.create)}
          visible={entityModal.show}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={intl.formatMessage(commonMessages.ok)}
          cancelText={intl.formatMessage(commonMessages.cancel)}
        >
          <Form className="sofa-modal-form">
            {
              isModify(type)
                ? (
                  <FormItem
                    {...formItemLayout}
                    label="ID"
                  >
                    {
                      getFieldDecorator('privilege_id', {
                        initialValue: data.privilege_id,
                      })(
                        <Input disabled={true} />,
                      )
                    }
                  </FormItem>) : ''
            }
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(commonMessages.name)}
            >
              {getFieldDecorator('name', {
                initialValue: data.name || '',
                rules: [{ required: true, message: 'Please input your name!' }],
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(commonMessages.status)}
            >
              {
                getFieldDecorator('is_delete', {
                  initialValue: (data.is_delete || data.is_delete === 0)
                    ? String(data.is_delete) : data.is_delete,
                  rules: [{ required: true, message: 'Please input your status!' }],
                })(
                  <Select>
                    {
                      Object.keys(commonMessages.activeStatusMap).map(key => (
                        <Option value={key} key={key}>
                          {intl.formatMessage((commonMessages.activeStatusMap as any)[key])}
                        </Option>
                      ))
                    }
                  </Select>,
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(commonMessages.remark)}
            >
              {
                getFieldDecorator('content', {
                  initialValue: data.content || '',
                })(
                  <Input.TextArea rows={4} />,
                )
              }
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
      entityModal: selectEntityModal,
      type: selectEntityModalType,
    }),
    { // 其实这里可以处理掉，当前每引入一个action,需要更新props绑定，更新PropsType，
      // 实际可以直接将action全量引入，但是出于对性能及规范开发的要求，这里仍然使用单独引入的方式；
      updateEntityModal,
      postCreateEntity,
      postEditEntity,
    },
  ),
  Form.create({
    mapPropsToFields: props => ({
      // 这里埋个坑，没空细看到底发生了什么……
      // email: Form.createFormField({ value: props.entityModal.data.email || '' }),
    }),
  }),
)(CreateAndEditModal);
