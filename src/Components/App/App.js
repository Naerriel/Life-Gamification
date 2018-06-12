import React, { Component } from 'react';
import Header from "../Header/Header";
import Home from "../Home/Home";
import Edit from "../Edit/Edit";
import { TimerContainer } from "../Timer/Timer";
import { ImportExportContainer } from "../ImportExport/ImportExport";
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { connect } from "react-redux";
import { getSkills } from "../../actions/skills.js";

class App extends Component {
  componentDidMount() {
    this.props.getSkills();
  }

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
          <Route path="/timer" component={TimerContainer} />
          <Route path="/importexport" component={ImportExportContainer} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    skills: state.skills
  }
};

const mapDispatchToProps = { getSkills };

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
