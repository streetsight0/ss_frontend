import { Typography, Paper, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LineGraph from "../../components/Line Graph/LineGraph";
import PieChartBillBoardStatus from "../../components/Pie Chart/PieChartBillBoardStatus";
import CustomButton from "../../components/Button/Button"; 


const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

const Home = () => {
  return (
    <>
    <Typography variant="h4" align="left" fontStyle="bold" marginBottom="20px">
        Dashboard
    </Typography>
    <Paper
          elevation={3}
          sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              maxWidth: 1200,
              borderRadius: 2,
              bgcolor: "background.paper",
          }}
    >
        <Typography variant="h5" fontWeight="bold">
            {getGreeting()}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Why did the billboard apply for a job? It wanted to make a big impression!
        </Typography>
        <CustomButton
            label="Add Billboard"
            icon={<AccessTimeIcon />} 
            sx={{ mt: 2 }}
        />
    </Paper>
    <LineGraph />
    <Box sx={{ bgcolor: "#E8E7E7", p:2, width: "380px", height: "280px", borderRadius: "25px" }}>
        <Typography variant="h5" align="left" fontStyle="bold">
            Billboard
        </Typography>
        <PieChartBillBoardStatus />
    </Box>
    </>
  );
};

export default Home;

