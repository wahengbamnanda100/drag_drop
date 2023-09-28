import React, { useCallback, useEffect, useState } from "react";
import ButterflyDataMapping from "react-data-mapping";
import "react-data-mapping/dist/index.css";

import {
  columns1,
  sourceData1,
  targetData1,
  mappingData1,
} from "./components/config";
import { Container, Paper } from "@mui/material";

import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";

import "reactflow/dist/style.css";

import CustomNode from "./components/customNode";

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

const defaultViewport = { x: 0, y: 0, zoom: 1.2 };

const DataMapping = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [bgColor, setBgColor] = useState(initBgColor);

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
        type: "input",
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
        style: { padding: 10, width: 280, height: 200 },
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
      // !-------------- Nested level 1 -------------
      {
        id: "2A",
        type: "input",
        data: { label: "Nested Group A.2" },
        position: { x: 10, y: 270 },
        style: { padding: 10, width: 280 },
        sourcePosition: "right",
        parentNode: "1",
        extent: "parent",
      },
      {
        id: "3A",
        type: "input",
        data: { label: "Nested Group A.3" },
        position: { x: 10, y: 320 },
        style: { padding: 10, width: 280 },
        sourcePosition: "right",
        parentNode: "1",
        extent: "parent",
      },
      //* ------------- Group B -------------
      {
        id: "2",
        type: "output",
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
        id: "1B",
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
        id: "1B1",
        type: "output",
        data: { label: "Sub Nested Group B.1.1" },
        position: { x: 10, y: 50 },
        style: { padding: 10, width: 260 },
        targetPosition: "left",
        parentNode: "1B",
        extent: "parent",
      },
      {
        id: "1B2",
        type: "output",
        data: { label: "Sub Nested Group B.1.2" },
        position: { x: 10, y: 100 },
        style: { padding: 10, width: 260 },
        targetPosition: "left",
        parentNode: "1B",
        extent: "parent",
      },
      {
        id: "1B3",
        type: "output",
        data: { label: "Sub Nested Group B.1.3" },
        position: { x: 10, y: 150 },
        style: { padding: 10, width: 260 },
        targetPosition: "left",
        parentNode: "1B",
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
      {
        id: "3B",
        type: "output",
        data: { label: "Nested Group B.3" },
        position: { x: 10, y: 320 },
        style: { padding: 10, width: 280 },
        targetPosition: "left",
        parentNode: "2",
        extent: "parent",
      },
    ]);

    // setNodes([
    //   {
    //     id: "1",
    //     type: "input",
    //     data: { label: "An input node" },
    //     position: { x: 0, y: 50 },
    //     sourcePosition: "right",
    //   },
    //   {
    //     id: "2",
    //     type: "selectorNode",
    //     data: { onChange: onChange, color: initBgColor },
    //     style: {
    //       backgroundColor: "rgba(255, 0, 0, 0.2)",
    //       width: 300,
    //       height: 300,
    //     },
    //     position: { x: 300, y: 50 },
    //   },
    //   {
    //     id: "2a",
    //     type: "input",
    //     data: { label: " Nested Node 2.A.1" },
    //     style: { border: "1px solid #777", padding: 10 },
    //     position: { x: 15, y: 50 },
    //     parentNode: "2",
    //     targetPosition: "left",
    //     sourcePosition: "right",
    //     extent: "parent",
    //   },
    //   {
    //     id: "3",
    //     type: "output",
    //     data: { label: "Output A" },
    //     position: { x: 650, y: 25 },
    //     targetPosition: "left",
    //   },
    //   {
    //     id: "4",
    //     type: "output",
    //     data: { label: "Output B" },
    //     position: { x: 650, y: 100 },
    //     targetPosition: "left",
    //   },
    // ]);

    setEdges([
      {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        style: { stroke: "#000" },
      },
      {
        id: "e2a-3",
        source: "2",
        target: "3",
        sourceHandle: "a",
        animated: true,
        style: { stroke: "#000" },
      },
      {
        id: "e2b-4",
        source: "2",
        target: "4",
        sourceHandle: "b",
        animated: true,
        style: { stroke: "#000" },
      },
    ]);
  }, []);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#000" } }, eds)
      ),
    []
  );

  return (
    <Container>
      <Paper elevation={4}>
        {/* <ButterflyDataMapping
          width={500}
          height={1000}
          type={"single"}
          columns={columns1}
          sourceData={sourceData1}
          targetData={targetData1}
          mappingData={mappingData1}
          className={"butterfly-data-mapping"}
          sourceClassName={"source-column"}
          targetClassName={"target-column"}
        /> */}

        <div style={{ width: "100%", height: "100vh" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            connectionLineStyle={connectionLineStyle}
            nodeTypes={nodeTypes}
            defaultViewport={defaultViewport}
            panOnDrag={false}
            zoomOnScroll={false}
            nodesDraggable={false}
          />
        </div>
      </Paper>
    </Container>
  );
};

export default DataMapping;
