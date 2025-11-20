import React from "react";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import ViewButton from "../../components/Button/ViewButton";

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
    <Card sx={{ backgroundColor: "#FFF", width: "400px", height: "190px", borderRadius: "16px", marginTop:"16px",marginBottom:"16px",gap:"15px"  }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} sx={{width:"291px", height:"21px"}}>
            <Avatar
             src={clientLogo}
              alt="Company Logo"
              sx={{ width: "33px", height: "22px", gap: "10px",  borderRadius: "2px"}}
            />
            <Typography sx={{fontWeight:"600", fontSize:"16px", color:"#34383E", fontFamily:"Poppins"}}>
              {clientName}
            </Typography>
          </Box>
          <Typography  color="textSecondary" mt={1} sx={{marginTop:"16px"}}>
            {clientEmail}
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={1} mb={2} sx={{borderBottom: "2px solid #C1B7FF66", marginTop:"12px", paddingBottom:"6px"}}>
            <Typography variant="body2">{contractExpiry}</Typography>
            <Typography variant="body2">Total Billboards:{billboardCount} </Typography>
          </Box>
        <Box display="flex" justifyContent="space-between">
          
          <ViewButton  label="View Lease" onClick={onViewClient} />
        </Box>
      </CardContent>
    </Card>
  );
};


export default ClientCard;
