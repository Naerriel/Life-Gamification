import React, { Component } from 'react'
import { Header } from "../components/Header"
import { Home } from "./Home"
import { History } from "./History"
import { Settings } from "./Settings"
import { AddExp } from "../components/WorkComplete/AddExp"
import { FinishPomodoro } from "../components/WorkComplete/FinishPomodoro"

import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from "react-redux"
import { getSkills } from "redux/actions/skills.js"
import { getSettings } from "redux/actions/settings.js"
import { getHistory } from "redux/actions/history.js"

class _App extends Component {
  componentDidMount() {
    this.props.getSkills()
    this.props.getSettings()
    this.props.getHistory()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <main>
            <AddExp />
            <FinishPomodoro />
            <Route path="/index.html" render=
              {(props) => <Home skills={this.props.skills} />}
            />
            <Route exact path="/" render=
              {(props) => <Home skills={this.props.skills} />}
            />
            <Route path="/settings" component={Settings} />
            <Route path="/history" component={History} />
          </main>
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

const mapDispatchToProps = { getSkills, getSettings, getHistory }

export const Router = connect(mapStateToProps, mapDispatchToProps)(_App)
