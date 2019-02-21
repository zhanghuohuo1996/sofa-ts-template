import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl';

import TableContainer from 'components/TableContainer';
import TableButton from 'components/TableButton';
import commonMessages from 'utils/commonMessages';
import { EDIT } from 'utils/constants';

import { selectLoading, selectLang } from '../../../state/selectors';
import { Pagination } from '../../../types';

import messages from '../messages';
import { getDataList, updateEntityModal } from '../actions';
import { selectPagination, selectSearchCondition, selectTableData } from '../selectors';

interface Props {
  tableData: object[];
  pagination: Pagination;
  getDataList: (params: object) => any;
  updateEntityModal: (params: object) => any;
  updateResetPasswordModal: (params: object) => any;
  searchCondition: object;
  loading: boolean;
  intl: InjectedIntl;
}

class DataTable extends React.PureComponent<Props, object> {
  // 静态方法，类的不使用this的函数，一般声明为静态方法；
  showTotal = (total: number) => (this.props.intl.formatMessage(commonMessages.total, { total }));

  // 实例变量，挂载在实例上，如若在此变量中未使用this，也可声明为静态变量
  columns = [{
    title: this.props.intl.formatMessage(messages.authGroupCode),
    dataIndex: 'role_id',
    key: 'role_id',
  }, {
    title: this.props.intl.formatMessage(messages.authGroupName),
    dataIndex: 'name',
    key: 'name',
  }, {
    title: this.props.intl.formatMessage(messages.status),
    dataIndex: 'is_delete',
    key: 'is_delete',
    render: (text: string) => <FormattedMessage {...(messages.statusMap as any)[text]} />,
  }, {
    title: this.props.intl.formatMessage(commonMessages.operate),
    width: 250,
    key: 'action',
    render: (value: any, row: object) => (
      <div>
        <TableButton onClick={() => this.handleClickEdit(row)}>
          {this.props.intl.formatMessage(messages.modifyInfo)}
        </TableButton>
      </div>
    ),
  }];

  handleClickEdit(data: object) {
    this.props.updateEntityModal({
      type: EDIT,
      show: true,
      data,
    });
  }

  handleResetPassword(data: object) {
    this.props.updateResetPasswordModal({
      show: true,
      data,
    });
  }

  // 实例变量/方法，使用了箭头函数做this的绑定，若无特殊传参，在render函数中优先使用这种方式进行函数声明；
  handlePageChange = (page: number) => {
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
      <TableContainer>
        <Table
          bordered
          loading={loading}
          columns={this.columns}
          dataSource={tableData}
          rowKey="role_id"
          pagination={{
            current: pagination.page,
            total: pagination.total,
            pageSize: pagination.pageSize,
            showTotal: this.showTotal,
            onChange: this.handlePageChange,
          }}
        />
      </TableContainer>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    createStructuredSelector({
      tableData: selectTableData,
      pagination: selectPagination,
      searchCondition: selectSearchCondition,
      loading: selectLoading,
      lang: selectLang,
    }),
    {
      getDataList,
      updateEntityModal,
    },
  ),
)(DataTable);
