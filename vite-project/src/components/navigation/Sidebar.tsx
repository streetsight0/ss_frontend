import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Collapse, Box } from "@mui/material";
import { Dashboard, ExpandLess, ExpandMore, Close, Business, Campaign, People } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import {NavLink, Outlet} from "react-router-dom";
import logo from "../../assets/logo1.png";

const drawerWidth = 260;
const collapsedWidth = 60; 
let SidebarDrawer: any;

SidebarDrawer = styled(Drawer)(({ theme, open }: { theme: any; open: boolean }) => ({
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

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [billboardOpen, setBillboardOpen] = useState(false);
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [clientsOpen, setClientsOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
		<>
			{/* Sidebar Drawer */}
			<SidebarDrawer variant="permanent" anchor="left" open={open}>
				{/* Sidebar Header */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						p: 2,
					}}
				>
					{open && <img src={logo} alt="Logo" style={{ width: "120px" }} />}
					<IconButton onClick={handleToggle}>
						<Close />
					</IconButton>
				</Box>
				{/* Sidebar Menu */}
				<List>
					{/* Dashboard */}
					<ListItem disablePadding>
						<ListItemButton component={NavLink} to="/home">
							<ListItemIcon>
								<Dashboard />
							</ListItemIcon>
							{open && <ListItemText primary="Dashboard" />}
						</ListItemButton>
					</ListItem>

          {/* Manage Billboards */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => setBillboardOpen(!billboardOpen)}>
              <ListItemIcon>
                <Business />
              </ListItemIcon>
              {open && <ListItemText primary="Manage Billboards" />}
              {open && (billboardOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
          <Collapse in={billboardOpen && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton component={NavLink} to="/getBillBoards" sx={{ pl: 4 }}>
                <ListItemText primary="All Billboards" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={NavLink} to="/billboards">
                <ListItemText primary="Add Billboard"  />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Generate Report" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Manage Campaign */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => setCampaignOpen(!campaignOpen)}>
              <ListItemIcon>
                <Campaign />
              </ListItemIcon>
              {open && <ListItemText primary="Manage Campaign" />}
              {open && (campaignOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
          <Collapse in={campaignOpen && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="All Campaigns" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}  component={NavLink} to="/AddCampaign">
                <ListItemText primary="Add New Campaign" />
              </ListItemButton>
            </List>
          </Collapse>

					{/* Manage Clients */}
					<ListItem disablePadding>
						<ListItemButton onClick={() => setClientsOpen(!clientsOpen)}>
							<ListItemIcon>
								<People />
							</ListItemIcon>
							{open && <ListItemText primary="Manage Clients" />}
							{open && (clientsOpen ? <ExpandLess /> : <ExpandMore />)}
						</ListItemButton>
					</ListItem>
					<Collapse in={clientsOpen && open} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItemButton component={NavLink} to="/getClient" sx={{ pl: 4 }}>
								<ListItemText primary="All Clients" />
							</ListItemButton>
							<ListItemButton component={NavLink} to="/client" sx={{ pl: 4 }}>
								<ListItemText primary="Add New Client" />
							</ListItemButton>
              <ListItemButton component={NavLink} to="/clientStatus" sx={{ pl: 4 }}>
                <ListItemText primary="Client Status table" />
              </ListItemButton>
							<ListItemButton sx={{ pl: 4 }}>
								<ListItemText primary="Generate Quotation" />
							</ListItemButton>
							<ListItemButton sx={{ pl: 4 }} component={NavLink} to="/lease">
								<ListItemText primary="Lease Agreement" />
							</ListItemButton>
							<ListItemButton component={NavLink} to="/invoice" sx={{ pl: 4 }}>
								<ListItemText primary="Generate Invoice" />
							</ListItemButton>
						</List>
					</Collapse>
				</List>
			</SidebarDrawer>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					marginLeft: open ? `${drawerWidth}px` : `${collapsedWidth}px`,
					transition: "margin 0.3s ease",
					p: 2,
				}}
			>
				<Outlet />
			</Box>
		</>
	);
};

export default Sidebar;


