import React, { useState } from "react";
import axios from "axios";

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
  const [billboardImages, setBillboardImages] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleBillboard = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("billboard_series", billboard_series);
      formData.append("billboard_type", billboard_type);
      formData.append("location", location);
      formData.append("size", size);
      formData.append("campaignDuration", campaignDuration);
      formData.append("campaignCapacity", campaignCapacity);
      formData.append("leaseStart", leaseStart);
      formData.append("leaseEnd", leaseEnd);
      formData.append("pricePerMonth", pricePerMonth);
      billboardImages.forEach((image) => formData.append("billboard_images", image));

      const response = await axios.post(`${BASE_URL}/api/billboard/createbillboards`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Billboard added successfully!");
      console.log("Response:", response.data);

      setBillboardSeries("");
      setBillboardType("");
      setLocation("");
      setSize("");
      setCampaignDuration("");
      setCampaignCapacity("");
      setLeaseStart("");
      setLeaseEnd("");
      setPricePerMonth("");
      setBillboardImages([]);
    } catch (error: any) {
      console.error("Error details:", error);
      setError(error.response?.data?.error || "Submission failed");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setBillboardImages(Array.from(event.target.files));
    }
  };

  const options = ["Digital Billboard", "Prism Billboard", "Banner Billboard"];
  const durations = ["One Month", "Half Year", "One Year", "Five Years", "More than 5 years"];

  return (
    <div className="billboard-container">
      <div className="billboard-form">
        <h1>Add Billboard</h1>

        <form onSubmit={handleBillboard}>
          <input type="text" value={billboard_series} onChange={(e) => setBillboardSeries(e.target.value)} placeholder="Billboard Series" required />
          <select value={billboard_type} onChange={(e) => setBillboardType(e.target.value)} required>
            <option value="" disabled>Select Billboard Type</option>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
          <input type="text" value={size} onChange={(e) => setSize(e.target.value)} placeholder="Size (e.g., 10x20ft)" required />
          <select value={campaignDuration} onChange={(e) => setCampaignDuration(e.target.value)} required>
            <option value="" disabled>Select Campaign Duration</option>
            {durations.map((duration, index) => (
              <option key={index} value={duration}>{duration}</option>
            ))}
          </select>
          <input type="number" value={campaignCapacity} onChange={(e) => setCampaignCapacity(e.target.value)} placeholder="Campaign Capacity" />
          <label>Lease Start Date:</label>
          <input type="date" value={leaseStart} onChange={(e) => setLeaseStart(e.target.value)} required />
          <label>Lease End Date:</label>
          <input type="date" value={leaseEnd} onChange={(e) => setLeaseEnd(e.target.value)} required />
          <input type="number" value={pricePerMonth} onChange={(e) => setPricePerMonth(e.target.value)} placeholder="Price Per Month" required />
          
          <label>Upload Images:</label>
          <input type="file" multiple onChange={handleImageChange} accept="image/*" />

          <button type="submit">Submit</button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default BillBoard;
