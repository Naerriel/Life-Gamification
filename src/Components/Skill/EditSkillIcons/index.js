import React, { Component } from 'react';
import "./index.css"
import dragNDropIcon from "./assets/drag-n-drop.svg";
import editIcon from "./assets/edit.svg";

class EditSkillIcons extends Component {

  handleDragNDrop = (e) => {
    e.stopPropagation();
  }

  handleEditSkillClick = (e) => {
    e.stopPropagation();
  }

  render() {
    if(this.props.shouldRender){
      return (
        <div className="skill-edit-icons">
          <button onClick={this.handleDragNDrop}>
            <img
              className="skill-edit-icon"
              src={dragNDropIcon}
              alt="drag and drop"/>
          </button>
          <button onClick={this.handleEditSkillClick}>
            <img
              className="skill-edit-icon"
              src={editIcon}
              alt="edit"/>
          </button>
        </div>
      );
    } else {
      return (null);
    }
  }
}

export default EditSkillIcons;
