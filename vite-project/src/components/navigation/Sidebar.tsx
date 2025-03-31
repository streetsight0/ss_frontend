import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Box,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import logo from "../../assets/logo2.png";
import DashboardIcon from "../../assets/Icons/DashboradYellow.png";
import BillboardIcon from "../../assets/Icons/BillboardYellow.png";
import CampaignIcon from "../../assets/Icons/CalenderYellow.png";
import ClientIcon from "../../assets/Icons/ProfileYellow.png";
import ExpandIcon from "../../assets/Icons/ExpandYellow.png";
import TabletLogo from "../../assets/logoTablet.png";
import LogoutYellow from "../../assets/Icons/LogoutYellow.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../../App.css";
import { minHeight } from "@mui/system";

const drawerWidth = 260;
const collapsedWidth = 65;

const SidebarDrawer = styled(Drawer)<{ open: boolean }>(({ open, theme }) => ({
	fontFamily: "Satoshi, sans-serif !important",
	width: open ? drawerWidth : collapsedWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	"& .MuiDrawer-paper": {
	  fontFamily: "Satoshi, sans-serif !important",
	  width: open ? drawerWidth : collapsedWidth,
	  overflowX: "hidden",
    overflowY: "auto",
	  backgroundColor: "#212429",
    borderRadius: "0px 16px 16px 0px",
	  color: "#FFFFFF",
	  transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	  }),
	  paddingLeft: open ? "0px" : "8px", 
    "&::-webkit-scrollbar": {
      width: "0px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "transparent",
    },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
	},
  }));


const StyledListItemButton = styled(ListItemButton)<{ subMenu?: boolean; active?: boolean }>(
  ({ subMenu, active }) => ({
    borderRadius: "7px",
    paddingLeft: subMenu ? "40px" : "24px",
    fontSize: subMenu ? "12px" : "14px",
    backgroundColor: active ? "#DAF067" : "transparent",
    color: active ? "#000000" : "#FFFFFF",
    fontWeight: active ? "bold" : "normal",

    "&:hover": {
      backgroundColor: "#DAF067",  
      color: "#000000",  
    },

    "&:hover .list-item-icon img": {  
      filter: "brightness(0) saturate(100%) contrast(100%)",
    },

    ".MuiListItemIcon-root": {
      minWidth: "40px",
    },
  })
);


const Sidebar: React.FC = () => {
  const navigate = useNavigate(); 
  const [open, setOpen] = useState(true);
  const [billboardOpen, setBillboardOpen] = useState(false);
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [clientsOpen, setClientsOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <SidebarDrawer variant="permanent" anchor="left" open={open}>
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				p: 2,
			}}
			>
		
      {/* Logo */}
      {open ? (
        <img
          src={logo}
          alt="Logo"
          style={{ width: "120px", flexShrink: 0, margin: "10px 10px 0 10px", cursor: "pointer" }}
        />
      ) : (
        <img
          src={TabletLogo}
          alt="Tablet Logo"
          style={{ width: "40px", height: "40px", margin: "10px 10px 0 0", cursor: "pointer" }}
          onClick={handleToggle} 
        />
      )}

			<IconButton
				onClick={handleToggle}
				sx={{
				color: "#C8EB4B",
				"&:hover": { backgroundColor: "rgba(200, 235, 75, 0.2)" },
				}}
			>
				<img
				src={ExpandIcon}
				alt="Expand"
				style={{
					width: "24px",
					height: "24px",
					transform: open ? "rotate(180deg)" : "rotate(0deg)",
					transition: "transform 0.3s ease",
				}}
				/>
			</IconButton>
			</Box>

        <List sx={{ flexGrow: 1 }}>
          {/* Dashboard */}
          <ListItem disablePadding>
          <StyledListItemButton 
            className={location.pathname === "/home" ? "active" : ""}
            active={location.pathname === "/home"}
            onClick={() => navigate("/home")}>

              <ListItemIcon  className="list-item-icon">
                <img src={DashboardIcon} alt="Dashboard" style={{ width: "16px", height:"16px" }} />
              </ListItemIcon>
              {open && <ListItemText primary="Dashboard" />}
            </StyledListItemButton>
          </ListItem>

          {/* Billboards */}
          <ListItem disablePadding>
            <StyledListItemButton 
            onClick={() => setBillboardOpen(!billboardOpen)}>
              <ListItemIcon className="list-item-icon">
                <img src={BillboardIcon} alt="Billboards" style={{width: "16px", height:"16px"}} />
              </ListItemIcon >
              {open && <ListItemText primary="Billboards" />}
              {open && (billboardOpen ? <ExpandLess /> : <ExpandMore />)}
            </StyledListItemButton>
          </ListItem>
          <Collapse in={billboardOpen && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
            <StyledListItemButton 
             className={location.pathname === "/getBillBoards" ? "active" : ""}
             active={location.pathname === "/getBillBoards"}
            onClick={() => navigate("/getBillBoards")}>
                <ListItemText primary="All Billboards" />
              </StyledListItemButton>
			  <StyledListItemButton 
          className={location.pathname === "/billboards" ? "active" : ""}
          active={location.pathname === "/billboards"}
        onClick={() => navigate("/billboards")}>
                <ListItemText primary="Add Billboard" />
              </StyledListItemButton>
              <StyledListItemButton 
               className={location.pathname === "/aipricing" ? "active" : ""}
               active={location.pathname === "/aipricing"}
              onClick={() => navigate("/aipricing")}> 
                <ListItemText primary="AI Price Quotation" />
              </StyledListItemButton>
            </List>
          </Collapse>

          {/* Campaigns */}
          <ListItem disablePadding>
            <StyledListItemButton onClick={() => setCampaignOpen(!campaignOpen)}>
              <ListItemIcon className="list-item-icon">
                <img src={CampaignIcon} alt="Campaigns" style={{ width: "16px", height:"16px" }} />
              </ListItemIcon>
              {open && <ListItemText primary="Campaigns" />}
              {open && (campaignOpen ? <ExpandLess /> : <ExpandMore />)}
            </StyledListItemButton>
          </ListItem>
          <Collapse in={campaignOpen && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
			  <StyledListItemButton 
         className={location.pathname === "/allcampaigns" ? "active" : ""}
         active={location.pathname === "/allcampaigns"}
        onClick={() => navigate("/allcampaigns")}>
                <ListItemText primary="All Campaigns" />
              </StyledListItemButton>
			  <StyledListItemButton
          className={location.pathname === "/addcampaign" ? "active" : ""}
          active={location.pathname === "/addcampaign"}
         onClick={() => navigate("/addcampaign")}>
                <ListItemText primary="Add Campaign" />
              </StyledListItemButton>
            </List>
          </Collapse>

          {/* Clients */}
          <ListItem disablePadding>
            <StyledListItemButton onClick={() => setClientsOpen(!clientsOpen)}>
              <ListItemIcon className="list-item-icon">
                <img src={ClientIcon} alt="Clients" style={{ width: "16px", height:"16px" }} />
              </ListItemIcon>
              {open && <ListItemText primary="Clients" />}
              {open && (clientsOpen ? <ExpandLess /> : <ExpandMore />)}
            </StyledListItemButton>
          </ListItem>
          <Collapse in={clientsOpen && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
			        <StyledListItemButton 
              className={location.pathname === "/getClient" ? "active" : ""}
              active={location.pathname === "/getClient"}
              onClick={() => navigate("/getClient")}>
                <ListItemText primary="All Clients" />
              </StyledListItemButton>
			        <StyledListItemButton 
                className={location.pathname === "/client" ? "active" : ""}
                active={location.pathname === "/client"}
              onClick={() => navigate("/client")}>
                <ListItemText primary="Add New Clients" />
              </StyledListItemButton>
              <StyledListItemButton 
                 className={location.pathname === "/clientStatus" ? "active" : ""}
                 active={location.pathname === "/clientStatus"}
              onClick={() => navigate("/clientStatus")}>
                <ListItemText primary="Client Status Table" />
              </StyledListItemButton>
			        <StyledListItemButton 
               className={location.pathname === "/lease" ? "active" : ""}
               active={location.pathname === "/lease"}
              onClick={() => navigate("/lease")}>
                <ListItemText primary="Lease Agreement" />
              </StyledListItemButton>
			        <StyledListItemButton 
                className={location.pathname === "/invoice" ? "active" : ""}
                active={location.pathname === "/invoice"}
              onClick={() => navigate("/invoice")}>
                <ListItemText primary="Generate Invoice" />
              </StyledListItemButton>
            </List>

         
          </Collapse>
        </List>
        <Box sx={{ mt: "auto", mb: 2 }}>
        <ListItem disablePadding>
          <StyledListItemButton onClick={() => console.log("Logging out...")}>
            <ListItemIcon className="list-item-icon">
              <img src={LogoutYellow} alt="Logout" style={{ width: "16px", height: "16px" }} />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </StyledListItemButton>
        </ListItem>
      </Box>
      </SidebarDrawer>

      {/* Main Content */}
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


