import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { ProtectedRouteWithLayout } from "./components";
import { AdminLayout } from "./layouts";
import {
  Home,
  Portfolio,
  Stock,
  CryptoCurrency,
  NotFound,
  MarketIndex,
  News,
} from "./pages";

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
        component={Stock}
        exact
        layout={AdminLayout}
        path="/stock"
      />
      <ProtectedRouteWithLayout
        component={CryptoCurrency}
        exact
        layout={AdminLayout}
        path="/cryptoCurrency"
      />
      <ProtectedRouteWithLayout
        component={MarketIndex}
        exact
        layout={AdminLayout}
        path="/marketIndex"
      />
      <ProtectedRouteWithLayout
        component={News}
        exact
        layout={AdminLayout}
        path="/news"
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
