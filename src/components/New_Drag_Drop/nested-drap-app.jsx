// import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";

import { getQuotes } from "./data";
import NestedDragList from "./nested-drag-drop-list";
import reorder, {
  convertToDndObject,
  copy,
  findChildrenById,
  updateObject,
} from "./reorder";
import jsonData from "../../utils/treeData.json";
import _ from "lodash";

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

function coverttoNestedObject(inputObject) {
  let resChildren = [];
  let level = 0;
  const firstLevelKey = Object.keys(inputObject);
  let secondLevelKey = Object.keys(inputObject[firstLevelKey[0]]);

  let firstChildren = secondLevelKey.map((key, index) => {
    const subKey = Object.keys(inputObject[firstLevelKey[0]][key]); //[put]
    let thirdLevelKey = Object.keys(
      inputObject[firstLevelKey[0]][key][subKey[0]]
    ); // [summary, parameters, response]
    let secondChildren = thirdLevelKey.map((innerKey, index) => {
      let result = [];
      if (innerKey === "responses") {
        let responseChildrenKeys = Object.keys(
          inputObject[firstLevelKey[0]][key][subKey[0]][innerKey]
        ); // [200, 400, 401]
        let responseChlidren = responseChildrenKeys.map(
          (innerMostKeys, index) => {
            return {
              id: `${innerMostKeys}-${Date.now()}`,
              type: innerMostKeys,
              title: innerMostKeys,
              level_id: `${innerMostKeys}-${level + 3}`,
              subTitle:
                inputObject[firstLevelKey[0]][key][subKey[0]][innerKey][
                  innerMostKeys
                ],
              resType: "string",
            };
          }
        );

        let res = {
          id: `${innerKey}-${Date.now()}`,
          type: innerKey,
          title: innerKey,
          level_id: `${innerKey}-${level + 2}`,
          subTitle: "",
          children: [...responseChlidren],
        };
        result.push(res);
      } else if (innerKey === "parameters") {
        let paramsChildren =
          inputObject[firstLevelKey[0]][key][subKey[0]][innerKey];

        let resParmasChildren = paramsChildren.map((paramKey, index) => {
          return {
            id: `${paramKey["$ref"]}-${Date.now()}`,
            type: paramKey["$ref"],
            title: paramKey["$ref"],
            level_id: `${paramKey["$ref"]}-${level + 3}`,
            subTitle: "",
            resType: "string",
          };
        });

        let params = {
          id: `${innerKey}-${Date.now()}`,
          type: innerKey,
          title: innerKey,
          level_id: `${innerKey}-${level + 2}`,
          subTitle: "",
          children: [...resParmasChildren],
        };
        result.push(params);
      } else {
        return null;
      }
      return result;
    });

    const filteredSecondChildren = secondChildren.filter(
      (item) => item !== null
    );

    return {
      id: `${key}-${Date.now()}`,
      type: key,
      title: key,
      level_id: `${key}-${level + 1}`,
      subTitle: inputObject[firstLevelKey[0]][key][subKey[0]],
      children: [...filteredSecondChildren],
    };
  });

  let result = {
    id: `${firstLevelKey[0]}-${Date.now()}`, //add more random vlaue
    type: firstLevelKey[0], //inputObject key 1st level
    title: firstLevelKey[0], //inputObject key 1st level
    level_id: `${firstLevelKey[0]}-${level}`, //unique id
    subTitle: "lorem ipsum lorem ipsum",
    children: [...firstChildren],
  };

  return result;
}

const inputObject = {
  path: {
    "/item1": {
      post: {
        tags: ["CR - ProductDirectoryEntry"],
        summary: "InCR Register a new product or service in the catalog",
        description: "InCR Register a new product or service in the catalog",
        operationId: "Register",
        requestBody: {
          $ref: "#/components/requestBodies/ProductDirectoryEntry",
        },
        responses: {
          200: {
            $ref: "#/components/responses/ProductDirectoryEntry",
          },
          400: {
            $ref: "#/components/responses/BadRequest",
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
        },
      },
    },
  },
};

const NestedDragApp = () => {
  const [state, setState] = useState([initialList, initialList2]);

  console.log("State obj", state);
  // console.log("transform obj", JSON.stringify(transformedObject, null, 2));

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    console.log("sate", state, result);
    console.log("result", type);
    // dropped outside the list
    if (!result.destination) {
      console.log("there is no destination");
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

        console.log("leve - 2 data 🖍️🖍️🖍️", childrenList1, childrenList2);

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
