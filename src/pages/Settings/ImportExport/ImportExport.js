import React, { Component } from 'react'
import { connect } from "react-redux"
import importExportIcon from "./assets/import-export.svg"
import { saveSkills } from "redux/actions/skills.js"
import { validateSkills } from "utils/skills"

class _ImportExport extends Component {
  constructor(props) {
    super(props)

    this.state = { input: "" }
  }

  handleInputChange = (e) => {
    this.setState({ input: e.target.value })
  }

  handleImportBtn = () => {
    try {
      let skills = JSON.parse(this.state.input)
      validateSkills(skills)
      this.props.saveSkills(skills)
      this.setState({ input: "" })
    } catch(e) {
      alert("This is not a correct skills' JSON.")
    }
  }

  handleExportBtn = () => {
    this.setState({ input: JSON.stringify(this.props.skills) })
  }

  render() {
    return (
      <section className="settings-section">
        <div className="settings-section-header">
          <img className="settings-icon" src={importExportIcon} alt="" />
          <span className="settings-header-label">
            Import / Export
          </span>
        </div>
        <div className="section-content">
          <button
            onClick={this.handleImportBtn}
            className="setting-btn"
          >
            Import
          </button>
          <button
            onClick={this.handleExportBtn}
            className="setting-btn"
          >
            Export
          </button>
          <textarea
            className="setting-importExport-textarea"
            value={this.state.input}
            onChange={this.handleInputChange}
            placeholder="Place your JSON here"></textarea>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    skills: state.skills
  }
}

const mapDispatchToProps = { saveSkills }

export const ImportExport = connect(
  mapStateToProps, mapDispatchToProps)(_ImportExport)
