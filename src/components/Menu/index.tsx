import * as React from 'react';

import { Menu } from 'antd';
import menuNesting from './helper';

interface HandleChangeLocation {
  (pathname: string): any;
};

export interface Props {
  selectedKeys?: string[],
  openKeys?: string[],
  authList: any[],
  data: any[],
  changeLocation: HandleChangeLocation;
}

interface State {
  openKeys: string[],
  selectedKeys: string[],
}

export default class SofaMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openKeys: props.openKeys,
      selectedKeys: props.selectedKeys,
    };
  }

  handleClick = ({ keyPath = [''] }) => {
    const { changeLocation } = this.props;
    const path = [...keyPath];
    path.reverse();
    const pathname = `/${path.join('/')}`;
    changeLocation(pathname);

    const { openKeys, selectedKeys } = SofaMenu.pathKeys(pathname);
    this.setState({
      openKeys,
      selectedKeys,
    });
  }

  static pathKeys = (pathname: string) => {
    if (pathname) {
      const pathArray = pathname.split('/').filter(Boolean);
      if (pathname === '/' || pathArray.length < 2) {
        return {
          openKeys: [],
          selectedKeys: pathArray.length ? pathArray : ['homePage'],
        };
      }
      return {
        openKeys: pathArray.slice(0, pathArray.length - 1),
        selectedKeys: pathArray.slice(-1),
      };
    }
    return {
      openKeys: [],
      selectedKeys: ['homePage'],
    };
  }

  render() {
    const {
      authList,
      data,
    } = this.props;

    const {
      selectedKeys,
      openKeys,
    } = this.state;

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
