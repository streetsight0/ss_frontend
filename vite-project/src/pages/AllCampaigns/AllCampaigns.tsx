import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Select, MenuItem, Box, CircularProgress, Pagination } from "@mui/material";
import CampaignCard from "../../components/CampaignCard/CampaignCard";
import Button from "../../components/Button/Button";
import AddCampaignIcon from "../../assets/Icons/BillboardBlack.png";
import CampaignPopup from "../../components/Popups/CampaignPopup";
import defaultLogo from "../../assets/Icons/ProfileBlack.png";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const ITEMS_PER_PAGE = 9;

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [page, setPage] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/campaign/getcampaigns`);
        const data = await response.json();
        if (Array.isArray(data.data)) {
          console.log("API Response:", JSON.stringify(data.data, null, 2));
          setCampaigns(data.data);
        } else {
          console.error("Invalid API response", data);
          setCampaigns([]);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />;
  }

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (filter === "active") return new Date(campaign.campaign_end_date) > new Date();
    if (filter === "expired") return new Date(campaign.campaign_end_date) <= new Date();
    return true;
  });

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.campaign_end_date).getTime() - new Date(b.campaign_end_date).getTime();
    }
    if (sortBy === "name") {
      return a.campaign_name.localeCompare(b.campaign_name);
    }
    return 0;
  });

  const paginatedCampaigns = sortedCampaigns.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <Box sx={{ padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          All campaigns | Total {campaigns.length}
        </Typography>
        <Box display="flex" gap={2}>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} size="small">
            <MenuItem value="all">Filter by</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="expired">Expired</MenuItem>
          </Select>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} size="small">
            <MenuItem value="date">Sort by Date</MenuItem>
            <MenuItem value="name">Sort by Name</MenuItem>
          </Select>
          <Button
            label="Add Campaign"
            icon={<img src={AddCampaignIcon} alt="Add Campaign" width={20} height={20} />}
            onClick={() => navigate("/addcampaign")}
            sx={{ backgroundColor: "#C5FF6D", color: "#000" }}
          />
        </Box>
      </Box>
      <Grid container spacing={3}>
        {paginatedCampaigns.length > 0 ? (
          paginatedCampaigns.map((campaign, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CampaignCard
                title={campaign.campaign_name}
                company={campaign.client_id?.company_name || "Unknown Company"}
                location={campaign.campaign_location || "Unknown Location"}
                endDate={new Date(campaign.campaign_end_date).toLocaleDateString()}
                billboards={campaign.billboards?.length || 0}
                logo={campaign.client_id?.client_logo || defaultLogo}
                
                onClick={() => setSelectedCampaign(campaign)}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" textAlign="center" mt={2}>
            No campaigns available.
          </Typography>
        )}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(sortedCampaigns.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={(_event, value) => setPage(value)}
          color="primary"
        />
      </Box>
        {/* Render the popup */}
        {selectedCampaign && (
        <CampaignPopup campaign={selectedCampaign} onClose={() => setSelectedCampaign(null)} />
      )}
    </Box>
    
  );
};

export default CampaignList;


