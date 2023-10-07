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

export const copy = (
  source,
  destination,
  droppableSource,
  droppableDestination
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const itemToCopy = sourceClone[droppableSource.index];

  // Create a copy of the item (you may need to implement a deep copy if the item is complex)
  const copiedItem = { ...itemToCopy };

  destClone.splice(droppableDestination.index, 0, copiedItem);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
