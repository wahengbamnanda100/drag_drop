import React from "react";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import CustomLabel from "./CustomLabel";
import NestedItem from "./NestedItem";

const NestedItemConditional = ({ keyId, data, type }) => {
  console.log("Nested Conditional data", data);
  if (data) {
    if (type === "parameter") {
      return data?.length > 0
        ? data?.map((item, itemIdx) =>
            item?.name ? (
              <Box
                key={keyId + itemIdx + "-" + item.name}
                sx={{
                  border: "1px solid " + grey[200],
                  my: 1,
                  borderRadius: "5px",
                }}
              >
                <CustomLabel
                  primaryText={item.name}
                  endChipStack={[
                    {
                      tooltip: "in",
                      label: item.in,
                      color: "success",
                      key: keyId + itemIdx + "-in",
                    },
                    {
                      tooltip: "style",
                      label: item.style,
                      color: "warning",
                      key: keyId + itemIdx + "-style",
                    },
                    {
                      tooltip: "schema",
                      label: item.schema.type,
                      color: "info",
                      key: keyId + itemIdx + "-schema",
                    },
                  ]}
                />
              </Box>
            ) : null
          )
        : null;
    } else if (type === "full-responses") {
      return Object.keys(data).length > 0
        ? Object.keys(data).forEach((eachResponseKey) => {
            const eachResponseData =
              data[eachResponseKey].content["application/json"].schema
                .properties;
            if (eachResponseData?.status_code) {
              console.log("log1 ", eachResponseKey, " => ", eachResponseData);
              return (
                <CustomLabel
                  primaryText={eachResponseKey}
                  endChipStack={[
                    {
                      label: "Status Code",
                      color: "info",
                      key: keyId + "-" + eachResponseKey + "-status_code",
                    },
                    {
                      label: "Status",
                      color: "info",
                      key: keyId + "-" + eachResponseKey + "-status",
                    },
                    {
                      label: "Message",
                      color: "info",
                      key: keyId + "-" + eachResponseKey + "-message",
                    },
                  ]}
                />
              );
            } else if (eachResponseData?.type === "string") {
              console.log(
                "log2 for type string",
                eachResponseKey,
                " => ",
                eachResponseData
              );
              return <CustomLabel primaryText="string-val" />;
            } else if (Object.keys(eachResponseData)?.length > 0) {
              console.log(
                "log3 is type object",
                eachResponseKey,
                eachResponseData
              );
              return Object.keys(eachResponseData)?.length > 0
                ? Object.keys(eachResponseData).map((schema) => (
                    <Box
                      key={keyId + "-" + schema + "-wrapper"}
                      sx={{
                        border: "1px solid " + grey[200],
                        my: 1,
                        borderRadius: "5px",
                      }}
                    >
                      {console.log(
                        "log 3-1 is schema",
                        eachResponseKey,
                        " for ",
                        schema,
                        eachResponseData[schema]
                      )}

                      {eachResponseData[schema]?.type === "string" && (
                        <CustomLabel
                          primaryText={schema}
                          secondaryText={
                            eachResponseData[schema]?.description
                              ? eachResponseData[schema].description
                              : ""
                          }
                          endChipStack={[
                            {
                              label: "string",
                              color: "info",
                              key: keyId + "-" + schema + "-type-string",
                            },
                          ]}
                        />
                      )}
                      {eachResponseData[schema]?.type === "object" && (
                        <NestedItem
                          nodeId={keyId + "-" + schema}
                          label={<CustomLabel primaryText={schema} />}
                        >
                          {Object.keys(
                            eachResponseData[schema].properties
                          )?.map((newSchema) => (
                            <NestedItemConditional
                              keyId={keyId + "-" + schema + "-" + newSchema}
                              data={{
                                name: newSchema,
                                loopData:
                                  eachResponseData[schema].properties[
                                    newSchema
                                  ],
                              }}
                              type="responses-loop"
                            />
                          ))}
                        </NestedItem>
                        // <CustomLabel primaryText={schema} />
                      )}
                    </Box>
                  ))
                : null;
            }
            return null;
          })
        : null;
    } else if (type === "responses") {
      //   console.log("type response!!!", data, type);
      //   return data?.length > 0 ? data?.map
      //   console.log(
      //     "data length",
      //     Object.keys(data).map((key, index) => ({ [key]: data[key]["$ref"] }))
      //   );
      const schemaList = Object.keys(data).map((key, index) => ({
        [key]: data[key]["$ref"],
      }));
      if (schemaList.length > 0) {
        // console.log("Schema list", schemaList.map());
        return schemaList.map((schema, index) => (
          <Box
            key={keyId + "-" + Object.keys(schema)[0] + "-wrapper"}
            sx={{
              border: "1px solid " + grey[200],
              my: 1,
              borderRadius: "5px",
            }}
          >
            <CustomLabel
              primaryText={Object.keys(schema)[0]}
              secondaryText={schema[Object.keys(schema)[0]]}
              //   secondaryText={
              //     schemaList[schema]?.description
              //       ? schemaList[schema].description
              //       : ""
              //   }
              endChipStack={[
                {
                  label: "string",
                  color: "info",
                  key: keyId + "-" + Object.keys(schema)[0] + "-type-string",
                },
              ]}
            />
          </Box>
        ));
      }
      //   if (data["200"]) {
      //     const schemaList =
      //       data["200"].content["application/json"].schema.properties;
      //     if (schemaList?.type === "string") {
      //       <CustomLabel primaryText="string-val" />;
      //     } else if (Object.keys(schemaList)?.length > 0) {
      //       return Object.keys(schemaList)?.map((schema) => (
      //         <Box
      //           key={keyId + "-" + schema + "-wrapper"}
      //           sx={{
      //             border: "1px solid " + grey[200],
      //             my: 1,
      //             borderRadius: "5px",
      //           }}
      //         >
      //           {schemaList[schema]?.type === "string" && (
      //             <CustomLabel
      //               primaryText={schema}
      //               secondaryText={
      //                 schemaList[schema]?.description
      //                   ? schemaList[schema].description
      //                   : ""
      //               }
      //               endChipStack={[
      //                 {
      //                   label: "string",
      //                   color: "info",
      //                   key: keyId + "-" + schema + "-type-string",
      //                 },
      //               ]}
      //             />
      //           )}
      //           {schemaList[schema]?.type === "object" && (
      //             <NestedItem
      //               nodeId={keyId + "-" + schema}
      //               label={<CustomLabel primaryText={schema} />}
      //             >
      //               {Object.keys(schemaList[schema].properties)?.map(
      //                 (newSchema) => (
      //                   <NestedItemConditional
      //                     keyId={keyId + "-" + schema + "-" + newSchema}
      //                     data={{
      //                       name: newSchema,
      //                       loopData: schemaList[schema].properties[newSchema],
      //                     }}
      //                     type="responses-loop"
      //                   />
      //                 )
      //               )}
      //             </NestedItem>
      //             // <CustomLabel primaryText={schema} />
      //           )}
      //         </Box>
      //       ));
      //     }
      //     return null;
      //   }
      return null;
    } else if (type === "responses-loop") {
      const { name, loopData } = data;
      return (
        <Box
          key={keyId + "-" + name}
          sx={{ border: "1px solid " + grey[200], my: 1, borderRadius: "5px" }}
        >
          {loopData?.type === "string" && (
            <CustomLabel
              primaryText={name ? name : ""}
              secondaryText={loopData?.description ? loopData.description : ""}
              endChipStack={[
                {
                  label: "string",
                  color: "info",
                  key: keyId + "-" + name + "-type-string",
                },
              ]}
            />
          )}
          {loopData?.type === "object" && (
            <NestedItem
              nodeId={keyId + "-" + name}
              label={<CustomLabel primaryText={name ? name : ""} />}
            >
              {Object.keys(loopData.properties)?.map((newSchema) => {
                if (loopData.parameters[newSchema]) {
                  return (
                    <NestedItemConditional
                      keyId={keyId + "-" + name + "-" + newSchema}
                      data={loopData.parameters[newSchema]}
                      type="responses-loop"
                    />
                  );
                }
                if (loopData.properties[newSchema]) {
                  return (
                    <NestedItemConditional
                      keyId={keyId + "-" + name + "-" + newSchema}
                      data={loopData.properties[newSchema]}
                      type="responses-loop"
                    />
                  );
                }
                return null;
              })}
            </NestedItem>
          )}
        </Box>
      );
    }
  }
  return null;
};

export default NestedItemConditional;
