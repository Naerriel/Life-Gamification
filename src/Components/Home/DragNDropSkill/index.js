import React, { Component } from 'react'
import { Skill } from "../Skill/index.js"
import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import flow from 'lodash/flow'

class DragNDropSkill extends Component {
  render() {

    const {
      isOver,
      isDragging,
      connectDragSource,
      connectDropTarget,
      skill
    } = this.props;

    const opacity = isDragging ? 0 : 1

    return connectDragSource(connectDropTarget(
      <div className="dragNDrop" style={{ opacity }}>
        <Skill skill={skill} />
      </div>
      )
    )
  }
}

const Types = {
  SKILL: 'skill'
};

const skillSource = {
  beginDrag(props) {
    return {
      index: props.index
    }
  }
}

const skillTarget = {
  hover(targetProps, monitor, component) {
    if(!component) {
      return null
    }

    const dragIndex = monitor.getItem().index;
    const hoverIndex = targetProps.index;

    if(dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = findDOMNode(
      component,
    ).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    targetProps.moveSkill(dragIndex, hoverIndex)

    monitor.getItem().index = hoverIndex
  }
}

export default flow(
    DragSource(Types.SKILL, skillSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })),
    DropTarget(Types.SKILL, skillTarget, (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
    }))
  )(DragNDropSkill)
