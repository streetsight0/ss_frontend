import React, { useEffect, useState } from "react";
import apiClient from "../../utils/axiosConfig";
import BillboardCard from "../../components/billboardscards/billboardscards";
import { Box, Pagination, Typography } from "@mui/material";
import "./AvaillableBillboards.css";
import Loader from "../../components/Loader/Loader";
const ITEMS_PER_PAGE = 3; 
interface Billboard {
  _id: string;
  billboard_series: string;
  leaseEnd: string;
  location: {
    name: string;
  };
  billboard_images: string[];
  status: string;
}

const AvailableBillboards: React.FC = () => {
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    Promise.all([
      apiClient.get("/api/billboard/getbillboards"),
      apiClient.get("/api/campaign/getcampaigns"),
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

  // Update the status of the unassigned billboards to "available" in the backend
  useEffect(() => {
    if (unassignedBillboards.length > 0) {
      unassignedBillboards.forEach(async (billboard) => {
        try {
          await apiClient.put(`/api/billboard/updatebillboards/${billboard._id}`, {
            status: "available", // Update status to "available"
          });
        } catch (error) {
          console.error(`Failed to update status for billboard ${billboard._id}:`, error);
        }
      });
      console.log(unassignedBillboards)
    }
  }, [unassignedBillboards]); // This effect runs when the `unassignedBillboards` list changes

  const totalPages = Math.max(1, Math.ceil(unassignedBillboards.length / ITEMS_PER_PAGE));
  const validPage = Math.min(page, totalPages);


  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const paginatedBillboards = unassignedBillboards.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>{error}</div>;
  }

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
                location={billboard.location.name.split(',')[0]}
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

