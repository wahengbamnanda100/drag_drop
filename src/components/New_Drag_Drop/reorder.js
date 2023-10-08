// @flow
// import type { Quote, QuoteMap } from "./types";
// import type { DraggableLocation } from "../../src/types";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

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

// function updateIdsRecursively(item) {
//   if (item.children) {
//     item.children = item.children.map((child) => ({
//       ...child,
//       id: `${child.id}-${Date.now()}`,
//     }));

//     // Recursively update ids in nested children arrays
//     item.children.forEach((child) => {
//       updateIdsRecursively(child);
//     });
//   }

//   return item;
// }

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
  console.log("to cop item", itemToCopy);
  // const alreadyExists = destClone.some(
  //   (item) => item.content === itemToCopy.content
  // ); //? change is later

  const alreadyExists = destClone.some((item) => {
    if (itemToCopy.children) {
      // If itemToCopy has children property, compare it with item.title
      return item.title === itemToCopy.title;
    } else {
      // Otherwise, compare content
      return item.content === itemToCopy.content;
    }
  });

  if (!alreadyExists) {
    console.log("not exist item", itemToCopy);
    // Create a copy of the item
    // const copiedItem = { ...itemToCopy, id: `${itemToCopy.id}-${Date.now()}` };

    // const copiedItem = itemToCopy.children
    //   ? updateIdsRecursively(itemToCopy)
    //   : { ...itemToCopy, id: `${itemToCopy.id}-${Date.now()}` };

    // let copiedItem;

    // if (itemToCopy.children) {
    //   console.log("2nd child", itemToCopy.children);
    //   copiedItem = {
    //     ...itemToCopy,
    //     children: itemToCopy.children.map((child) => {
    //       if (child.children) {

    //       }
    //       return {
    //         ...child,
    //         id: `${child.id}-${Date.now()}`,
    //       };
    //     }),
    //   };
    // } else {
    //   copiedItem = { ...itemToCopy, id: `${itemToCopy.id}-${Date.now()}` };
    // }

    const copiedItem = updateIdsRecursively(itemToCopy);

    console.log("copied item", copiedItem);
    // Insert the copied item into the destination array
    destClone.splice(droppableDestination.index, 0, copiedItem);

    return [sourceClone, destClone, copiedItem];
  } else {
    // Item already exists in the destination, return the original arrays
    return [sourceClone, destClone, itemToCopy];
  }
};

export function updateObject(obj, targetId, newArray) {
  // If the current object's id matches the targetId, return a new object with the updated children array
  if (obj.id === targetId) {
    return { ...obj, children: newArray };
  }

  // If the current object does not match the targetId, check if it has a "children" property
  if (obj.children) {
    const updatedChildren = obj.children.map((child) =>
      updateObject(child, targetId, newArray)
    );

    // Return a new object with the updated children (if any)
    return { ...obj, children: updatedChildren };
  }

  // If the current object does not have a "children" property, return the object as is
  return obj;
}

export function findChildrenById(obj, targetId) {
  // Check if the current object's id matches the targetId
  if (obj.id === targetId) {
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
