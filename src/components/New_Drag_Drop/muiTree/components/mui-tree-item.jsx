import React from "react";
import { Stack, Typography, useTheme } from "@mui/material";

const MuiTreeItem = ({ nodes }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={2} alignItems={"center"} p={1}>
      {/* {nodes.name === "Child - 5" && <LanOutlinedIcon color={"disabled"} />} */}
      <Stack
        direction={"column"}
        spacing={1}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        {" "}
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            width: "100%",
          }}
        >
          {nodes.title}
        </Typography>
        {nodes.subTitle && (
          <Typography
            variant="subtitle2"
            color={"gray"}
            sx={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              width: "100%",
            }}
          >
            {typeof nodes?.subTitle === "string"
              ? nodes?.subTitle
              : typeof nodes?.subTitle === "object"
              ? nodes?.subTitle.hasOwnProperty("$ref")
                ? nodes?.subTitle?.$ref
                : nodes?.subTitle?.summary
              : ""}
          </Typography>
        )}
        {/* <div style={{ color: "gray", fontSize: "12px" }}>{nodes?.subTitle}</div> */}
      </Stack>
    </Stack>
  );
};

export default MuiTreeItem;
