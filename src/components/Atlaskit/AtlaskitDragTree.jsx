import React, { useState } from "react";

import { Box, Button, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Tree, { TreeData, mutateTree, moveItemOnTree } from "@atlaskit/tree";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import {
  treeWithTwoBranches1,
  treeWithTwoBranches2,
} from "./Atlaskit.components/treedata";

// const Container = styled.div`
//   display: flex;
// `;

const Dot = styled("span")`
  display: flex;
  width: 24px;
  height: 32px;
  justify-content: center;
  font-size: 12px;
  line-height: 32px;
`;

const AtlaskitDragTree = () => {
  const [tree, setTree] = useState(treeWithTwoBranches1);
  const [tree2, setTree2] = useState(treeWithTwoBranches2);

  const getIcon = (item, onExpand, onCollapse) => {
    if (item.children && item.children.length > 0) {
      return item.isExpanded ? (
        <Button onClick={() => onCollapse(item.id)}>
          <ExpandMoreIcon size="medium" onClick={() => onCollapse(item.id)} />
        </Button>
      ) : (
        <Button
          spacing="none"
          appearance="subtle-link"
          onClick={() => onExpand(item.id)}
        >
          <ExpandLessIcon size="medium" onClick={() => onExpand(item.id)} />
        </Button>
      );
    }
    return <Dot>&bull;</Dot>;
  };

  const onExpand = (itemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: true }));
  };

  const onCollapse = (itemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: false }));
  };

  const renderItem = ({ item, onExpand, onCollapse, provided, snapshot }) => {
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid",
            padding: "0.2rem",
            margin: "0.5rem",
            borderRadius: "0.4rem",
          }}
        >
          <span>{getIcon(item, onExpand, onCollapse)}</span>
          <span>{item.data ? item.data.title : ""}</span>
        </div>
      </div>
    );
  };

  const onDragEnd = (source, destination) => {
    console.log("drag end result", source, destination);
    if (!destination) {
      return;
    }

    const newTree = moveItemOnTree(tree, source, destination);
    setTree(newTree);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "300px", bgcolor: "white", p: 2, height: "100vh" }}>
          <h2>List 1</h2>
          <Tree
            tree={tree}
            onDragEnd={onDragEnd}
            renderItem={renderItem}
            onExpand={onExpand}
            onCollapse={onCollapse}
            isDragEnabled={true}
            isNestingEnabled={true}
          />
        </Box>
        <Box sx={{ width: "300px", bgcolor: "white", p: 2, height: "100vh" }}>
          <h2>List 2</h2>
          <Tree
            tree={tree2}
            // onDragEnd={onDragEnd}
            renderItem={renderItem}
            onExpand={onExpand}
            onCollapse={onCollapse}
            isDragEnabled={true}
            isNestingEnabled={true}
          />
        </Box>
      </Box>
    </DragDropContext>

    // <DragDropContext onDragEnd={onDragEnd}>
    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexDirection: "row",
    //       gap: "2rem",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <Droppable droppableId="tree1" direction="vertical">
    //       {(provided) => (
    //         <div
    //           ref={provided.innerRef}
    //           {...provided.droppableProps}
    //           style={{ flex: 1, margin: 8 }}
    //         >
    //           <h2>List 1</h2>
    //           <Tree
    //             tree={tree}
    //             renderItem={renderItem}
    //             onCollapse={onCollapse}
    //             isDragEnabled={true}
    //             isNestingEnabled={true}
    //           />
    //           {provided.placeholder}
    //         </div>
    //       )}
    //     </Droppable>

    //     <Droppable droppableId="tree2" direction="vertical">
    //       {(provided) => (
    //         <div
    //           ref={provided.innerRef}
    //           {...provided.droppableProps}
    //           style={{ flex: 1, margin: 8 }}
    //         >
    //           <h2>List 2</h2>
    //           <Tree
    //             tree={tree2}
    //             renderItem={renderItem}
    //             onExpand={onExpand}
    //             onCollapse={onCollapse}
    //             isDragEnabled={true}
    //             isNestingEnabled={true}
    //           />
    //           {provided.placeholder}
    //         </div>
    //       )}
    //     </Droppable>
    //   </Box>
    // </DragDropContext>
  );
};

export default AtlaskitDragTree;
