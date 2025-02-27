import { useEffect, useState } from "react";
import axios from "axios";
import "./allClients.css"; // Import the CSS file

// Define TypeScript interface for API data
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
  
        // Make API call
        const response = await axios.get(`${BASE_URL}/api/client/getclients`);
        
        // Log response for debugging
        console.log("API Response:", response);
        console.log("API Data:", response.data.data);
  
        // Directly set billboards as the response is expected to be an array
        if (Array.isArray(response.data.data)) {
          setBillboards(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setBillboards([]);  // Set empty array if response is not an array
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
    <div className="billboard-container">
      {billboards.map((billboard) => (
        <div className="billboard-card" key={billboard._id}>
          <h3>{billboard.company_name}</h3>
          <p><strong>Client Name:</strong> {billboard.client_name}</p>
          <p><strong>Location:</strong> {billboard.address}</p>
          <p><strong>Total Billboards:</strong> {billboard.additional_companies.length}</p>
          <div className="button-group">
            <button className="edit-btn">View Invoice</button>
            <button className="delete-btn">View Lease Agreement</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllClients;
