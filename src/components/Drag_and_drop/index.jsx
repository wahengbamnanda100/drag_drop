import { Box, Container, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import shadows from "@mui/material/styles/shadows";
import AlignHorizontalLeftOutlinedIcon from "@mui/icons-material/AlignHorizontalLeftOutlined";
import Nested from "../../Shared/Nested";
import NestedItem from "../../Shared/NestedItem";
import jsonData from "../../utils/treeData.json";
import CustomLabel from "../../Shared/CustomLabel";
import DiviverContainer from "../../Shared/DividerContainer";
import NestedItemConditional from "../../Shared/NestedItemConditional";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TreeViewList from "./components/treeVIewList";

const DATA = jsonData.paths;

const DragAndDrop = () => {
  const keyId = "Key1";
  const keyID2 = "key2";
  const [copyData, setCopyData] = useState({});

  const onDragStart = (result) => {
    let droppableIdResponse = result.draggableId;
    const partsList = droppableIdResponse.split("-");
    console.log(`starts first Id ${partsList[1]}`);
    console.log(`starts second Id ${partsList[2]}`);
    // console.log("starts oas3Data ", oas3Data.view_id.data);
    if (partsList[1] == 1) {
      alert("Can't move this layer");
    }
    /*...*/
  };

  const onDragEnd = (result) => {
    let droppableIdResponse = result.draggableId;
    console.log("result", result);
    console.log("result", result.draggableId);
    console.log("result", result.draggableId);
    // console.log("oas3Data ", oas3Data.view_id.data);
    const partsList = droppableIdResponse.split("-");
    const droppableResponseData = droppableIdResponse.split("_");
    const draggableIdResponseData = result.draggableId.split("_");
    console.log(
      "droppableResponseData ,",
      droppableResponseData[0].indexOf("response") !== -1
    );
    console.log(
      "draggableIdResponseData ,",
      draggableIdResponseData[0].indexOf("response") !== -1
    );
    console.log("droppableResponseData ,", droppableResponseData[1]);
    console.log("draggableIdResponseData ,", draggableIdResponseData[1]);
    // if (
    //   partsList[1] != 1 &&
    //   result.destination.droppableId == "droppableParentPath-top"
    // ) {
    //   // the only one that is required
    //   console.log("result", result);
    //   console.log("result", result.draggableId);
    //   console.log(`first Id ${partsList[1]}`);
    //   console.log(`second Id ${partsList[2]}`);
    //   console.log("oas3Data ", oas3Data.view_id.data);
    //   let getMovedJson = oas3Data.view_id.data.paths[partsList[2]];
    //   const keysArray = Object.keys(oas3Data.view_id.data.paths);
    //   const valuesArray = Object.values(oas3Data.view_id.data.paths);
    //   const dataKey = keysArray[partsList[2]];
    //   const dataValue = valuesArray[partsList[2]];
    //   console.log("getMovedJson keysArray, ", dataKey);
    //   console.log("getMovedJson valuesArray, ", dataValue);
    //   console.log("old data oas3Data, ", oas3Data.view_fileName.data.paths);

    //   if (result.draggableId == "draggleParent-requestBody-0") {
    //     setOas3Data({
    //       ...oas3Data,
    //       view_fileName: {
    //         ...oas3Data.view_fileName,
    //         data: {
    //           ...oas3Data.view_fileName.data,
    //           components: {
    //             ...oas3Data.view_fileName.data.components,
    //             requestBodies: oas3Data.view_id.data.components.requestBodies,
    //           },
    //         },
    //       },
    //     });
    //   } else if (result.draggableId == "draggleParent-Path0") {
    //     setOas3Data({
    //       ...oas3Data,
    //       view_fileName: {
    //         ...oas3Data.view_fileName,
    //         data: {
    //           ...oas3Data.view_fileName.data,
    //           paths: {
    //             ...oas3Data.view_fileName.data.paths,
    //             ...oas3Data.view_id.data.paths,
    //           },
    //         },
    //       },
    //     });
    //   } else if (result.draggableId == "draggleParent-response-0") {
    //     setOas3Data({
    //       ...oas3Data,
    //       view_fileName: {
    //         ...oas3Data.view_fileName,
    //         data: {
    //           ...oas3Data.view_fileName.data,
    //           components: {
    //             ...oas3Data.view_fileName.data.components,
    //             responses: oas3Data.view_id.data.components.responses,
    //           },
    //         },
    //       },
    //     });
    //     console.log(
    //       "draggleParentPath after,",
    //       oas3Data.view_fileName.data.components.responses
    //     );
    //   } else if (result.draggableId == "draggleParent-schemas-0") {
    //     setOas3Data({
    //       ...oas3Data,
    //       view_fileName: {
    //         ...oas3Data.view_fileName,
    //         data: {
    //           ...oas3Data.view_fileName.data,
    //           components: {
    //             ...oas3Data.view_fileName.data.components,
    //             schemas: oas3Data.view_id.data.components.schemas,
    //           },
    //         },
    //       },
    //     });
    //     console.log(
    //       "draggleParentPath after,",
    //       oas3Data.view_fileName.data.components.schemas
    //     );
    //   } else if (result.draggableId.startsWith("draggleParentPath-0-")) {
    //     setOas3Data({
    //       ...oas3Data,
    //       view_fileName: {
    //         ...oas3Data.view_fileName,
    //         data: {
    //           ...oas3Data.view_fileName.data,
    //           paths: {
    //             ...oas3Data.view_fileName.data.paths,
    //             [dataKey]: dataValue,
    //           },
    //         },
    //       },
    //     });
    //   } else {
    //     console.log("something else");
    //   }

    //   console.log("after data oas3Data, ",);
    // }
  };

  return (
    <Box
      sx={{
        bgcolor: grey[100],
        padding: "2rem",
        margin: "auto",
        height: "100%",
        boxShadow: shadows[4],
      }}
    >
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Grid container spacing={4} sx={{ height: "100%" }}>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{ height: "100%" }}
          >
            <DiviverContainer>
              <Typography variant="h5">Left Container</Typography>
              <Droppable
                droppableId="droppable-level1"
                type="path"
                name={DATA.path}
              >
                {(provided, snapshot) => (
                  <Nested
                    {...provided.droppableProps}
                    style={{
                      backgroundColor: snapshot.isDraggingOver
                        ? "#cfd1d0"
                        : "white",
                    }}
                  >
                    <Draggable
                      draggableId={"draggleParent-Path" + 12}
                      index={0}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: snapshot.isDraggingOver
                              ? "#cfd1d0"
                              : "white",
                          }}
                          {...provided.droppableProps}
                        >
                          <NestedItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            nodeId={keyId}
                            index={0}
                            label={
                              <CustomLabel
                                primaryText="Path"
                                secondaryText="Lorem Ipsum Text"
                              />
                            }
                          >
                            {Object.keys(DATA).map((path, index) =>
                              Object.keys(DATA[path]).map((method, i) => (
                                <NestedItem
                                  key={keyId + path + "-" + method}
                                  index={i}
                                  nodeId={`${keyId} ${path} - ${method}`}
                                  label={
                                    <CustomLabel
                                      primaryText={path}
                                      secondaryText={
                                        DATA[path][method].description
                                      }
                                    />
                                  }
                                >
                                  {DATA[path][method].parameters && (
                                    <NestedItem
                                      nodeId={
                                        keyId +
                                        index +
                                        "-" +
                                        path +
                                        "-" +
                                        method +
                                        "-parameters"
                                      }
                                      index={Object.keys(DATA[path][method])}
                                      label={
                                        <CustomLabel
                                          primaryText="Parameters"
                                          startIcon={
                                            <AlignHorizontalLeftOutlinedIcon />
                                          }
                                        />
                                      }
                                    >
                                      <NestedItemConditional
                                        keyId={
                                          keyId +
                                          index +
                                          "-" +
                                          path +
                                          "-" +
                                          method +
                                          "-parameters-recursion-"
                                        }
                                        data={DATA[path][method].parameters}
                                        type="parameter"
                                      />
                                    </NestedItem>
                                  )}

                                  {DATA[path][method].responses && (
                                    <NestedItem
                                      nodeId={
                                        keyId +
                                        index +
                                        "-" +
                                        path +
                                        "-" +
                                        method +
                                        "-responses"
                                      }
                                      label={
                                        <CustomLabel
                                          primaryText="Responses"
                                          startIcon={
                                            <AlignHorizontalLeftOutlinedIcon />
                                          }
                                        />
                                      }
                                    >
                                      <NestedItemConditional
                                        keyId={
                                          keyId +
                                          index +
                                          "-" +
                                          path +
                                          "-" +
                                          method +
                                          "-responses-recursion"
                                        }
                                        data={DATA[path][method].responses}
                                        type="responses"
                                      />
                                    </NestedItem>
                                  )}
                                </NestedItem>
                              ))
                            )}
                          </NestedItem>
                        </div>
                      )}
                    </Draggable>
                  </Nested>
                )}
              </Droppable>
            </DiviverContainer>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{ height: "100%" }}
          >
            <TreeViewList data={DATA} cid={1} />
          </Grid>
        </Grid>
      </DragDropContext>
    </Box>
  );
};

export default DragAndDrop;
