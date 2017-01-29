import React                    from "react";
import { Route, IndexRoute }    from "react-router";
import App                      from "./components/index";
import MainContainer            from "./components/main/mainContainer";
import NotFoundPage             from "./components/common/notFoundPage";

export default (
  <Route component={App} path="/">
    <IndexRoute component={MainContainer}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
