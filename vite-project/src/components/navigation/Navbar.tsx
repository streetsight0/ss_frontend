import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, InputBase, Box, Typography } from "@mui/material";
import { Search as SearchIcon, Notifications as NotificationsIcon, AccountCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledSearch = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#F4F4FB",
  padding: "8px 15px",
  borderRadius: "12px",
  width: "750px",
  color: "#7A7A8C",
  height: "36px",
}));

const Navbar: React.FC = () => {

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#FFFFFF",
          boxShadow: "none",
          padding: "10px 20px",
          height: "80px",
          display: "flex",
          justifyContent: "center",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1100,
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Box display="flex" alignItems="center" gap={2} sx={{ marginLeft: "260px" }}>
            <Typography variant="h6" sx={{ color: "#1A1A1A", fontWeight: "500" }}>
              Welcome 👋
            </Typography>
          </Box>

          {/* Search Bar */}
          <StyledSearch>
            <SearchIcon sx={{ marginRight: "8px" }} />
            <InputBase placeholder="Search anything" sx={{ flex: 1 }} />
          </StyledSearch>

          {/* Icons */}
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton>
              <NotificationsIcon sx={{ color: "#1A1A1A" }} />
            </IconButton>
            <IconButton>
              <AccountCircle sx={{ color: "#1A1A1A" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ height: "80px" }} />
    </>
  );
};

export default Navbar;
