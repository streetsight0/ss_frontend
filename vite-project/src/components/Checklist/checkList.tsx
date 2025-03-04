import { useState } from "react";
import { MenuItem, FormControl, InputLabel, Select, Checkbox, ListItemText } from "@mui/material";

interface DropdownProps {
  options: string[];
  label?: string;
}

const CustomDropdown: React.FC<DropdownProps> = ({ options, label = "Filter By" }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (event: any) => {
    setSelectedOptions(event.target.value);
  };

  return (
    <FormControl fullWidth>
      {selectedOptions.length === 0 && <InputLabel>{label}</InputLabel>}
      <Select
        multiple
        value={selectedOptions}
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) => (selected.length > 0 ? selected.join(", ") : label)}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selectedOptions.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomDropdown;
