// @flow
// import type { Quote, QuoteMap } from "./types";
// import type { DraggableLocation } from "../../src/types";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  console.log("REORDER 🎃🎃🎃", result);
  return result;
};

export default reorder;

// type ReorderQuoteMapArgs = {|
//   quoteMap: QuoteMap,
//   source: DraggableLocation,
//   destination: DraggableLocation,
// |};

// export type ReorderQuoteMapResult = {|
//   quoteMap: QuoteMap,
// |};

export const reorderQuoteMap = ({ quoteMap, source, destination }) => {
  const current = [...quoteMap[source.droppableId]];
  const next = [...quoteMap[destination.droppableId]];
  const target = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    const result = {
      ...quoteMap,
      [source.droppableId]: reordered,
    };
    return {
      quoteMap: result,
    };
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result = {
    ...quoteMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };

  return {
    quoteMap: result,
  };
};

// type List<T> = {|
//   id: string,
//   values: T[],
// |};

// type MoveBetweenArgs<T> = {|
//   list1: List<T>,
//   list2: List<T>,
//   source: DraggableLocation,
//   destination: DraggableLocation,
// |};

// type MoveBetweenResult<T> = {|
//   list1: List<T>,
//   list2: List<T>,
// |};

export function moveBetween({ list1, list2, source, destination }) {
  const newFirst = Array.from(list1.values);
  const newSecond = Array.from(list2.values);

  const moveFrom = source.droppableId === list1.id ? newFirst : newSecond;
  const moveTo = moveFrom === newFirst ? newSecond : newFirst;

  const [moved] = moveFrom.splice(source.index, 1);
  moveTo.splice(destination.index, 0, moved);

  return {
    list1: {
      ...list1,
      values: newFirst,
    },
    list2: {
      ...list2,
      values: newSecond,
    },
  };
}

function generateUniqueId() {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function updateIdsRecursively(obj) {
  const newObj = { ...obj, id: generateUniqueId() };
  if (newObj.children && newObj.children.length > 0) {
    newObj.children = newObj.children.map((child) =>
      updateIdsRecursively(child)
    );
  }
  return newObj;
}

export const copy = (
  source,
  destination,
  droppableSource,
  droppableDestination
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const itemToCopy = sourceClone[droppableSource.index];

  // Check if itemToCopy already exists in the destination array
  // console.log("to cop item", itemToCopy);
  // const alreadyExists = destClone.some(
  //   (item) => item.content === itemToCopy.content
  // ); //? change is later

  const alreadyExists = destClone.some((item) => {
    if (itemToCopy.children) {
      // If itemToCopy has children property, compare it with item.title
      return item.title === itemToCopy.title;
    } else {
      // Otherwise, compare content
      return item.level_id === itemToCopy.level_id;
    }
  });

  if (!alreadyExists) {
    const copiedItem = updateIdsRecursively(itemToCopy);

    // console.log("copied item 📜📜📜📜📜", copiedItem);
    // Insert the copied item into the destination array
    destClone.splice(droppableDestination.index, 0, copiedItem);

    return [sourceClone, destClone, copiedItem];
  } else {
    console.log("🌍🌍🌍", itemToCopy);
    // Item already exists in the destination, return the original arrays
    console.log("🦺🦺🦺🎨🎨🎨", "turn modal on");
    return [sourceClone, destClone, itemToCopy];
  }
};

export function updateObject(obj, targetId, newArray, result) {
  // If the current object's id matches the targetId, return a new object with the updated children array
  const _id = obj.id.split("__");
  if (`${_id[1]}__${_id[2]}` === targetId) {
    console.log(
      "Split id update Obj 🤷‍♂️🤷‍♂️🤷‍♂️",
      obj,
      newArray,
      targetId,
      _id[1],
      _id[2]
    );
    console.log("🪢🪢🪢", targetId, "🎉✨🎉", ` ${_id[1]}__${_id[2]}`);
    console.log("🚀🚀🚀🚀", result);
    console.log("🎯🎯🎯", obj);
    return { ...obj, children: newArray };
  }

  // If the current object does not match the targetId, check if it has a "children" property
  if (obj.children) {
    console.log("🚩🚩🚩 ⛔⛔⛔", targetId);
    console.log("💢💢💢", `${_id[1]}__${_id[2]}`, obj);
    const updatedChildren = obj.children.map((child) =>
      updateObject(child, targetId, newArray)
    );

    // Return a new object with the updated children (if any)
    return { ...obj, children: updatedChildren };
  }

  // If the current object does not have a "children" property, return the object as is
  return obj;
}

export function findChildrenById(obj, targetId, result) {
  // Check if the current object's id matches the targetId
  // console.log("find Item children", obj, targetId);
  const _id = obj.id.split("__");
  // console.log("Split id", _id);
  // console.log("result 🧨🧨🧨", result);
  if (`${_id[1]}` === targetId) {
    // console.log("♨️♨️♨️♨️🎉🚀", `${_id[1]}__${_id[2]}`, targetId, obj);
    return obj.children; // Return the children array of the matched object
  }

  // Check if the current object has a "children" property
  if (obj.children && Array.isArray(obj.children)) {
    // If the current object doesn't match the targetId, recursively search in its children
    for (const child of obj.children) {
      const result = findChildrenById(child, targetId);
      if (result) {
        return result; // Return the result if found in children
      }
    }
  }

  // If not found, return null
  return null;
}

export function findChildrenThirdLevel(obj, targetId) {
  // Check if the current object's id matches the targetId
  //   console.log("find Item children", obj, targetId);
  const _id = obj.id.split("__");
  // console.log("Split id", _id);
  // console.log("result 🧨🧨🧨", obj, targetId);
  if (obj.id === targetId) {
    // console.log("♨️♨️♨️♨️🎉🚀", `${_id[1]}__${_id[2]}`, targetId, obj.children);
    return obj.children; // Return the children array of the matched object
  }

  // Check if the current object has a "children" property
  if (obj.children && Array.isArray(obj.children)) {
    // If the current object doesn't match the targetId, recursively search in its children
    for (const child of obj.children) {
      const result = findChildrenThirdLevel(child, targetId);
      if (result) {
        return result; // Return the result if found in children
      }
    }
  }

  // If not found, return null
  return null;
}

export function updateObjectThirdChildren(obj, targetId, newArray) {
  // If the current object's id matches the targetId, return a new object with the updated children array
  const _id = obj.id.split("__");
  // console.log("✨✨✨✨✨", targetId, "🗾🗾🗾", obj.id);
  if (obj.id === targetId) {
    // console.log(
    //   "Split id update Obj 🤷‍♂️🤷‍♂️🤷‍♂️",
    //   obj,
    //   newArray,
    //   targetId,
    //   _id[1],
    //   _id[2]
    // );
    // console.log("🪢🪢🪢", targetId, "🎉✨🎉", ` ${_id[1]}__${_id[2]}`);
    // console.log("🚀🚀🚀🚀");
    // console.log("🎯🎯🎯", obj);
    return { ...obj, children: newArray };
  }

  // If the current object does not match the targetId, check if it has a "children" property
  if (obj.children) {
    // console.log("⛔⛔⛔", targetId, "🚩🚩🚩", obj.id);
    // console.log("💢💢💢", `${_id[1]}__${_id[2]}`, obj);
    const updatedChildren = obj.children.map((child) =>
      updateObjectThirdChildren(child, targetId, newArray)
    );

    // Return a new object with the updated children (if any)
    return { ...obj, children: updatedChildren };
  }

  // If the current object does not have a "children" property, return the object as is
  return obj;
}

export function findIndexInNestedArray(arr, targetValue) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item.id === targetValue) {
      // console.log("🎠🎠🎠", item.id, targetValue);
      return i;
    }
    if (item.children && Array.isArray(item.children)) {
      const childResult = findIndexInNestedArray(item.children, targetValue);
      if (childResult !== -1) {
        return childResult;
      }
    }
  }
  return -1; // Return -1 if not found in the current level or its children.
}

export function findIndexInNestedArrayPnC(arr, targetValue, parentIndex = -1) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item.id === targetValue) {
      return { childIndex: i, parentIndex };
    }
    if (item.children && Array.isArray(item.children)) {
      const childResult = findIndexInNestedArrayPnC(
        item.children,
        targetValue,
        i
      );
      if (childResult.childIndex !== -1) {
        return childResult;
      }
    }
  }
  return { childIndex: -1, parentIndex }; // Return -1 for childIndex if not found in the current level or its children.
}
