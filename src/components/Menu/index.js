import React from 'react';
import PropTypes from 'prop-types';

import { Menu } from 'antd';
import menuNesting from './helper';

export default class SofaMenu extends React.PureComponent {
  handleClick = ({ keyPath }) => {
    const { changeLocation } = this.props;
    changeLocation(keyPath);
  }

  render() {
    const {
      selectedKeys,
      openKeys,
      authList,
      data,
    } = this.props;

    return (
      <Menu
        selectedKeys={selectedKeys}
        className="ant-menu"
        onClick={this.handleClick}
        defaultSelectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        mode="inline"
      >
        { menuNesting(data, authList) }
      </Menu>
    );
  }
}

SofaMenu.propTypes = {
  selectedKeys: PropTypes.array,
  openKeys: PropTypes.array,
  authList: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  changeLocation: PropTypes.func.isRequired,
};
