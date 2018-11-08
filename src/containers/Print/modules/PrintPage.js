import React from 'react';
import PropTypes from 'prop-types';
import commonConf from 'config/main.conf';
import styled from 'styled-components';

import {
  Button,
} from 'antd';

import connectFactory from 'utils/connectFactory';
import { CREATE } from 'utils/constants';

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
        <div id="section-to-print">
          <h1>我是标题</h1>
          <table>
            <tr>
              <td>姓名</td>
              <td>年龄</td>
              <td>货号</td>
              <td>出生日期</td>
              <td>乱七八糟</td>
            </tr>
          </table>
        </div>
      </div>);
  }
}

export default PrintPage;
