import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HomeRoutes, AdminRoutes } from "./routes";
import PageNotFound from "./containers/HOME/PageNotFound";

import HomeTemplate from "./templates/HomeTemplate";
import AdminTemplate from "./templates/AdminTemplate";
import Auth from "./containers/ADMIN/Auth";
import SignUpPage from "./containers/HOME/SignUpPage";
import LogInPage from "./containers/HOME/LoginPage";
import PrivateRoute from "./Components/PrivateRoute";
import BookingPage from "./containers/HOME/BookingPage";
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

        <PrivateRoute
          exact={true}
          path="/booking/:maLichChieu"
          component={BookingPage}
        />

        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/login" component={LogInPage} />

        <Route path="/auth" component={Auth} />
        <Route path="" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
