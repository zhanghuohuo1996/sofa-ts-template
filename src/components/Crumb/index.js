import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'utils/constants';
import { translationMessages } from '../../i18n';
import store from '../../index';

let lang = DEFAULT_LOCALE;
setTimeout(() => {
  const state = store.getState();
  lang = state.get('global').get('lang');
  store.subscribe(() => {
    lang = state.get('global').get('lang');// 由于使用了subscribe，当数据更改时会重新获取
  });
}, 3000);

function getText(key) {
  return translationMessages[lang][`sofa.config.${key}`];
}

function getCrumbItem(path, menuMap) {
  debugger
  const pathArray = path.split('/').filter(item => Boolean(item));
  return pathArray.map((item, index) => {
    if (menuMap[item]) {
      return {
        key: item,
        text: getText(item),
        path: index === 0 ? './' : pathArray.slice(1, index + 1).join('/'),
      };
    }
    return null;
  });
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
      <Breadcrumb className="breadCrumb">
        {
          items.map((item, index) => (
            <Breadcrumb.Item key={item.key}>
              {
                item.path && index !== 0 && index !== items.length - 1
                  ? <Link to={item.path}>{item.text}</Link> : item.text
              }
            </Breadcrumb.Item>
          ))
        }
      </Breadcrumb>
    );
  }
}

Crumb.propTypes = {
  history: PropTypes.any.isRequired,
  mainMap: PropTypes.object.isRequired,
  subMap: PropTypes.object,
};
