import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
} from 'antd';

import connectFactory from 'utils/connectFactory';

import { NAMESPACE } from '../constants';
import { postFormData } from '../actions';

const withConnect = connectFactory(NAMESPACE);

@withConnect(
  state => ({
    mainData: state.get('mainData').toJS(),
  }),
  {
    postFormData,
  },
)
class DataTable extends React.Component {
  static propTypes = {
    mainData: PropTypes.array.isRequired,
  };

  columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }];

  render() {
    const { mainData } = this.props;

    return (
      <Table
        bordered
        // loading={loading}
        columns={this.columns}
        dataSource={mainData}
        rowKey="id"
        pagination={{
          // defaultCurrent: 1,
          // current: pagination.page,
          // total: pagination.total,
          // showTotal: this.showTotal,
          // pageSize: pagination.perpage,
          // onChange: this.handlePageChange,
        }}
      />
    );
  }
}

export default DataTable;
