import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";

// import { getQuotes } from "./data";
// import NestedDragList from "./nested-drag-drop-list";
import reorder, {
  convertToDndObject,
  copy,
  findChildrenById,
  findChildrenThirdLevel,
  updateObject,
  updateObjectThirdChildren,
  findIndexInNestedArray,
  findIndexInNestedArrayPnC,
} from "../examples/helper/customHelper";
import jsonData from "../../../utils/treeData.json";
import newJosnData from "../../../utils/newTreeData.json";
import _ from "lodash";
import NestedDragList from "./primitive/certification-dnd-list";

const grid = 8;

function coverttoNestedObject(inputObject, type) {
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
              key: innerMostKeys,
              id: `${innerMostKeys}__${type}-level3__${index}__${Date.now()}-${Math.floor(
                Math.random() * 100000
              )}`,
              //   type: `level-3__response__${innerMostKeys}`,
              //   type: `level-4`,
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
          key: innerKey,
          id: `${innerKey}__${type}-level2__${index}__${Date.now()}-${Math.floor(
            Math.random() * 100000
          )}`,
          //   type: `level-2__${innerKey}`,
          type: `level-3-res`,
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
            key: paramKey,
            // id: `${paramKey["$ref"]}-${Date.now()}`,
            id: `${
              paramKey["$ref"]
            }__${type}-level3__${index}__${Date.now()}-${Math.floor(
              Math.random() * 100000
            )}`,
            // type: `level-3__parameter__${paramKey["$ref"]}`,
            // type: `level-4`,
            title: paramKey["$ref"],
            level_id: `${paramKey["$ref"]}-${level + 3}`,
            subTitle: "",
            resType: "string",
          };
        });

        let params = {
          //   id: `${innerKey}-${Date.now()}`,
          key: innerKey,
          id: `${innerKey}__${type}-level2__${index}__${Date.now()}-${Math.floor(
            Math.random() * 100000
          )}`,
          //   type: `level-2__${innerKey}`,
          type: `level-3-param`,
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
    // console.log("🚀🚀", filteredSecondChildren.flat());
    const resultSecondChildren = filteredSecondChildren.flat();
    return {
      key: key,
      id: `${key}__${type}-level1__${index}__${Date.now()}-${Math.floor(
        Math.random() * 100000
      )}`,
      //   type: `level-1__${key}`,
      type: `level-2`,
      title: key,
      level_id: `${key}-${level + 1}`,
      subTitle: inputObject[firstLevelKey[0]][key][subKey[0]],
      children: [...resultSecondChildren],
    };
  });

  let result = {
    id: `${firstLevelKey[0]}__${type}-level0__${Date.now()}-${Math.floor(
      Math.random() * 100000
    )}`, //add more random vlaue
    // type: firstLevelKey[0], //inputObject key 1st level
    type: "level-1", //inputObject key 1st level
    title: firstLevelKey[0], //inputObject key 1st level
    level_id: `${firstLevelKey[0]}-${level}`, //unique id
    subTitle: "lorem ipsum lorem ipsum",
    children: [...firstChildren],
  };

  return result;
}

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

const initialList = coverttoNestedObject(jsonData, 1);
const initialList2 = coverttoNestedObject(newJosnData, 2);

const CertificationDndAPP = () => {
  const [state, setState] = useState([initialList, initialList2]);

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    // const filteredType = type.split("__");
    console.log("sate", state, result);
    // console.log("result", source, destination, type, filteredType);
    console.log("result", type);
    // dropped outside the list
    // debugger;
    const sInd = source.droppableId;
    const dInd = destination?.droppableId;

    // const dragID = destination.draggableId;
    console.log("type __", type, sInd, dInd);
    const dropId = source.index;

    if (!result.destination) {
      console.log("there is no destination");
      return;
    }

    if (sInd !== dInd) {
      if (type === "level-1") {
        //! 1st level
        console.log("1st level");
        console.log("res", source, destination, type);
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
        console.log("🚀👌 level - 2 ");
        const childrenList1 = findChildrenById(state[0], `1-level1`, result);
        const childrenList2 = findChildrenById(state[1], `2-level1`, result);

        console.log("leve - 2 data 🖍️🖍️🖍️", childrenList1, childrenList2);

        const [sourcecloneChildren, destCloneChildren, copiedItem] = copy(
          childrenList1,
          childrenList2,
          source,
          destination
        );

        console.log("⌛⌛⌛", sourcecloneChildren, destCloneChildren, result);

        const newChildrenList1 = updateObject(
          state[0],
          `1-level1__${dropId}`,
          sourcecloneChildren,
          result
        );

        const newChildrenList2 = updateObject(
          state[1],
          `2-level1__${dropId}`,
          destCloneChildren,
          result
        );

        console.log("✨", newChildrenList1);
        console.log("🎉", newChildrenList2);

        const LISTL1 = [...state];
        LISTL1[0] = newChildrenList1;
        LISTL1[1] = newChildrenList2;
        setState(LISTL1);
        return;
      }

      if (type === "level-3-res") {
        console.log("type level 3", type);
        console.log("🎉📜📃", sInd, dInd);
        const nestedChildrenList1 = findChildrenThirdLevel(state[0], sInd);
        const nestedChildrenList2 = findChildrenThirdLevel(state[1], dInd);

        console.log("📃‼️‼️❓⁉️❓", nestedChildrenList1);
        console.log("📜❓❓❓", nestedChildrenList2);

        const [sourcecloneNestedChildren, destCloneNestedChildren, copiedItem] =
          copy(nestedChildrenList1, nestedChildrenList2, source, destination);

        const newNestedList1 = updateObjectThirdChildren(
          state[0],
          sInd,
          sourcecloneNestedChildren
        );
        const newNestedList2 = updateObjectThirdChildren(
          state[1],
          dInd,
          destCloneNestedChildren
        );

        const LISTL1 = [...state];
        LISTL1[0] = newNestedList1;
        LISTL1[1] = newNestedList2;
        setState(LISTL1);
        return;
      }
      if (type === "level-3-param") {
        console.log("type level 3", type);
        console.log("🎉📜📃", sInd, dInd);
        const nestedChildrenList1 = findChildrenThirdLevel(state[0], sInd);
        const nestedChildrenList2 = findChildrenThirdLevel(state[1], dInd);

        console.log("📃‼️‼️❓⁉️❓", nestedChildrenList1);
        console.log("📜❓❓❓", nestedChildrenList2);

        const [sourcecloneNestedChildren, destCloneNestedChildren, copiedItem] =
          copy(nestedChildrenList1, nestedChildrenList2, source, destination);

        const newNestedList1 = updateObjectThirdChildren(
          state[0],
          sInd,
          sourcecloneNestedChildren
        );
        const newNestedList2 = updateObjectThirdChildren(
          state[1],
          dInd,
          destCloneNestedChildren
        );

        const LISTL1 = [...state];
        LISTL1[0] = newNestedList1;
        LISTL1[1] = newNestedList2;
        setState(LISTL1);
        return;
      }
    } else {
      console.log("🚨🚨🚨", "else");
      if (type === "level-1") {
        const children = reorder(
          state[1].children,
          result.source.index,
          result.destination.index
        );

        const list = {
          ...state[1],
          children,
        };
        console.log("🎁🎁🎁🎁", list);
        console.log("🎀🎀🎀🎀", _.cloneDeep(state[0]));
        const LIST = [...state];
        LIST[0] = _.cloneDeep(state[0]);
        LIST[1] = list;
        setState(LIST);
      } else if (type === "level-2") {
        const findID = result.destination.droppableId.split("__");
        const index = state[1].children.findIndex((item) => {
          if (item.key === findID[0]) {
            return true;
          }
          return false;
        });
        console.log("🌍🌍", index, result);
        const nested = state[1].children.filter((item) =>
          Object.prototype.hasOwnProperty.call(item, "children")
        )[index];

        console.log("🎗️🎗️🎗️🎗️", nested);

        const updated = {
          ...nested,
          children: reorder(
            nested.children,
            result.source.index,
            // $ExpectError - already checked for null
            result.destination.index
          ),
        };

        const nestedIndex = state[1].children.indexOf(nested);
        const children = Array.from(state[1].children);
        children[nestedIndex] = updated;

        console.log("🎏🎏🎏🎏", children);

        const List1 = {
          ...state[1],
          children,
        };

        const LIST1 = [...state];
        LIST1[0] = _.cloneDeep(state[0]);
        LIST1[1] = List1;
        setState(LIST1);
      } else if (type === "level-3-res" || "level-3-param") {
        console.log("🎨🎨🎨", result);

        const indx = findIndexInNestedArrayPnC(
          state[1].children,
          result.destination.droppableId
        );
        console.log("🦺🦺🦺", indx);
        const nested = state[1].children.filter((item) =>
          Object.prototype.hasOwnProperty.call(item, "children")
        )[indx.parentIndex];

        const thirdNested = nested.children.filter((item) =>
          Object.prototype.hasOwnProperty.call(item, "children")
        )[indx.childIndex];

        console.log("✨✨✨🚩🌍", nested, thirdNested);

        const updated = {
          ...thirdNested,
          children: reorder(
            thirdNested.children,
            result.source.index,
            // $ExpectError - already checked for null
            result.destination.index
          ),
        };

        const thirdNestedIndex = nested.children.indexOf(thirdNested);
        const nestedIndex = state[1].children.indexOf(nested);
        const children1 = Array.from(nested.children);
        children1[thirdNestedIndex] = updated;

        const updated1 = {
          ...nested,
          children: children1,
        };

        const children = Array.from(state[1].children);
        children[nestedIndex] = updated1;

        const list2 = {
          ...state[1],
          children,
        };

        const LIST2 = [...state];
        LIST2[0] = _.cloneDeep(state[0]);
        LIST2[1] = list2;
        setState(LIST2);
      }

      // else if (type === "level-3-res") {

      // }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Root>
        {state.map((item, index) => (
          <NestedDragList
            key={index}
            list={item}
            isDrop={index === 0 && true}
            draggable={index === 3 && true}
          />
        ))}
      </Root>
    </DragDropContext>
  );
};

export default CertificationDndAPP;
