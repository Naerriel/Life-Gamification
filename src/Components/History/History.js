import React, { Component } from 'react';
import { FilterContainer } from "./Filter/Filter.js";
import HistoryLog from "./HistoryLog/HistoryLog.js";
import { connect } from "react-redux";
import { getHistory } from "../../actions/history.js";
import { filterLogs } from "../../selectors/history.js";

class History extends Component {
  constructor(props) {
    super(props);

    this.state = { logs: [] }
  }

  componentDidMount() {
    this.props.getHistory();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ logs: nextProps.logs });
  }

  render() {
    return (
      <div className="content">
        <FilterContainer />
        {
          this.state.logs.map((log) => {
            return <HistoryLog log={log} />
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logs: filterLogs(state.history.logs, state.filterHistoryLogs)
  }
}

const mapDispatchToProps = { getHistory }

export const HistoryContainer = connect(
  mapStateToProps, mapDispatchToProps)(History);
