import React from 'react';
import PropTypes from 'prop-types';
import commonConf from 'config/main.conf';

import {
  Form,
  Row,
  Col,
  Input,
  Button,
} from 'antd';

import connectFactory from 'utils/connectFactory';
import { CREATE } from 'utils/constants';
import { injectIntl, intlShape } from 'react-intl';
import commonMessages from 'utils/commonMessages';
import messages from '../messages';

import { NAMESPACE } from '../constants';
import { getDataList, updateEntityModal, updateSearchCondition } from '../actions';
import { selectSearchCondition } from '../selectors';

const withConnect = connectFactory(NAMESPACE);

@withConnect(
  state => ({
    searchCondition: selectSearchCondition(state),
  }),
  {
    getDataList,
    updateEntityModal,
    updateSearchCondition,
  },
)
@Form.create()
class Toolbar extends React.Component {
  static propTypes = {
    searchCondition: PropTypes.object.isRequired,
    getDataList: PropTypes.func.isRequired,
    updateEntityModal: PropTypes.func.isRequired,
    updateSearchCondition: PropTypes.func.isRequired,
    form: PropTypes.any.isRequired,
  };

  componentDidMount() {
    const { searchCondition } = this.props;
    this.props.getDataList({
      ...searchCondition,
      page: 1,
      perpage: commonConf.table.defaultPageSize,
    });
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
      <div className="toolbar-container">
        <div className="function-buttons-container">
          <Button type="primary" onClick={this.handleClickCreate}>{intl.formatMessage(messages.toolbarTableModal.createEntity)}</Button>
        </div>
        <Form>
          <Row gutter={24}>
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
              <Form.Item label={intl.formatMessage(commonMessages.age)}>
                {getFieldDecorator('age', {
                  initialValue: searchCondition.age || '',
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
      </div>);
  }
}

Toolbar.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Toolbar);
