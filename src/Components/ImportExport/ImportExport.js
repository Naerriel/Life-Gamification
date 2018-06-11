import React, { Component } from 'react';

import "./ImportExport.css"

class ImportExport extends Component {

  render() {
    return (
      <div className="importExport">
        <button className="importExportBtn">Import</button>
        <button className="importExportBtn">Export</button>
        <textarea
          className="importExportJSONText"
          placeholder="Place JSON here"
        ></textarea>
      </div>
    );
  }
}

export default ImportExport;
