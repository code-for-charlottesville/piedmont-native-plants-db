import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {Home} from './components/Home'
import {Search} from './components/Search'
import {Edit} from './components/Edit'
import './App.css';

function App() {
  return (
    <div className="App">
    <Router>
      <header className="App-header">
        <h1>Piedmont Virginia Native Plant Database</h1>
      </header>
      <main>
        <div>
          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route path='/Search'>
              <Search/>
            </Route>
            <Route path='/Edit'>
              <Edit/>
            </Route>
          </Switch>
        </div>
      </main>
    </Router>
    </div>
  );
}

export default App;
