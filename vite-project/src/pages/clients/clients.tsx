import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomTextField from "../../components/Input field/InputField";
import CustomButton from "../../components/Button/Button";
import { Typography, Box } from "@mui/material";
import UploadImages from "../../components/UploadImage/UploadImage";
import ConfirmationCard from "../../components/confirmationcard/confirmationcard";
import BackButton from "../../assets/Icons/BackBlack.png";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Clients = () => {
  const [client_name, setClientName] = useState("");
  const [client_email, setClientEmail] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [additional_companies, setAdditionalCompanies] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [client_logo, setClientLogo] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();

  const saveClientToBackend = async () => {
    const formData = new FormData();
    formData.append("client_name", client_name);
    formData.append("client_email", client_email);
    formData.append("company_name", company_name);
    formData.append("additional_companies", additional_companies);
    formData.append("address", address);
    formData.append("contact", contact);
    client_logo.forEach((image) => formData.append("client_logo", image));

    try {
      const response = await axios.post(`${BASE_URL}/api/client/createclients`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Client saved:", response.data);
      return response.data;
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to save client");
      throw new Error("Failed to save client");
    }
  };

  const handleClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await saveClientToBackend();
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error saving client:", error);
    }
  };

  return (
    <Box sx={{ padding: "30px", maxWidth: "1000px", margin: "auto",  backgroundColor:"#F4F2FF" ,borderRadius: "46px", marginTop:"10px", }}>
       <Box 
        onClick={() => navigate(-1)} 
        sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
      >
        <img src={BackButton} alt="Back" width="12px" height="16px" />
        <h2>
        Add New Clients
      </h2>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <Box
        sx={{
          padding: "10px",
        }}
      >
        <h3>
          Client Details
        </h3>

        <form onSubmit={handleClient} style={{ gap: "1rem", display:"flex", flexDirection:"column", padding: "20px"}}>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap="15px">
            <CustomTextField label="Client Name" value={client_name} onChange={(e) => setClientName(e.target.value)} required sx={{ width: "22vw" }} />
            <CustomTextField label="Company Name" value={company_name} onChange={(e) => setCompanyName(e.target.value)} required sx={{ width: "22vw" }} />
            <CustomTextField label="Client Email" type="email" value={client_email} onChange={(e) => setClientEmail(e.target.value)} required sx={{ width: "22vw" }} />
            <CustomTextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} required sx={{ width: "22vw" }} />
            <CustomTextField label="Contact" type="number" value={contact} onChange={(e) => setContact(e.target.value)} required sx={{ width: "22vw" }}  />
            <CustomTextField label="Add more" value={additional_companies} onChange={(e) => setAdditionalCompanies(e.target.value)} required sx={{ width: "22vw" }} />
          </Box>

          <Box>
            <Typography variant="body1" fontWeight="bold" gutterBottom>
              Upload company logo:
            </Typography>
            <UploadImages onImagesSelected={setClientLogo} />
          </Box> 

          <Box display="flex" justifyContent="space-between" marginTop="20px">
            <CustomButton label="Cancel" sx={{ border: "1px solid black", background: "white", color: "black" }} onClick={() => navigate("/getClient")} />
            <CustomButton label="Save" sx={{ background: "#D9EA58", color: "black" }} onClick={() => setShowConfirmation(true)} />
          </Box>
        </form>
      </Box>

      {showConfirmation && (
        <ConfirmationCard
          onCancel={() => setShowConfirmation(false)}
          onConfirm={async () => {
            try {
              await saveClientToBackend();
              navigate("/getClient");
            } catch (error) {
              console.error("Error saving client before navigating:", error);
            }
          }}
          alertIcon="✔️"
          confirmationText="Are you sure you want to submit this form?"
          button1="Cancel"
          button2="Submit"
        />
      )}
    </Box>
  );
};

export default Clients;
