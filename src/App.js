import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MainNavigation from './components/Navigation/MainNavigation';
import UpdateTodo from './components/UpdateTodo';


function App() {
  return (
    <div>
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/todos/:todoId">
              <UpdateTodo />
            </Route>
            <Route path="/auth">
              signup
            </Route>
            <Redirect to="/" />
          </Switch >
        </main>
      </Router>
    </div>
  );
}

export default App;
