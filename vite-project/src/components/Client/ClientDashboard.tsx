import {  Card,  Stack } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from "axios";
import { useEffect, useState } from 'react';
import './ClientDashboard.css';

interface Client {
    _id: string; 
    client_name: string;
    client_email: string;
    company_name: string;
    additional_companies: string[];
    address: string;
    contact: string;
}
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ClientDashboard() {
  const [clients, setClients] = useState<Client[]>([]);
   useEffect(() => {
    const getClients = async () =>{
      try {
        const response = await axios.get(`${BASE_URL}/api/client/getclients`);
        console.log(response.data.data)
        setClients(response.data.data); 
      }
      catch (error){
        console.log(error);
      }
    };
    getClients();
  }, []);
  return (
    <Card sx={{ backgroundColor: "#2B2B2B", width: "369.33px", height: "228px", borderRadius: "20px", padding:"24px 32px 24px 32px", position: "relative", }}>
        <Stack sx={{display: "flex", flexDirection: "column", gap:"10px"}}>
            <Stack sx={{display: "flex", flexDirection: "row", gap: "43px"}}>
                <div>
                    <p className="heading-c">Total Clients</p>
                    <p className="heading-2c">{clients.length}</p>
                    <p className="lastMonthc">current month</p>
                </div>
            </Stack>
            <Stack sx={{display: "flex", flexDirection: "row",  justifyContent: "center", alignContent:"center",paddingBottom: "50px"}}>
                <div>
                    <PieChart
                        width={500} // Set width for visibility
                        height={170}
                        series={[
                        {
                            data: [
                            { id: 0, value: clients.length,  color:"#20CF23" },
                            { id: 1, value: 100,  color:"#FFF" }
                            ],
                            innerRadius: 30,
                            outerRadius: 60,
                        },
                        ]}
                       sx={{paddingLeft:'70px', paddingBottom: "30px"}}
                    />
                </div>
            </Stack>
        </Stack>
      

    </Card>

  );
}
