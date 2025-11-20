import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import DateIcon from "../../assets/Icons/CalenderBlack.png";
import ProfileIcon from "../../assets/Icons/ProfileBlack.png";
import LocationIcon from "../../assets/Icons/LocationBlack.png";
import BillboardIcon from "../../assets/Icons/BillboardBlack.png";

interface CampaignCardProps {
  title: string;
  company: string;
  location: string;
  endDate: string;
  billboards: number;
  logo: any;
  onClick: () => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  title,
  company,
  location,
  endDate,
  billboards,
  logo,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        maxWidth: 500,
        borderRadius: "16px",
        padding: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #D1C4E9",
        position: "relative",
        overflow: "hidden",
        transition: "0.4s",
        "&:hover": {
          boxShadow: "0px 12px 32px rgba(230, 230, 180, 0.5)",
          background: "linear-gradient(to top, #fffff0, #fdfdf5)",
          transform: "translateY(-5px)",
        },
      }}
    >
      {/* Faded Background Logo */}
      <Box
        component="img"
        src={logo}
        alt=""
        sx={{
          position: "absolute",
          width: 100,
          height: 100,
          right: 40,
          top: 1,
          opacity: 0.08,
          zIndex: 0,
        }}
      />

      <CardContent
        sx={{
          paddingBottom: "16px !important",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5} mb={2}>
          <Box
            component="img"
            src={logo}
            alt="Company Logo"
            width={32}
            height={32}
            sx={{ objectFit: "contain" }}
          />
          <Typography variant="subtitle1" fontWeight={600} color="textPrimary">
            {title}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mb={1.5}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              component="img"
              src={ProfileIcon}
              alt="Company"
              width={18}
              height={18}
            />
            <Typography variant="body2" color="textSecondary">
              {company}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Box
              component="img"
              src={DateIcon}
              alt="End Date"
              width={18}
              height={18}
            />
            <Typography variant="body2" color="textSecondary">
              {endDate}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              component="img"
              src={LocationIcon}
              alt="Location"
              width={18}
              height={18}
            />
            <Typography variant="body2" color="textSecondary">
              {location}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Box
              component="img"
              src={BillboardIcon}
              alt="Billboards"
              width={18}
              height={18}
            />
            <Typography variant="body2" color="textSecondary">
              {billboards} Billboards
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CampaignCard;
