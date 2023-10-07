// import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";

import { getQuotes } from "./data";
import NestedDragList from "./nested-drag-drop-list";
import reorder from "./reorder";
import { invariant } from "./invariant";
import { Container } from "@mui/material";

const quotes = getQuotes(12);
const quotes2 = getQuotes(10);

const grid = 8;

const initialList = {
  id: "first-level",
  type: "level-1",
  title: "top level",
  children: [
    ...quotes.slice(0, 2),
    {
      id: "second-level",
      type: "level-2",
      title: "second level",
      children: [
        ...quotes.slice(3, 7),
        {
          id: "third-level",
          type: "level-3",
          title: "third level",
          children: quotes.slice(8, 9),
        },
      ],
    },
    ...quotes.slice(9, 11),
  ],
};

const initialList2 = {
  id: "first-level2",
  type: "level-1",
  title: "top level2",
  children: [
    ...quotes2.slice(0, 1),
    {
      id: "second-level2",
      type: "level-2",
      title: "second level2",
      children: [
        ...quotes2.slice(1, 3),
        {
          id: "third-level2",
          type: "level-3",
          title: "third level2",
          children: quotes2.slice(4, 5),
        },
      ],
    },
    // ...quotes2.slice(6, 9),
  ],
};

const Root = styled.div`
  background-color: ${colors.B200};
  box-sizing: border-box;
  padding: ${grid * 2}px;
  min-height: 100vh;
  overflow-y: auto;

  /* flexbox */
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
`;

const NestedDragApp = () => {
  const [list, setList] = useState(initialList);
  const [list2, setList2] = useState(initialList2);

  const [state, setState] = useState([initialList, initialList2]);
  const [order, setOrder] = useState([
    { id: "left", title: "Left Container" },
    { id: "right", title: "Right Container" },
  ]);

  //   useEffect(() => {
  //     setList(initialList);
  //   }, []);

  const handleReorder = (listToUpdate, sourceIndex, destinationIndex) => {
    const children = reorder(
      listToUpdate.children,
      sourceIndex,
      destinationIndex
    );
    return {
      ...listToUpdate,
      children,
    };
  };

  function findItemById(arr, idToFind) {
    return arr.find((item) => item.id === idToFind);
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log("result", state);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const sInd = source.droppableId;
    const dInd = destination.droppableId;

    console.log("ids", sInd, dInd);

    if (result.type === "level-1") {
      if (result.destination.droppableId === "first-level2") {
        console.log("drop in next list");

        const newItem = findItemById(list.children, result.draggableId);
        console.log(newItem, list2);
        // setList2((prev) => [...prev, newItem]);
        setList2((prev) => ({
          children: [...prev.children, newItem],
          ...prev,
        }));
        return;
      }
      const children = reorder(
        list?.children,
        result.source.index,
        result.destination.index
      );

      const List = {
        ...list,
        children,
      };

      setList(List);
      return;
    }
    // else if (result.type === "level-1" && result.droppableId === "first-level2") {

    // }

    if (result.type === "level-2") {
      const nested = list.children.filter((item) =>
        Object.prototype.hasOwnProperty.call(item, "children")
      )[0];

      invariant(nested, "could not find nested list");

      const updated = {
        ...nested,
        children: reorder(
          nested.children,
          result.source.index,
          // $ExpectError - already checked for null
          result.destination.index
        ),
      };

      const nestedIndex = list.children.indexOf(nested);
      const children = Array.from(list.children);
      children[nestedIndex] = updated;

      const List = {
        list,
        children,
      };

      setList(List);
    }
  };

  const board = () => (
    <Droppable droppableId={"board"} type="COLUMN" direction="horizontal">
      {(provided) => (
        <Root ref={provided.innerRef} {...provided.droppableProps}>
          {order.map((key, index) => (
            <NestedDragList
              key={key}
              index={index}
              list={index === 0 ? list : list2}
            />
          ))}
        </Root>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* <Root>
        <NestedDragList list={list} />
        <NestedDragList list={list2} />
      </Root> */}
      <Root>
        {state.map((item, index) => (
          <NestedDragList key={index} list={item} />
        ))}
      </Root>
    </DragDropContext>
  );
};

export default NestedDragApp;
