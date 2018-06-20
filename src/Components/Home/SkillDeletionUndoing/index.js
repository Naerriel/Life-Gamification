import React, { Component } from 'react';
import "./index.css";
import { connect } from "react-redux";
import { eraseSkillDeletionUndoing, undoSkillDeletion }
  from "redux/actions/undo.js";

class SkillDeletionUndoing extends Component {

  componentWillReceiveProps(nextProps) {
    clearTimeout(timer);

    var timer = setTimeout(() => {
      this.props.eraseSkillDeletionUndoing();
    }, 10000);
  }

  thereIsDeletedSkill = () => {
    return "name" in this.props.skill;
  }

  handleUndoClick = () => {
    this.props.undoSkillDeletion(this.props.skill);
  }

  render() {
    if(this.thereIsDeletedSkill()){
      return (
        <div className="skill-deletion-undoing">
          <div className="skill-deletion-message">
            Deleted skill:
            <span className="skill-deletion-skill-name">
              { this.props.skill.name }
            </span>
          </div>
          <button className="skill-deletion-undo-btn"
            onClick={this.handleUndoClick}>
            Undo
          </button>
        </div>
      );
    } else {
      return (null);
    }
  }
}

const mapStateToProps = state => {
  return {
    skill: state.skillDeletionUndoing
  };
};

const mapDispatchToProps = { eraseSkillDeletionUndoing, undoSkillDeletion };

export const SkillDeletionUndoingContainer = connect(
  mapStateToProps, mapDispatchToProps)(SkillDeletionUndoing);
