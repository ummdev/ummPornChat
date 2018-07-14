import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MainPage from './pages/MainPage';
import ListSoundsPage from './pages/ListSounds';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={MainPage}/>
          <Route path="/sounds/:userId" component={ListSoundsPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
