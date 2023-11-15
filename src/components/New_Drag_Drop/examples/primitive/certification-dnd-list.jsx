import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
// import QuoteItem from "./premitive/quote-item";
import Title from "../../premitive/title";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
// import CLoneQuoteItem from "./premitive/clone-quote-item";
import MenuItem from "./MenuItem";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Stack,
  Accordion,
  Collapse,
  useTheme,
} from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import AlignHorizontalRightOutlinedIcon from "@mui/icons-material/AlignHorizontalRightOutlined";
import AlignVerticalCenterOutlinedIcon from "@mui/icons-material/AlignVerticalCenterOutlined";

const NestedDragList = ({
  list,
  order,
  isDrop = false,
  draggable = false,
  onClickUndo,
  onClickSwap,
}) => {
  // Create a state to manage the open/closed state for each list item
  const [openStates, setOpenStates] = useState({});

  const handleExpandCollapse = (itemId) => {
    // Toggle the open state for the specific item
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [itemId]: !prevOpenStates[itemId],
    }));
  };
  const renderQuote = (data, index, onClickUndo, onClickSwap) => (
    <Draggable
      isDragDisabled={draggable}
      key={data.id}
      draggableId={data.id}
      index={index}
    >
      {(provided, snapshot) => (
        <>
          <MenuItem
            data={data}
            isDragging={snapshot.isDragging}
            provided={provided}
            onClickUndo={onClickUndo}
            onClickSwap={onClickSwap}
          />
          {/* {snapshot.isDragging && <CLoneQuoteItem quote={quote} />} */}
        </>
      )}
    </Draggable>
  );

  const renderList = (
    list,
    level,
    isDrop,
    draggable,
    onClickUndo,
    onClickSwap
  ) => {
    const isOpen = openStates[list.id] || false;
    // const theme = useTheme();
    console.log("List data", list);
    return (
      <Droppable
        droppableId={list.id}
        type={list.type}
        key={list.id}
        isDropDisabled={isDrop}
      >
        {(dropProvided, dropSnapshot) => (
          <Container
            ref={dropProvided.innerRef}
            isDraggingOver={dropSnapshot.isDraggingOver}
            {...dropProvided.droppableProps}
          >
            {list?.undo && (
              <Tooltip arroe title="Undo">
                <IconButton
                  onClick={() => {
                    console.log("Undo 🔥🔥🔥", list);
                    list?.undo && onClickUndo(list);
                  }}
                  size="small"
                  sx={{
                    position: "absolute",
                    right: 1,
                    top: 0,
                    bgcolor: "white",
                  }}
                >
                  <UndoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {list?.swap && (
              <Tooltip arroe title="Swap Back">
                <IconButton
                  onClick={() => {
                    console.log("Undo 🔥🔥🔥", list);
                    list?.swap && onClickSwap(list);
                  }}
                  size="small"
                  sx={{
                    position: "absolute",
                    right: 1,
                    top: 0,
                    bgcolor: "white",
                  }}
                >
                  <UndoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"start"}
              gap={"1rem"}
              padding={"0.5rem"}
            >
              <IconButton onClick={() => handleExpandCollapse(list.id)}>
                {isOpen ? (
                  <ExpandLessOutlinedIcon />
                ) : (
                  <ExpandMoreOutlinedIcon />
                )}
              </IconButton>
              {list.level_id.split("-")[0] === "paths" && (
                <ListOutlinedIcon fontSize="medium" />
              )}
              {list.key === "responses" ? (
                <AlignVerticalCenterOutlinedIcon />
              ) : list.key === "parameters" ? (
                <AlignHorizontalRightOutlinedIcon />
              ) : (
                ""
              )}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight={"medium"}
                  sx={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    width: "100%",
                    pb: "10px",
                  }}
                >
                  {list.title}
                </Typography>
                {list.subTitle && (
                  <Typography
                    variant="caption"
                    fontWeight={"medium"}
                    sx={{
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      width: "100%",
                      pb: "10px",
                    }}
                  >
                    {typeof list?.subTitle === "string"
                      ? list?.subTitle
                      : typeof list?.subTitle === "object"
                      ? list?.subTitle.hasOwnProperty("$ref")
                        ? list?.subTitle?.$ref
                        : list?.subTitle?.summary
                      : ""}
                  </Typography>
                )}
              </Box>
            </Stack>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <Box sx={{ marginLeft: "1.2rem" }}>
                {list.children.map((item, index) =>
                  !item.children ? (
                    renderQuote(item, index, onClickUndo, onClickSwap)
                  ) : (
                    <Draggable
                      isDragDisabled={draggable}
                      draggableId={item.id}
                      key={item.id}
                      index={index}
                    >
                      {(dragProvided, dragSnapshot) => (
                        <>
                          <NestedContainer
                            ref={dragProvided.innerRef}
                            isDragging={dragSnapshot.isDragging}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                          >
                            {renderList(
                              item,
                              level + 1,
                              isDrop,
                              draggable,
                              onClickUndo,
                              onClickSwap
                            )}
                          </NestedContainer>
                          {dragSnapshot.isDragging && <div>Hello LIST</div>}
                        </>
                      )}
                    </Draggable>
                  )
                )}
              </Box>
            </Collapse>
            {/* <Box sx={{ marginLeft: "1.2rem" }}>
              {list.children.map((item, index) =>
                !item.children ? (
                  renderQuote(item, index, onClickUndo, onClickSwap)
                ) : (
                  <Draggable
                    isDragDisabled={draggable}
                    draggableId={item.id}
                    key={item.id}
                    index={index}
                  >
                    {(dragProvided, dragSnapshot) => (
                      <>
                        <NestedContainer
                          ref={dragProvided.innerRef}
                          isDragging={dragSnapshot.isDragging}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                        >
                          {renderList(
                            item,
                            level + 1,
                            isDrop,
                            draggable,
                            onClickUndo,
                            onClickSwap
                          )}
                        </NestedContainer>
                        {dragSnapshot.isDragging && <div>Hello LIST</div>}
                      </>
                    )}
                  </Draggable>
                )
              )}
            </Box> */}

            {dropProvided.placeholder}
          </Container>
        )}
      </Droppable>
    );
  };
  return (
    <Root>
      {renderList(list, 1, isDrop, draggable, onClickUndo, onClickSwap)}
    </Root>
  );
};

export default NestedDragList;

export const grid = 8;

const Root = styled.div`
  width: 700px;
  max-height: 100vh;
  overflow-y: auto; /* Enable vertical scrolling */
`;

const Container = styled.div`
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? colors.B50 : colors.B75};
  display: flex;
  flex-direction: column;
  padding: ${grid}px;
  // padding: 1rem;
  position: relative;
  padding-bottom: 0;
  user-select: none;
  overflow-x: hidden;
  border: 1px solid ${colors.DN700A};
  border-radius: 0.4rem;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.5);
  transition: background-color 0.1s ease;

  &:focus {
    outline: 2px solid ${colors.P200};
    outline-offset: 2px;
  }
`;

const NestedContainer = styled(Container)`
  padding: 0;
  margin-bottom: 0.5rem;
  // margin-left: 16px;
`;
