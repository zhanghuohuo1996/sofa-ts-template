import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Button,
} from 'antd';

import connectFactory from 'utils/connectFactory';
import { EDIT } from 'utils/constants';
import { injectIntl, intlShape } from 'react-intl';
import commonMessages from 'utils/commonMessages';
import messages from '../messages';

import { NAMESPACE } from '../constants';
import { getDataList, updateEntityModal } from '../actions';

const withConnect = connectFactory(NAMESPACE);

@withConnect(
  // 第二个参数为全局的state, loading取自全局；
  (state, globalState) => ({
    tableData: state.get('tableData').toJS(),
    pagination: state.get('pagination').toJS(),
    searchCondition: state.get('searchCondition').toJS(),
    loading: globalState.getIn(['global', 'loading']),
  }),
  {
    getDataList,
    updateEntityModal,
  },
)
class DataTable extends React.Component {
  // 静态变量，propTypes一定是静态变量，是挂载在类上的；
  static propTypes = {
    tableData: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    getDataList: PropTypes.func.isRequired,
    updateEntityModal: PropTypes.func.isRequired,
    searchCondition: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  // 静态方法，类的不使用this的函数，一般声明为静态方法；
  static showTotal(total) {
    return `总共 ${total} 条`;
  }

  // 实例变量，挂载在实例上，如若在此变量中未使用this，也可声明为静态变量
  columns = [{
    title: this.props.intl.formatMessage(commonMessages.name),
    dataIndex: 'name',
    key: 'name',
  }, {
    title: this.props.intl.formatMessage(commonMessages.age),
    dataIndex: 'age',
    key: 'age',
  }, {
    title: this.props.intl.formatMessage(commonMessages.email),
    dataIndex: 'email',
    key: 'email',
  }, {
    title: this.props.intl.formatMessage(commonMessages.phone),
    dataIndex: 'phone',
    key: 'phone',
  }, {
    title: '',
    dataIndex: 'id',
    key: 'id',
    render: (value, row) => (
      <div>
        <Button onClick={() => this.handleClickEdit(row)}>{this.props.intl.formatMessage(commonMessages.edit)}</Button>
      </div>
    ),
  }];

  handleClickEdit(data) {
    this.props.updateEntityModal({
      type: EDIT,
      show: true,
      data,
    });
  }

  // 实例变量/方法，使用了箭头函数做this的绑定，若无特殊传参，在render函数中优先使用这种方式进行函数声明；
  handlePageChange = (page) => {
    const { searchCondition, pagination } = this.props;

    this.props.getDataList({
      ...searchCondition,
      perpage: pagination.pageSize,
      page,
    });
  }

  render() {
    const { tableData, pagination, loading } = this.props;

    return (
      <Table
        bordered
        loading={loading}
        columns={this.columns}
        dataSource={tableData}
        rowKey="id"
        pagination={{
          current: pagination.page,
          total: pagination.total,
          pageSize: pagination.pageSize,
          showTotal: DataTable.showTotal,
          onChange: this.handlePageChange,
        }}
      />
    );
  }
}

DataTable.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(DataTable);
