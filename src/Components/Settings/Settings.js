import React, { Component } from 'react';
import "./Settings.css";
import AddExperienceSettings from "./AddExperienceSettings/index.js";
import TimerSettings from "./TimerSettings/index.js";
import { ImportExportContainer } from "./ImportExport/index.js";

class Settings extends Component {
  render() {
    return (
      <div className="settings content">
        <div className="column">
          <AddExperienceSettings />
          <TimerSettings />
        </div>
        <div className="column">
          <ImportExportContainer />
        </div>
      </div>
    );
  }
}

export default Settings;
