import * as React from 'react';
import { compose } from 'redux';

import {
  Table,
} from 'antd';

import { createStructuredSelector } from 'reselect';
import connectFactory from 'utils/connectFactory';
import TableContainer from 'components/TableContainer';
import TableButton from 'components/TableButton';
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl';
import commonMessages from 'utils/commonMessages';
import { EDIT } from 'utils/constants';

import messages from '../messages';
import { NAMESPACE } from '../constants';
import { getDataList, updateEntityModal } from '../actions';
import { selectPagination, selectSearchCondition, selectTableData } from '../selectors';
import { selectLoading, selectLang } from '../../../state/selectors';
import { Pagination } from '../../../types';

const withConnect = connectFactory(NAMESPACE);

export interface Props {
  tableData: any[];
  pagination: Pagination;
  getDataList: (params: object) => any;
  updateEntityModal: (params: object) => any;
  searchCondition: {

  };
  loading: boolean;
  intl: InjectedIntl;
}

class DataTable extends React.PureComponent<Props, object> {
  // 静态方法，类的不使用this的函数，一般声明为静态方法；
  showTotal = (total: number) => (this.props.intl.formatMessage(commonMessages.total, { total }));

  // 实例变量，挂载在实例上，如若在此变量中未使用this，也可声明为静态变量
  columns = [{
    title: this.props.intl.formatMessage(messages.authId),
    dataIndex: 'privilege_id',
    key: 'privilege_id',
  }, {
    title: this.props.intl.formatMessage(messages.authName),
    dataIndex: 'name',
    key: 'name',
  }, {
    title: this.props.intl.formatMessage(messages.status),
    dataIndex: 'is_delete',
    key: 'is_delete',
    render: (text: string | number) => <FormattedMessage {...(messages.statusMap as any)[text]} />,
  }, {
    title: this.props.intl.formatMessage(commonMessages.operate),
    width: 150,
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
          rowKey="id"
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
  withConnect(
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
