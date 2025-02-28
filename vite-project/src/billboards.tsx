import React, { useEffect, useState } from "react";
import axios from "axios";
import "./billboard.css";

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
  const [allocationType, setAllocationType] = useState("");
  const [campaignName, setCampaignName] = useState("");
  // const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [campaignStartDate, setCampaignStartDate] = useState("");
  const [campaignEndDate, setCampaignEndDate] = useState("");
  const [selectedClient, setSelectedClient] = useState(""); // To store selected client ID
  const [clients, setClients] = useState([]); // To store fetched clients data
  const [clientDetails, setClientDetails] = useState<any>(null); // Store the details of the selected client

  useEffect(() => {
    // Fetch the clients data when component mounts
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/client/getclients`);
        setClients(response.data.data); // Assuming the response has an array of clients
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const clientId = e.target.value;
    setSelectedClient(clientId);

    
    const selectedClientDetails = clients.find((client: any) => client._id === clientId);
    if (selectedClientDetails) {
      setClientDetails(selectedClientDetails); 
      // setCompanyName(selectedClientDetails.company_name); 
      // setClientEmail(selectedClientDetails.client_email); 
    }
  };

  const handleBillboard = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${BASE_URL}/api/billboard/createbillboards`, {
        billboard_series,
        billboard_type,
        location,
        size,
        campaignDuration,
        campaignCapacity,
        leaseStart,
        leaseEnd,
        pricePerMonth,
        allocationType, 
        selectedClient, 
        campaignName, 
        campaignStartDate,
        campaignEndDate,
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
      setAllocationType("");
      setSelectedClient("");
      setCampaignName("");
      setCampaignStartDate("");
      setCampaignEndDate("");
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
            {allocationType === "Client" && (
              <div className="client-fields">
                <select value={selectedClient} onChange={handleClientChange} required>
                  <option value="" disabled>Select Client</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>{client.client_name}</option>
                  ))}
                </select>
                {clientDetails && (
                  <>
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
                  </>
                )}
              </div>
            )}
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
