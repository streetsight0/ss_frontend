import React, { useEffect, useState } from "react";
import axios from "axios";
import BillboardCard from "../../components/billboardscards/billboardscards";
import BillboardCampaignPopup from "../../components/CampaignPopup/BillboardCampaingPopup";
import {
  Box,
  CircularProgress,
  Pagination,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import "./AllBillBoards.css";
import AddCampaignIcon from "../../assets/Icons/BillboardBlack.png";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ITEMS_PER_PAGE = 9;

interface Billboard {
  _id: string;
  billboard_series: string;
  leaseEnd: string;
  location: string;
  billboard_images: [];
}

interface Campaign {
  _id: string;
  campaign_name: string;
  campaign_start_date: string;
  campaign_end_date: string;
  campaign_images: string[];
  client_id: {
    company_name: string;
    additional_companies: string[];
    address: string;
    client_email: string;
    client_logo: string;
    client_name: string;
    contact: string;
    _id: string;
  } | null;
  billboards: Billboard[];
}

const CampaignsBillboards: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(true);
  const [loadingBillboards, setLoadingBillboards] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const [page, setPage] = useState<number>(1);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/campaign/getcampaigns`)
      .then((response) => {
        setCampaigns(response.data.data);
        setLoadingCampaigns(false);
      })
      .catch((error) => {
        setLoadingCampaigns(false);
        console.error("Error fetching campaigns:", error);
      });

    axios
      .get(`${BASE_URL}/api/billboard/getbillboards`)
      .then((response) => {
        setBillboards(response.data);
        setLoadingBillboards(false);
      })
      .catch((error) => {
        setLoadingBillboards(false);
        console.error("Error fetching billboards:", error);
      });
  }, []);

  const getStatus = (leaseEnd: string) => {
    const leaseEndDate = new Date(leaseEnd);
    const currentDate = new Date();
    return currentDate > leaseEndDate ? "Inactive" : "Active";
  };

  const matchedBillboards = campaigns.flatMap((campaign) =>
    campaign.billboards
      .filter((campaignBillboard) =>
        billboards.some((billboard) => billboard._id === campaignBillboard._id)
      )
      .map((matchedBillboard) => {
      
        const companyName = campaign.client_id
        
          ? campaign.client_id.company_name
          : "Unknown Company";
        const status = getStatus(matchedBillboard.leaseEnd);

        return {
        
          campaign_name: campaign.campaign_name,
          campaign_id: campaign._id,
          company_name: companyName,
          client:campaign.client_id?._id,
          billboard_id: matchedBillboard._id,
          billboard_series: matchedBillboard.billboard_series,
          billboard_LeaseEnd: matchedBillboard.leaseEnd,
          billboard_Location: matchedBillboard.location,
          billboard_images:matchedBillboard.billboard_images,
          status,
          campaign,
        };
      })
  );

  const filteredBillboards = matchedBillboards.filter((item) => {
    if (filter === "active") return item.status === "Active";
    if (filter === "expired") return item.status === "Inactive";
    return true;
  });

  const sortedBillboards = [...filteredBillboards].sort((a, b) => {
    if (sortBy === "date") {
      return (
        new Date(a.billboard_LeaseEnd).getTime() -
        new Date(b.billboard_LeaseEnd).getTime()
      );
    }
    if (sortBy === "name") {
      return a.billboard_series.localeCompare(b.billboard_series);
    }
    return 0;
  });

  const paginatedBillboards = sortedBillboards.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (loadingCampaigns || loadingBillboards) {
    return (
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />
    );
  }

  return (
    <Box sx={{  }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
        Matched Billboards and Campaigns | Total {matchedBillboards.length}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" gap={2}>
            <Select
              value={filter}
              style={{width:"97",height:"23"}}
              onChange={(e) => setFilter(e.target.value)}
              size="small"
            >
              <MenuItem value="all">Filter by</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="expired">Expired</MenuItem>
            </Select>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              size="small"
            >
              <MenuItem value="date">Sort by Date</MenuItem>
              <MenuItem value="name">Sort by Name</MenuItem>
            </Select>
            <Button
              label="Add Billboard"
              icon={
                <img
                  src={AddCampaignIcon}
                  alt="Add Campaign"
                  width={20}
                  height={20}
                />
              }
              onClick={() => navigate("/billboards")}
              sx={{ backgroundColor: "#C5FF6D", color: "#000",width:"160px",height:"50px" }}
            />
          </Box>
        </Box>
      </Box>

      <div className="card-container">
        {paginatedBillboards.length > 0 ? (
          paginatedBillboards.map((item, index) => (
            <div
              key={index}
              className={`card ${item.status.toLowerCase()}`}
              style={
                item.status === "Active"
                  ? { backgroundColor: "#F4FFBD" }
                  : { backgroundColor: "#CCB8FF" }
              }
              onClick={() => setSelectedCampaign(item.campaign)}
            >
              <BillboardCard
                logo={item.billboard_images}
                series={item.billboard_series}
                companyName={item.company_name}
                campaignName={item.campaign_name}
                location={item.billboard_Location}
                leaseExpiry={item.billboard_LeaseEnd}
                status={item.status}
              />
            </div>
          ))
        ) : (
          <Typography variant="body1" textAlign="center" mt={2}>
            No matched billboards found.
          </Typography>
        )}
      </div>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(sortedBillboards.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={(_event, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {/* Popup for selected campaign */}
      {selectedCampaign && (
        <BillboardCampaignPopup
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </Box>
  );
};

export default CampaignsBillboards;
