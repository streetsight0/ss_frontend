import { useEffect, useState } from "react";
import axios from "axios";
import ClientCard from "../../components/Card/ClientCard";
import "./allClients.css";
import { useNavigate } from "react-router-dom";
import BillboardConfirmationCard from "../../components/confirmationcard/billboardconfirmationcard";

interface BillboardData {
  _id: string;
  company_name: string;
  client_name: string;
  address: string;
  additional_companies: string[];
  email: string;
  client_logo: string;
  expiryDate: string;
}

interface LeaseAgreement {
  _id: string;
  billboardLocation: string;
  campaignEndDate: string;
  campaignStartDate: string;
  client: {
    _id: string;
    company_name: string;
    client_name: string;
    address: string;
    additional_companies: string[];
    client_email: string;
    client_logo: string;
    contact: string;
  };
}

interface Campaign {
  _id: string;
  client_id: string;
  billboards: { _id: string }[];
  campaign_name: string;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AllClients = () => {
  const [billboards, setBillboards] = useState<BillboardData[]>([]);
  const [leaseAgreements, setLeaseAgreements] = useState<LeaseAgreement[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [noLeaseFound, setNoLeaseFound] = useState<boolean>(false); 
  const [selectedClientName, setSelectedClientName] = useState<string>("");
  const [, setclientCount] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!BASE_URL) {
          throw new Error("BASE_URL is not defined. Check your .env file.");
        }

        const [clientsResponse, leaseResponse, campaignRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/client/getclients`),
          axios.get(`${BASE_URL}/api/leaseagreement/getLeaseAgreements`),
          axios.get(`${BASE_URL}/api/campaign/getcampaigns`),
        ]);

        console.log("Campaigns:", campaignRes.data.data);
        console.log("Clients:", clientsResponse.data.data.length);
        console.log("Leases:", leaseResponse.data);

        setclientCount(clientsResponse.data.length);

        if (Array.isArray(clientsResponse.data.data)) {
          setBillboards(clientsResponse.data.data);
        } else {
          console.error("Unexpected clients response format:", clientsResponse.data);
          setBillboards([]);
        }

        if (Array.isArray(leaseResponse.data)) {
          setLeaseAgreements(leaseResponse.data);
        } else {
          console.error("Unexpected leases response format:", leaseResponse.data);
          setLeaseAgreements([]);
        }

        if (Array.isArray(campaignRes.data.data)) {
          setCampaigns(campaignRes.data.data);
        } else {
          console.error("Unexpected campaign response format:", campaignRes.data);
          setCampaigns([]);
        }
      } catch (err: any) {
        console.error("Fetch Error:", err);
        setError(err.message || "Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewClient = (clientId: string, clientName: string) => {
    
    const matchedLease = leaseAgreements.find((lease) => lease.client?._id === clientId);

    if (matchedLease) {
      console.log("Matched Lease:", matchedLease);
      navigate("/viewLease", { state: { leaseData: matchedLease } });
    } else {
      console.log(`No active lease found for client with ID ${clientId}.`);
      setSelectedClientName(clientName); 
      setNoLeaseFound(true); 
    }
  };

  const handleCloseConfirmation = () => {
    setNoLeaseFound(false); 
  };

 
  const enhancedBillboards = billboards.map((client) => {
    const clientCampaigns = campaigns.filter((campaign) => campaign.client_id?._id === client._id );
    // campaign.client_id === client._id
    const billboardCount = clientCampaigns.reduce((count, campaign) => count + campaign.billboards.length, 0);
    return { ...client, billboardCount };
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!enhancedBillboards.length) return <p>No clients found.</p>;

  return (
    <div className="all-clients-container">
      <h2 className="clients-title">All Clients | {enhancedBillboards.length}</h2>
      <div className="billboard-container">
        {enhancedBillboards.map((billboard) => (
          <ClientCard
            key={billboard._id}
            clientName={billboard.company_name}
            clientEmail={billboard.client_name}
            contractExpiry={billboard.address}
            // remainingDays={billboard.additional_companies.length}
            clientLogo={billboard.client_logo}
            billboardCount={billboard.billboardCount} 
            onViewClient={() => handleViewClient(billboard._id, billboard.company_name)} 
          />
        ))}
      </div>

      {noLeaseFound && (
        <BillboardConfirmationCard
          onCancel={handleCloseConfirmation}
          onConfirm={handleCloseConfirmation}
          alertIcon="⚠️"
          confirmationText={`There is no lease agreement for the client ${selectedClientName}`}
          button2="Close"
        />
      )}
    </div>
  );
};

export default AllClients;
