import React from 'react';
import ListDragDrop from "../dist/index";
import { SIDEBAR_DATA, DRAGLIST_DATA, TABS_DATA } from './constant';
import './style.scss';

class DemoComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  };

  getDragRowAction = (data) => {
    return (
      <div className='customTemplate'>
        <span className='label'> {data.value} </span>
        <span className='btn' onClick={()=>{console.log('clicked', data)}}>DELETE</span>
      </div>
    )
  };

  onDragStart = (data) => {
    console.log('sidebar onDragStart data', data);
  };

  onDragOver = (data) => {
    console.log('sidebar onDragOver data', data);
  };

  onDragEnd = (data) => {
    console.log('sidebar onDragEnd data', data);
  };

  getHeader = () => {
    return (
      <div className='headerContainer'>
        <h3>ListDragDrop</h3>
        <div className='otherLinks'>
          <a href='https://github.com/Jitendra-Pathak/listdragdrop/blob/main/README.md' target="_blank">Documentation</a>
          <a href='https://github.com/naukri-engineering' target="_blank">Other Plugins</a>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className='wrapper'>
        {this.getHeader()}
        <div className='container'>
          <div className='sidebar'>
            <ListDragDrop
              containerId='sidebarDropArea'
              containerClass='colDragCustomClass'
              options={SIDEBAR_DATA}
              onDragStartCallback={this.onDragStart}
              onDragOverCallback={this.onDragOver}
              onDragEndCallback={this.onDragEnd}
            />
          </div>

          <div className='content'>

            <div className='exptext'>
              <b>Example 1 (Left sidebar view): </b>
              <p>This is default example with default UI</p>
            </div>

            <div className='exptext'>
              <b>Example 2: </b>
              <p>
                This is with custom template for custom UI using 
                <b>"customTemplate"</b> prop with a Delete action.
              </p>
              <p>Also we made option disable from drag and drop using <b>"draggable"</b> key in data.</p>
            </div>
            <div className='wrapper vertical'>
              <ListDragDrop
                containerId='verticalDropArea'
                containerClass='customClass'
                options={DRAGLIST_DATA}
                customTemplate={this.getDragRowAction}
                itemClass="customListItem"
                onDragStartCallback={this.onDragStart}
                onDragOverCallback={this.onDragOver}
                onDragEndCallback={this.onDragEnd}
              />
            </div>

            <div className='exptext'>
              <b>Example 3: </b>
              <p>Here we override Style using custom class with default component UI.</p>
            </div>

            <div className='wrapper horizontal'>
              <ListDragDrop
                containerId='horizontalDropArea'
                containerClass='customClass'
                options={TABS_DATA}
                itemClass="customListItem"
                onDragStartCallback={this.onDragStart}
                onDragOverCallback={this.onDragOver}
                onDragEndCallback={this.onDragEnd}
              />
            </div>

          </div>
        </div>
      </div>
    );
  };
};

export default DemoComponent;