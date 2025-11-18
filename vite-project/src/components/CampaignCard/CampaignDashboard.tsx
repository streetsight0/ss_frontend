import { Box, Card, CardContent } from "@mui/material";
import { useState, useEffect } from "react";
import './CampaignDashboard.css';
import hike from '../../assets/Icons/hike.png';
import Graph from '../../assets/Graph.png';
import {Stack } from "@mui/system";
import apiClient from "../../utils/axiosConfig";

export default function CampaignDashboard(){
    const [campaigns, setCampaigns] = useState<any[]>([]);
    useEffect(() => {
      const fetchCampaigns = async () => {
        try {
          const response = await apiClient.get(`/api/campaign/getcampaigns`);
          console.log(response.data.data);
          setCampaigns(response.data.data);
        } catch (error) {
          console.error("Error fetching campaigns:", error);
        } 
      };
      fetchCampaigns();
    }, []);
    return(
    <Card sx={{ backgroundColor: "#E2FF70", width: "369.33px", height: "228px", borderRadius: "20px", padding:"24px", position: "relative", }}>
      <p className="heading">Campaigns</p>
      <p className="heading-2">{campaigns.length}</p>
      <CardContent>
        <Box sx={{ display: "flex",position: "absolute",bottom: "30px",
          left: "20px",flexDirection: "column", height: "48.43382263183594px", width:"199.48715209960938px"}}>
            <Stack sx={{display: "flex", flexDirection: "row", gap:1}}>
              <p className="percentage">+14%</p>
              <Box component="img" src={hike} alt="Billboards" width={18} height={18} />
            </Stack>
            <p className="lastMonth">compared to last month</p>
        </Box>
      </CardContent>
      <Box component="img" src={Graph} alt="Billboards" width={99} height={130}  sx={{
      position: "absolute",
      right: "20px", 
      bottom: "70px",
    }} />
    </Card>
    );
}