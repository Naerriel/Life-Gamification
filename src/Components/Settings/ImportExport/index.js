import React, { Component } from 'react';
import { connect } from "react-redux";
import importExportIcon from "./assets/import-export.svg";

class ImportExport extends Component {
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
          <button className="setting-btn">
            Import
          </button>
          <button className="setting-btn">
            Export
          </button>
          <textarea
            className="setting-importExport-textarea"
            placeholder="Place your JSON here"></textarea>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
}

const mapDispatchToProps = {};

export const ImportExportContainer = connect(
  mapStateToProps, mapDispatchToProps)(ImportExport);
