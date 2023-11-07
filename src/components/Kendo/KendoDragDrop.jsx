import React, { useRef, useState } from "react";
import * as ReactDOM from "react-dom";
import {
  TreeView,
  TreeViewDragClue,
  processTreeViewItems,
  moveTreeViewItem,
  TreeViewDragAnalyzer,
} from "@progress/kendo-react-treeview";

const SEPARATOR = "_";

function getSiblings(itemIndex, data) {
  let result = data;
  const indices = itemIndex.split(SEPARATOR).map((index) => Number(index));
  for (let i = 0; i < indices.length - 1; i++) {
    result = result[indices[i]].items;
  }
  return result;
}

const initialTree1 = [
  {
    text: "Furniture",
    expanded: true,
    items: [
      { text: "Tables & Chairs" },
      { text: "Sofas" },
      { text: "Occasional Furniture" },
    ],
  },
  {
    text: "Decor",
    expanded: true,
    items: [
      {
        text: "Bed Linen",
        expand: true,
        items: [
          { text: "third child 1" },
          { text: "third child 2" },
          { text: "third child 3" },
        ],
      },
      { text: "Curtains & Blinds" },
      { text: "Carpets" },
    ],
  },
];

const initialTree2 = [
  {
    text: "Storage",
    expanded: true,
    items: [
      { text: "Wall Shelving" },
      { text: "Floor Shelving" },
      { text: "Kids Storage" },
    ],
  },
  {
    text: "Lights",
    expanded: true,
    items: [{ text: "Ceiling" }, { text: "Table" }, { text: "Floor" }],
  },
];

const KendoDragDrop = () => {
  const treeView1Guid = useRef(null);
  const treeView2Guid = useRef(null);
  const dragClue = useRef(null);
  const [dragOverCnt, setDragOverCnt] = useState(0);
  const [isDragDrop, setIsDragDrop] = useState(false);
  const [tree, setTree] = useState(initialTree1);
  const [tree2, setTree2] = useState(initialTree2);

  const onItemDragOver = (event) => {
    setDragOverCnt((prevCount) => prevCount + 1);
    dragClue.current.show(
      event.pageY + 10,
      event.pageX,
      event.item.text,
      getClueClassName(event)
    );
  };

  const onItemDragEnd = (event) => {
    setIsDragDrop(dragOverCnt > 0);
    setDragOverCnt(0);
    dragClue.current.hide();

    const eventAnalyzer = new TreeViewDragAnalyzer(event).init();

    if (eventAnalyzer.isDropAllowed) {
      const { sourceData, targetData } = moveTreeViewItem(
        event.itemHierarchicalIndex,
        resolveData(event.target.guid),
        eventAnalyzer.getDropOperation(),
        eventAnalyzer.destinationMeta.itemHierarchicalIndex,
        resolveData(eventAnalyzer.destinationMeta.treeViewGuid)
      );

      if (event.target.guid === treeView1Guid.current) {
        // setTree(sourceData);
        setTree2(targetData);
      } else {
        // setTree(sourceData);
        setTree2(targetData);
      }
    }
  };

  const onItemClick = (event) => {
    if (!isDragDrop) {
      event.item.selected = !event.item.selected;
      // Since you are using hooks, there is no need to call forceUpdate
    }
  };

  const onExpandChange = (event) => {
    event.item.expanded = !event.item.expanded;
    // Since you are using hooks, there is no need to call forceUpdate
  };

  const getClueClassName = (event) => {
    const eventAnalyzer = new TreeViewDragAnalyzer(event).init();
    const { itemHierarchicalIndex: itemIndex, treeViewGuid } =
      eventAnalyzer.destinationMeta;

    if (eventAnalyzer.isDropAllowed) {
      switch (eventAnalyzer.getDropOperation()) {
        case "child":
          return "k-i-plus";
        case "before":
          return itemIndex === "0" || itemIndex.endsWith(`${SEPARATOR}0`)
            ? "k-i-insert-up"
            : "k-i-insert-middle";
        case "after":
          const siblings = getSiblings(itemIndex, resolveData(treeViewGuid));
          const lastIndex = Number(itemIndex.split(SEPARATOR).pop());

          return lastIndex < siblings.length - 1
            ? "k-i-insert-middle"
            : "k-i-insert-down";
        default:
          break;
      }
    }

    return "k-i-cancel";
  };

  const resolveData = (treeViewGuid) => {
    return treeViewGuid === treeView1Guid.current ? tree : tree2;
  };

  return (
    <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
      <TreeView
        data={tree}
        draggable={true}
        onItemDragOver={onItemDragOver}
        onItemDragEnd={onItemDragEnd}
        ref={(treeView) => (treeView1Guid.current = treeView && treeView.guid)}
        expandIcons={true}
        onExpandChange={onExpandChange}
        onItemClick={onItemClick}
      />
      <TreeView
        data={tree2}
        draggable={true}
        onItemDragOver={onItemDragOver}
        onItemDragEnd={onItemDragEnd}
        ref={(treeView) => (treeView2Guid.current = treeView && treeView.guid)}
        expandIcons={true}
        onExpandChange={onExpandChange}
        onItemClick={onItemClick}
      />
      <TreeViewDragClue ref={dragClue} />
    </div>
  );
};

export default KendoDragDrop;
