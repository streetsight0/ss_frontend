import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Pagination } from "@mui/material";
import InfoCard from "../../components/Card/Card";
import CustomButton from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddIcon from "../../assets/Icons/add.png";
import "./AllLeaseAgreement.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ITEMS_PER_PAGE = 9;
const AllLeaseAgreements: React.FC = () => {
  const [leaseAgreement, setLeaseAgreement] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const handleNewAgreement = () => {
    navigate("/newLease");
  }

  useEffect(() => {
    let isMounted = true;

    const getAllLeaseAgreements = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/leaseagreement/getLeaseAgreements`);
        
        if (isMounted) {
          setLeaseAgreement(response.data);
        }
      } catch (error) {
        console.error("Error fetching lease agreements:", error);
      }
    };

    getAllLeaseAgreements();
  
    return () => {
      isMounted = false; 
    };
  }, []); 
  
  useEffect(() => {
    console.log("Updated Lease Agreements:", leaseAgreement);
  }, [leaseAgreement]); 
  

  const handleRenew = () => {
    navigate("/newLease");
  };

  const handleView = (id: number) => {    
    console.log(`View lease with ID: ${id}`);
    const selectedLease = leaseAgreement.find((lease) => lease._id === id);
    navigate("/viewLease", { state: { leaseData: selectedLease } });
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const calculateDaysLeft = (isoString: string) => {
    const endDate = new Date(isoString);
    const currentDate = new Date();
  
    const diffTime = endDate.getTime() - currentDate.getTime();
    
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    return diffDays;
  };
  const totalPages = Math.ceil(leaseAgreement.length / ITEMS_PER_PAGE);
  return (
    <>
    <Stack direction="row" spacing={2} mt={2} sx={{marginRight:"12px", marginLeft:"12px", gap:"8px"}} justifyContent="space-between" alignItems="center">
      <Typography sx={{fontSize: "32px", fontWeight: "500"}}>All Lease | Total {leaseAgreement.length} </Typography>
      <CustomButton label="New Agreement"
         icon={<img src={AddIcon} alt="Add Icon" style={{ width: 20, height: 20 }} />}   sx={{ mt: 2 }} onClick={handleNewAgreement} />
      </Stack>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
      sx={{gap: "12px", marginLeft:"12px",marginRight:"12px"}}
      >
      {leaseAgreement.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((lease) => (
            <InfoCard
              key={lease?._id}
              company={lease?.client?.company_name}
              email={lease?.client?.client_email}
              expiryDate={formatDate(lease?.campaignEndDate)}
              daysLeft={calculateDaysLeft(lease?.campaignEndDate)}
          logo = {lease?.client?.client_logo}
          onRenew={() => handleRenew()}
              onView={() => handleView(lease?._id)}
            />
          ))}
      </Box>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_event, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </>
  );
};

export default AllLeaseAgreements;
