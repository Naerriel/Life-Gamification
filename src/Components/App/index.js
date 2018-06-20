import React, { Component } from 'react'
import { Header } from "../Header/index.js"
import { Home } from "../Home/index.js"
import { History } from "../History/index.js"
import { Settings } from "../Settings/index.js"

import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from "react-redux"
import { getSkills } from "redux/actions/skills.js"
import { getSettings } from "redux/actions/settings.js"

class _App extends Component {
  componentDidMount() {
    this.props.getSkills()
    this.props.getSettings()
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
    )
  }
}

const mapStateToProps = state => {
  return {
    skills: state.skills
  }
}

const mapDispatchToProps = { getSkills, getSettings }

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
