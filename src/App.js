import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HomeRoutes, AdminRoutes } from "./routes";
import PageNotFound from "./containers/HOME/PageNotFound";

import HomeTemplate from "./templates/HomeTemplate";
import AdminTemplate from "./templates/AdminTemplate";
import Auth from "./containers/ADMIN/Auth";
function App() {
  const renderRoutesHome = (routes) => {
    return routes.map((route, index) => {
      return (
        <HomeTemplate
          key={index}
          exact={route.exact}
          path={route.path}
          Component={route.component}
        />
      );
    });
  };

  const renderRoutesAdmin = (routes) => {
    return routes.map((route, index) => {
      return (
        <AdminTemplate
          key={index}
          exact={route.exact}
          path={route.path}
          Component={route.component}
        />
      );
    });
  };

  return (
    <BrowserRouter>
      <Switch>
        {renderRoutesHome(HomeRoutes)}
        {renderRoutesAdmin(AdminRoutes)}

        <Route path="/auth" component={Auth} />
        <Route path="" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
