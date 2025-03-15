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
}

interface Campaign {
  _id: string;
  campaign_name: string;
  campaign_start_date: string;
  campaign_end_date: string;
  campaign_images: string[];
  client_id: string;
  company_name: string;
  billboards: Billboard[];
}

const AvailableBillboards: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [, setLoadingCampaigns] = useState<boolean>(true);
  const [, setLoadingBillboards] = useState<boolean>(true);
  const [, setErrorCampaigns] = useState<string | null>(null);
  const [, setErrorBillboards] = useState<string | null>(null);

  useEffect(() => {
    // Fetch campaigns
    axios
      .get(`${BASE_URL}/api/campaign/getcampaigns`)
      .then((response) => {
        setCampaigns(response.data.data);
        setLoadingCampaigns(false);
        console.log("Fetched Campaigns:", response.data.data);
      })
      .catch((error) => {
        setErrorCampaigns("Error fetching campaigns. Please try again later.");
        setLoadingCampaigns(false);
        console.error(error);
      });

    // Fetch billboards
    axios
      .get(`${BASE_URL}/api/billboard/getbillboards`)
      .then((response) => {
        setBillboards(response.data);
        setLoadingBillboards(false);
      })
      .catch((error) => {
        setErrorBillboards("Error fetching billboards. Please try again later.");
        setLoadingBillboards(false);
        console.error(error);
      });
  }, []);

  // Filter billboards that are NOT in any campaign
  const availableBillboards = billboards.filter((billboard) => {
    return !campaigns.some((campaign) =>
      campaign.billboards.some((campaignBillboard) => campaignBillboard._id === billboard._id)
    );
  });

  return (
    <div className="container">
      <h1>Available Billboards (Not Assigned to any Campaign)</h1>
      <div className="card-container">
        {availableBillboards.length > 0 ? (
          availableBillboards.map((item, index) => (
            <BillboardCard
              key={index}
              series={item.billboard_series}
              companyName="N/A" 
              campaignName="N/A" 
              location={item.location}
              leaseExpiry={item.leaseEnd}
              isAvailable={true} 
            />
          ))
        ) : (
          <p>No available billboards found.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableBillboards;
