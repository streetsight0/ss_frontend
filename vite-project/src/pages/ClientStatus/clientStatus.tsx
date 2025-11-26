import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/axiosConfig";
import "./clientStatus.css";
import Loader from "../../components/Loader/Loader";
import { useValidToken } from "../../hooks/useValidToken";

interface Client {
  _id: string;
  client_name: string;
  client_email: string;
  company_name: string;
  additional_companies: string[];
  address: string;
  contact: string;
}

interface Campaign {
  _id: string;
  client_id: { _id: string };
  billboards: { _id: string }[];
  campaign_name: string;
}

const ClientTable: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const isTokenValid = useValidToken();

  useEffect(() => {
    if (!isTokenValid) return;
    
    const fetchClients = async () => {
      try {
        const [clientsResponse, campaignsResponse] = await Promise.all([
          apiClient.get("/api/client/getclients"),
          apiClient.get("/api/campaign/getcampaigns"),
        ]);

        if (Array.isArray(clientsResponse.data.data)) {
          setClients(clientsResponse.data.data);
        } else {
          setClients([]);
        }

        if (Array.isArray(campaignsResponse.data.data)) {
          setCampaigns(campaignsResponse.data.data);
        } else {
          setCampaigns([]);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch client data");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [isTokenValid]);

  const handleEdit = (client: Client) => {
    navigate("/editClient", { state: { client } });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(clients) || clients.length === 0) {
    return <p>No clients found.</p>;
  }

  const clientsWithStats = clients.map((client) => {
    const clientCampaigns = campaigns.filter(
      (campaign) => campaign.client_id?._id === client._id
    );
    const billboardCount = clientCampaigns.reduce(
      (count, campaign) => count + campaign.billboards.length,
      0
    );
    const campaignCount = clientCampaigns.length;

    return { ...client, billboardCount, campaignCount };
  });

  return (
    <div className="table-container">
      <h1>Client Status</h1>
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Client Email</th>
            <th>Company Name</th>
            <th>Total Billboards</th>
            <th>Total Campaigns</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {clientsWithStats.map((client) => (
            <tr key={client._id}>
              <td>{client.client_name}</td>
              <td>{client.client_email}</td>
              <td>{client.company_name}</td>
              <td>{client.billboardCount}</td>
              <td>{client.campaignCount}</td>
              <td>
                <button onClick={() => handleEdit(client)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
