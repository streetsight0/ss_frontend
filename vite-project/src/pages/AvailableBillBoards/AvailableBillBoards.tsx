import React, { useEffect, useState } from "react";
import axios from "axios";
import BillboardCard from "../../components/billboardscards/billboardscards";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import "./AvaillableBillboards.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ITEMS_PER_PAGE = 3; 

interface Billboard {
  _id: string;
  billboard_series: string;
  leaseEnd: string;
  location: string;
  billboard_images: string[];
}

const AvailableBillboards: React.FC = () => {
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    Promise.all([
      axios.get(`${BASE_URL}/api/billboard/getbillboards`),
      axios.get(`${BASE_URL}/api/campaign/getcampaigns`),
    ])
      .then(([billboardRes, campaignRes]) => {
        setBillboards(billboardRes.data);
        setCampaigns(campaignRes.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      });
  }, []);


  const unassignedBillboards = billboards.filter(
    (billboard) =>
      !campaigns.some((campaign) =>
        campaign.billboards.some(
          (campaignBillboard: Billboard) => campaignBillboard._id === billboard._id
        )
      )
  );

  
  const totalPages = Math.max(1, Math.ceil(unassignedBillboards.length / ITEMS_PER_PAGE));
  const validPage = Math.min(page, totalPages);


  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const paginatedBillboards = unassignedBillboards.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="available_container">
      <h1>Unassigned Billboards</h1>
      <div className="available_card-container">
        {paginatedBillboards.length > 0 ? (
          paginatedBillboards.map((billboard) => (
            <div key={billboard._id} className="available_card">
              <BillboardCard
                logo={billboard.billboard_images.length > 0 ? billboard.billboard_images[0] : ""}
                series={billboard.billboard_series}
                companyName="Unassigned"
                campaignName="No Campaign"
                location={billboard.location}
                leaseExpiry={billboard.leaseEnd}
                status="Available"
              />
            </div>
          ))
        ) : (
          <Typography variant="body1" textAlign="center" mt={2}>
            No billboards available on this page.
          </Typography>
        )}
      </div>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={validPage}
          onChange={(_event, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default AvailableBillboards;
