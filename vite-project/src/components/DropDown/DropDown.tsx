import { useState } from "react";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";

interface DropdownProps {
  options: string[];
  label?: string;
  onChange: (value: string) => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({ options, label = "Select", onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (event: any) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <FormControl fullWidth sx={{ position: "relative", width: "700px" }}>
      {/* Fixed Title */}
      <InputLabel 
        shrink 
        sx={{ 
          fontSize: "14px", 
          fontWeight: "500", 
          color: "black", 
          position: "absolute", 
          top: "-10px", 
          left: "10px", 
          padding: "0 5px" 
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
          height:45,
          "& .MuiSelect-select": {
            padding: "16px",
            borderRadius: "8px",
            color: "#333",
          },
          "& .MuiSvgIcon-root": {
            color: "rgba(168, 85, 247, 1)", 
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "8px",
              boxShadow: 3,
            },
          },
        }}
      >
        <MenuItem disabled value="">
          <span style={{ color: "#888", fontSize:"14px" }}>Enter data here</span> 
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
