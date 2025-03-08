import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import InfoCard from "../../components/Card/Card";
import CustomButton from "../../components/Button/Button";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const AllLeaseAgreements: React.FC = () => {
const [leaseAgreement, setLeaseAgreement] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleNewAgreement = () => {
    navigate("/newLease");
  }

  useEffect(() => {
    let isMounted = true; // Prevent updates if component unmounts
    
    const getAllLeaseAgreements = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/leaseagreement/getLeaseAgreements`);
        
        if (isMounted) { 
          setLeaseAgreement(response.data); // Only update state if still mounted
        }
      } catch (error) {
        console.error("Error fetching lease agreements:", error);
      }
    };
  
    getAllLeaseAgreements();
  
    return () => {
      isMounted = false; // Cleanup function to avoid unnecessary state updates
    };
  }, []); // ✅ Empty dependency array means it runs **only once**
  
  useEffect(() => {
    console.log("Updated Lease Agreements:", leaseAgreement);
  }, [leaseAgreement]); // ✅ Runs only when state updates
  

  const handleEdit = (id: number) => {
    console.log(`Edit lease with ID: ${id}`);
  };

  const handleDelete = (id: number) => {    
    console.log(`Delete lease with ID: ${id}`);
  };

  const heading = "Lease Agreement";
  const leaseData = [
    { id: 1, company: "Adidas Pvt Ltd.", email: "adidas@gmail.com", expiryDate: "February 2026" },
    { id: 2, company: "Nike Inc.", email: "nike@gmail.com", expiryDate: "March 2027" },
    { id: 3, company: "Puma Ltd.", email: "puma@gmail.com", expiryDate: "January 2025" },
  ];

  return (
    <>
    <h1>All Lease Agreement</h1>
    <CustomButton label="New Agreement"
         icon={<AccessTimeIcon />}   sx={{ mt: 2 }} onClick={handleNewAgreement} />
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
      gap={2}
    > 
      {leaseAgreement.map((lease) => (
        <InfoCard
          heading = {heading}
          key={lease?._id}
          company={lease?.client?.company_name}
          email={lease?.client?.client_email}
          expiryDate={lease?.campaignEndDate}
          onEdit={() => handleEdit(lease?._id)}
          onDelete={() => handleDelete(lease?._id)}
        />
      ))}
    </Box>
    </>
  );
};

export default AllLeaseAgreements;
