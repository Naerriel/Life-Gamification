import React, { Component } from 'react'
import { Filter } from "./Filter/index.js"
import HistoryLog from "./HistoryLog/index.js"

import { connect } from "react-redux"
import { filterLogs } from "redux/selectors/history.js"

class _History extends Component {
  render() {
    const { logs } = this.props

    return (
      <div className="content">
        <Filter />
        {logs.slice(0).reverse().map((log) => {
            return <HistoryLog log={log} />
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logs: filterLogs(state.history.logs, state.filterHistoryLogs)
  }
}

const mapDispatchToProps = { }

export const History = connect(
  mapStateToProps, mapDispatchToProps)(_History)
