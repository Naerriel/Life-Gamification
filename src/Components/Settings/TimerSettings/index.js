import React, { Component } from 'react';
import timerSettingsIcon from "./assets/timer-settings.svg";

class TimerSettings extends Component {
  render() {
    return (
      <section className="settings-section">
        <div className="settings-section-header">
          <img className="settings-icon" src={timerSettingsIcon} alt="" />
          <span className="settings-header-label">
            Timer Settings
          </span>
        </div>
        <div className="section-content">
          <div>
            <span className="setting-description">
              Time:
            </span>
            <input className="setting-input" type="text" value="25:00" />
          </div>
          <div>
            <span className="setting-description">
              Experience per session:
            </span>
            <input className="setting-input" type="text" value="30" />
          </div>
          <div id="setting-pomodoro-checkbox">
            <span className="setting-description">
              Pomodoro Timer:
            </span>
            <input
              className="setting-input setting-checkbox"
              type="checkbox"
              value="off" />
          </div>
          <div className="setting-pomodoro-information">
            <div>
              <span className="setting-description">
                Length of a break:
              </span>
              <input className="setting-input" type="text" value="5" />
            </div>
            <div>
              <span className="setting-description">
                Length of a big break:
              </span>
              <input className="setting-input" type="text" value="30" />
            </div>
            <div>
              <span className="setting-description">
                Number of pomodoros:
              </span>
              <input className="setting-input" type="text" value="8" />
            </div>
            <div>
              <span className="setting-description">
                Number of big breaks:
              </span>
              <input className="setting-input" type="text" value="1" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default TimerSettings;
