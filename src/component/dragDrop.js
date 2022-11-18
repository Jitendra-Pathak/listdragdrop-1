import React from 'react';
import PropTypes from 'prop-types';

import './dragDrop.css';

export default class ListDragDrop extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isValidDrop = false;
    this.initialOrder = [];
    this.dragged = null;
    this.over = null;
    this.state = {
      optionList: this.props.options || []
    }
  }

  // This function update the data only when 
  // options data is updated in parent/consumer component
  componentDidUpdate(prevProps) {
    if (prevProps.options !== this.props.options) {
      this.setState({
        optionList: this.props.options
      })
    }
  }

  // On drag start we create a copy of data
  // which "initialOrder" is used to reset 
  dragStart = (e, option) => {
    const { onDragStartCallback } = this.props;

    this.isValidDrop = false;
    this.initialOrder = [...this.state.optionList];
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
    onDragStartCallback && onDragStartCallback(option);
  }

  // here we simply swap the items on dragOver or dragEnd
  swapElements = () => {
    const data = [...this.state.optionList];
    let fromIndex = -1;
    let toIndex = -1;
    data.forEach((node, index) => {
      if (node.id === this.dragged.dataset.id) {
        fromIndex = index;
      }
      if (node.id === this.over) {
        toIndex = index;
      }
    })
    const tempNode = data[fromIndex];
    data[fromIndex] = data[toIndex];
    data[toIndex] = tempNode;
    return data;
  }

  // reset the data with initialOrder updated in dragStart
  restoreOrder = () => {
    this.setState({
      optionList: this.initialOrder
    })
  }

  // a drag operation ends (like releasing a mouse button)
  // if it's a valid drop we update our options list and 
  // serve updated data in callback
  // in case of invalid we just reset the data
  dragEnd = () => {
    const { onDragEndCallback } = this.props;

    if (this.isValidDrop) {
      const newList = this.swapElements();
      
      this.setState({
        optionList: newList
      }, () => {
        onDragEndCallback && onDragEndCallback(this.state.optionList);
      });

    } else {
      this.restoreOrder();
    }
  }

  // Called when item is dropped on a valid drop target
  // ondrop called before dragEnd
  // here we keep the drop area is valid or not
  onDrop = (e) => {
    const { containerId } = this.props;
    const container = document.querySelector(`#${containerId} .listContainer`);
    if (container.contains(e.target)) {
      this.isValidDrop = true;
    } else {
      this.isValidDrop = false;
    }
  }

  // called when item is being dragged
  // used to update the list on drag over the other item
  // final output is depend in dragEnd function
  dragOver = (e, option) => {
    const { onDragOverCallback } = this.props;
    const { id } = option;

    e.preventDefault();
    this.over = id;
    const newList = this.swapElements();

    this.setState({
      optionList: newList
    });
    
    onDragOverCallback && onDragOverCallback(option);
  }

  // Return ui of items
  getOptionsList = () => {
    const { optionList } = this.state;
    const { customTemplate, itemClass } = this.props;

    return (
      optionList && optionList.map((option) => {
        const { draggable = true, id, value } = option;
        
        // Here we attach the event only when draggable is true
        // Our default template will be served 
        // if user doesn't pass custom template
        return (
          <li
            data-id={id}
            key={id}
            onDrop={draggable ? this.onDrop : null}
            draggable={draggable}
            onDragEnd={draggable ? this.dragEnd : null}
            onDragOver={draggable ? ((e) => this.dragOver(e, option)) : null}
            onDragStart={draggable ? (e) => this.dragStart(e, option) : null}
            className={`list-item ${itemClass} ${draggable ? '' : 'optionDisabled'}`}
          >
            {customTemplate
              ? customTemplate(option) 
              : <p className='list-element'>{value}</p>
            }
          </li>
        )
      })
    );
  };

  render() {
    const { containerClass, containerId } = this.props;

    return (
      <div className={`dragListContainer ${containerClass}`} id={containerId}>
        <ul className='listContainer'>
          {this.getOptionsList()}
        </ul>
      </div>
    )
  }
}

ListDragDrop.propTypes = {
  containerId: PropTypes.string.isRequired, // it is required to find out the droppable area
  onDragEndCallback: PropTypes.func.isRequired,
  onDragStartCallback: PropTypes.func,
  onDragOverCallback: PropTypes.func,
  options: PropTypes.array.isRequired,
  containerClass: PropTypes.string,
  customTemplate: PropTypes.func,
  itemClass: PropTypes.string
};

ListDragDrop.defaultProps = {
  containerId: 'dropArea',
  options: [],
};