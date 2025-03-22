import { Box } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from "axios";
import { useEffect, useState } from 'react';
import '../CampaignCard/CampaignDashboard.css';

const BASE_URL = import.meta.env.VITE_BASE_URL;
interface Billboard {
  _id: string;
  billboard_series: string;
  leaseEnd: string;
  location: any;
}
export default function PieChartBillBoardStatus() {
   const [billboardData, setBillboardData] = useState<Billboard[]>([]);
   useEffect(() => {
    const getBillBoards = async () =>{
      try {
        const response = await axios.get(`${BASE_URL}/api/billboard/getbillboards`);
        console.log(response.data)
        setBillboardData(response.data); 
      }
      catch (error){
        console.log(error);
      }
    };
    getBillBoards();
  }, []);
  return (
    <Box sx={{ p:2, width: "369.33px", height: "228px", borderRadius: "25px" }}>
        <p className='heading'>Billboards</p>
        <p className='heading-2'>{billboardData.length}</p>
        <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'Active', color:"#20CF23" },
              { id: 1, value: 15, label: 'Inactive', color: "#FFC737" },
              { id: 2, value: 20, label: 'Available',color: "#A183DC" },
            ],
            innerRadius: 70,
            outerRadius: 100,
          },
        ]}
        width={400}
        height={200}
      />
    </Box>

  );
}
