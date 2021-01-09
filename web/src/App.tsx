import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Board from "./pages/board";
import Register from "./pages/register";
import { useMeQuery } from "./generated/graphql";

export const App = () => {
  const { data } = useMeQuery();

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/board/:boardId" component={Board} />
          <Route path="/login">
            {data?.me ? <Redirect to="/dashboard" /> : <Login />}
          </Route>
          <Route path="/register">
            {data?.me ? <Redirect to="/dashboard" /> : <Register />}
          </Route>
          <Route path="/dashboard">
            {data?.me ? <Redirect to="/login" /> : <Dashboard />}
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
};
