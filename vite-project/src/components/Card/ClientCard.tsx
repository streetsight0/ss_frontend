import React from "react";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import ViewButton from "../Button/ViewButton";

interface ClientCardProps {
  clientName: string;
  clientEmail: string;
  contractExpiry: string;
  billboardCount: number;
  clientLogo: any;
  onRenewContract?: () => void;
  onViewClient?: () => void;
}

const ClientCard: React.FC<ClientCardProps> = ({
  clientName,
  clientEmail,
  contractExpiry,
  billboardCount,
  clientLogo,
  onViewClient
}) => {
  return (
    <Card sx={{ backgroundColor: "#FFF", width: "280px", height: "250px", borderRadius: "16px", marginTop: "16px", marginBottom: "16px", gap: "20px",boxShadow:"2px 2px 2px black" }}>
      <CardContent >
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} sx={{ width: "291px", height: "21px" }}>
         
           <Typography sx={{ fontWeight: "600", fontSize: "16px", color: "#34383E", fontFamily: "Poppins"}}>
            {clientName}
          </Typography>
          <Avatar
            src={clientLogo}
            alt="Client Logo"
            sx={{  gap: "10px",maxWidth:"400px", borderRadius: "2px",marginRight:"40px"  }}
            
          />
         
        </Box>
        <Typography color="textSecondary" mt={1} sx={{ marginTop: "36px" ,fontWeight:"bold"}}>
        Client Name:  {clientEmail}
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={1} mb={2} sx={{ borderBottom: "2px solid #C1B7FF66", marginTop: "16px", paddingBottom: "6px" }}>
          <Typography variant="body2" sx={{fontWeight:"bold"}}>{contractExpiry}</Typography>
          <Typography variant="body2" sx={{fontWeight:"bold"}}>Total Billboards:{billboardCount} </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
         
          <ViewButton label="View Lease" onClick={onViewClient} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClientCard;
