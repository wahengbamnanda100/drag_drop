import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import QuoteItem from "./premitive/quote-item";
import Title from "./premitive/title";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";

const NestedDragList = ({ list }) => {
  const renderQuote = (quote, index) => (
    <Draggable key={quote.id} draggableId={quote.id} index={index}>
      {(provided, snapshot) => (
        <QuoteItem
          quote={quote}
          isDragging={snapshot.isDragging}
          provided={provided}
        />
      )}
    </Draggable>
  );

  const renderList = (list, level) => {
    // console.log("List data", list);
    return (
      <Droppable droppableId={list.id} type={list.id} key={list.id}>
        {(dropProvided, dropSnapshot) => (
          <Container
            ref={dropProvided.innerRef}
            isDraggingOver={dropSnapshot.isDraggingOver}
            {...dropProvided.droppableProps}
          >
            <Title>{list.title}</Title>
            {list.children.map((item, index) =>
              !item.children ? (
                renderQuote(item, index)
              ) : (
                <Draggable draggableId={item.id} key={item.id} index={index}>
                  {(dragProvided, dragSnapshot) => (
                    <NestedContainer
                      ref={dragProvided.innerRef}
                      isDragging={dragSnapshot.isDragging}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      {renderList(item, level + 1)}
                    </NestedContainer>
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

  return <Root>{renderList(list)}</Root>;
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
  transition: background-color 0.1s ease;

  &:focus {
    outline: 2px solid ${colors.P200};
    outline-offset: 2px;
  }
`;

const NestedContainer = styled(Container)`
  padding: 0;
  margin-bottom: 6px;
`;
