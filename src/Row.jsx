import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { ROW } from "./constants";
import DropZone from "./DropZone";
import Column from "./Column";

import ReactTooltip from 'react-tooltip';

const style = {};
const Row = ({ data, components, handleDrop, path }) => { 
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ROW,
      id: data.id,
      children: data.children,
      path 
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderColumn = (column, currentPath) => {

    const isCustomRow = column.children[0] && column.children[0].id === 'custom0'   

    return (
      isCustomRow || 
      <Column
        key={column.id}
        data={column}
        components={components}
        handleDrop={handleDrop}
        path={currentPath}
      /> 

    );
  };


 

  return (
    <div ref={ref} style={{ ...style, opacity }} className="base draggable row"  
          data-tip={`Row: ${data.id}`} data-event='click focus' >

       <ReactTooltip type="info" globalEventOff='click'/>

      {data.id}
      <div className="columns">
        {data.children.map((column, index) => {
          const currentPath = `${path}-${index}`;

          const isCustomRow = column.children[0] && column.children[0].id === 'custom'

          return (
            isCustomRow || <React.Fragment key={column.id} 
            // style={{display:'grid' , gridTemplateColumns : 'repeat(auto-fill, 200px)' , width:'100%'}}
            >
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                }}
                onDrop={handleDrop}
                className="horizontalDrag"
              />
              {renderColumn(column, currentPath)}
            </React.Fragment>
          );
        })}
        <DropZone
          data={{
            path: `${path}-${data.children.length}`,
            childrenCount: data.children.length
          }}
          onDrop={handleDrop}
          className="horizontalDrag"
          isLast
        />
      </div>
    </div>
  );
};
export default Row;
