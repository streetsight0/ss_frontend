import { useState } from "react";
import { MenuItem, FormControl, InputLabel, Select, SxProps } from "@mui/material";

interface DropdownProps {
  options: string[];
  label?: string;
  onChange: (value: string) => void;
  value?: any;
  sx?: SxProps; 
}

const CustomDropdown: React.FC<DropdownProps> = ({ options, label = "Select", onChange, sx }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (event: any) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <FormControl fullWidth sx={{ position: "relative", width: "400px", ...sx }}>
      {/* Fixed Title */}
      <InputLabel 
        shrink 
        sx={{ 
          fontSize: "14px", 
          fontWeight: "bold", 
          color: "black", 
          position: "absolute", 
          top: "-10px", 
          fontFamily: "Poppins, sans-serif",
          paddingBottom: "0",
          marginBottom:"0"
        }}
      >
        {label}
      </InputLabel>

      <Select
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
        sx={{
          borderRadius: "8px",
          backgroundColor: "white",
          borderBottom: "3px solid rgba(168, 85, 247, 1)",
          marginBottom: "16px", 
          fontWeight: "500",
          height: 45,
          marginTop: "10px",
          "& .MuiSelect-select": {
            padding: "16px",
            borderRadius: "8px",
            color: "#333",
            fontFamily: "Poppins, sans-serif !important", 
          },
          "& .MuiSvgIcon-root": {
            color: "rgba(168, 85, 247, 1)", 
            fontWeight: "500",
          },
          ...sx, 
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "8px",
              fontWeight: "500",
              boxShadow: 3,
              fontFamily: "Poppins, sans-serif !important",
            },
          },
        }}
      >
        <MenuItem disabled value="" sx={{ 
          color: "#888", 
          fontSize: "14px", 
          fontFamily: "Poppins, sans-serif !important" 
        }}>
          Select option
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomDropdown;
