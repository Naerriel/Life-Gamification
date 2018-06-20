import React, { Component } from 'react'
import { Filter } from "./Filter/index.js"
import HistoryLog from "./HistoryLog/index.js"

import { connect } from "react-redux"
import { getHistory } from "redux/actions/history.js"
import { filterLogs } from "redux/selectors/history.js"

class _History extends Component {
  constructor(props) {
    super(props);

    this.state = { logs: [] }
  }

  componentDidMount() {
    this.props.getHistory()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ logs: nextProps.logs })
  }

  render() {
    return (
      <div className="content">
        <Filter />
        {
          this.state.logs.map((log) => {
            return <HistoryLog log={log} />
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logs: filterLogs(state.history.logs, state.filterHistoryLogs)
  }
}

const mapDispatchToProps = { getHistory }

export const History = connect(
  mapStateToProps, mapDispatchToProps)(_History)
