import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      {...props}
      sx={{
        width: "525px", 
        height: "70px",
        bgcolor: "lightGray", 
        borderRadius: 5, 
        "& .MuiOutlinedInput-root": {
          "& fieldset": { border: "none" }, 
          padding: "6px 12px",
        },
        "& .MuiInputLabel-root": {
          color: "black", 
          // label color
        },
        "& .MuiInputLabel-shrink": {
          fontWeight: "bold", 
        },
        ...props.sx, 
      }}
    />
  );
};

export default CustomTextField;
