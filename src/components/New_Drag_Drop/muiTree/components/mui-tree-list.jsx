import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const MuiTreeItemList = ({
  list,
  order,
  isDrop = false,
  draggable = false,
  onClickUndo,
  onClickSwap,
}) => {
  // const renderItem = (data, index, onClickUndo, onClickSwap) => (
  //   <Draggable
  //     isDragDisabled={draggable}
  //     key={data.id}
  //     draggableId={data.id}
  //     index={index}
  //   >
  //     {(provided, snapshot) => (
  //       <>
  //         <MenuItem
  //           data={data}
  //           isDragging={snapshot.isDragging}
  //           provided={provided}
  //           onClickUndo={onClickUndo}
  //           onClickSwap={onClickSwap}
  //         />
  //         {/* {snapshot.isDragging && <CLoneQuoteItem quote={quote} />} */}
  //       </>
  //     )}
  //   </Draggable>
  // );
};
