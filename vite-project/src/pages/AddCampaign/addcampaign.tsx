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
  rentMonthly: number;
  client: { _id: string } | null;
  billboards: string[];
  campaignImages: string[];
}

const AddCampaign: React.FC = () => {
  const [formData, setFormData] = useState<CampaignFormData>({
    campaignName: "",
    startDate: "",
    endDate: "",
    rentMonthly: 0,
    client: null,
    billboards: [],
    campaignImages: [],
  });

  const [clients, setClients] = useState<{ _id: string; client_name: string }[]>([]);
  const [billboards, setBillboards] = useState<{ _id: string; billboard_series: string; location: string }[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/client/getclients`);
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

        setBillboards(billboardArray.map((b: any) => ({
          _id: String(b._id),
          billboard_series: b.billboard_series,
          location: b.location,
        })));
      } catch (error) {
        console.error("Error fetching billboards", error);
      }
    };
    fetchBillboards();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "rentMonthly" ? Number(value) : value,
    }));
  };

  const handleClientChange = (selectedClientName: string) => {
    const clientInfo = clients.find((client) => client.client_name === selectedClientName);
    if (clientInfo) {
      setFormData((prevState) => ({
        ...prevState,
        client: { _id: clientInfo._id },
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const fileNames = Array.from(e.target.files).map(file => file.name);
    setFormData((prevState) => ({
      ...prevState,
      campaignImages: [...prevState.campaignImages, ...fileNames],
    }));
  };

  const handleSubmit = async () => {
    const formattedData = {
      campaign_name: formData.campaignName,
      campaign_start_date: formData.startDate,
      campaign_end_date: formData.endDate,
      campaign_rent_monthly: formData.rentMonthly,
      client_id: formData.client?._id || "",
      billboards: formData.billboards,
      campaign_images: formData.campaignImages,
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/campaign/createcampaigns`, formattedData);
      if (response.status === 201) {
        console.log("Campaign saved successfully!");
      } else {
        console.log("Something went wrong.");
      }
    } catch (error: any) {
      console.error("Error saving campaign:", error);
      alert("Failed to save campaign.");
    }
  };

  const billboardOptions = billboards.map((b) => ({
    id: b._id,
    label: `${b.billboard_series}, ${b.location}`, 
  }));

  const handleBillboardSelect = (selectedIds: string[]) => {
    setFormData((prev) => ({
      ...prev,
      billboards: selectedIds,
    }));
  };

  return (
    <div className="campaign-form">
      <h2>Add New Campaign</h2>

      <section>
        <h3>Campaign details *</h3>
        <div className="campaign-details">
          <InputField name="campaignName" placeholder="Enter campaign name" onChange={handleChange} />
          <InputField name="startDate" type="date" onChange={handleChange} className="date" />
          <InputField name="endDate" type="date" onChange={handleChange} className="date" />
          <InputField name="rentMonthly" type="number" placeholder="Enter monthly rent" onChange={handleChange} />
        </div>

        <div className="image-upload">
          <h3>Upload campaign images</h3>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
      </section>

      <section>
        <h3>Client details *</h3>
        <div className="client-details">
          <CustomDropdown label="Select Client" options={clients.map((client) => client.client_name)} onChange={handleClientChange} />
        </div>
      </section>

      <section>
        <h3>Allot Billboard</h3>
        <Checklist options={billboardOptions} onSelect={handleBillboardSelect} />
      </section>

      <footer className="form-actions">
        <Button label="Preview" onClick={() => console.log("Preview clicked")} />
        <Button label="Discard" onClick={() => console.log("Discard clicked")} />
        <Button label="Save" onClick={handleSubmit} />
      </footer>
    </div>
  );
};

export default AddCampaign;

