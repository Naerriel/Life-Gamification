import React, { Component } from 'react';
import addExpSettingsIcon from "./assets/add-exp-settings.svg";

class AddExperienceSettings extends Component {

  handleInputChange = (e) => {
    this.props.handleSettingsModification("expAtATime", e.target.value);
  }

  render() {
    return (
      <section className="settings-section">
        <div className="settings-section-header">
          <img className="settings-icon" src={addExpSettingsIcon} alt="" />
          <span className="settings-header-label">
            Add Experience Settings
          </span>
        </div>
        <div className="section-content">
          <div>
            <span className="setting-description">
              Experience at a time:
            </span>
            <input
              className="setting-input"
              type="number"
              value={this.props.temporarySettings.expAtATime}
              onChange={this.handleInputChange}
              />
          </div>
        </div>
      </section>
    );
  }
}

export default AddExperienceSettings;
