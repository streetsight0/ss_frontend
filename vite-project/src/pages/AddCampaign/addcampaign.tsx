import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import InputField from "../../components/Input field/InputField";
import CustomDropdown from "../../components/DropDown/DropDown";
import Checklist from "../../components/Checklist/checkList";
import axios from "axios";
import "./AddCampaign.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface CampaignFormData {
  campaignName: string;
  startDate: string;
  endDate: string;
  client: { _id: string } | null;
  companyName: string;
  clientEmail: string;
  billboards: string[]; 
  campaignImages: File[];
}

const AddCampaign: React.FC = () => {
  const [formData, setFormData] = useState<CampaignFormData>({
    campaignName: "",
    startDate: "",
    endDate: "",
    client: null,
    companyName: "",
    clientEmail: "",
    billboards: [], // Store the selected billboard IDs
    campaignImages: [],
  });

  const [clients, setClients] = useState<{ _id: string; client_name: string; company_name: string; client_email: string }[]>([]);
  const [billboards, setBillboards] = useState<{ _id: string; billboard_series: string; location: string }[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/client/getclients`);
        console.log("Clients API Response:", response.data.data);
        setClients(response.data.data);
      } catch (error) {
        console.error("Error fetching clients", error);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const fetchBillboards = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/billboard/getbillboards`);
        const billboardArray = Array.isArray(response.data) ? response.data : response.data.billboards || [];
  
        const formattedBillboards = billboardArray.map((b: any) => ({
          _id: String(b._id),
          billboard_series: b.billboard_series,
          location: b.location,
        }));
  
        console.log("Formatted Billboards:", formattedBillboards);
        setBillboards(formattedBillboards);
      } catch (error) {
        console.error("Error fetching billboards", error);
      }
    };
    fetchBillboards();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClientChange = (selectedClientName: string) => {
    const clientInfo = clients.find((client) => client.client_name === selectedClientName);
    if (clientInfo) {
      console.log(`Selected Client ID: ${clientInfo._id}`);
      setFormData((prevState) => ({
        ...prevState,
        client: { _id: clientInfo._id },
        companyName: clientInfo.company_name,
        clientEmail: clientInfo.client_email,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const filesArray = Array.from(e.target.files);
    setFormData((prevState) => ({
      ...prevState,
      campaignImages: [...prevState.campaignImages, ...filesArray],
    }));
  };

  const handleSubmit = async () => {
    console.log("Final Form Data Before Submission:", formData);
    console.log("Billboards IDs Sent to API:", formData.billboards);
  
    const formattedData = {
      campaign_name: formData.campaignName,
      campaign_start_date: formData.startDate,
      campaign_end_date: formData.endDate,
      client_id: formData.client?._id || "",
      company_name: formData.companyName,
      client_email: formData.clientEmail,
      billboards: formData.billboards, 
      campaign_images: formData.campaignImages.map((file) => file.name),
    };
  
    console.log("Sending data to API:", JSON.stringify(formattedData, null, 2));
  
    try {
      const response = await axios.post(`${BASE_URL}/api/campaign/createcampaigns`, formattedData);
      console.log("Response from API:", response.data);
  
      if (response.status === 201) {
        console.log("Campaign saved successfully!");
      } else {
        console.log("Something went wrong.");
      }
    } catch (error: any) {
      console.error("Error saving campaign:", error);
      if (error.response) {
        console.error("Backend Error Response:", error.response.data);
      }
      console.log("Failed to save campaign.");
    }
  };

    const billboardOptions = billboards.map((b: { _id: string; billboard_series: string; location: string }) => ({

    id: b._id,
    label: `${b.billboard_series}, ${b.location}`, 
  }));

 
  const handleBillboardSelect = (selectedIds: string[]) => {
    const selectedBillboards = billboardOptions.filter((b) =>
      selectedIds.includes(b.id)
    );
    console.log(selectedBillboards);
    setFormData((prev) => ({
      ...prev,
      billboards: selectedIds, 

    }));
  };

  return (
    <div className="campaign-form">
      <h2>Add New Campaign</h2>

      {/* Campaign Details */}
      <section>
        <h3>Campaign details *</h3>
        <div className="campaign-details">
          <InputField name="campaignName" placeholder="Enter campaign name" onChange={handleChange} />
          <InputField name="startDate" type="date" onChange={handleChange} className="date" />
          <InputField name="endDate" type="date" onChange={handleChange} className="date" />
        </div>

        {/* Upload Campaign Images */}
        <div className="image-upload">
          <h3>Upload campaign images</h3>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
      </section>

      {/* Client Details */}
      <section>
        <h3>Client details *</h3>
        <div className="client-details">
          <label>Select Client</label>
          <CustomDropdown label="Select Client" options={clients.map((client) => client.client_name)} onChange={handleClientChange} />
          <InputField name="companyName" value={formData.companyName} onChange={handleChange} />
        </div>
        <InputField name="clientEmail" value={formData.clientEmail} onChange={handleChange} />
      </section>

      {/* Billboard Selection */}
      <section>
        <h3>Allot Billboard</h3>
    
      <Checklist
        options={billboardOptions}  
        onSelect={handleBillboardSelect}  
      />

      </section>
      {/* Form Actions */}
      <footer className="form-actions">
        <Button label="Preview" onClick={() => console.log("Preview clicked")} />
        <Button label="Discard" onClick={() => console.log("Discard clicked")} />
        <Button label="Save" onClick={handleSubmit} />
      </footer>
    </div>
  );
};

export default AddCampaign;
