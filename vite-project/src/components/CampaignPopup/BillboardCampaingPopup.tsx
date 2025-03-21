import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "../../assets/Icons/CloseBlack.png";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface CampaignPopupProps {
  campaign: any;
  onClose: () => void;
}

const BillboardCampaignPopup: React.FC<CampaignPopupProps> = ({
  campaign,
  onClose,
}) => {
  const [, setLeaseAgreements] = useState<any[]>([]);
  const [matchedLeaseId, setMatchedLeaseId] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch lease agreements
    axios
      .get(`${BASE_URL}/api/leaseagreement/getLeaseAgreements`)
      .then((response) => {
        console.log("Lease Agreements:", response.data);
        setLeaseAgreements(response.data);

        // Extract the client_id from the current campaign
        const clientIdFromCampaign = campaign?.client_id?._id;

        if (clientIdFromCampaign) {
          // Check for matching client_id in lease agreements
          const matchedLease = response.data.find(
            (lease: any) => lease.client?._id === clientIdFromCampaign
          );

          if (matchedLease) {
            setMatchedLeaseId(matchedLease);
            console.log("Matching Client ID:", clientIdFromCampaign);
            console.log("Matched Lease Data:", matchedLease._id);
          } else {
            console.log("No matching client_id found.");
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching lease agreements:", error);
      });
  }, [campaign]);

  if (!campaign) return null;

  // Get the first matched billboard from the campaign
  const matchedBillboard = campaign.billboards?.[0];
  const companyName = campaign;
  console.log(companyName.client_id?._id);
  const client = campaign.client_id;

  // Extract the necessary details from the matched billboard and campaign
  const billboardSeries =
    matchedBillboard?.billboard_series || "Unknown Series";
  const clientName = client?.company_name || "Unknown Client";
  const currentCampaign = campaign.campaign_name || "No Campaign Name";
  const leaseStartDate = matchedBillboard?.leaseEnd
    ? new Date(matchedBillboard.leaseEnd).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Unknown";
  const leaseEndDate = matchedBillboard?.leaseEnd
    ? new Date(matchedBillboard.leaseEnd).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Unknown";
  const pricePerMonth = matchedBillboard?.pricePerMonth || "N/A";
  const size = matchedBillboard?.size || "Unknown Size";

  const handleViewLease = () => {
    if (matchedLeaseId) {
      navigate("/viewLease", { state: { leaseData: matchedLeaseId } });
    } else {
      alert("No matched lease found.");
    }
  };

  return (
    <Dialog
      open={!!campaign}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#fff",
          boxShadow: "none",
          borderRadius: "12px",
          overflow: "hidden",
          color: "white",
        },
      }}
    >
      <DialogContent
        sx={{
          backgroundColor: "#fff",
          color: "#000",
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
        <Typography
          variant="body1"
          sx={{ mb: 1 }}
          style={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          {billboardSeries}
        </Typography>

        <Box display="flex" gap={3}>
          {/* Left Section - Campaign and Billboard Details */}
          <Box flex={1}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
              {currentCampaign}
            </Typography>
            <br />
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Client Name:</strong> <br />
              {clientName}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Lease Period:</strong>
              <br /> {leaseStartDate} to {leaseEndDate}
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Price per month:</strong>
              <br /> ${pricePerMonth}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Size (ft.):</strong> {size} - <br />
              <span style={{ fontStyle: "italic" }}>horizontal</span>
            </Typography>
          </Box>

          <Box
            component="img"
            src={matchedBillboard.billboard_images}
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
        <Box display="flex" justifyContent="space-between" gap={2} mt={3}>
          <div>
            <Button
              label="View Lease"
              onClick={handleViewLease}
              sx={{
                backgroundColor: "#DAF067",
                margin: "20px",
              }}
            />
            <Button
              label="Edit"
              onClick={() => console.log("Delete Campaign Clicked")}
              sx={{
                backgroundColor: "#DAF067",
              }}
            />
          </div>
          <div>
            <Button
              label="Generare Report"
              onClick={() => console.log(matchedBillboard._id)}
              sx={{
                backgroundColor: "#DAF067",
                margin: "20px",
              }}
            />
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BillboardCampaignPopup;
