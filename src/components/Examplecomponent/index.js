import React from 'react';
import PropTypes from 'prop-types';

class ExampleComponent extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
  }

  state = {
    fold: true,
  }

  render() {
    return (
      <div>
        测试组件
      </div>
    );
  }
}

export default ExampleComponent;
