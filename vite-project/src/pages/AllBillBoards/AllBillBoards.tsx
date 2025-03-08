import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllBillBoards.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Billboard {
  _id: string;
  billboard_series: string;
  leaseEnd: string;
  location:string;
}

interface Campaign {
  _id: string;
  campaign_name: string;
  campaign_start_date: string;
  campaign_end_date: string;
  campaign_images: string[];
  client_id: string;
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

  const getStatus = (leaseEnd: string, campaignEndDate: string) => {
    const leaseEndDate = new Date(leaseEnd);
    const campaignEndDateObj = new Date(campaignEndDate);
    const currentDate = new Date();

    if (leaseEndDate > currentDate) {
      return "Active";
    } else if (campaignEndDateObj > currentDate) {
      return "Billboard Active";
    } else if (campaignEndDateObj < currentDate) {
      return "Campaign Active";
    } else {
      return "Inactive";
    }
  };

  const matchedBillboards = campaigns.flatMap((campaign) =>
    campaign.billboards
      .filter((campaignBillboard) =>
        billboards.some((billboard) => billboard._id === campaignBillboard._id)
      )
      .map((matchedBillboard) => ({
        campaign_name: campaign.campaign_name,
        billboard_id: matchedBillboard._id,
        billboard_series: matchedBillboard.billboard_series,
        billboard_LeaseEnd: matchedBillboard.leaseEnd,
        billboard_Location: matchedBillboard.location,
        status: getStatus(matchedBillboard.leaseEnd, campaign.campaign_end_date),
      }))
  );

  return (
    <div className="container">
      <h1>Matched Billboards and Campaigns</h1>
      <div className="card-container">
        {matchedBillboards.length > 0 ? (
          matchedBillboards.map((item, index) => (
            <div className="card" key={index}>
              <div className="card-header">
                <h3>{item.campaign_name} <span className={`status ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>{item.status}</span></h3>
              </div>
              <div className="card-body">
                <p><strong>Billboard Series:</strong> {item.billboard_series}</p>
                <p><strong>Lease End:</strong> {item.billboard_LeaseEnd}</p>
                <p><strong>Billboard Location:</strong> {item.billboard_Location}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No matched billboards found.</p>
        )}
      </div>
    </div>
  );
};

export default CampaignsBillboards;
