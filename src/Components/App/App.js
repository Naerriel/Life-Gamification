import React, { Component } from 'react';
import './App.css';
import Header from "../Header/Header";
import Home from "../Home/Home";
import History from "../History/History";
import Settings from "../Settings/Settings";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from "react-redux";
//import { getSkills } from "../../actions/skills.js";

class App extends Component {
  componentDidMount() {
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
          <Route path="/settings" component={Settings} />
          <Route path="/history" component={History} />
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

const mapDispatchToProps = { };

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
