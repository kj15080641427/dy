/**
 * ContentRouter 2020-05-26
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Test from "./subpages/test/Test";
import Video from "./subpages/media/Video";
const EmptyContent = () => {
  return (
    <div>
      内容为空,请点击菜单
    </div>
  );
};
const NoMatch = () => {
  return (
    <div>
      没有找到该路由
    </div>
  );
};
class ContentRouter extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    // path现在就是 /home
    let { path } = this.props;
    return (
        <Switch>
          <Route exact path={path} component={EmptyContent} />
          <Route path={path + "/test"} component={Test} />
          <Route path={path + "/video"} component={Video} />
          <Route component={NoMatch} />
        </Switch>
    );
  }
  componentDidMount() { }
}
export default ContentRouter;