import React from "react";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography, Stack, SxProps } from "@mui/material";

interface CustomButtonProps {
	label: string;
	icon?: React.ReactNode;
	onClick?: () => void;
	sx?: SxProps;
	className?: string;
	children?: React.ReactNode;
}


const CustomButton: React.FC<CustomButtonProps> = ({
	label,
	icon,
	onClick,
	sx,
	className,
}) => {
	const isSmallScreen = useMediaQuery("(max-width:600px)");

	return (
		<Button
			variant="contained"
			color="inherit"
			onClick={onClick}
			className={className}
			sx={{
				bgcolor: "#F0F2E4",
				color: "black",
				borderRadius: 3,
				padding: isSmallScreen ? "8px 12px" : "12px 20px",
				fontSize: isSmallScreen ? "14px" : "16px",
				fontWeight: "bold",
				textTransform: "none",
				"&:hover": { bgcolor: "#E5E5C5" },
				...sx,
			}}
		>
			<Stack direction="row" spacing={1} alignItems="center">
				{icon}
				<Typography variant={isSmallScreen ? "body2" : "body1"}>
					{label}
				</Typography>
			</Stack>
		</Button>
	);
};

export default CustomButton;
