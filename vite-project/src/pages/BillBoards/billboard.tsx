import { useState } from "react";
import axios from "axios";
// import "./billboard.css";
import CustomButton from "../../components/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import CustomTextField from "../../components/Input field/InputField";
import CustomDropdown from "../../components/DropDown/DropDown";
import ConfirmationCard from "../../components/confirmationcard/confirmationcard";

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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formDataBackup, setFormDataBackup] = useState<any>(null); // Store backup of form data
  const [alertIcon, setAlertIcon] = useState(""); // New state for custom alert icon

  const saveBillboardToBackend = async () => {
    try {
      const formData = new FormData();
      formData.append("billboard_name", billboard_name);
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

      const response = await axios.post(
        `${BASE_URL}/api/billboard/createbillboards`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSuccess("Billboard added successfully!");
      console.log("Response:", response.data);
      resetForm();
    } catch (error: any) {
      console.error("Error details:", error);
      setError(error.response?.data?.error || "Submission failed");
    }
  };

  const resetForm = () => {
    setBillboardName("");
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
  };

  const handleDiscard = () => {
    // Save form data before showing confirmation
    setFormDataBackup({
      billboard_name,
      billboard_series,
      billboard_type,
      location,
      size,
      campaignDuration,
      campaignCapacity,
      leaseStart,
      leaseEnd,
      pricePerMonth,
      billboardImages,
      alertIcon, // Include alert icon in backup
    });
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    // Restore the backup of the form data
    if (formDataBackup) {
      setBillboardName(formDataBackup.billboard_name);
      setBillboardSeries(formDataBackup.billboard_series);
      setBillboardType(formDataBackup.billboard_type);
      setLocation(formDataBackup.location);
      setSize(formDataBackup.size);
      setCampaignDuration(formDataBackup.campaignDuration);
      setCampaignCapacity(formDataBackup.campaignCapacity);
      setLeaseStart(formDataBackup.leaseStart);
      setLeaseEnd(formDataBackup.leaseEnd);
      setPricePerMonth(formDataBackup.pricePerMonth);
      setBillboardImages(formDataBackup.billboardImages);
      setAlertIcon(formDataBackup.alertIcon); // Restore alert icon
    }
    setShowConfirmation(false);
  };

  return (
    <div className="billboard-container">
      {showConfirmation ? (
        <ConfirmationCard
          onCancel={handleCancel}
          onConfirm={() => {
            saveBillboardToBackend();
            setShowConfirmation(false);
          }}
          alertIcon={alertIcon} // Pass the user-selected alert icon
        />
      ) : (
        <div className="billboard-form">
          <h1>Add Billboard</h1>

          <form>
            <CustomTextField label="Billboard Name" value={billboard_name} onChange={(e) => setBillboardName(e.target.value)} required />
            <CustomTextField value={billboard_series} onChange={(e) => setBillboardSeries(e.target.value)} label="Billboard Series" required />

            <CustomDropdown options={["Digital Billboard", "Prism Billboard", "Banner Billboard"]} label="Billboard Type"  onChange={setBillboardType} />

            <CustomTextField value={location} onChange={(e) => setLocation(e.target.value)} label="Location" required />
            <CustomTextField value={size} onChange={(e) => setSize(e.target.value)} label="Size (e.g., 10x20ft)" required />
            <CustomTextField type="number" value={campaignCapacity} onChange={(e) => setCampaignCapacity(e.target.value)} label="Campaign Capacity" />

            <CustomTextField type="date" value={leaseStart} onChange={(e) => setLeaseStart(e.target.value)} required label="Lease Start Date" />
            <CustomTextField type="date" value={leaseEnd} onChange={(e) => setLeaseEnd(e.target.value)} required label="Lease End Date" />
            <CustomTextField type="number" value={pricePerMonth} onChange={(e) => setPricePerMonth(e.target.value)} label="Price Per Month" required />

            <label>Upload Images:</label>
            <input type="file" multiple onChange={(e) => setBillboardImages(Array.from(e.target.files || []))} accept="image/*" />

            {/* New input for selecting alert icon */}
            <CustomTextField 
              label="Alert Icon (e.g., 🔔, ⚠️)" 
              value={alertIcon} 
              onChange={(e) => setAlertIcon(e.target.value)} 
            />

            <div className="button-group">
              <CustomButton label="Submit" icon={<AddIcon />} onClick={saveBillboardToBackend} />
              <CustomButton label="Discard" onClick={handleDiscard} />
            </div>
          </form>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </div>
      )}
    </div>
  );
};

export default BillBoard;
