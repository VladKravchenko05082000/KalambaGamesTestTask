import { FC } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { Layout } from "components/layout";

import { Login, Logout } from "pages/auth";
import { Home } from "./pages/home";

import Article from "./pages/Article";

import Editor from "./pages/Editor";

import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

export const App: FC = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/editor" exact component={Editor} />
          <Route path="/editor/:slug" exact component={Editor} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/profile/:username" exact component={Profile} />
          <Route path="/profile/:username/favorites" exact component={Profile} />
          <Route path="/register" exact component={Login} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/:slug" exact component={Article} />
          <Route path="/" component={Home} />
        </Switch>
      </Layout>
    </Router>
  );
};
