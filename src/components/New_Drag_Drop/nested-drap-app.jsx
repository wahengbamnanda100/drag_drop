// import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";

import { getQuotes } from "./data";
import NestedDragList from "./nested-drag-drop-list";
import reorder, { copy, findChildrenById, updateObject } from "./reorder";
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
    const { source, destination, type } = result;
    console.log("sate", state);
    console.log("result", source, destination, type);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const sInd = source.droppableId;
    const dInd = destination.droppableId;

    if (sInd !== dInd) {
      if (type === "level-1") {
        //! 1st level
        console.log("res", source, destination);
        const list1 = state[0].children;
        const list2 = state[1].children;
        const [sourceclone, destClone, copiedItem] = copy(
          list1,
          list2,
          source,
          destination
        );
        const newList0 = {
          ...state[0],
          children: sourceclone,
        };
        const newList1 = {
          ...state[1],
          children: destClone,
        };
        console.log("result array", sourceclone, destClone, copiedItem);
        const LIST = [...state];
        LIST[0] = newList0;
        LIST[1] = newList1;
        setState(LIST);
        return;
      }

      if (type === "level-2") {
        const childrenList1 = findChildrenById(state[0], "second-level");
        const childrenList2 = findChildrenById(state[1], "second-level2");

        console.log("leve - 2 data", childrenList1, childrenList2);

        const [sourcecloneChildren, destCloneChildren, copiedItem] = copy(
          childrenList1,
          childrenList2,
          source,
          destination
        );

        const newChildrenList1 = updateObject(
          state[0],
          "second-level",
          sourcecloneChildren
        );

        const newChildrenList2 = updateObject(
          state[1],
          "second-level2",
          destCloneChildren
        );

        const LISTL1 = [...state];
        LISTL1[0] = newChildrenList1;
        LISTL1[1] = newChildrenList2;
        setState(LISTL1);
        return;
      }

      if (type === "level-3") {
        console.log("type", type);
        const nestedChildrenList1 = findChildrenById(state[0], "third-level");
        const nestedChildrenList2 = findChildrenById(state[1], "third-level2");

        const [sourcecloneNestedChildren, destCloneNestedChildren, copiedItem] =
          copy(nestedChildrenList1, nestedChildrenList2, source, destination);

        const newNestedList1 = updateObject(
          state[0],
          "third-level",
          sourcecloneNestedChildren
        );
        const newNestedList2 = updateObject(
          state[1],
          "third-level2",
          destCloneNestedChildren
        );

        const LISTL1 = [...state];
        LISTL1[0] = newNestedList1;
        LISTL1[1] = newNestedList2;
        setState(LISTL1);
        return;
      }
    }

    // if (result.type === "level-1") {
    //   const children = reorder(
    //     list?.children,
    //     result.source.index,
    //     result.destination.index
    //   );

    //   const List = {
    //     ...list,
    //     children,
    //   };

    //   setList(List);
    //   return;
    // }
    // else if (result.type === "level-1" && result.droppableId === "first-level2") {

    // }

    // if (result.type === "level-2") {
    //   const nested = list.children.filter((item) =>
    //     Object.prototype.hasOwnProperty.call(item, "children")
    //   )[0];

    //   invariant(nested, "could not find nested list");

    //   const updated = {
    //     ...nested,
    //     children: reorder(
    //       nested.children,
    //       result.source.index,
    //       // $ExpectError - already checked for null
    //       result.destination.index
    //     ),
    //   };

    //   const nestedIndex = list.children.indexOf(nested);
    //   const children = Array.from(list.children);
    //   children[nestedIndex] = updated;

    //   const List = {
    //     list,
    //     children,
    //   };

    //   setList(List);
    // }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* <Root>
        <NestedDragList list={list} />
        <NestedDragList list={list2} />
      </Root> */}
      <Root>
        {state.map((item, index) => (
          <NestedDragList
            key={index}
            list={item}
            isDrop={index == 0 && true}
            draggable={index === 1 && true}
          />
        ))}
      </Root>
    </DragDropContext>
  );
};

export default NestedDragApp;
