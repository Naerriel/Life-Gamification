import React, { Component } from 'react';
import timerSettingsIcon from "./assets/timer-settings.svg";

class TimerSettings extends Component {

  handleInputChange = (e) => {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.handleSettingsModification(name, value);
  }

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
            <input
              name="time"
              className="setting-input"
              type="text"
              value={this.props.temporarySettings.time}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <span className="setting-description">
              Experience per session:
            </span>
            <input
              name="expPerSession"
              className="setting-input"
              type="text"
              value={this.props.temporarySettings.expPerSession}
              onChange={this.handleInputChange}
            />
          </div>
          <div id="setting-pomodoro-checkbox">
            <span className="setting-description">
              Pomodoro Timer:
            </span>
            <input
              name="isPomodoro"
              className="setting-input setting-checkbox"
              type="checkbox"
              checked={this.props.temporarySettings.isPomodoro}
              onChange={this.handleInputChange}
            />
          </div>
          <div className={!this.props.temporarySettings.isPomodoro ?
              "setting-pomodoro-information-dimmed" : (null)}
          >
            <div>
              <span className="setting-description">
                Length of a break:
              </span>
              <input
                name="breakLen"
                className="setting-input"
                type="text"
                value={this.props.temporarySettings.breakLen}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <span className="setting-description">
                Length of a big break:
              </span>
              <input
                name="bigBreakLen"
                className="setting-input"
                type="text"
                value={this.props.temporarySettings.bigBreakLen}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <span className="setting-description">
                Number of pomodoros:
              </span>
              <input
                name="pomodoros"
                className="setting-input"
                type="text"
                value={this.props.temporarySettings.pomodoros}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <span className="setting-description">
                Number of big breaks:
              </span>
              <input
                name="bigBreaks"
                className="setting-input"
                type="text"
                value={this.props.temporarySettings.bigBreaks}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default TimerSettings;
