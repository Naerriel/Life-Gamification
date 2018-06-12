import React, { Component } from "react";
import "./AddTimer.css"
import { connect } from "react-redux";
import { addTimer, savePomodoroOptions,
  getPomodoroOptions } from "../../actions/timers.js";
import { defaultPomodoroOptions } from "../../selectors/other.js";
import update from 'immutability-helper';

class AddTimer extends Component {
  constructor(props) {
    super();

    this.state = {
      shouldRender: props.shouldRender,
      pomodoroOptions: defaultPomodoroOptions
    };
  }

  componentDidMount() {
    this.props.getPomodoroOptions();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      shouldRender: nextProps.shouldRender,
      pomodoroOptions: nextProps.pomodoroOptions
    });
  }

  completeAddingTimer = () => {
    this.props.finishAddingTimer();
    this.props.addTimer();
    this.props.savePomodoroOptions(this.state.pomodoroOptions);
  }

  rejectAddingTimer = () => {
    this.props.finishAddingTimer();
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      pomodoroOptions: update(this.state.pomodoroOptions,
        {[name]: {$set: value}})
    });
  }

  render() {
    console.log(this.state.pomodoroOptions);
    if(!this.state.shouldRender){
      return (null)
    } else {
      return (
        <div>
          <div className="screenDim">
          </div>
          <div className="addTimer">
            <div className="mainAddTimerInfo">
              <dl>
                <dd>Time:</dd>
                <dt>
                  <input
                    type="text"
                    name="time"
                    value={this.state.pomodoroOptions.time}
                    onChange={this.handleInputChange}
                  />
                </dt>
              </dl>
              <dl>
                <dd>Pomodoro Timer:</dd>
                <dt>
                  <input
                    type="checkbox"
                    name="isPomodoro"
                    checked={this.state.pomodoroOptions.isPomodoro}
                    onChange={this.handleInputChange}
                  />
                </dt>
              </dl>
            </div>
            <div className="pomodoroAddTimerInfo">
              <dl>
                <dd>Break length:</dd>
                <dt>
                  <input
                    type="text"
                    name="breakLen"
                    value={this.state.pomodoroOptions.breakLen}
                    onChange={this.handleInputChange}
                  />
                </dt>
              </dl>
              <dl>
                <dd>Big break length:</dd>
                <dt>
                  <input
                    type="text"
                    name="bigBreakLen"
                    value={this.state.pomodoroOptions.bigBreakLen}
                    onChange={this.handleInputChange}
                  />
                </dt>
              </dl>
              <dl>
                <dd>Pomodoros:</dd>
                <dt>
                  <input
                    type="text"
                    name="pomodoros"
                    value={this.state.pomodoroOptions.pomodoros}
                    onChange={this.handleInputChange}
                  />
                </dt>
              </dl>
              <dl>
                <dd>Big breaks:</dd>
                <dt>
                  <input
                    type="text"
                    name="bigBreaks"
                    value={this.state.pomodoroOptions.bigBreaks}
                    onChange={this.handleInputChange}
                  />
                </dt>
              </dl>
            </div>
            <div className="addTimerBtns">
              <button
                className="addTimerBtn"
                onClick={this.completeAddingTimer}
              >
                Start
              </button>
              <button
                className="addTimerBtn"
                onClick={this.rejectAddingTimer}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    pomodoroOptions: state.pomodoroOptions
  };
}

const mapDispatchToProps = { addTimer, savePomodoroOptions, getPomodoroOptions };

export const AddTimerContainer = connect(
  mapStateToProps, mapDispatchToProps)(AddTimer);
