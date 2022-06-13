import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { ProtectedRouteWithLayout } from "./components";
import { AdminLayout } from "./layouts";
import { Home, Portfolio, NotFound, Push } from "./pages";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/portfolio" />
      <ProtectedRouteWithLayout
        component={Home}
        exact
        layout={AdminLayout}
        path="/home"
      />
      <ProtectedRouteWithLayout
        component={Portfolio}
        exact
        layout={AdminLayout}
        path="/portfolio"
      />
      <ProtectedRouteWithLayout
        component={Push}
        exact
        layout={AdminLayout}
        path="/push"
      />
      <ProtectedRouteWithLayout
        component={NotFound}
        exact
        layout={AdminLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
