import { useState } from "react";
import { MenuItem, FormControl, InputLabel, Select, Checkbox, ListItemText } from "@mui/material";

interface ChecklistProps {
  options: { id: string; label: string }[];  // options should contain both id and label
  label?: string;
  onSelect: (selected: string[]) => void;
  keyExtractor?: (option: any) => any;
}

const CustomChecklist: React.FC<ChecklistProps> = ({ options, label = "Filter By", onSelect }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (event: any) => {
    setSelectedOptions(event.target.value);
    onSelect(event.target.value); 
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
          <MenuItem key={`${option.id}-${option.label}`} value={option.id}> {/* Ensure the key is unique */}
            <Checkbox checked={selectedOptions.includes(option.id)} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomChecklist;

