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
  status: string; // Assuming `status` field exists for each billboard
}

export default function PieChartBillBoardStatus() {
  const [billboardData, setBillboardData] = useState<Billboard[]>([]);

  // Fetch billboard data on component mount
  useEffect(() => {
    const getBillBoards = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/billboard/getbillboards`);
        console.log(response.data);
        setBillboardData(response.data); 
      }
      catch (error) {
        console.log(error);
      }
    };
    getBillBoards();
  }, []);

  // Calculate the count for each status (active, inactive, available)
  const calculateStatusCounts = (data: Billboard[]) => {
    const counts = { active: 0, inactive: 0, available: 0 };
    
    data.forEach(billboard => {
      if (billboard.status === 'active' ||billboard.status === 'Active') {
        counts.active += 1;
      } else if (billboard.status === 'inactive') {
        counts.inactive += 1;
      } else if (billboard.status === 'available' ||billboard.status ===  'Available') {
        counts.available += 1;
      }
    });
    
    return counts;
  };
  
  // Get counts for each status
  const { active, inactive, available } = calculateStatusCounts(billboardData);

  return (
    <Box sx={{ p:2, width: "369.33px", height: "228px", borderRadius: "25px" }}>
      <p className='heading'>Billboards</p>
      <p className='heading-2'>{billboardData.length}</p>
      
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: active, label: 'Active', color: "#20CF23" },
              { id: 1, value: inactive, label: 'Inactive', color: "#FFC737" },
              { id: 2, value: available, label: 'Available', color: "#A183DC" },
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
