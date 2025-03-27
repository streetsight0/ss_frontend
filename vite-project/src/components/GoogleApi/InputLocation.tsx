import { SxProps, TextField } from "@mui/material";
import React, { useState,useEffect,useRef } from "react";

interface Location {
  place_id: number;
  name: string;
  display_name:string;
  lat:string;
  lon:string;
  sx?:SxProps
}

interface LocationInputProps {
  onSelectLocation?: (location: string,lat:string,lon:string ,name:string) => void;
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
    // if (!value) {
    //   setSuggestions([]);
    //   return;
    // }
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`
      );
      const data: Location[] = await response.json();
      console.log(data)
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setQuery(value);
  //   fetchLocations(value);
  // };

  const handleSelect = (location: Location) => {
    setQuery(location.display_name);
    setSuggestions([]);
    if (onSelectLocation) onSelectLocation(location.display_name,location.lat,location.lon,location.name);
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "100%" }}>
      <TextField
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter location..."
        sx={{
            width: "38vw",
            borderRadius: "8px",
            fontWeight: "500",
          }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            width: "37vw",
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
