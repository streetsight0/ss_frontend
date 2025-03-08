import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      {...props}
      sx={{
        width: "700px", 
        height: "70px",
        bgcolor: "lightGray", 
        borderRadius: 2, 
        "& .MuiOutlinedInput-root": {
          "& fieldset": { border: "none" }, 
          padding: "4px 8px",
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
