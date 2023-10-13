import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
// import QuoteItem from "./premitive/quote-item";
import Title from "../../premitive/title";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
// import CLoneQuoteItem from "./premitive/clone-quote-item";
import MenuItem from "./MenuItem";
import { Box, Typography } from "@mui/material";

const NestedDragList = ({ list, order, isDrop = false, draggable = false }) => {
  const renderQuote = (data, index) => (
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
          />
          {/* {snapshot.isDragging && <CLoneQuoteItem quote={quote} />} */}
        </>
      )}
    </Draggable>
  );

  const cloneRenderList = (list, level) => {
    return <h5>{list.title}</h5>;
  };

  const renderList = (list, level, isDrop, draggable) => {
    // console.log("List data", list);
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
            <Box sx={{ width: "100%" }}>
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
            </Box>
            {list.children.map((item, index) =>
              !item.children ? (
                renderQuote(item, index)
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
                        {renderList(item, level + 1, isDrop, draggable)}
                      </NestedContainer>
                      {dragSnapshot.isDragging && <div>Hello LIST</div>}
                    </>
                  )}
                </Draggable>
              )
            )}
            {dropProvided.placeholder}
          </Container>
        )}
      </Droppable>
    );
  };
  return <Root>{renderList(list, 1, isDrop, draggable)}</Root>;
};

export default NestedDragList;

export const grid = 8;

const Root = styled.div`
  width: 400px;
  max-height: 100vh;
  overflow-y: auto; /* Enable vertical scrolling */
`;

const Container = styled.div`
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? colors.B50 : colors.B75};
  display: flex;
  flex-direction: column;
  padding: ${grid}px;
  padding-bottom: 0;
  user-select: none;
  overflow-x: hidden;
  transition: background-color 0.1s ease;
  // overflow-y: auto;

  &:focus {
    outline: 2px solid ${colors.P200};
    outline-offset: 2px;
  }
`;

const NestedContainer = styled(Container)`
  padding: 0;
  margin-bottom: 6px;
`;
