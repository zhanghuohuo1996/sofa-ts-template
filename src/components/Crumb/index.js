import React from 'react';
import PropTypes from 'prop-types';

function getCrumbItem(path, mainMap, subMap) {
  const pathArr = path.split('/').filter(item => Boolean(item));
  const crumbArr = [];
  // pathArr.forEach(pathItem => {
  //   if (mainMap[pathItem]) {
  //     crumbArr
  //   }
  // });
  return [];
}

// eslint-disable-next-line
export default class Crumb extends React.PureComponent {
  render() {
    const { path, mainMap, subMap } = this.props;
    const items = getCrumbItem(path, mainMap, subMap);
    return (
      <ul>
        { items.map(item => (
          <li>
            { item.name }
          </li>
        ))}
      </ul>
    );
  }
}

Crumb.propTypes = {
  path: PropTypes.string.isRequired,
  mainMap: PropTypes.object.isRequired,
  subMap: PropTypes.object.isRequired,
};
