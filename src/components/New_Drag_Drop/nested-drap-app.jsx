// import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";

import { getQuotes } from "./data";
import NestedDragList from "./nested-drag-drop-list";
import reorder from "./reorder";
import { invariant } from "./invariant";
import { Container } from "@mui/material";

const quotes = getQuotes(10);

const grid = 8;

const initialList = {
  id: "first-level",
  title: "top level",
  children: [
    ...quotes.slice(0, 2),
    {
      id: "second-level",
      title: "second level",
      children: [
        ...quotes.slice(2, 3),
        {
          id: "third-level",
          title: "third level",
          children: quotes.slice(4, 5),
        },
      ],
    },
    ...quotes.slice(6, 9),
  ],
};

const Root = styled.div`
  background-color: ${colors.B200};
  box-sizing: border-box;
  padding: ${grid * 2}px;
  min-height: 100vh;
  overflow: auto;

  /* flexbox */
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const NestedDragApp = () => {
  const [list, setList] = useState(initialList);

  //   useEffect(() => {
  //     setList(initialList);
  //   }, []);

  const onDragEnd = (result) => {
    console.log("result", result);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.type === "first-level") {
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

    if (result.type === "second-level") {
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Root>
        {/* <Typography variant="h6">New Drag and Drop</Typography> */}
        <NestedDragList list={list} />
      </Root>
    </DragDropContext>
  );
};

export default NestedDragApp;
