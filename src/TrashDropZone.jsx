import React from "react";
import classNames from "classnames";
import { useDrop } from "react-dnd";
import { COMPONENT, ROW, COLUMN , CUSTOM_ROW } from "./constants";

const ACCEPTS = [ROW, COLUMN, COMPONENT , CUSTOM_ROW];

const TrashDropZone = ({ data, onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ACCEPTS,
    drop: (item, monitor) => {
      onDrop(data, item);
    },
    canDrop: (item, monitor) => { 
      const layout = data.layout;
      const itemPath = item.path;
      const splitItemPath = itemPath.split("-");
      const itemPathRowIndex = splitItemPath[0];
      const itemRowChildrenLength =
        layout[itemPathRowIndex] && layout[itemPathRowIndex].children.length;

      // prevent removing a col when row has only one col
      if (
        item.type === COLUMN &&
        itemRowChildrenLength &&
        itemRowChildrenLength < 2
      ) {
        return false;
      }

      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const isActive = isOver && canDrop;
  return (
   <> <div
      className={classNames("trashDropZone", { active: isActive })}
      ref={drop}
    >
      TRASH
    </div>

    {/* <p>{}</p> */}
    <div style={{padding:20}}>
      <p style={{background:'beige', padding:'5px 10px', fontSize:20, display:'inline' }} >Full Object Data</p>
      <div style={{border:'1px solid #ccc', padding:20}} >
        <pre>{JSON.stringify(JSON.parse(localStorage.getItem("objectData")), null, 2) }</pre>
      </div>
    </div>

    </>
  );
};
export default TrashDropZone;
