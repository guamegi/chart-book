import React, { useEffect, useState } from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import AuthService from "services/Auth/authService";
import defaultAvatar from "assets/img/defaultAvatar.jpg";

const TopBar = (props) => {
  let history = useHistory();
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setFullName(user.firstname + " " + user.lastname);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    history.push("/login");
  };
  return (
    <nav className="navbar navbar-light navbar-expand bg-white topbar static-top">
      <div className="container">
        <NavLink
          className="navbar-brand d-flex justify-content-center align-items-center topbar-brand m-0"
          activeClassName="active"
          to="/dashboard"
        >
          <div className="topbar-brand-icon rotate-n-15">
            <i className="fas fa-braille"></i>
          </div>
          <div className="topbar-brand-text mx-3">
            <span>ChartBook</span>
          </div>
        </NavLink>
        <ul className="nav navbar-nav flex-nowrap ml-auto">
          <div className="d-none d-sm-block topbar-divider" />
          <li className="nav-item dropdown no-arrow" role="presentation">
            <div className="nav-item dropdown no-arrow">
              <a
                className="dropdown-toggle nav-link"
                data-toggle="dropdown"
                aria-expanded="false"
                href="/#"
              >
                <span className="d-none d-lg-inline mr-2 text-gray-600 small">
                  {fullName}
                </span>
                <img
                  className="border rounded-circle img-profile"
                  alt=""
                  src={defaultAvatar}
                />
              </a>
              <div
                className="dropdown-menu shadow dropdown-menu-right animated--grow-in"
                role="menu"
              >
                <Link
                  className="dropdown-item"
                  role="presentation"
                  to="/profile"
                >
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                  Profile
                </Link>
                <div className="dropdown-divider" />
                <button
                  className="dropdown-item"
                  role="presentation"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                  Logout
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
