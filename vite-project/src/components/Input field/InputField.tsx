import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

const InputField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      slotProps={{ inputLabel: { shrink: true } }} 
      {...props}
      sx={{
        width: "400px",
        borderRadius: "8px",
        fontFamily: "Poppins, sans-serif",
        "& .MuiOutlinedInput-root": {
          bgcolor: "white",
          borderRadius: "8px",
          "& fieldset": { border: "none" },
          borderBottom: "3px solid rgba(168, 85, 247, 1)",
          marginBottom: "16px",
          marginTop:"10px",
          height: 45,
        },
        "& .MuiInputBase-input": {
          padding: "16px",
          color: "black",
          fontFamily: "Poppins, sans-serif !important", 
        },
        "& .MuiInputLabel-root": {
          fontSize: "16px",
          color: "black",
          fontFamily: "Poppins, sans-serif !important", 
        },
        "& .MuiInputLabel-shrink": {
          color: "black",
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif !important", 
        },
        ...props.sx,
      }}
    />
  );
};

export default InputField;
