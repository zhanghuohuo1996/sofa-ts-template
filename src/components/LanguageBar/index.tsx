import * as React from 'react';
import { Radio } from 'antd';

export interface IProps {
  value: string;
  onToggle: (value: string) => any;
}

class LanguageBar extends React.PureComponent<IProps, object> {
  handleChangeSelect = (e: any) => {
    const { onToggle } = this.props;
    const { value } = e.target;

    onToggle(value);
  }

  render() {
    const { value } = this.props;
    return (
      <div>
        <Radio.Group
          buttonStyle="solid"
          value={value}
          onChange={this.handleChangeSelect}
        >
          <Radio.Button value="zh">中文</Radio.Button>
          <Radio.Button value="en">English</Radio.Button>
        </Radio.Group>
      </div>
    );
  }
}

export default LanguageBar;
