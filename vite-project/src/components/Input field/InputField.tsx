import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

const InputField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      InputLabelProps={{ shrink: true }} 
      {...props}
      sx={{
<<<<<<< HEAD
        width: "400px", 
        height: "70px",
        bgcolor: "lightGray", 
        borderRadius: 2, 
=======
        width: "700px",
        borderRadius: "8px",
        fontWeight: "500",
>>>>>>> 00fb98199a544a79957ab1b2277f2e271fd44efa
        "& .MuiOutlinedInput-root": {
          bgcolor: "white", 
          borderRadius: "8px",
          "& fieldset": { border: "none" }, 
          borderBottom: "3px solid rgba(168, 85, 247, 1)",
          marginBottom: "16px", 
          height:45,
        },
        "& .MuiInputBase-input": {
          padding: "16px", 
          color: "black",
        },
        "& .MuiInputLabel-root": {
          position: "absolute",
          top: "-10px", 
          fontSize: "16px",
          fontWeight: "bold",
          color: "black", 
        },
        "& .MuiInputLabel-shrink": {
          color: "black", 
        },
        ...props.sx,
      }}
    />
  );
};

export default InputField;


