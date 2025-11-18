import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../utils/axiosConfig";
import CustomTextField from "../../components/Input field/InputField";
import CustomButton from "../../components/Button/Button";
import { Typography,Box } from "@mui/material";
import UploadImages from "../../components/UploadImage/UploadImage";
import ConfirmationCard from "../../components/confirmationcard/confirmationcard";
import BackButton from "../../assets/Icons/BackBlack.png";

const EditClient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const existingClient = location.state?.client || null; // Get client data from navigation state

  // State variables
  const [client_name, setClientName] = useState(existingClient?.client_name || "");
  const [client_email, setClientEmail] = useState(existingClient?.client_email || "");
  const [company_name, setCompanyName] = useState(existingClient?.company_name || "");
  const [additional_companies, setAdditionalCompanies] = useState(
    existingClient?.additional_companies?.join(", ") || ""
  );
  const [address, setAddress] = useState(existingClient?.address || "");
  const [contact, setContact] = useState(existingClient?.contact || "");
  const [client_logo, setClientLogo] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (!existingClient) {
      navigate("/getClient"); // Redirect if no client data is found
    }
  }, [existingClient, navigate]);

  // Function to update the client in the database
  const updateClientInBackend = async () => {
    try {
      let data;
      let headers;

      if (client_logo.length > 0) {
        // If a new logo is uploaded, use FormData
        const formData = new FormData();
        formData.append("client_name", client_name);
        formData.append("client_email", client_email);
        formData.append("company_name", company_name);
        formData.append("additional_companies", additional_companies);
        formData.append("address", address);
        formData.append("contact", contact);
        client_logo.forEach((image) => formData.append("client_logo", image));

        data = formData;
        headers = { "Content-Type": "multipart/form-data" };
      } else {
        // Otherwise, send JSON payload
        data = {
           
          client_name,
          client_email,
          company_name,
          additional_companies: additional_companies.split(",").map((item:any) => item.trim()),
          address,
          contact,
        };
        headers = { "Content-Type": "application/json" };
      }

      const response = await apiClient.put(
        `/api/client/updateclients/${existingClient._id}`,
        data,
        { headers }
      );

      console.log("Client updated successfully:", response.data);
      return response.data;
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to update client");
      throw new Error("Failed to update client");
    }
  };

  const handleEditClient = async () => {
  
    setError("");

    try {
      await updateClientInBackend();
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error updating client:", error);
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

     <form onSubmit={handleEditClient} style={{ gap: "1rem", display:"flex", flexDirection:"column", padding: "20px"}}>
       <Box display="grid" gridTemplateColumns="1fr 1fr" gap="15px">
         <CustomTextField label="Client Name" value={client_name} onChange={(e) => setClientName(e.target.value)} required sx={{ width: "25vw" }} />
         <CustomTextField label="Company Name" value={company_name} onChange={(e) => setCompanyName(e.target.value)} required sx={{ width: "25vw" }} />
         <CustomTextField label="Client Email" type="email" value={client_email} onChange={(e) => setClientEmail(e.target.value)} required sx={{ width: "25vw" }} />
         <CustomTextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} required sx={{ width: "25vw" }} />
         <CustomTextField label="Contact" type="number" value={contact} onChange={(e) => setContact(e.target.value)} required sx={{ width: "25vw" }}  />
         <CustomTextField label="Add more" value={additional_companies} onChange={(e) => setAdditionalCompanies(e.target.value)} required sx={{ width: "25vw" }} />
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
           await updateClientInBackend();
           navigate("/getClient");
         } catch (error) {
           console.error("Error saving client before navigating:", error);
         }
       }}
       alertIcon="✔️"
       confirmationText="Client updated successfully"
       button1="Close"
       button2="Go to All clients"
     />
   )}
 </Box>
  );
};

export default EditClient;
