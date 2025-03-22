import React from "react";
import { Card, CardContent, Typography,Box, Avatar } from "@mui/material";
import RenewButton from "../vite-project/src/components/Button/RenewButton";
import ViewButton from "../vite-project/src/components/Button/ViewButton";

interface CardProps {
  company: string;
  email: string;
  expiryDate: string;
  daysLeft: number;
  logo: any;
  onRenew?: () => void;
  onView?: () => void;
}

const InfoCard: React.FC<CardProps> = ({ daysLeft, company, email, expiryDate,logo, onRenew, onView }) => {
  return (
    <Card sx={{ backgroundColor: "#FFF", width: "368px", height: "175px", borderRadius: "16px", marginTop:"16px",marginBottom:"16px",gap:"20px"  }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} sx={{width:"291px", height:"21px"}}>
            <Avatar
             src={logo}
              alt="Company Logo"
              sx={{ width: "33px", height: "22px", gap: "10px",  borderRadius: "2px"}}
            />
            <Typography sx={{fontWeight:"600", fontSize:"16px", color:"#34383E", fontFamily:"Poppins"}}>
              {company}
            </Typography>
          </Box>
          <Typography  color="textSecondary" mt={1} sx={{marginTop:"16px"}}>
            {email}
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={1} mb={2} sx={{borderBottom: "2px solid #C1B7FF66", marginTop:"12px", paddingBottom:"6px"}}>
            <Typography variant="body2">{expiryDate}</Typography>
            <Typography variant="body2">{daysLeft} Days Left</Typography>
          </Box>
        <Box display="flex" justifyContent="space-between">
          <RenewButton label="Renew" onClick={onRenew}/>
          <ViewButton label="View" onClick={onView} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
