import React from "react";
import { NavLink } from "react-router-dom";

const TopBar = (props) => {
  return (
    <nav className="navbar navbar-light navbar-expand bg-white topbar static-top">
      <div className="container">
        <NavLink
          className="navbar-brand d-flex justify-content-center align-items-center topbar-brand m-0"
          activeClassName="active"
          to="/portfolio"
        >
          <div className="topbar-brand-icon rotate-n-15">
            <i className="fas fa-braille"></i>
          </div>
          <div className="topbar-brand-text mx-3">
            <span>ChartBook</span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default TopBar;
