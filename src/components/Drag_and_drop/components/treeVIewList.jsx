import React from "react";

import DiviverContainer from "../../../Shared/DividerContainer";
import { Typography, Box } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Nested from "../../../Shared/Nested";
import NestedTreeList from "./NestedTreeList";

const TreeViewList = ({ data, cid }) => {
  const handlePathDragEnd = (source, destination) => {
    console.log("source: ", source);
    console.log("destination: ", destination);
  };
  return (
    <DiviverContainer>
      <Typography variant="h5">Right Container</Typography>
      <Droppable
        droppableId="droppableParentPath-top"
        type="path"
        name={data.paths}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "#cfd1d0" : "white",
            }}
            {...provided.droppableProps}
          >
            <Box sx={{ py: 2 }}>
              <Nested>
                <Draggable draggableId={"draggleParent-Path" + cid} index={0}>
                  {(provided, snapshot) => (
                    <div
                      style={{ backgroundColor: "white" }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Droppable
                        droppableId={"droppableParentPath-" + cid}
                        type="path"
                        name={data.paths}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            style={{
                              backgroundColor: snapshot.isDraggingOver
                                ? "#cfd1d0"
                                : "white",
                            }}
                            {...provided.droppableProps}
                          >
                            <NestedTreeList
                              cid={cid}
                              data={data}
                              parentId={"droppableParentPath-" + cid}
                              keyId={
                                "side-" +
                                "edit" +
                                // (readOnly ? "view" : "edit") +
                                "-paths-"
                              }
                              onDragEnd={handlePathDragEnd}
                            />
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              </Nested>
            </Box>
          </div>
        )}
      </Droppable>
    </DiviverContainer>
  );
};

export default TreeViewList;
