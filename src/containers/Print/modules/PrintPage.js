import React from 'react';
import PropTypes from 'prop-types';
import commonConf from 'config/main.conf';
import styled from 'styled-components';
import BarCode from '../../../components/BarCode';
import {
  Button,
} from 'antd';

import connectFactory from 'utils/connectFactory';
import { CREATE } from 'utils/constants';

import { NAMESPACE } from '../constants';
import { getDataList, updateEntityModal, updateSearchCondition } from '../actions';
import { selectSearchCondition } from '../selectors';

const PrintArea = styled.div`
  background: #fff;
  width: 800px;
  border 1px solid #999;

  h1 {
    text-align: center;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    td {
      border: 1px solid #000;
    }
  }
`;

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
class PrintPage extends React.Component {
  static propTypes = {
  };

  handlePrint = () => {
    window.print();
  }

  render() {
    return (
      <div>
        <Button onClick={this.handlePrint}>打印</Button>
        <PrintArea id="section-to-print">
          <h1>入库验收单</h1>
          <table>
            <thead>
              <tr>
                <td>姓名</td>
                <td>年龄</td>
                <td>货号</td>
                <td>出生日期</td>
                <td>乱七八糟</td>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </PrintArea>
        <BarCode barCode="Hello" displayValue />
      </div>);
  }
}

export default PrintPage;
