import { useEffect, useState } from "react";
import axios from "axios";
import "./allClients.css"; 

interface BillboardData {
  _id: string;
  company_name: string;
  client_name: string;
  address: string;
  additional_companies: string[];
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AllClients = () => {
  const [billboards, setBillboards] = useState<BillboardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBillboards = async () => {
      try {
        if (!BASE_URL) {
          throw new Error("BASE_URL is not defined. Check your .env file.");
        }
  
        
        const response = await axios.get(`${BASE_URL}/api/client/getclients`);
        
       
        console.log("API Response:", response);
        console.log("API Data:", response.data.data);
  
       
        if (Array.isArray(response.data.data)) {
          setBillboards(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setBillboards([]);  
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to fetch billboards. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchBillboards();
  }, []);
  
  
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!billboards.length) return <p>No clients found.</p>;

  return (
    <div className="all-clients-container">
      <h1 className="clients-title">All Clients</h1>
      <div className="billboard-container">
        {billboards.map((billboard) => (
          <div className="billboard-card" key={billboard._id}>
            <h3>{billboard.company_name}</h3>
            <p><strong>Client Name:</strong> {billboard.client_name}</p>
            <p><strong>Location:</strong> {billboard.address}</p>
            <p><strong>Total Billboards:</strong> {billboard.additional_companies.length}</p>
            <div className="button-group">
              <button className="invoice-btn">View Invoice</button>
              <button className="lease-btn">View Lease agreement</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default AllClients;
