import React from "react";
import {
	Box,
	Chip,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { grey } from "@mui/material/colors";

function CustomLabel({
	primaryText,
	secondaryText,
	startIcon,
	startChipStack = [],
	endChipStack = [],
	handleEditAction,
}) {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				gap: "20px",
				my: 1,
				ml: 2,
			}}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-start",
					alignItems: "center",
					gap: "20px",
					my: 1,
					ml: 2,
				}}>
				{startIcon && startIcon}
				<Box>
					{startChipStack?.length ? (
						<Stack flexDirection="row" sx={{ gap: "5px" }}>
							{startChipStack?.map((chipStackItem) =>
								chipStackItem?.tooltip ? (
									<Tooltip
										title={chipStackItem.tooltip}
										key={chipStackItem.key}>
										<Chip {...chipStackItem} size="small" />
									</Tooltip>
								) : (
									<Chip {...chipStackItem} size="small" />
								)
							)}
						</Stack>
					) : null}
					{primaryText && (
						<Typography sx={{ wordBreak: "break-all" }}>
							{primaryText}
						</Typography>
					)}
					{secondaryText && (
						<Typography
							sx={{ wordBreak: "break-all" }}
							variant="body1"
							color={grey[500]}>
							{secondaryText}
						</Typography>
					)}
					{endChipStack?.length ? (
						<Stack flexDirection="row" sx={{ gap: "5px" }}>
							{endChipStack?.map((chipStackItem) =>
								chipStackItem?.tooltip ? (
									<Tooltip
										title={chipStackItem.tooltip}
										key={chipStackItem.key}>
										<Chip {...chipStackItem} size="small" />
									</Tooltip>
								) : (
									<Chip {...chipStackItem} size="small" />
								)
							)}
						</Stack>
					) : null}
				</Box>
			</Box>
			{handleEditAction && (
				<IconButton onClick={handleEditAction} size="small">
					<MoreVertOutlinedIcon />
				</IconButton>
			)}
		</Box>
	);
}

export default CustomLabel;
