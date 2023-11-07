import { Button, Container, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import shadows from "@mui/material/styles/shadows";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function MainLayout() {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        bgcolor: grey[100],
        margin: "auto",
        height: "100%",
        boxShadow: shadows[4],
      }}
    >
      <Stack
        direction={"row"}
        spacing={4}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
      >
        <Button variant="contained" onClick={() => navigate("/dragdrop")}>
          Drag and drop
        </Button>
        <Button variant="outlined" onClick={() => navigate("/datamapping")}>
          Data Mapping
        </Button>
        <Button variant="outlined" onClick={() => navigate("/newdragdrop")}>
          New Drag and drop
        </Button>
        <Button variant="outlined" onClick={() => navigate("/newnewdragdrop")}>
          New New Drag and drop
        </Button>
        <Button variant="outlined" onClick={() => navigate("/muidragdrop")}>
          MUI Tree Drag and drop
        </Button>
        <Button variant="outlined" onClick={() => navigate("/atlasdragdrop")}>
          AtlasKit Tree Drag and drop
        </Button>
        <Button variant="outlined" onClick={() => navigate("/kendodragdrop")}>
          Kendo Tree Drag and drop
        </Button>
      </Stack>
    </Container>
  );
}

export default MainLayout;
