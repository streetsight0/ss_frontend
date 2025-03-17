import { useState, useEffect } from "react";
import axios from "axios";
import CustomButton from "../../components/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import CustomTextField from "../../components/Input field/InputField";
import CustomDropdown from "../../components/DropDown/DropDown";
import ConfirmationCard from "../../components/confirmationcard/confirmationcard";
import UploadImages from "../../components/UploadImage/UploadImage";
import "./billboard.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const BillBoard = () => {
  const [billboard_name, setBillboardName] = useState("");
  const [billboard_series, setBillboardSeries] = useState("B3001");
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
  const [formDataBackup, setFormDataBackup] = useState<any>(null);
  const [alertIcon, setAlertIcon] = useState("??");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBillboardCount = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/billboard/getbillboards`);
        const totalBillboards = response.data.length;
        setBillboardSeries(`B30${totalBillboards + 1}`);
      } catch (error) {
        console.error("Error fetching billboard count:", error);
      }
    };
    fetchBillboardCount();
  }, []);

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

      setTimeout(() => {
        navigate("/getBillBoards");
      }, 5000);

      resetForm();
    } catch (error: any) {
      console.error("Error details:", error);
      setError(error.response?.data?.error || "Submission failed");
    }
  };

  const resetForm = () => {
    setBillboardName("");
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
      alertIcon,
    });
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    if (formDataBackup) {
      setBillboardName(formDataBackup.billboard_name);
      setBillboardType(formDataBackup.billboard_type);
      setLocation(formDataBackup.location);
      setSize(formDataBackup.size);
      setCampaignDuration(formDataBackup.campaignDuration);
      setCampaignCapacity(formDataBackup.campaignCapacity);
      setLeaseStart(formDataBackup.leaseStart);
      setLeaseEnd(formDataBackup.leaseEnd);
      setPricePerMonth(formDataBackup.pricePerMonth);
      setBillboardImages(formDataBackup.billboardImages);
      setAlertIcon(formDataBackup.alertIcon);
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
          alertIcon={alertIcon}
          confirmationText="Are you sure you want to cancel adding new billboard?" 
          button1="Cancel"
          button2="Add Bill"
        />
      ) : (
        <div className="billboard-form">
          <h1>Add New Billboard</h1>
          <h3>Billboard Details</h3>
          <form>
            <CustomTextField label="Billboard Name" value={billboard_name} onChange={(e) => setBillboardName(e.target.value)} required />
            <CustomTextField value={billboard_series} label="Billboard Series" required disabled />
            <CustomDropdown options={["Digital Billboard", "Prism Billboard", "Banner Billboard"]} label="Billboard Type" onChange={setBillboardType} />
            <CustomTextField value={location} onChange={(e) => setLocation(e.target.value)} label="Location" required />
            <CustomTextField value={size} onChange={(e) => setSize(e.target.value)} label="Size (e.g., 10x20ft)" required />
            <CustomTextField type="number" value={campaignCapacity} onChange={(e) => setCampaignCapacity(e.target.value)} label="Campaign Capacity" />
            <CustomTextField type="date" value={leaseStart} onChange={(e) => setLeaseStart(e.target.value)} required label="Lease Start Date" />
            <CustomTextField type="date" value={leaseEnd} onChange={(e) => setLeaseEnd(e.target.value)} required label="Lease End Date" />
            <CustomTextField type="number" value={pricePerMonth} onChange={(e) => setPricePerMonth(e.target.value)} label="Price Per Month" required />
            <UploadImages onImagesSelected={setBillboardImages} />
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
