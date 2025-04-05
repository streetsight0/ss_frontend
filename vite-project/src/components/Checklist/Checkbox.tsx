import React, { useState } from 'react';
import { MenuItem, FormControl, InputLabel, Select, Checkbox, ListItemText } from '@mui/material';

interface ChecklistProps {
  items: string[]; // This will be an array of billboard IDs
  label?: string;
  placeholder?: string;
  onSelectionChange: (selectedItems: string[]) => void; // Callback to send the selected IDs back
}

const Checklist: React.FC<ChecklistProps> = ({ items, label = "Select Billboard", placeholder = "Select Options", onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleChange = (event: any) => {
    const value = event.target.value as string[];
    setSelectedItems(value);
    onSelectionChange(value); // Pass the selected items back to the parent
  };

  return (
    <FormControl fullWidth sx={{ position: "relative", width: "700px" }}>
      <InputLabel shrink sx={{ fontSize: "16px", color: "black", position: "absolute", top: "-10px", padding: "0", fontFamily: "Poppins, sans-serif", zIndex: 1 }}>
        {label}
      </InputLabel>
      <Select
        multiple
        value={selectedItems}
        onChange={handleChange}
        renderValue={(selected) => (selected.length > 0 ? selected.join(", ") : placeholder)}
        sx={{
          borderRadius: "8px",
          backgroundColor: "white",
          borderBottom: "3px solid rgba(168, 85, 247, 1)",
          marginBottom: "16px",
          height: "45",
          width:"70vw",
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
        {items.map((item, index) => (
          <MenuItem key={index} value={item}>
            <Checkbox checked={selectedItems.indexOf(item) > -1} />
            <ListItemText primary={item} sx={{ fontFamily: "Poppins, sans-serif" }} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Checklist;
