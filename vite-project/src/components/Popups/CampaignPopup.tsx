import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "../../assets/Icons/CloseBlack.png"; 
import Button from "../../components/Button/Button"; 

interface CampaignPopupProps {
  campaign: any;
  onClose: () => void;
}

const CampaignPopup: React.FC<CampaignPopupProps> = ({ campaign, onClose }) => {
  if (!campaign) return null;

  return (
    <Dialog
      open={!!campaign}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#333",
          boxShadow: "none",
          borderRadius: "12px",
          overflow: "hidden", 
        },
      }}
    >
      <DialogContent
        sx={{
          backgroundColor: "#333", 
          color: "#fff",
          padding: "20px",
          position: "relative", 
        }}
      >
        {/* Close Icon */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "#fff",
            "&:hover": { opacity: 0.8 }, 
          }}
        >
          <Box
            component="img"
            src={CloseIcon} 
            alt="Close"
            sx={{ width: 24, height: 24 }} 
          />
        </IconButton>

        {/* Top Title */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: "#aaa" }}>
          Campaign Details
        </Typography>

        <Box display="flex" gap={3}>
          {/* Left Section - Campaign Details */}
          <Box flex={1}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
              {campaign.campaign_name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Client Name:</strong> {campaign.client_id?.company_name || "Unknown"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Allotted Billboards:</strong> {campaign.billboards?.join(" | ") || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Duration (start to end):</strong> {new Date(campaign.campaign_start_date).toLocaleString("en-US", {
                month: "short",
                year: "numeric",
              })} to {new Date(campaign.campaign_end_date).toLocaleString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Price per month:</strong> ${campaign.price_per_month}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Location:</strong> {campaign.campaign_location}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Size (ft.):</strong> {campaign.size || "Unknown"} - <span style={{ fontStyle: "italic" }}>horizontal</span>
            </Typography>
          </Box>
          
          <Box
            component="img"
            src={campaign?.billboards?.[0]?.uploadImages?.[0] ?? "/default-billboard.png"}
            alt="Billboard"
            sx={{
              width: 250,
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",
            }}
          />
        </Box>

        {/* Bottom Buttons - Using Your Custom Button Component */}
        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <Button label="Edit Campaign" onClick={() => console.log("Edit Campaign Clicked")} />
          <Button label="Delete Campaign" onClick={() => console.log("Delete Campaign Clicked")} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignPopup;
