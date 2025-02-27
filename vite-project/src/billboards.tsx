import React, { useEffect, useState } from "react";
import axios from "axios";
import "./billboard.css"

const BASE_URL = import.meta.env.VITE_BASE_URL;

const BillBoard = () => {
  const [billboard_series, setBillboardSeries] = useState("");
  const [billboard_type, setBillboardType] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [campaignDuration, setCampaignDuration] = useState("");
  const [campaignCapacity, setCampaignCapacity] = useState("");
  const [leaseStart, setLeaseStart] = useState("");
  const [leaseEnd, setLeaseEnd] = useState("");
  const [pricePerMonth, setPricePerMonth] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [allocationType,setAllocationType] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const[,setClientName] = useState("");
  const[companyName,setCompanyName] = useState("");
  const[clientEmail,setClientEmail] = useState("");
  const[campaignStartDate,setCampaignStartDate] = useState("");
  const[campaignEndDate,setCampaignEndDate] = useState("");

//   For storing the clients
const [clients,SetClient] = useState<any[]>([]);
const [selectedClient,setSelectedClient] = useState<string>("");

useEffect(()=>{
axios.get(`${BASE_URL}/api/client/clients`).then((response)=>{SetClient(response.data);
    console.log(response.data)

}).catch((error)=>{
    console.log(error);
})
},[])

const handleClientChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    const selectedClientName = e.target.value;
    
    setSelectedClient(selectedClientName);

    const selectedClient = clients.find(
      (client) => client.name === selectedClientName
    );
    if (selectedClient) {
      setClientName(selectedClient.client_name);
      setCompanyName(selectedClient.businessName);
      setClientEmail(selectedClient.email);
    }
  };



  const handleBillboard = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${BASE_URL}/api/billboard/billboards`, {
        billboard_series,
        billboard_type,
        location,
        size,
        campaignDuration,
        campaignCapacity,
        leaseStart,
        leaseEnd,
        pricePerMonth,
      });

      setSuccess("Billboard added successfully!");
      console.log("Response:", response.data);

      // Clear form fields
      setBillboardSeries("");
      setBillboardType("");
      setLocation("");
      setSize("");
      setCampaignDuration("");
      setCampaignCapacity("");
      setLeaseStart("");
      setLeaseEnd("");
      setPricePerMonth("");
    } catch (error: any) {
      setError(error.response?.data?.error || "Submission failed");
    }
  };

  const options = ["Digital Billboard", "Prism Billboard", "Banner Billboard"];
  const durations = ["One Month", "Half Year", "One Year", "Five Years", "More than 5 years"];

  return (
    <div className="billboard-container">
      <div className="billboard-form">
        <h1>Add Billboard</h1>

        <form onSubmit={handleBillboard}>
          <input
            type="text"
            value={billboard_series}
            onChange={(e) => setBillboardSeries(e.target.value)}
            placeholder="Billboard Series"
            required
          />

          <select value={billboard_type} onChange={(e) => setBillboardType(e.target.value)} required>
            <option value="" disabled>Select Billboard Type</option>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            required
          />

          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Size (e.g., 10x20ft)"
            required
          />

          <select value={campaignDuration} onChange={(e) => setCampaignDuration(e.target.value)} required>
            <option value="" disabled>Select Campaign Duration</option>
            {durations.map((duration, index) => (
              <option key={index} value={duration}>{duration}</option>
            ))}
          </select>

          <input
            type="number"
            value={campaignCapacity}
            onChange={(e) => setCampaignCapacity(e.target.value)}
            placeholder="Campaign Capacity"
          />

          <label>Lease Start Date:</label>
          <input
            type="date"
            value={leaseStart}
            onChange={(e) => setLeaseStart(e.target.value)}
            required
          />

          <label>Lease End Date:</label>
          <input
            type="date"
            value={leaseEnd}
            onChange={(e) => setLeaseEnd(e.target.value)}
            required
          />

          <input
            type="number"
            value={pricePerMonth}
            onChange={(e) => setPricePerMonth(e.target.value)}
            placeholder="Price Per Month"
            required
          />

            {/* Radio Buttons for Allocation */}
          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                name="allocationType"
                value="Client"
                checked={allocationType === "Client"}
                onChange={(e) => setAllocationType(e.target.value)}
              />
              Allot to Client
            </label>
            <label>
              <input
                type="radio"
                name="allocationType"
                value="Campaign"
                checked={allocationType === "Campaign"}
                onChange={(e) => setAllocationType(e.target.value)}
              />
              Allot to Campaign
            </label>
          </div>

          {/* Conditional Fields for Client Allocation */}
          {allocationType === "Client" && (
            <div className="client-fields">
             <select value={selectedClient} onChange={handleClientChange} required></select>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company Name"
                required
              />
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="Client Email"
                required
              />
            </div>
          )}

          {/* Conditional Fields for Campaign Allocation */}
          {allocationType === "Campaign" && (
            <div className="campaign-fields">
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Campaign Name"
                required
              />
              <input
                type="date"
                value={campaignStartDate}
                onChange={(e) => setCampaignStartDate(e.target.value)}
                placeholder="Campaign Start Date"
                required
              />
              <input
                type="date"
                value={campaignEndDate}
                onChange={(e) => setCampaignEndDate(e.target.value)}
                placeholder="Campaign End Date"
                required
              />
            </div>
          )}

          <button type="submit">Submit</button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>

    </div>
  );
};

export default BillBoard;
