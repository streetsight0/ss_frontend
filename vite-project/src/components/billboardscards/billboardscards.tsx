import React from "react";
import "./billboardscards.css";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import ProfileIcon from "../../assets/Icons/ProfileBlack.png";
import LocationIcon from "../../assets/Icons/LocationBlack.png";
import Advertise from "../../assets/Icons/AdvertiesmentBlack.png";
import DateIcon from "../../assets/Icons/CalenderBlack.png";
import AddCampaignIcon from "../../assets/Icons/BillboardBlack.png";
interface BillboardCardProps {
  series: string;
  companyName: string;
  campaignName: string;
  location: string;
  leaseExpiry: string;
  status?: string;
  logo: any;
}

const BillboardCard: React.FC<BillboardCardProps> = ({
  series,
  companyName,
  campaignName,
  location,
  leaseExpiry,
  status,
  logo,
}) => {
  // Ensure logo is a string and not an array
  const logoSrc = Array.isArray(logo) ? logo[0] : logo;

  return (
    <Card
      sx={{
        backgroundColor: status === "Active" ? "#F4FFBD" : status === "Inactive" ? "#CCB8FF" : "", 
        width: "420px",
        height: "185px",
        marginTop: "16px",
        borderRadius:"12px",
        marginBottom: "16px",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            src={logoSrc} // Use the fixed logoSrc here
            alt="Company Logo"
            sx={{ width: "33px", height: "22px", borderRadius: "2px" }}
          />
          <Box component="img" src={ProfileIcon} alt="Company" width={18} height={18} />
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "16px",
              color: "#34383E",
              fontFamily: "Poppins",
            }}
          />
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "16px",
              color: "#34383E",
              fontFamily: "Poppins",
            }}
          >
            {companyName}
          </Typography>
        </Box>

        {/* Campaign & Lease Expiry */}
        <Box display="flex" justifyContent="space-between" marginTop="16px">
          <Box display="flex" alignItems="center" gap={1}>
            <Box component="img" src={Advertise} alt="Campaign" width={18} height={18} />
            <Typography variant="body2" color="textSecondary" fontSize="12px">
              {campaignName}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Box component="img" src={DateIcon} alt="Lease Expiry" width={18} height={18} />
            <Typography variant="body2" color="textSecondary" fontSize="12px">
              {leaseExpiry}
            </Typography>
          </Box>
        </Box>

        {/* Location */}
        <Box
         
          display="flex"
         
          alignItems="center"
         
          gap={1}
         
          mt={2}
         
          sx={{ paddingBottom: "6px" }}
        
        >
          <Box component="img" src={LocationIcon} alt="Location" width={18} height={18} />
          <Typography variant="body2" color="textSecondary" fontSize="12px">
            {location}
          </Typography>
        </Box>

        {/* Billboard Series & Status */}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box component="img" src={AddCampaignIcon} alt="Add Campaign" width={18} height={18} />
            <Typography variant="body2" fontSize="14px">{series}</Typography>
          </Box>

          {status && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#E6F4EA", 
                padding: "4px 10px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "500",
                color: "#207D4A", 
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#207D4A",
                  borderRadius: "50%",
                  marginRight: "6px",
                }}
              ></span>
              {status}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BillboardCard;
