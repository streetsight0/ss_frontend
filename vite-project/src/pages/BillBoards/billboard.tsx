import { useState, useEffect } from "react";
import axios from "axios";
import CustomButton from "../../components/Button/Button";
import CustomTextField from "../../components/Input field/InputField";
import CustomDropdown from "../../components/DropDown/DropDown";
import ConfirmationCard from "../../components/confirmationcard/confirmationcard";
import UploadImages from "../../components/UploadImage/UploadImage";
// import BillboardConfirmationCard from "../../components/confirmationcard/billboardconfirmationcard"
import "./billboard.css";
import LocationInput from "../../components/GoogleApi/InputLocation"
import BackIcon from "../../assets/Icons/BackBlack.png";
import SuccessPopup from "../../components/SuccessPopup/SuccessCampaignPopup";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const BillBoard = () => {
  const [billboard_name, setBillboardName] = useState("");
  const [billboard_series, setBillboardSeries] = useState("B3001");
  const [billboard_type, setBillboardType] = useState("");
  const [location, setLocation] = useState("");
  const [latitude,setLatitude] = useState("");
  const [longitude,setLongitude] = useState("");
  const [size, setSize] = useState("");
  const [campaignDuration, setCampaignDuration] = useState("");
  const [campaignCapacity, setCampaignCapacity] = useState("");
  const [leaseStart, setLeaseStart] = useState("");
  const [leaseEnd, setLeaseEnd] = useState("");
  const [pricePerMonth, setPricePerMonth] = useState("");
  const [billboardImages, setBillboardImages] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [success,] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
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
      formData.append("location[name]", location);
      formData.append("location[latitude]", latitude);
      formData.append("location[longitude]", longitude);
      formData.append("size", size);
      formData.append("campaignDuration", campaignDuration);
      formData.append("campaignCapacity", campaignCapacity);
      formData.append("leaseStart", leaseStart);
      formData.append("leaseEnd", leaseEnd);
      formData.append("pricePerMonth", pricePerMonth);
      billboardImages.forEach((image) => formData.append("billboard_images", image));

      await axios.post(`${BASE_URL}/api/billboard/createbillboards`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setConfirmationText(`Billboard added successfully with series name: ${billboard_series}`);
      setShowSubmitConfirmation(true);
    } catch (error: any) {
      console.error("Error details:", error);
      setError(error.response?.data?.error || "Submission failed");
    }
  };

  // const resetForm = () => {
  //   setBillboardName("");
  //   setBillboardType("");
  //   setLocation("");
  //   setLatitude("");
  //   setLongitude("");
  //   setSize("");
  //   setCampaignDuration("");
  //   setCampaignCapacity("");
  //   setLeaseStart("");
  //   setLeaseEnd("");
  //   setPricePerMonth("");
  //   setBillboardImages([]);
  // };

  // const handleConfirmSubmit = () => {
  //   setShowSubmitConfirmation(false);
  //   resetForm();
  //   navigate("/getBillBoards");
  // };

  const handleDiscard = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="billboard-container">
      {showSubmitConfirmation ? (
        // <BillboardConfirmationCard
        //   onCancel={() => setShowSubmitConfirmation(false)}
        //   onConfirm={handleConfirmSubmit}
        //   alertIcon="✅"
        //   confirmationText={confirmationText}
        //   button2="View Billboards"
        // />
        <SuccessPopup message="Billboard Created Successfully!" onClose={() => console.log('close')}/>

      ) : showConfirmation ? (
        <ConfirmationCard
          onCancel={() => setShowConfirmation(false)}
          onConfirm={() => {
            saveBillboardToBackend();
            setShowConfirmation(false);
          }}
          alertIcon="⚠️"
          confirmationText="Are you sure you want to discard this form?"
          button1="Cancel"
          button2="Discard"
        />
      ) : (
        <div className="billboard-form">
        <div className="billboard-header">
          
          </div>
          <section>
          <div className="campaign-header">
            <img src={BackIcon} alt="Back" className="back-icon" onClick={() => navigate(-1)} />
            <h2>Add New Billboard</h2>
          </div>
  
          </section>
          <form>
            <CustomTextField label="Billboard Name" value={billboard_name} onChange={(e) => setBillboardName(e.target.value)} required sx={{ width: "38vw" }}/>
            <CustomTextField value={billboard_series} onChange={(e) => setBillboardSeries(e.target.value)} label="Billboard Series" required sx={{ width: "38vw" }}/>
            <CustomDropdown options={["Digital Billboard", "Prism Billboard", "Banner Billboard"]} label="Billboard Type" onChange={setBillboardType}sx={{ width: "38vw" }} />
            <LocationInput   onSelectLocation={(name, lat, lon) => {
             
        setLocation(name);
        setLatitude(lat);
        setLongitude(lon);
      }} />
            <CustomTextField value={size} onChange={(e) => setSize(e.target.value)} label="Size (e.g., 10x20ft)" required sx={{ width: "38vw" }} />
            <CustomTextField type="number" value={campaignCapacity} onChange={(e) => setCampaignCapacity(e.target.value)} label="Campaign Capacity" sx={{ width: "38vw" }}/>
            <div className="lease-price-container">
              <CustomTextField type="date" value={leaseStart} onChange={(e) => setLeaseStart(e.target.value)} required label="Lease Start Date" sx={{ width: "18.5vw" }} />
              <CustomTextField type="date" value={leaseEnd} onChange={(e) => setLeaseEnd(e.target.value)} required label="Lease End Date" sx={{ width: "18.5vw" }} />
              <CustomTextField type="number" value={pricePerMonth} onChange={(e) => setPricePerMonth(e.target.value)} label="Price Per Month" required sx={{ width: "38vw" }} />
            </div>
            
            <div className="image-uploader-container">
            <p style={{fontSize: "14px", fontFamily: "Satoshi, sans-serif !important", margin:"0", padding:"0", fontWeight:"400"}}>
              Upload Billboard Images
            </p>
              <UploadImages onImagesSelected={setBillboardImages}  />
            </div>
            <div className="button-group">    
              <CustomButton label="Discard" onClick={handleDiscard}  sx={{
                color: "#212429",
                fontSize: "12px",
                textTransform: "none",
                borderRadius: "8px",
                fontWeight: 700,
                padding: "8px 16px 8px 16px",
                minWidth: "222px",
                maxWidth: "100px",
                height: "51.43px",
                border: "1px solid", 
                borderColor: "#2C2C2C", 
                backgroundColor:"white",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}  />
              <CustomButton label="Save" onClick={saveBillboardToBackend} sx={{width:"187px",height:"51.43px",color:"#E2FF70"}} />
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
