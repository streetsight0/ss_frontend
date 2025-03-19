import React, { useEffect, useState } from "react";
import axios from "axios";
import BillboardCard from "../../components/billboardscards/billboardscards";
import "./AllBillBoards.css"; // Assuming this is the CSS file

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
  company_name: string; // Assuming the company_name is inside Campaign object
  billboards: Billboard[];
}

const CampaignsBillboards: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [, setLoadingCampaigns] = useState<boolean>(true);
  const [, setLoadingBillboards] = useState<boolean>(true);
  const [, setErrorCampaigns] = useState<string | null>(null);
  const [, setErrorBillboards] = useState<string | null>(null);

  useEffect(() => {
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

  const getStatus = (leaseEnd: string) => {
    const leaseEndDate = new Date(leaseEnd);
    // const campaignEndDateObj = new Date(campaignEndDate);
    const currentDate = new Date();

    return leaseEndDate > currentDate ? "Active" : "Inactive";
  };

  const matchedBillboards = campaigns.flatMap((campaign) =>
    campaign.billboards
      .filter((campaignBillboard) =>
        billboards.some((billboard) => billboard._id === campaignBillboard._id)
      )
      .map((matchedBillboard) => {
        console.log("Company Name:", campaign.company_name);
        return {
          campaign_name: campaign.campaign_name,
          company_name: campaign.company_name, // Use company_name from campaign
          billboard_id: matchedBillboard._id,
          billboard_series: matchedBillboard.billboard_series,
          billboard_LeaseEnd: matchedBillboard.leaseEnd,
          billboard_Location: matchedBillboard.location,
          status: getStatus(matchedBillboard.leaseEnd),
        };
      })
  );

  return (
    <div className="container">
      <h1>Matched Billboards and Campaigns</h1>
      <div className="card-container">
        {matchedBillboards.length > 0 ? (
          matchedBillboards.map((item, index) => (
            <BillboardCard
              key={index}
              series={item.billboard_series}
              companyName={item.company_name}
              campaignName={item.campaign_name}
              location={item.billboard_Location}
              leaseExpiry={item.billboard_LeaseEnd}
            />
          ))
        ) : (
          <p>No matched billboards found.</p>
        )}
      </div>
    </div>
  );
};

export default CampaignsBillboards;
