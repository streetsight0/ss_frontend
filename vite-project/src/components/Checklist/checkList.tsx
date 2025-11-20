import { useState, useEffect } from "react";
import { MenuItem, FormControl, InputLabel, Select, Checkbox, ListItemText } from "@mui/material";

interface ChecklistProps {
  options: { id: string; label: string }[];  
  label?: string;
  placeholder?: string;
  onSelect: (selected: string[]) => void;
  resetTrigger?: number; 
}

const CustomChecklist: React.FC<ChecklistProps> = ({ options, label = "Filter By", placeholder = "Select Options", onSelect, resetTrigger }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (event: any) => {
    setSelectedOptions(event.target.value);
    onSelect(event.target.value);
  };

  useEffect(() => {
    setSelectedOptions([]);
  }, [resetTrigger]);

  return (
    <FormControl fullWidth sx={{ position: "relative", width: "700px" }}>
      <InputLabel 
        shrink 
        sx={{ 
          fontSize: "16px", 
          color: "black", 
          position: "absolute", 
          top: "-10px",
          padding: "0", 
          fontFamily: "Poppins, sans-serif",
          zIndex: 1
        }}
      >
        {label}
      </InputLabel>

      <Select
        multiple
        value={selectedOptions}
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) => (selected.length > 0 ? selected.join(", ") : placeholder)}
        sx={{
          borderRadius: "8px",
          backgroundColor: "white",
          borderBottom: "3px solid rgba(168, 85, 247, 1)",
          marginBottom: "16px", 
          height: "45",
          paddingLeft: "16px",
          "& .MuiSelect-select": {
            padding: "12px 16px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
          },
          "& .MuiSvgIcon-root": {
            color: "rgba(168, 85, 247, 1)",

            right: "12px",
          },
          "&:hover": {
            boxShadow: "0px 6px 12px rgba(168, 85, 247, 0.4)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused": {
            boxShadow: "0px 6px 12px rgba(168, 85, 247, 0.4)",
          }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "12px",
              boxShadow: 4,
              fontFamily: "Poppins, sans-serif"
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            <Checkbox checked={selectedOptions.includes(option.id)} />
            <ListItemText primary={option.label} sx={{ fontFamily: "Poppins, sans-serif" }} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomChecklist;
