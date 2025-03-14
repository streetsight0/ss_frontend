import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomTextField from "../../components/Input field/InputField";
import CustomButton from "../../components/Button/Button";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../../components/Popup/Popup";
import './clients.css';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Clients = () => {
  const [client_name, setclient_name] = useState("");
  const [client_email, setclient_email] = useState("");
  const [company_name, setcompany_name] = useState("");
  const [additional_companies, setadditional_companies] = useState("");
  const [address, setaddress] = useState("");
  const [contact, setcontact] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleClient = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setShowPopup(false);

    const formData = new FormData();
    formData.append("client_name", client_name);
    formData.append("client_email", client_email);
    formData.append("company_name", company_name);
    formData.append("additional_companies", additional_companies);
    formData.append("address", address);
    formData.append("contact", contact);
    if (logo) {
      formData.append("logo", logo);
    }

    try {
      await axios.post(`${BASE_URL}/api/client/createclients`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowPopup(true);

      // Clear form fields
      setclient_name("");
      setclient_email("");
      setcompany_name("");
      setadditional_companies("");
      setaddress("");
      setcontact("");
      setLogo(null);

      // Redirect after 5 seconds
      setTimeout(() => {
        navigate("/getclients");
      }, 5000);

    } catch (error: any) {
      setError(error.response?.data?.error || "Client adding failed");
    }
  };

  return (
    <div>
      {error && <Typography color="error">{error}</Typography>}
      {showPopup && <Popup message="Client added successfully! Redirecting to all clients..." onClose={() => setShowPopup(false)} />}
      
      <form onSubmit={handleClient} className="client-form">
        <Typography variant="h4" gutterBottom>
          Add Client
        </Typography>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
          required
        />

        <CustomTextField
          label="Client Name"
          value={client_name}
          onChange={(e) => setclient_name(e.target.value)}
          required
        />

        <CustomTextField
          label="Client Email"
          type="email"
          value={client_email}
          onChange={(e) => setclient_email(e.target.value)}
          required
        />

        <CustomTextField
          label="Company Name"
          value={company_name}
          onChange={(e) => setcompany_name(e.target.value)}
          required
        />

        <CustomTextField
          label="Additional Companies"
          value={additional_companies}
          onChange={(e) => setadditional_companies(e.target.value)}
          required
        />

        <CustomTextField
          label="Address"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          required
        />

        <CustomTextField
          label="Contact"
          type="number"
          value={contact}
          onChange={(e) => setcontact(e.target.value)}
          required
        />

        <CustomButton label="Submit" icon={<AddIcon />} onClick={handleClient} />
      </form>
    </div>
  );
};

export default Clients;
