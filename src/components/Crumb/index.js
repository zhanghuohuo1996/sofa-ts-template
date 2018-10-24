import React from 'react';
import PropTypes from 'prop-types';

function getCrumbItem(path, mainMap, subMap) {
  const pathArr = path.split('/').filter(item => Boolean(item));
  const crumbArr = [];
  pathArr.forEach((pathItem) => {
    if (subMap && subMap[pathItem]) {
      crumbArr.push(subMap[pathItem]);
    } else if (mainMap[pathItem]) {
      crumbArr.push(mainMap[pathItem]);
    } else {
      crumbArr.push(pathItem);
    }
  });
  return crumbArr;
}

// eslint-disable-next-line
export default class Crumb extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { history } = nextProps;
    if (history.location.pathname !== this.path) {
      return true;
    }
    return false;
  }

  render() {
    const { history, mainMap, subMap } = this.props;
    this.path = history.location.pathname;
    const items = getCrumbItem(this.path, mainMap, subMap);

    return (
      <ul>
        { items.map(item => (
          <li key={item}>
            { item }
          </li>
        ))}
      </ul>
    );
  }
}

Crumb.propTypes = {
  history: PropTypes.any.isRequired,
  mainMap: PropTypes.object.isRequired,
  subMap: PropTypes.object,
};
