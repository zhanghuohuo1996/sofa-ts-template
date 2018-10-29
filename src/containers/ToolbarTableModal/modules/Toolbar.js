import React from 'react';
import {
  Form,
  Row,
  Col,
  Input,
} from 'antd';

// eslint-disable-next-line
export default class Toolbar extends React.PureComponent {
  render() {
    return (
      <Form>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="姓名">
              <Input placeholder="请输入姓名"></Input>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="年龄">
              <Input placeholder="请输入年龄"></Input>
            </Form.Item>
          </Col>
        </Row>
      </Form>);
  }
}
