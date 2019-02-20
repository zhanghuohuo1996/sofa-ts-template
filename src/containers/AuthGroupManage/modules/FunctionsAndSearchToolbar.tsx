import * as React from 'react';
import commonConf from 'config/main.conf';
import { compose } from 'redux';

import {
  Form,
  Row,
  Col,
  Input,
  Button,
} from 'antd';

import connectFactory from 'utils/connectFactory';
import { CREATE } from 'utils/constants';
import ToolbarContainer from 'components/ToolbarContainer';
import FunctionButtonsContainer from 'components/FunctionButtonsContainer';
import { injectIntl, InjectedIntl } from 'react-intl';
import commonMessages from 'utils/commonMessages';
import messages from '../messages';

import { NAMESPACE } from '../constants';
import { getDataList, updateEntityModal, updateSearchCondition } from '../actions';
import { selectSearchCondition } from '../selectors';

const withConnect = connectFactory(NAMESPACE);

export interface Props {
  searchCondition: {
    authGroupCode?: string | number;
    authGroupName?: string;
  };
  getDataList: (params: object) => any;
  updateEntityModal: (params: object) => any;
  updateSearchCondition: (params: object) => any;
  form: any;
  intl: InjectedIntl;
}

class Toolbar extends React.Component<Props, object> {
  componentDidMount() {
    const { searchCondition } = this.props;
    this.props.getDataList({
      ...searchCondition,
      page: 1,
      perpage: commonConf.table.defaultPageSize,
    });
  }

  handleSearch = () => {
    this.props.form.validateFields((err: any, values: {[key: string]: any}) => {
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
          <Button type="primary" onClick={this.handleClickCreate}>{intl.formatMessage(messages.createAuthGroup)}</Button>
        </FunctionButtonsContainer>
        <Form>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label={intl.formatMessage(messages.authGroupCode)}>
                {getFieldDecorator('authGroupCode', {
                  initialValue: searchCondition.authGroupCode || '',
                })(
                  <Input />,
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={intl.formatMessage(messages.authGroupName)}>
                {getFieldDecorator('authGroupName', {
                  initialValue: searchCondition.authGroupName || '',
                })(
                  <Input />,
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
  withConnect(
    state => ({
      searchCondition: selectSearchCondition(state),
    }),
    {
      getDataList,
      updateEntityModal,
      updateSearchCondition,
    },
  ),
  Form.create(),
)(Toolbar);
