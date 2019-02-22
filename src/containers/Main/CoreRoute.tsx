import * as React from 'react';
import * as Loadable from 'react-loadable';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoadingIndicator from 'components/LoadingIndicator';

/**
 * 对Menu数据进行了加工，将叶子节点及其对应的路由进行了自动生成，用以减少新增模块对路由进行的修改
 * @param {} arr 待遍历数据
 * @param {*} keyPath 关键路径
 */
function traversMenu(arr: any[], keyPath: any[] = []) {
  let leafsArray: any[] = [];

  arr.forEach((item) => {
    const newKeyPath = keyPath.concat([item.key]);

    if (item.children) {
      leafsArray = leafsArray.concat(traversMenu(item.children, [...newKeyPath]));
    } else {
      leafsArray.push({
        path: `/${newKeyPath.join('/')}`,
        componentName: `${item.key.substring(0, 1).toUpperCase()}${item.key.substring(1)}`,
      });
    }
  });
  return leafsArray;
}

interface IProps extends RouteComponentProps {
  menuConf: any[];
}

class CoreRoute extends React.PureComponent<IProps, object> {
  static makePathToComponent = (menu: any[]) => traversMenu(menu);

  render() {
    const { menuConf } = this.props;

    const pathToComponentArr = CoreRoute.makePathToComponent(menuConf);

    return (
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        { pathToComponentArr.map(item => (
          <Route
            key={item.componentName}
            path={item.path}
            component={Loadable({
              loader: () => import(`../${item.componentName}`),
              loading: LoadingIndicator,
            })}
          />))
        }
        <Route path="*" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default withRouter(CoreRoute);
