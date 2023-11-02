import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import { useSpring, animated } from "@react-spring/web";
import { TransitionProps } from "@mui/material/transitions";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Collapse from "@mui/material/Collapse";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import LanOutlinedIcon from "@mui/icons-material/LanOutlined";
import { alpha, styled, useTheme } from "@mui/material/styles";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { Stack } from "@mui/material";

import MuiTreeItem from "./mui-tree-item";

function TransitionComponent(props) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const CustomTreeItem = React.forwardRef((props, ref) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} ref={ref} />
));

const StyledTreeItem = styled(CustomTreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px solid ${alpha(theme.palette.text.primary, 0.4)}`,
    // borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

const MuiTreeGragList = ({
  list,
  order,
  isDrop = false,
  draggable = false,
  onClickUndo,
  onClickSwap,
}) => {
  const theme = useTheme();

  const renderItem = (data, index, onClickUndo, onClickSwap) => (
    <Draggable
      isDragDisabled={draggable}
      key={data.id}
      draggableId={data.id}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            backgroundColor: snapshot.isDragging ? "lightblue" : "white",
          }}
        >
          <StyledTreeItem
            key={data.id}
            nodeId={data.id}
            label={<MuiTreeItem nodes={data} />}
            sx={{
              ...(Array.isArray(data.children)
                ? { my: 1 }
                : { border: `1px solid ${theme.palette.grey[400]}`, my: 1 }),
              ...(snapshot.isDragging && {
                boxShadow: `2px 2px 1px ${theme.palette.primary.main}`,
              }),
            }}
          >
            {console.log("🔥", data.children)}
            {Array.isArray(data.children)
              ? data.children.map((node, index) => (
                  <Droppable
                    isDropDisabled={isDrop}
                    droppableId={node.id}
                    key={node.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "white",
                        }}
                      >
                        {renderItem(node, index, onClickUndo, onClickSwap)}
                      </div>
                    )}
                  </Droppable>
                ))
              : null}
            {/* {provided.placeholder} */}
          </StyledTreeItem>
        </div>
      )}
    </Draggable>
  );

  // const renderList = (
  //   list,
  //   level,
  //   isDrop,
  //   draggable,
  //   onClickUndo,
  //   onClickSwap
  // ) => {
  //   return (
  //     <StyledTreeItem
  //       key={list.id}
  //       nodeId={list.id}
  //       label={<MuiTreeItem nodes={list} />}
  //     >
  //      {Array.isArray(list.children) ? list.: null}
  //     </StyledTreeItem>
  //   );
  // };
  return (
    <Box
      sx={{
        // minHeight: 110,
        flexGrow: 1,
        width: "400px",
        maxHeight: "100vh",
        border: "1px solid",
        p: 1,
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <Droppable
        droppableId={list.id}
        type={list.type}
        key={list.id}
        isDropDisabled={isDrop}
      >
        {(dropProvided, dropSnapshot) => (
          <div
            ref={dropProvided.innerRef}
            // isDraggingOver={dropSnapshot.isDraggingOver}
            {...dropProvided.droppableProps}
          >
            <TreeView
              aria-label="rich object"
              defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
              defaultExpanded={["root"]}
              defaultExpandIcon={<AddBoxOutlinedIcon />}
            >
              {" "}
              {/* <StyledTreeItem
                key={list.id}
                nodeId={list.id}
                label={<MuiTreeItem nodes={list} />}
              > */}
              {renderItem(list, 1, isDrop, draggable, onClickUndo, onClickSwap)}
              {/* </StyledTreeItem> */}
            </TreeView>
          </div>
        )}
      </Droppable>
    </Box>
  );
};

export default MuiTreeGragList;
