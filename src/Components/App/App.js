import React, { Component } from 'react';
import './App.css';
import { HeaderContainer } from "../Header/Header";
import Home from "../Home/Home";
import { HistoryContainer } from "../History/History";
import { SettingsContainer } from "../Settings/Settings";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from "react-redux";
import { getSkills } from "../../actions/skills.js";
import { getSettings } from "../../actions/settings.js";

class App extends Component {
  componentDidMount() {
    this.props.getSkills();
    this.props.getSettings();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <HeaderContainer />
          <Route path="/index.html" render=
            {(props) => <Home skills={this.props.skills} />}
          />
          <Route exact path="/" render=
            {(props) => <Home skills={this.props.skills} />}
          />
          <Route path="/settings" component={SettingsContainer} />
          <Route path="/history" component={HistoryContainer} />
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

const mapDispatchToProps = { getSkills, getSettings };

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
