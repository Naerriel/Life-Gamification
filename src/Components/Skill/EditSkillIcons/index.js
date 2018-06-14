import React, { Component } from 'react';
import "./index.css"
import dragNDropIcon from "./assets/drag-n-drop.svg";
import editIcon from "./assets/edit.svg";

class EditSkillIcons extends Component {

  render() {
    if(this.props.shouldRender){
      return (
        <div className="skill-edit-icons">
          <button>
            <img
              className="skill-edit-icon"
              src={dragNDropIcon}
              alt="drag and drop"/>
          </button>
          <button>
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
