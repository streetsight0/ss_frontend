// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../../components/Button/Button";
// import InputField from "../../components/Input field/InputField";
// import CustomDropdown from "../../components/DropDown/DropDown";
// import Checklist from "../../components/Checklist/Checkbox"; // Import Checklist component
// import axios from "axios";
// import "./AddCampaign.css";
// import ImageUpload from "../../components/ImageUpload/ImageUpload";
// import CampaignPopup from "../../components/CampaignPopup/CampaignPopup"; // Import the Success Popup component
// import Suceespopup from "../../components/SuccessPopup/SuccessCampaignPopup"
// const BASE_URL = import.meta.env.VITE_BASE_URL;

// interface CampaignFormData {
//   campaignName: string;
//   startDate: string;
//   endDate: string;
//   rentMonthly: number;
//   client: { _id: string } | null;
//   billboards: string[]; // Array of selected billboard IDs
//   campaignImages: string[];
// }

// const AddCampaign: React.FC = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState<CampaignFormData>({
//     campaignName: "",
//     startDate: "",
//     endDate: "",
//     rentMonthly: 0,
//     client: null,
//     billboards: [],
//     campaignImages: [],
//   });

//   const [clients, setClients] = useState<{ _id: string; client_name: string }[]>([]);
//   const [billboards, setBillboards] = useState<{ _id: string; billboard_series: string; location: { name: string } }[]>([]);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [successPopup, setSuccessPopup] = useState(false);

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/api/client/getclients`);
//         setClients(response.data.data);
//       } catch (error) {
//         console.error("Error fetching clients", error);
//       }
//     };
//     fetchClients();
//   }, []);

//   useEffect(() => {
//     const fetchBillboards = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/api/billboard/getbillboards`);
//         const billboardArray = Array.isArray(response.data) ? response.data : response.data.billboards || [];
//         setBillboards(
//           billboardArray.map((b: any) => ({
//             _id: String(b._id),
//             billboard_series: b.billboard_series,
//             location: b.location,
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching billboards", error);
//       }
//     };
//     fetchBillboards();
//   }, []);

//   const handleBillboardSelect = (selectedLabels: string[]) => {
//     const selectedIds = billboards
//       .filter((billboard) => selectedLabels.includes(`${billboard.billboard_series}, ${billboard.location.name}`))
//       .map((billboard) => billboard._id);

//     setFormData((prev) => ({
//       ...prev,
//       billboards: selectedIds,
//     }));
//   };

//   const handleSubmit = async () => {
//     const formattedData = {
//       campaign_name: formData.campaignName,
//       campaign_start_date: formData.startDate,
//       campaign_end_date: formData.endDate,
//       campaign_rent_monthly: formData.rentMonthly,
//       client_id: formData.client?._id || "",
//       billboards: formData.billboards,
//       campaign_images: formData.campaignImages,
//     };

//     try {
//       const response = await axios.post(`${BASE_URL}/api/campaign/createcampaigns`, formattedData);
//       if (response.status === 201) {
//         setFormData({
//           campaignName: "",
//           startDate: "",
//           endDate: "",
//           rentMonthly: 0,
//           client: null,
//           billboards: [],
//           campaignImages: [],
//         });
//         setPreviewOpen(false);
//         setSuccessPopup(true);
//         setTimeout(() => {
//           setSuccessPopup(false); 
//           navigate("/allcampaigns"); 
//         }, 3000);
//       } else {
//         console.log("Something went wrong.");
//       }
//     } catch (error) {
//       console.error("Error saving campaign:", error);
//       alert("Failed to save campaign.");
//     }
//   };

//   const billboardOptions = billboards.map((b) => ({
//     id: b._id,
//     label: `${b.billboard_series}, ${b.location.name}`,
//   }));

//   return (
//     <div className="campaign-form">
//       <div className="campaign-header">
//         <h2>Add New Campaign</h2>
//       </div>

//       <section>
//         <h3>Campaign details *</h3>
//         <div className="campaign-details">
//           <InputField
//             name="campaignName"
//             placeholder="Enter campaign name"
//             onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
//             label="Campaign Name"
//             value={formData.campaignName}
//           />
//           <InputField
//             name="startDate"
//             type="date"
//             onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
//             className="date"
//             label="Start Date"
//             value={formData.startDate}
//           />
//           <InputField
//             name="endDate"
//             type="date"
//             onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
//             className="date"
//             label="End Date"
//             value={formData.endDate}
//           />
//         </div>

//         <div className="image-upload-box">
//           <ImageUpload
//             maxImages={3}
//             onImagesChange={(files) =>
//               setFormData({ ...formData, campaignImages: files.map((file) => file.name) })
//             }
//           />
//         </div>
//       </section>

//       <section>
//         <h3>Client details *</h3>
//         <div className="client">
//           <CustomDropdown
//             label="Select Client"
//             options={clients.map((client) => client.client_name)}
//             onChange={(selectedClientName) => {
//               const clientInfo = clients.find((client) => client.client_name === selectedClientName);
//               setFormData({ ...formData, client: clientInfo ? { _id: clientInfo._id } : null });
//             }}
//             value={formData.client?._id ? clients.find((c) => c._id === formData.client?._id)?.client_name : ""}
//           />
//           <InputField
//             name="rentMonthly"
//             type="number"
//             placeholder="Enter monthly rent"
//             onChange={(e) => setFormData({ ...formData, rentMonthly: Number(e.target.value) })}
//             label="Monthly Rent"
//             value={formData.rentMonthly || ""}
//           />
//         </div>
//       </section>

//       <section>
//         <h3>Allot Billboard</h3>
//         <Checklist
//           items={billboardOptions.map((b) => b.label)}
//           onSelectionChange={handleBillboardSelect}
//         />
//       </section>

//       <footer className="form-actions">
//         <Button
//           label="Preview"
//           onClick={() => setPreviewOpen(true)} 
//           sx={{
//             backgroundColor: "#E2FF70",
//             color: "black",
//             width: "120px",
//             "&:hover": { backgroundColor: "#E2FF70" },
//           }}
//         />
//         <Button
//           label="Save"
//           onClick={handleSubmit}
//           sx={{
//             width: "120px",
//             height: "44px",
//             maxWidth: "120px",
//             borderRadius: "8px",
//             padding: "10px 16px",
//             backgroundColor: "#212429",
//             color: "white !important",
//             fontFamily: "Poppins, sans-serif !important",
//             "&:hover": { backgroundColor: "#333" },
//             margin: "0 12px",
//           }}
//         />
//         {previewOpen && <CampaignPopup campaign={formData} onClose={() => setPreviewOpen(false)} />}
//         {successPopup && <Suceespopup message="Campaign Created Successfully!" onClose={() => setSuccessPopup(false)} />}
//       </footer>
//     </div>
//   );
// };

// export default AddCampaign;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputField from "../../components/Input field/InputField";
import CustomDropdown from "../../components/DropDown/DropDown";
import Checklist from "../../components/Checklist/Checkbox";
import axios from "axios";
import "./AddCampaign.css";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import CampaignDetails from "../../components/CampaignPopup/CampaignPopup"; // Import the CampaignDetails component
import Suceespopup from "../../components/SuccessPopup/SuccessCampaignPopup";
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
  const navigate = useNavigate();
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
  const [billboards, setBillboards] = useState<{ _id: string; billboard_series: string; location: { name: string } }[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

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
        setBillboards(
          billboardArray.map((b: any) => ({
            _id: String(b._id),
            billboard_series: b.billboard_series,
            location: b.location,
          }))
        );
      } catch (error) {
        console.error("Error fetching billboards", error);
      }
    };
    fetchBillboards();
  }, []);

  const handleBillboardSelect = (selectedLabels: string[]) => {
    const selectedIds = billboards
      .filter((billboard) => selectedLabels.includes(`${billboard.billboard_series}, ${billboard.location.name}`))
      .map((billboard) => billboard._id);

    setFormData((prev) => ({
      ...prev,
      billboards: selectedIds,
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
        setFormData({
          campaignName: "",
          startDate: "",
          endDate: "",
          rentMonthly: 0,
          client: null,
          billboards: [],
          campaignImages: [],
        });
        setPreviewOpen(false);
        setSuccessPopup(true);
        setTimeout(() => {
          setSuccessPopup(false);
          navigate("/allcampaigns");
        }, 3000);
      } else {
        console.log("Something went wrong.");
      }
    } catch (error) {
      console.error("Error saving campaign:", error);
      alert("Failed to save campaign.");
    }
  };

  const billboardOptions = billboards.map((b) => ({
    id: b._id,
    label: `${b.billboard_series}, ${b.location.name}`,
  }));

  return (
    <div className="campaign-form">
      <div className="campaign-header">
        <h2>Add New Campaign</h2>
      </div>

      <section>
        <h3>Campaign details *</h3>
        <div className="campaign-details">
          <InputField
            name="campaignName"
            placeholder="Enter campaign name"
            onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
            label="Campaign Name"
            value={formData.campaignName}
            sx={{ width: "30vw" }}
          />
          <InputField
            name="startDate"
            type="date"
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="date"
            label="Start Date"
            value={formData.startDate}
            sx={{ width: "20vw" }}
          />
          <InputField
            name="endDate"
            type="date"
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="date"
            label="End Date"
            value={formData.endDate}
            sx={{ width: "20vw" }}
          />
        </div>

        <div className="image-upload-box">
          <ImageUpload
            maxImages={3}
            onImagesChange={(files) =>
              setFormData({ ...formData, campaignImages: files.map((file) => file.name) })
            }
          />
        </div>
      </section>

      <section>
        <h3>Client details *</h3>
        <div className="client">
          <CustomDropdown
            label="Select Client"
            options={clients.map((client) => client.client_name)}
            onChange={(selectedClientName) => {
              const clientInfo = clients.find((client) => client.client_name === selectedClientName);
              setFormData({ ...formData, client: clientInfo ? { _id: clientInfo._id } : null });
            }}
            value={formData.client?._id ? clients.find((c) => c._id === formData.client?._id)?.client_name : ""}
            sx={{ width: "34vw" }}
          />
          <InputField
            name="rentMonthly"
            type="number"
            placeholder="Enter monthly rent"
            onChange={(e) => setFormData({ ...formData, rentMonthly: Number(e.target.value) })}
            label="Monthly Rent"
            value={formData.rentMonthly || ""}
            sx={{ width: "34vw" }}
          />
        </div>
      </section>

      <section>
        <h3>Allot Billboard</h3>
        <Checklist
          items={billboardOptions.map((b) => b.label)}
          onSelectionChange={handleBillboardSelect}
        />
      </section>

      <footer className="form-actions">
        <Button
          label="Preview"
          onClick={() => setPreviewOpen(true)}
          sx={{
            backgroundColor: "#E2FF70",
            color: "black",
            width: "120px",
            "&:hover": { backgroundColor: "#E2FF70" },
          }}
        />
        <Button
          label="Save"
          onClick={handleSubmit}
          sx={{
            width: "120px",
            height: "44px",
            maxWidth: "120px",
            borderRadius: "8px",
            padding: "10px 16px",
            backgroundColor: "#212429",
            color: "white !important",
            fontFamily: "Poppins, sans-serif !important",
            "&:hover": { backgroundColor: "#333" },
            margin: "0 12px",
          }}
        />
        {previewOpen && <CampaignDetails campaign={formData} onClose={() => setPreviewOpen(false)} />}
        {successPopup && <Suceespopup message="Campaign Created Successfully!" onClose={() => setSuccessPopup(false)} />}
      </footer>
    </div>
  );
};

export default AddCampaign;
