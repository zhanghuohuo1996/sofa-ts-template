import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { createStructuredSelector } from 'reselect';
import { injectIntl, InjectedIntl } from 'react-intl';

import commonConf from 'config/main.conf';
import { CREATE } from 'utils/constants';
import ToolbarContainer from 'components/ToolbarContainer';
import FunctionButtonsContainer from 'components/FunctionButtonsContainer';
import commonMessages from 'utils/commonMessages';

import messages from '../messages';
import { getDataList, updateEntityModal, updateSearchCondition } from '../actions';
import { selectSearchCondition } from '../selectors';

const { Option } = Select;

interface IProps extends FormComponentProps {
  searchCondition: {
    account?: string;
    name?: string;
    status?: string | number;
  };
  getDataList: (params: object) => any;
  updateEntityModal: (params: object) => any;
  updateSearchCondition: (params: object) => any;
  intl: InjectedIntl;
}

class Toolbar extends React.Component<IProps, object> {
  componentDidMount() {
    const { searchCondition } = this.props;
    setTimeout(() => {
      this.props.getDataList({
        ...searchCondition,
        page: 1,
        perpage: commonConf.table.defaultPageSize,
      });
    }, 200);
  }

  handleSearch = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.getDataList({
          ...values,
          page: 1,
          perpage: commonConf.table.defaultPageSize,
        });
        this.props.updateSearchCondition(values);
      }
    });
  }

  handleClickCreate = () => {
    this.props.updateEntityModal({
      type: CREATE,
      show: true,
      data: {},
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { searchCondition, intl } = this.props;

    return (
      <ToolbarContainer>
        <FunctionButtonsContainer>
          <Button type="primary" onClick={this.handleClickCreate}>{intl.formatMessage(messages.createUser)}</Button>
        </FunctionButtonsContainer>
        <Form>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label={intl.formatMessage(messages.account)}>
                {getFieldDecorator('account', {
                  initialValue: searchCondition.account || '',
                })(
                  <Input />,
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={intl.formatMessage(commonMessages.name)}>
                {getFieldDecorator('name', {
                  initialValue: searchCondition.name || '',
                })(
                  <Input />,
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={intl.formatMessage(messages.accountStatus)}>
                {
                  getFieldDecorator('status', {
                    initialValue: searchCondition.status,
                  })(
                    <Select>
                      <Option value="">{intl.formatMessage(commonMessages.all)}</Option>
                      {
                        Object.keys(messages.accountStatusMap).map(key => (
                          <Option value={key} key={key}>
                            {intl.formatMessage((messages.accountStatusMap as any)[key])}
                          </Option>
                        ))
                      }
                    </Select>,
                  )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}><Button type="primary" onClick={this.handleSearch}>{intl.formatMessage(commonMessages.search)}</Button></Col>
          </Row>
        </Form>
      </ToolbarContainer>);
  }
}

export default compose(
  injectIntl,
  connect(
    createStructuredSelector({ // 实用reselect性能有明显的提升；
      searchCondition: selectSearchCondition,
    }),
    {
      getDataList,
      updateEntityModal,
      updateSearchCondition,
    },
  ),
  Form.create()
)(Toolbar);
