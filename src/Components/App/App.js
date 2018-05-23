import React, { Component } from 'react';
import Header from "../Header/Header";
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          Welcome to the Life Gamification!
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
