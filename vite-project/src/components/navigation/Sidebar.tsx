import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Collapse, Divider, Box } from "@mui/material";
import { Dashboard, ExpandLess, ExpandMore, Business, Campaign, People, Menu as MenuIcon } from "@mui/icons-material"; 
import { styled } from "@mui/material/styles";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/logo1.png";

const drawerWidth = 270;
const collapsedWidth = 60;

interface SidebarDrawerProps {
  open: boolean;
}

const SidebarDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<SidebarDrawerProps>(({ theme, open }) => ({
  width: open ? drawerWidth : collapsedWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : collapsedWidth,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const MainContent = styled("main")<SidebarDrawerProps>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin-left", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: open ? drawerWidth : collapsedWidth, 
}));

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [billboardOpen, setBillboardOpen] = useState(false);
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [clientsOpen, setClientsOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar Drawer */}
      <SidebarDrawer variant="permanent" anchor="left" open={open}>
        {/* Sidebar Header */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
          {open && <img src={logo} alt="Logo" style={{ width: "120px" }} />}
          <IconButton onClick={handleToggle}>
            {open ? <MenuIcon /> : <MenuIcon />} {/* Always shows MenuIcon */}
          </IconButton>
        </Box>
        <Divider />

        {/* Sidebar Menu */}
        <List>
          {/* Dashboard */}
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/home">
              <ListItemIcon><Dashboard /></ListItemIcon>
              {open && <ListItemText primary="Dashboard" />}
            </ListItemButton>
          </ListItem>

          {/* Manage Billboards */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => setBillboardOpen(!billboardOpen)}>
              <ListItemIcon><Business /></ListItemIcon>
              {open && <ListItemText primary="Manage Billboards" />}
              {open && (billboardOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
          <Collapse in={billboardOpen && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="All Billboards" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Add Billboard" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Generate Report" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Manage Campaigns */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => setCampaignOpen(!campaignOpen)}>
              <ListItemIcon><Campaign /></ListItemIcon>
              {open && <ListItemText primary="Manage Campaign" />}
              {open && (campaignOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
          <Collapse in={campaignOpen && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="All Campaigns" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} >
                <ListItemText primary="Add New Campaign" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Manage Clients */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => setClientsOpen(!clientsOpen)}>
              <ListItemIcon><People /></ListItemIcon>
              {open && <ListItemText primary="Manage Clients" />}
              {open && (clientsOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
          <Collapse in={clientsOpen && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="All Clients" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} >
                <ListItemText primary="Add New Client" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Client Status Table" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} >
                <ListItemText primary="Generate Quotation" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Lease Agreement" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Generate Invoice" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </SidebarDrawer>

      {/* Main Content Area (Shifts when sidebar expands/collapses) */}
      <MainContent open={open}>
        <Outlet />
      </MainContent>
    </Box>
  );
};

export default Sidebar;
