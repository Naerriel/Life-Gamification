import React, { Component } from 'react';
import "./ImportExport.css"
import { connect } from "react-redux";
import { saveAll } from "../../actions/skills.js";

class ImportExport extends Component {
  constructor(){
    super();

    this.state = {text: "" }
  }

  doImport = () => {
    this.setState({ text: JSON.stringify(this.props.skills) });
  }

  doExport = () => {
    try{
      const skills = JSON.parse(this.state.text);
      this.props.saveAll(skills);
      alert("Skills succesfully saved");
    } catch(e) {
      alert("This is not a correct JSON text.");
    }
  }

  handleTextChange = (e) => {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div className="importExport">
        <button
          className="importExportBtn"
          onClick={this.doImport}
        >
          Import
        </button>
        <button
          className="importExportBtn"
          onClick={this.doExport}
        >
          Export
        </button>
        <textarea
          className="importExportJSONText"
          placeholder="Place JSON here"
          value={this.state.text}
          onChange={this.handleTextChange}
        ></textarea>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    skills: state.skills
  };
};

const mapDispatchToProps = { saveAll };

export const ImportExportContainer = connect(
  mapStateToProps, mapDispatchToProps)(ImportExport);
