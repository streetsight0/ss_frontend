import React from "react";
import { AppBar, Toolbar, IconButton, InputBase, Badge, Box } from "@mui/material";
import { Search as SearchIcon, Notifications as NotificationsIcon, AccountCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledSearch = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#34383E",
  padding: "10px 15px",
  borderRadius: "12px",
  width: "734px",
  height: "38px",
  color: "#FFFFFF",
}));

const Navbar: React.FC = () => {
  return (
    <>
      <AppBar
        position="fixed" 
        sx={{
          backgroundColor: "#212429",
          boxShadow: "none",
          padding: "10px 20px",
          height: "100px", 
          display: "flex",
          justifyContent: "center",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1100,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Box />

          <Box display="flex" alignItems="center" gap={2}>
            <StyledSearch>
              <InputBase placeholder="Global search" sx={{ flex: 1, color: "#FFFFFF" }} />
              <SearchIcon sx={{ color: "#FFFFFF" }} />
            </StyledSearch>
            <IconButton>
              <Badge badgeContent={5} color="error">
                <NotificationsIcon sx={{ color: "#FFFFFF" }} />
              </Badge>
            </IconButton>
            <IconButton>
              <AccountCircle sx={{ color: "#FFFFFF" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ height: "120px" }} />
    </>
  );
};

export default Navbar;


