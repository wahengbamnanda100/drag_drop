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
			}}>
			<Stack
				direction={"row"}
				spacing={4}
				justifyContent={"center"}
				alignItems={"center"}
				height={"100%"}>
				<Button variant="contained" onClick={() => navigate("/dragdrop")}>
					Drag and drop
				</Button>
				<Button variant="outlined" onClick={() => navigate("/datamapping")}>
					Data Mapping
				</Button>
			</Stack>
		</Container>
	);
}

export default MainLayout;