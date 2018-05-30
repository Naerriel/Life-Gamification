import React, { Component } from 'react';
import Header from "../Header/Header";
import Home from "../Home/Home";
import Edit from "../Edit/Edit";
import Timer from "../Timer/Timer";
import ImportExport from "../ImportExport/ImportExport";
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { connect } from "react-redux";
import { getSkills } from "../../actions";

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
          <Route path="/timer" component={Timer} />
          <Route path="/importexport" component={ImportExport} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  console.log("Hi, przyszedl state:");
  console.log(state);
  return {
    skills: state.skills
  }
};

const mapDispatchToProps = { getSkills };

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
