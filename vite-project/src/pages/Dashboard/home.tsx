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

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="mainDiv">
      <Paper
        elevation={3}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "row", // Align text and images side by side
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

