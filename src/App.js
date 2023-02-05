import React from 'react';
import { useAuth } from './hooks/useAuth';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MainNavigation from './components/Navigation/MainNavigation';
import Auth from './pages/Auth';
import Home from './pages/Home';
import UpdateTodo from './components/Todos/UpdateTodo';
import { AuthContext } from './context/auth-context'
import { TodoContext } from './context/todos-context';
import UserProfile from './pages/UserProfile';

import './App.css';

function App() {

  let routes;
  let { token, userId, todosList, login, logout, updateTodos } = useAuth();

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/todos/:todoId" exact>
          <UpdateTodo />
        </Route>
        <Route path="/users/:userId" exact>
          <UserProfile />
        </Route>
        <Redirect to="/" />
      </ Switch>
    )
  }
  else {
    routes = (
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>

        <Redirect to="/auth" />
      </ Switch>
    )
  }

  return (
    <TodoContext.Provider value={{
      todosList: todosList,
      updateTodos: updateTodos
    }}>
      <AuthContext.Provider value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
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
    </TodoContext.Provider>
  );
}

export default App;
