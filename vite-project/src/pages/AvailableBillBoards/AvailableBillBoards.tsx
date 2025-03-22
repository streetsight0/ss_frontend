import React, { useEffect, useState } from "react";
import axios from "axios";
import BillboardCard from "../../components/billboardscards/billboardscards";
import "./AvaillableBillboards.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Billboard {
  _id: string;
  billboard_series: string;
  leaseEnd: string;
  location: string;
  billboard_images: [];
}

const AvailableBillboards: React.FC = () => {
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    (billboard) => !campaigns.some((campaign) =>
      campaign.billboards.some((campaignBillboard: Billboard) => campaignBillboard._id === billboard._id)
    )
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="available_container">
      <h1>Unassigned Billboards</h1>
      <div className="available_card-container">
        {unassignedBillboards.length > 0 ? (
          unassignedBillboards.map((billboard, index) => (
            <div key={index} className="available_card">
              <BillboardCard
              logo={billboard.billboard_images}
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
          <p>No unassigned billboards found.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableBillboards;
