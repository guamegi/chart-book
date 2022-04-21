import React from "react";
import { NavLink } from "react-router-dom";

class TopMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav
        className={
          "navbar navbar-dark navbar-expand align-items-start bg-gradient-primary shadow mb-4"
        }
      >
        <div className="container d-flex flex-row">
          <ul className="nav navbar-nav text-light">
            <li className="nav-item ml-2" role="presentation">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/dashboard"
              >
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item ml-2" role="presentation">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/portfolio"
              >
                <span>Portfolio</span>
              </NavLink>
            </li>
            <li className="nav-item ml-2" role="presentation">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/tasks"
              >
                <span>Tasks</span>
              </NavLink>
            </li>
            <li className="nav-item ml-2" role="presentation">
              <NavLink className="nav-link" activeClassName="active" to="/test">
                <span>Test</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default TopMenu;
