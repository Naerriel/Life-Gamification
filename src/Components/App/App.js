import React, { Component } from 'react';
import Header from "../Header/Header";
import Home from "../Home/Home";
import Edit from "../Edit/Edit";
import Timer from "../Timer/Timer";
import ImportExport from "../ImportExport/ImportExport";
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route path="/index.html" render=
            {(props) => <Home skills={this.props.skills} />}
          />
          <Route exact path="/" render=
            {(props) => <Home skills={this.props.skills} />}
          />
          <Route path="/edit" render=
            {(props) => <Edit skills={this.props.skills} />}
          />
          <Route path="/timer" component={Timer} />
          <Route path="/importexport" component={ImportExport} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
