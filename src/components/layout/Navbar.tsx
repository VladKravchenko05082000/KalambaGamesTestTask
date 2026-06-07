import type { FC } from "react";
import { Link, NavLink } from "react-router-dom";

import { useAuth } from "context/AuthContext";
import { Avatar } from "components/avatar";

export const Navbar: FC = () => {
  const { status, user } = useAuth();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink exact className="nav-link" activeClassName="active" to="/">
              Home
            </NavLink>
          </li>

          {status === "authenticated" && user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/editor">
                  <i className="ion-compose" />
                  &nbsp;New Article
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/settings">
                  <i className="ion-gear-a" />
                  &nbsp;Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to={`/profile/${user.username}`}>
                  <Avatar src={user.image} className="user-pic" alt={user.username} />
                  {user.username}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/logout">
                  Logout
                </NavLink>
              </li>
            </>
          )}

          {status === "anonymous" && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/login">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/register">
                  Sign up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
