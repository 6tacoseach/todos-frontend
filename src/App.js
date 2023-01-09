import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MainNavigation from './components/Navigation/MainNavigation';
import Auth from './pages/Auth';
import Home from './pages/Home';
import UpdateTodo from './components/Todos/UpdateTodo';
import { AuthContext } from './context/auth-context'

import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/todos/:todoId">
          <UpdateTodo />
        </Route>
        <Redirect to="/" />
      </ Switch>
    )
  }
  else {
    routes = (
      <Switch>
        <Auth />
        <Redirect to="/auth" />
      </ Switch>
    )
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout
    }}>
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            {routes}
          </Switch >
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
