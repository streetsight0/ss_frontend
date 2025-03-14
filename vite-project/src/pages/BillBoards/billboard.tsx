import React, { useState } from "react";
import axios from "axios";
import "./billboard.css";
import CustomButton from "../../components/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import CustomTextField from "../../components/Input field/InputField";
import CustomDropdown from "../../components/DropDown/DropDown";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const BillBoard = () => {
  const [billboard_name, setBillboardName] = useState("");
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
      formData.append("billboard_Name", billboard_name);
      formData.append("billboard_series", billboard_series);
      formData.append("billboard_type", billboard_type); // Ensure this is correctly appended
      formData.append("location", location);
      formData.append("size", size);
      formData.append("campaignDuration", campaignDuration);
      formData.append("campaignCapacity", campaignCapacity);
      formData.append("leaseStart", leaseStart);
      formData.append("leaseEnd", leaseEnd);
      formData.append("pricePerMonth", pricePerMonth);
      billboardImages.forEach((image) =>
        formData.append("billboard_images", image)
      );

      const response = await axios.post(
        `${BASE_URL}/api/billboard/createbillboards`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Billboard added successfully!");
      console.log("Response:", response.data);
      setBillboardName("");
      setBillboardSeries("");
      setBillboardType(""); // Reset the type field
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
  const durations = [
    "One Month",
    "Half Year",
    "One Year",
    "Five Years",
    "More than 5 years",
  ];

  return (
    <div className="billboard-container">
      <div className="billboard-form">
        <h1>Add Billboard</h1>

        <form onSubmit={handleBillboard}>
          <CustomTextField
            label="Billboard Name"
            value={billboard_name}
            onChange={(e) => setBillboardName(e.target.value)} // Update state for Billboard Name
            required
          />
          <CustomTextField
            value={billboard_series}
            onChange={(e) => setBillboardSeries(e.target.value)}
            label="Billboard Series"
            required
          />

          {/* Ensure the onChange is correctly passing the value to state */}
          <CustomDropdown
            options={options}
            label="Billboard Type"
            onChange={(e) => setBillboardType(e.target.value)} // Correctly update the state
          />

          <CustomTextField
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="Location"
            required
          />
          <CustomTextField
            value={size}
            onChange={(e) => setSize(e.target.value)}
            label="Size (e.g., 10x20ft)"
            required
          />

          <CustomDropdown
            options={durations}
            label="Campaign Duration"
            onChange={(e) => setCampaignDuration(e.target.value)} // Use the same pattern here
          />

          <CustomTextField
            type="number"
            value={campaignCapacity}
            onChange={(e) => setCampaignCapacity(e.target.value)}
            label="Campaign Capacity"
          />

          <label>Lease Start Date:</label>
          <CustomTextField
            type="date"
            value={leaseStart}
            onChange={(e) => setLeaseStart(e.target.value)}
            required
          />
          <label>Lease End Date:</label>
          <CustomTextField
            type="date"
            value={leaseEnd}
            onChange={(e) => setLeaseEnd(e.target.value)}
            required
          />
          <CustomTextField
            type="number"
            value={pricePerMonth}
            onChange={(e) => setPricePerMonth(e.target.value)}
            label="Price Per Month"
            required
          />

          <label>Upload Images:</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/*"
          />

          <CustomButton
            label="Submit"
            icon={<AddIcon />}
            onClick={handleBillboard}
          />
        </form>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default BillBoard;
