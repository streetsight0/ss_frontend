import { useState } from "react";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";

interface DropdownProps {
  options: string[];
  label?: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({ options, label = "Select", onChange  }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
    onChange(event);
  };

  return (
    <FormControl fullWidth>
      {selectedOption === "" && <InputLabel>{label}</InputLabel>}
      <Select
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
        sx={{
          borderRadius: "12px",
          backgroundColor: "white",
          "& .MuiSelect-select": {
            padding: "12px 14px",
            borderRadius: "12px",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "12px",
              boxShadow: 3,
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              "&:hover": {
                backgroundColor: "#e6d9fc",
              },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomDropdown;
