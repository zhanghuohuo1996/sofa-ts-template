import * as React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { getFormattedMessages } from 'utils/i18n';

export interface IProps {
  history: History;
  mainMap: {
    [key: string]: any;
  };
  lang: string,
  path: string,
}

export default class Crumb extends React.Component<IProps, object> {
  path = ''

  getCrumbItem = (path: string) => {
    const { lang, mainMap } = this.props;

    const pathArray = path.split('/').filter(item => Boolean(item));
    return pathArray.map((item, index) => {
      if (mainMap[item]) {
        return {
          key: item,
          text: getFormattedMessages(lang, `sofa.config.${item}`),
          path: index === 0 ? './' : pathArray.slice(1, index + 1).join('/'),
        };
      }
      return null;
    }).filter(item => Boolean(item));
  }

  render() {
    const { history } = this.props;
    this.path = history.location.pathname;
    const items = this.getCrumbItem(this.path);

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
