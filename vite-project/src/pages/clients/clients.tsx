import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomTextField from "../../components/Input field/InputField";
import CustomButton from "../../components/Button/Button";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./clients.css";
import UploadImages from "../../components/UploadImage/UploadImage";
import ConfirmationCard from "../../components/confirmationcard/confirmationcard";

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
      return response.data; // Return the response if needed for further processing
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to save client");
      throw new Error("Failed to save client");
    }
  };

  const handleClient = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission reload
    setError("");

    try {
      await saveClientToBackend(); // Save the client data
      setShowConfirmation(true); // Show the confirmation after successful save
    } catch (error) {
      console.error("Error saving client:", error);
    }
  };

  return (
    <div>
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleClient} className="client-form">
        <Typography variant="h4" gutterBottom>
          Add Client
        </Typography>
        <UploadImages onImagesSelected={setClientLogo} />
        <CustomTextField
          label="Client Name"
          value={client_name}
          onChange={(e) => setClientName(e.target.value)}
          required
        />

        <CustomTextField
          label="Client Email"
          type="email"
          value={client_email}
          onChange={(e) => setClientEmail(e.target.value)}
          required
        />

        <CustomTextField
          label="Company Name"
          value={company_name}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />

        <CustomTextField
          label="Additional Companies"
          value={additional_companies}
          onChange={(e) => setAdditionalCompanies(e.target.value)}
          required
        />

        <CustomTextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <CustomTextField
          label="Contact"
          type="number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />

        {/* <CustomButton label="Submit" icon={<AddIcon />} onClick={()=>handleClient} /> */}
        <CustomButton
          label="Submit"
          onClick={() => setShowConfirmation(true)} // Show confirmation before discarding
        />
      </form>

      {showConfirmation && (
        <ConfirmationCard
          onCancel={() => setShowConfirmation(false)}
          onConfirm={async () => {
            try {
              await saveClientToBackend(); // Save client data before navigating
              navigate("/getClient"); // Navigate to AllclientsClient after successful save
            } catch (error) {
              console.error("Error saving client before navigating:", error);
            }
          }}
          alertIcon="✔️"
          confirmationText="Are you sure you want to discard this form?"
          button1="Cancel"
          button2="Proceed to All Clients"
        />
      )}
    </div>
  );
};

export default Clients;
