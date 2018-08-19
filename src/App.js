import React, { Component } from 'react';
import Game from './components/Game'
import Lobby from './components/Lobby'
import Info from './components/Info'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header>
            <h1>Zeeslag</h1>
          </header>
          <main>
            <Route exact path="/" component={Lobby} />
            <Route exact path="/games/:id" component={Game} />
            <Route exact path="/info" component={Info} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
