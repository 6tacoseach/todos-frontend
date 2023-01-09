import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import TodoForm from './components/TodoForm';


function App() {
  return (
    <div>
      <Router>
        {/* <MainNavigation /> */}

        <nav>

        </nav>
        <main>
          <Switch>
            <Route path="/" exact>
              <Home />
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
