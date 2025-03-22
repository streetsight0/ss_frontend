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
      onClick={onClick}
	  className={className}
      sx={{
        bgcolor: "#212429",  
        color: "#FFFFFF", 
        borderRadius: "8px",
        padding: isSmallScreen ? "8px 12px" : "10px 16px",
        fontSize: isSmallScreen ? "14px" : "16px",
        fontWeight: "500",
        textTransform: "none",
        fontFamily: "'Poppins', sans-serif !important",  
        "&:hover": { bgcolor: "#333" }, 
        ...sx,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {icon}
        <Typography variant={isSmallScreen ? "body2" : "body1"} color="inherit" sx={{ fontFamily: "'Poppins', sans-serif !important" }}>
          {label}
        </Typography>
      </Stack>
    </Button>
  );
};

export default CustomButton;