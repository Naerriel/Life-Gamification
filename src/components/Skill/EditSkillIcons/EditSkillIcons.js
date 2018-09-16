import React, { Component } from 'react';
import "./_EditSkillIcons.css"
import dragNDropIcon from "./assets/drag-n-drop.svg";
import editIcon from "./assets/edit.svg";

class EditSkillIcons extends Component {
  constructor(props) {
    super(props);

    this.state = { editingMenuOpen: false};
  }

  componentWillReceiveProps() {
    this.setState({ editingMenuOpen: false });
  }

  handleDragNDrop = (e) => {
    e.stopPropagation();
  }

  handleEditingMenuClick = (e) => {
    e.stopPropagation();
    this.setState({ editingMenuOpen: !this.state.editingMenuOpen });
  }

  handleEditSkillNameClick = (e) => {
    e.stopPropagation();
    this.props.startEditingSkillName();
  }

  handleDeleteSkillClick = (e) => {
    e.stopPropagation();
    //TODO add some sort of confirmation
    //A popup
    //
    //How to make dimming screen of this popup?
    //Maybe render it somewhere low in the tree?

    this.props.deleteSkill();
  }

  renderEditingMenu = () => {
    return (
      <div className="skill-editing">
        <ul>
          <li>
            <button onClick={this.handleEditSkillNameClick}>
              Edit skill name
            </button>
          </li>
          <li>
            <button onClick={this.handleDeleteSkillClick}>
              Delete skill
            </button>
          </li>
        </ul>
      </div>
    );
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
          <div className="skill-editing-helper">
            <button onClick={this.handleEditingMenuClick}>
              <img
                className="skill-edit-icon"
                src={editIcon}
                alt="edit"/>
            </button>
            {this.state.editingMenuOpen ? this.renderEditingMenu() : (null)}
          </div>
        </div>
      );
    } else {
      return (null);
    }
  }
}

export default EditSkillIcons;
