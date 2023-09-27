import React from "react";
import { FormatListBulleted } from "@mui/icons-material";
import CustomLabel from "../../../Shared/CustomLabel";
import NestedItem from "../../../Shared/NestedItem";
import NestedItemConditional from "../../../Shared/NestedItemConditional";
import { Draggable } from "react-beautiful-dnd";
import AlignHorizontalLeftOutlinedIcon from "@mui/icons-material/AlignHorizontalLeftOutlined";

const NestedTreeList = ({ data, cid, keyId, parentId }) => {
  console.log("Dtaes!", data);
  return (
    <>
      <NestedItem
        nodeId={keyId}
        label={
          <CustomLabel
            primaryText="Path"
            secondaryText="Lorem Ipsum Text"
            startIcon={<FormatListBulleted />}
          />
        }
      >
        {Object.keys(data).map((path, index) =>
          Object.keys(data[path]).map((method, i) => (
            <Draggable
              draggableId={
                "draggleParentPath-" + cid + "-" + index + "-" + method
              }
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  style={{ backgroundColor: "white" }}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <NestedItem
                    key={keyId + path + "-" + method}
                    index={i}
                    nodeId={`${keyId} ${path} - ${method}`}
                    label={
                      <CustomLabel
                        primaryText={path}
                        secondaryText={data[path][method].description}
                      />
                    }
                  >
                    {data[path][method].parameters && (
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
                        index={Object.keys(data[path][method])}
                        label={
                          <CustomLabel
                            primaryText="Parameters"
                            startIcon={<AlignHorizontalLeftOutlinedIcon />}
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
                          data={data[path][method].parameters}
                          type="parameter"
                        />
                      </NestedItem>
                    )}

                    {data[path][method].responses && (
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
                            startIcon={<AlignHorizontalLeftOutlinedIcon />}
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
                          data={data[path][method].responses}
                          type="responses"
                        />
                      </NestedItem>
                    )}
                  </NestedItem>
                </div>
              )}
            </Draggable>
          ))
        )}
      </NestedItem>
    </>
  );
};

export default NestedTreeList;
