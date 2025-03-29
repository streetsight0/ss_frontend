import { TextField, InputAdornment } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface Location {
  place_id: number;
  name: string;
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationInputProps {
  onSelectLocation?: (location: string, lat: string, lon: string, name: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onSelectLocation }) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const handler = setTimeout(()=>{
      if(query) fetchLocations(query);
    },300);
    return ()=> clearTimeout(handler);
  },[query]);

  const fetchLocations = async (value: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`
      );
      const data: Location[] = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleSelect = (location: Location) => {
    setQuery(location.display_name);
    setSuggestions([]);
    if (onSelectLocation) onSelectLocation(location.display_name,location.lat,location.lon,location.name);
  };

  return (
    <div ref={dropdownRef} >
   

      <TextField
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter location..."
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ArrowDropDownIcon sx={{ color: "rgba(168, 85, 247, 1)" }} />
            </InputAdornment>
          ),
          sx: {
            bgcolor: "white",
            borderRadius: "8px",
            "& fieldset": { border: "none" },
            borderBottom: "3px solid rgba(168, 85, 247, 1)",
            height: 45,
            width:"38vw",
            marginTop:"10px"
          },
        }}
        InputLabelProps={{
          shrink: true,
          sx: {
            fontSize: "16px",
            color: "black",
            fontFamily: "Poppins, sans-serif !important",
          },
        }}
        sx={{
          width: "500px", // Increased width
          fontFamily: "Poppins, sans-serif",
          "& .MuiInputBase-input": {
            padding: "16px",
            color: "black",
            fontFamily: "Poppins, sans-serif !important",
          },
        }}
      />
      
      {/* Location Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            width: "100%",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            listStyle: "none",
            padding: "5px",
            margin: 0,
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSelect(item)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
              }}
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
