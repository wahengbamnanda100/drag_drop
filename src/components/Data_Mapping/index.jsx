import React, { useCallback, useEffect, useState, useRef } from "react";
import ButterflyDataMapping from "react-data-mapping";
import "react-data-mapping/dist/index.css";

import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  useStore,
  updateEdge,
  updateNode,
  useOnSelectionChange,
} from "reactflow";

import {
  columns1,
  sourceData1,
  targetData1,
  mappingData1,
} from "./components/config";
import { Container, Paper } from "@mui/material";
import "reactflow/dist/style.css";
import CustomNode from "./components/customNode";
import zIndex from "@mui/material/styles/zIndex";

// const initialNodes = [
//   {
//     id: "1",
//     position: { x: 0, y: 0 },
//     type: "input",
//     data: { label: "Input 1" },
//     sourcePosition: "right",
//     targetPosition: "left",
//   },
//   {
//     id: "2",
//     position: { x: 0, y: 100 },
//     data: {  onChange: onChange, color: initBgColor  },
//     type: "colorSelector",
//     sourcePosition: "right",
//     targetPosition: "left",
//   },
//   {
//     id: "3",
//     position: { x: 200, y: 100 },
//     data: { label: "3" },
//     targetPosition: "left",
//     sourcePosition: "right",
//   },
// ];

// const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const initBgColor = "#1A192B";

const connectionLineStyle = { stroke: "#000" };

const nodeTypes = {
  selectorNode: CustomNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1 };

function transformString(inputString, transformation) {
  if (typeof inputString !== "string" || inputString.length === 0) {
    return inputString;
  }
  const characters = inputString.split("");
  if (transformation === "changeID") {
    if (characters.length > 0) {
      characters[0] = "2";
    }
  } else if (transformation === "getParentID") {
    if (characters.length > 1) {
      characters[0] = "2";
      characters.pop();
    }
  } else {
    return inputString;
  }

  const transformedString = characters.join("");
  return transformedString;
}

const isValidConnection = (connection) => connection.target === "2A";

const CustomReactFlow = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project } = useReactFlow();
  const storeData = useStore();
  const [bgColor, setBgColor] = useState(initBgColor);
  const [currentNodeId, setCurrentNodeId] = useState(null);

  useEffect(() => {
    const onChange = (event) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== "2") {
            return node;
          }

          const color = event.target.value;

          setBgColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };

    setNodes([
      {
        id: "1",
        type: "group",
        data: { label: "Group A" },
        position: { x: 0, y: 0 },
        style: {
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          width: 300,
          height: 500,
        },
        sourcePosition: "right",
      },
      // !-------------- Nested level 1 -------------
      {
        id: "1A",
        type: "input",
        data: { label: "Nested Group A.1" },
        position: { x: 10, y: 50 },
        style: { padding: 10, width: 280, height: 250 },
        sourcePosition: "right",
        parentNode: "1",
        extent: "parent",
      },
      // !-------------- Nested level 2 -------------
      {
        id: "1A1",
        type: "input",
        data: { label: "Sub Nested Group A.1.1" },
        position: { x: 10, y: 50 },
        style: { padding: 10, width: 260 },
        sourcePosition: "right",
        parentNode: "1A",
        extent: "parent",
      },
      {
        id: "1A2",
        type: "input",
        data: { label: "Sub Nested Group A.1.2" },
        position: { x: 10, y: 100 },
        style: { padding: 10, width: 260 },
        sourcePosition: "right",
        parentNode: "1A",
        extent: "parent",
      },
      {
        id: "1A3",
        type: "input",
        data: { label: "Sub Nested Group A.1.3" },
        position: { x: 10, y: 150 },
        style: { padding: 10, width: 260 },
        sourcePosition: "right",
        parentNode: "1A",
        extent: "parent",
      },
      {
        id: "1A4",
        type: "input",
        data: { label: "Sub Nested Group A.1.4" },
        position: { x: 10, y: 200 },
        style: { padding: 10, width: 260 },
        sourcePosition: "right",
        parentNode: "1A",
        extent: "parent",
      },
      // !-------------- Nested level 1 -------------
      {
        id: "1B",
        type: "input",
        data: { label: "Nested Group A.2" },
        position: { x: 10, y: 320 },
        style: { padding: 10, width: 280 },
        sourcePosition: "right",
        parentNode: "1",
        extent: "parent",
      },
      {
        id: "1C",
        type: "input",
        data: { label: "Nested Group A.3" },
        position: { x: 10, y: 370 },
        style: { padding: 10, width: 280 },
        sourcePosition: "right",
        parentNode: "1",
        extent: "parent",
      },
      //* ------------- Group B -------------
      {
        id: "2",
        type: "group",
        data: { label: "Group B" },
        position: { x: 400, y: 0 },
        style: {
          backgroundColor: "rgba(255, 0, 1, 0.2)",
          width: 300,
          height: 500,
        },
        targetPosition: "left",
      },
      // !-------------- Nested level 1 -------------
      {
        id: "2A",
        type: "output",
        data: { label: "Nested Group B.1" },
        position: { x: 10, y: 50 },
        style: { padding: 10, width: 280, height: 200 },
        targetPosition: "left",
        parentNode: "2",
        extent: "parent",
      },
      // !-------------- Nested level 2 -------------
      {
        id: "2A1",
        type: "output",
        data: { label: "Sub Nested Group B.1.1" },
        position: { x: 10, y: 50 },
        style: { padding: 10, width: 260 },
        targetPosition: "left",
        parentNode: "2A",
        extent: "parent",
      },
      {
        id: "2A2",
        type: "output",
        data: { label: "Sub Nested Group B.1.2" },
        position: { x: 10, y: 100 },
        style: { padding: 10, width: 260 },
        targetPosition: "left",
        parentNode: "2A",
        extent: "parent",
      },
      {
        id: "2A3",
        type: "output",
        data: { label: "Sub Nested Group B.1.3" },
        position: { x: 10, y: 150 },
        style: { padding: 10, width: 260 },
        targetPosition: "left",
        parentNode: "2A",
        extent: "parent",
      },
      // !-------------- Nested level 1 -------------
      {
        id: "2B",
        type: "output",
        data: { label: "Nested Group B.2" },
        position: { x: 10, y: 270 },
        style: { padding: 10, width: 280 },
        targetPosition: "left",
        parentNode: "2",
        extent: "parent",
      },
      // {
      //   id: "2C",
      //   type: "output",
      //   data: { label: "Nested Group B.3" },
      //   position: { x: 10, y: 320 },
      //   style: { padding: 10, width: 280 },
      //   targetPosition: "left",
      //   parentNode: "2",
      //   extent: "parent",
      // },
    ]);

    setEdges([
      {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        style: { stroke: "#000" },
      },
    ]);
  }, []);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, animated: true, style: { stroke: "#000" }, zIndex: 10 },
          eds
        )
      ),
    []
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    setCurrentNodeId(nodeId);
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        console.log(transformString(currentNodeId, "getParentID"));
        const id = transformString(currentNodeId, "changeID");
        const parentId = transformString(currentNodeId, "getParentID");
        const Data = nodes.filter((node) => node.id === currentNodeId)[0];
        Data.data.label = Data.data.label + "_Copy";
        console.log("ID : ", Data);
        const newNode = {
          id,
          // position: project({
          //   //* need to set a viable way to fix cursour point
          //   x: event.clientX - 3.1 * left,
          //   y: event.clientY - top - 20,
          // }),
          position: Data.position,
          type: "output",
          data: Data.data,
          targetPosition: "left",
          style: Data.style,
          parentNode: parentId,
          extent: "parent",
          zIndex: 10,
        };

        setNodes((nds) => [...nds, newNode]);
        console.log("id's", currentNodeId, id);
        setEdges((eds) =>
          eds.concat({
            id: id,
            source: currentNodeId,
            target: id,
            animated: true,
            style: { stroke: "#000" },
          })
        );
      }
    },
    [project, currentNodeId]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    console.log("updae edge", oldEdge, newConnection);
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    console.log("edge", edge);
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      setNodes((nds) => nds.filter((n) => edge.id !== n.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onMouseEnter = (event, node) => {
    // console.log("event on edge mouse", node);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        // onEdgeMouseMove={onEdgeMouseMove}
        onNodeMouseEnter={onMouseEnter}
        isValidConnection={isValidConnection}
        connectionLineStyle={connectionLineStyle}
        nodeTypes={nodeTypes}
        defaultViewport={defaultViewport}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        deleteKeyCode={null} // remove delete fucntion
      />
    </div>
  );
};

const DataMapping = (props) => {
  return (
    <ReactFlowProvider>
      <Container>
        <Paper elevation={4}>
          <CustomReactFlow {...props} />
        </Paper>
      </Container>
    </ReactFlowProvider>
  );
};

export default DataMapping;
