import React from "react";
import { AppBar, Toolbar, IconButton, InputBase, Badge, Box } from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon, Notifications as NotificationsIcon, AccountCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";


const StyledSearch = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f1f1f1",
  padding: "6px 12px",
  borderRadius: "30px",
  width: "600px", 
  marginTop:"20px"
}));

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "lightgray", boxShadow: "none", height:"80px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left - Menu Toggle Button */}
        <IconButton>
          <MenuIcon sx={{ color: "black" }} />
        </IconButton>

        {/* Center - Search Bar with Notifications and Profile */}
        <Box display="flex" alignItems="left" gap={2}>
          <StyledSearch>
            <InputBase placeholder="Global search" sx={{ flex: 1 }} />
            <SearchIcon sx={{ color: "gray" }} />
          </StyledSearch>
          <IconButton>
            <Badge badgeContent={5} color="error" sx={{ mt: 2 }} >
              <NotificationsIcon sx={{ color: "black" }} />
            </Badge>
          </IconButton>
          <IconButton>
            <AccountCircle sx={{ color: "black", marginTop:"12px"}} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
