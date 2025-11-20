import { Paper, Box } from "@mui/material";
import BillboardWhite from "../../assets/Icons/BillboardWhite.png";
import Group  from "../../assets/Group.png";
import LineGraph from "../../components/Line Graph/LineGraph";
import PieChartBillBoardStatus from "../../components/Pie Chart/PieChartBillBoardStatus";
import CustomButton from "../../components/Button/Button"; 
import './home.css';
import { useNavigate } from "react-router-dom";
import CampaignDashboard from "../../components/CampaignCard/CampaignDashboard";
import ClientDashboard from "../../components/Client/ClientDashboard";
import GoogleMapComponent from "../../components/GoogleApi/GoogleMapDashboard";
import { Stack } from "@mui/system";
import '../../components/CampaignCard/CampaignDashboard.css'
import { useEffect } from "react";

const Home = () => {
    const navigate = useNavigate();
    let googleResourceUrl = `https://openidconnect.googleapis.com/v1/userinfo`;
    

useEffect(() => {
  async function getGoogleData() {
    if (document.location.href.includes('access_token')) {
      let token: any = read_token();
      let json = await api_call(token);
      console.log(json);
      // You can store this in context or localStorage
    }
  }

  function read_token() {
    return new URLSearchParams(
      document.location.href.substr(document.location.href.indexOf('#') + 1)
    ).get('access_token');
  }

  async function api_call(token: string) {
    let api_result = await fetch(googleResourceUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return await api_result.json();
  }

  getGoogleData();
}, []);

  return (
    <div className="mainDiv">
      <Paper
        elevation={3}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width:"1300x",
          borderRadius: 2,
          bgcolor: "#B399FF3D",
          position: "relative",
          marginBottom: "20px"
        }}
      >
        {/* Left Side - Text & Button */}
        <Box sx={{ maxWidth: 500 }}>
          <p className="heading-3">
            Why did the billboard apply for a job?
          </p>
          <p className="caption">
            It wanted to make a big impression!
          </p>
          <CustomButton
            label="Add Billboard"
            icon={<img src={BillboardWhite} alt="Add Billboard" width={20} height={20} />}
            onClick={() => navigate("/billboards")}
            sx={{ backgroundColor: "#212429", color: "#FFF", mt: 2 }}
          />
        </Box>

        {/* Right Side - Images */}
        <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
          {/* Main Image */}
          <Box
            component="img"
            src={Group}
            alt="Main Billboard"
            sx={{
              width: "210px",
              height: "162px",
            }}
          />
        </Box>
      </Paper>
      <LineGraph />
      <Stack direction="row" spacing={2}>
          <PieChartBillBoardStatus />
          <CampaignDashboard />
          <ClientDashboard />
      </Stack>
      <Stack direction="column" spacing={2} sx={{ marginTop: "50px" }}>
        <GoogleMapComponent />
      </Stack>     
    </div>
  );
};

export default Home;

