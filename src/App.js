import React, { useCallback, useState } from 'react';
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
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [todosList, setTodosList] = useState([]);

  const login = useCallback((uid, token) => {

    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(false);
    setUserId(null);
  }, []);

  const updateTodos = useCallback((todos) => {
    setTodosList(todos);
  }, []);

  let routes;

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
