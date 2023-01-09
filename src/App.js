import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MainNavigation from './components/Navigation/MainNavigation';


function App() {
  return (
    <div>
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            <Route path="/:userId/todos" exact>
              <Home />
            </Route>
            <Route path="/auth">
              signup
            </Route>
            <Redirect to="/:userId/todos" />
          </Switch >
        </main>
      </Router>
    </div>
  );
}

export default App;
