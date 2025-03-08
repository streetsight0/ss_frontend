import React, { useState } from "react";
import axios from "axios";
import './client.css'

const BASE_URL = import.meta.env.VITE_BASE_URL;

const clients = () => {
  const [client_name, setclient_name] = useState("");
  const [client_email, setclient_email] = useState("");
  const [company_name, setcompany_name] = useState("");
  const [additional_companies, setadditional_companies] = useState("");
  const [address, setaddress] = useState("");
  const [contact, setcontact] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleClient = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(`${BASE_URL}/api/client/clients`, {
        client_name,
        client_email,
        company_name,
        additional_companies,
        address,
        contact,
      });
      setSuccess("Client added successfully!");
      console.log("Response:", response.data);
      setclient_name("");
      setclient_email("");
      setcompany_name("");
      setadditional_companies("");
      setaddress("");
      setcontact("");
      
    } catch (error: any) {
      setError(error.response?.data?.error || "Client adding failed");
    }
  };

  return (
    <div>
         {error && <p className="error-message">{error}</p>}
         {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleClient} className="client-form">
        <div className="form-group">
        <h1>Add Client</h1>

          <label htmlFor="client_name">Client Name</label>
          <input
            type="text"
            id="client_name"
            value={client_name}
            onChange={(e) => setclient_name(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="client_email">Client Email</label>
          <input
            type="email"
            id="client_email"
            value={client_email}
            onChange={(e) => setclient_email(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company_name">Company Name</label>
          <input
            type="text"
            id="company_name"
            value={company_name}
            onChange={(e) => setcompany_name(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="additional_companies">Additional Companies</label>
          <input
            type="text"
            id="additional_companies"
            value={additional_companies}
            onChange={(e) => setadditional_companies(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="number"
            id="contact"
            value={contact}
            onChange={(e) => setcontact(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

     
    </div>
  );
};

export default clients;
