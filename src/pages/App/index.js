import React, { Component } from 'react'
import { Header } from "../../components/Header/index.js"
import { Home } from "../../components/Home/index.js"
import { History } from "../../components/History/index.js"
import { Settings } from "../../components/Settings/index.js"
import { AddExp } from "../../components/WorkComplete/AddExp/index.js"
import { FinishPomodoro } from "../../components/WorkComplete/FinishPomodoro/index.js"

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

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
