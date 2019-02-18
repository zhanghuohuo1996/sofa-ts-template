import * as React from 'react';
import * as ReactDom from 'react-dom';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 10px;
  border-radius: 3px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14);
  overflow: hidden ;
  .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
    padding: 8px 16px;
  }
`;

export interface Props {
  children?: any;
};

interface State {
  height: number;
};

class TableContainer extends React.Component<Props, State> {

  refDom: any = null

  x: number = null

  state = {
    height: 300,
  }

  componentDidMount() {
    this.resetHeight();
    window.addEventListener('resize', this.resetHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resetHeight);
  }

  resetHeight = () => {
    const innerHeight = document.body.offsetHeight;
    const $tableContainer = ReactDom.findDOMNode(this.refDom);
    if (!$tableContainer) {
      return;
    }
    const top = ($tableContainer as any).offsetTop;
    const height = innerHeight - top - 10;

    // 这里的作用仅剩下使分页置底
    const $table = this.refDom.getElementsByClassName('ant-table')[0];
    $table.setAttribute('style', `height: ${height - 80}px`);

    this.setState({
      height,
    });
  }

  getX(columns: any[]) {
    if (this.x) {
      return this.x;
    }
    this.x = columns.reduce((total, item) => {
      const width = item.width || 100;
      item.width = width;
      total += width;
      return total;
    }, 0);

    // 预留20 buffer
    this.x = this.x + 20;
    return this.x;
  }

  getScroll(scroll: {
    x: number;
    y: number;
  }, columns: any[]) {
    const { height } = this.state;
    // 当设置了scroll的值时，直接使用设置值，若只设置了x，则自动设置y;
    if (scroll && scroll.x) {
      if (scroll.y) {
        return scroll;
      }
      return { x: scroll.x, y: height - 120 };
    }
    return { x: this.getX(columns), y: height - 120 };
  }

  render() {
    const { height } = this.state;

    return (
      <Container style={{ height }} ref={(ref) => { this.refDom = ref; }}>
        {
          React.Children.map(this.props.children, child => React.cloneElement(child, { scroll: this.getScroll(child.props.scroll, child.props.columns) }))
        }
      </Container>
    );
  }
}

export default TableContainer;
