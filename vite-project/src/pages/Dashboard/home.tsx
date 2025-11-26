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
import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);
    let googleResourceUrl = `https://openidconnect.googleapis.com/v1/userinfo`;
    

useEffect(() => {
  async function getGoogleData() {
    const currentUrl = document.location.href;
    const hash = window.location.hash;
    const hasAccessToken = currentUrl.includes('access_token') || hash.includes('access_token');
    
    if (hasAccessToken) {
      localStorage.setItem("token", "google_oauth_processing_" + Date.now());
      
      let token: any = read_token();
      
      if (!token) {
        localStorage.removeItem("token");
        return;
      }

      try {
        let json = await api_call(token);
        
        try {
          const BASE_URL = import.meta.env.VITE_BASE_URL;
          
          const response = await fetch(`${BASE_URL}/api/auth/google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: json.email
            })
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.token) {
              setToken(data.token);
              localStorage.setItem("token", data.token);
              window.history.replaceState(null, '', window.location.pathname);
            } else {
              localStorage.removeItem("token");
            }
          } else {
            localStorage.removeItem("token");
          }
        } catch (error: any) {
          localStorage.removeItem("token");
        }
      } catch (error) {
        localStorage.removeItem("token");
      }
    } else {
      const currentToken = localStorage.getItem("token");
      if (currentToken && currentToken.startsWith("google_oauth_")) {
        localStorage.removeItem("token");
      }
    }
  }

  function read_token() {
    const hash = window.location.hash;
    
    if (!hash || !hash.includes('access_token')) {
      return null;
    }

    const hashParams = hash.substring(1);
    const params = new URLSearchParams(hashParams);
    const token = params.get('access_token');
    
    return token;
  }

  async function api_call(token: string) {
    let api_result = await fetch(googleResourceUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    
    if (!api_result.ok) {
      const errorText = await api_result.text();
      throw new Error(`API call failed: ${api_result.status} ${errorText}`);
    }
    
    const json = await api_result.json();
    return json;
  }

  getGoogleData();
}, [setToken]);

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

        <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
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

