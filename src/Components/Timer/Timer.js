import React, { Component } from 'react';
import { AddTimerContainer } from "./AddTimer.js";
import { getTimers } from "../../actions/timers.js";
import { connect } from "react-redux";
import "./Timer.css"

class Timer extends Component {
  constructor() {
    super();

    this.state = { addTimer: false };
  }

  componentDidMount() {
    this.props.getTimers();
  }

  startAddingTimer = () => {
    this.setState({ addTimer: true });
  }

  finishAddingTimer = () => {
    this.setState({ addTimer: false});
  }

  render() {
    console.log("Rendering Timer!");
    console.log(this.props.timers);
    console.log(" ");
    return (
      <div className="timersContainer">
        Hello, timer here!

        <button
          className="startAddingTimerBtn"
          onClick={this.startAddingTimer}
        >
          Add new timer!
        </button>
        <AddTimerContainer
          shouldRender={this.state.addTimer}
          finishAddingTimer={this.finishAddingTimer}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    timers: state.timers
  }
};

const mapDispatchToProps = { getTimers}

export const TimerContainer = connect(
  mapStateToProps, mapDispatchToProps)(Timer);
