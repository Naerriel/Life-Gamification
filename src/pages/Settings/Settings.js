import React, { Component } from 'react'
import AddExperienceSettings from "./AddExperienceSettings/AddExperienceSettings.js"
import TimerSettings from "./TimerSettings/TimerSettings.js"
import { ImportExport } from "./ImportExport/ImportExport.js"

import "./_Settings.css";

import { connect } from "react-redux"
import { saveSettings } from "redux/actions/settings.js"
import { copyJSONWithoutReference } from "utils/other"
import update from 'immutability-helper'

class _Settings extends Component {
  constructor(props) {
    super()

    this.state = {
      temporarySettings: copyJSONWithoutReference(props.settings)
    }
  }

  handleSettingsModification = (key, value) => {
    this.setState({ temporarySettings: update(
      this.state.temporarySettings, {[key]: {$set: value}})
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      temporarySettings: copyJSONWithoutReference(nextProps.settings)
    });
  }

  saveSettings = () => {
    this.props.saveSettings(this.state.temporarySettings)
  }

  render() {
    return (
      <div className="settings content">
        <div className="column">
          <AddExperienceSettings
            temporarySettings={this.state.temporarySettings}
            handleSettingsModification={this.handleSettingsModification}
          />
          <TimerSettings
            temporarySettings={this.state.temporarySettings}
            handleSettingsModification={this.handleSettingsModification}
          />
        </div>
        <div className="column">
          <ImportExport />
          <button className="save-btn" onClick={this.saveSettings}>
            Save
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  }
}

const mapDispatchToProps = { saveSettings }

export const Settings = connect(
  mapStateToProps, mapDispatchToProps)(_Settings)
