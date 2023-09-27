import { Box, Card } from "@mui/material";
import React from "react";

function DiviverContainer({ children }) {
  return (
    <Card style={{ height: "100%", minHeight: "400px" }} variant="outlined">
      <Box sx={{ height: "100%", overflow: "hidden", overflowY: "scroll" }}>
        <Box sx={{ p: 2 }}>{children}</Box>
      </Box>
    </Card>
  );
}

export default DiviverContainer;
