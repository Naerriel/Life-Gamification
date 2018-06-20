import React, { Component } from 'react';
import "./Settings.css";
import AddExperienceSettings from "./AddExperienceSettings/index.js";
import TimerSettings from "./TimerSettings/index.js";
import { ImportExportContainer } from "./ImportExport/index.js";
import { connect } from "react-redux";
import { saveSettings } from "redux/actions/settings.js";
import { copyJSONWithoutReference } from "libs/other.js";
import update from 'immutability-helper';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temporarySettings: copyJSONWithoutReference(props.settings)
    }
  }

  handleSettingsModification = (key, value) => {
    this.setState({ temporarySettings: update(
      this.state.temporarySettings, {[key]: {$set: value}})
    });
  }

  saveSettings = () => {
    this.props.saveSettings(this.state.temporarySettings);
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
          <ImportExportContainer />
          <button className="save-btn" onClick={this.saveSettings}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  }
};

const mapDispatchToProps = { saveSettings };

export const SettingsContainer = connect(
  mapStateToProps, mapDispatchToProps)(Settings);
