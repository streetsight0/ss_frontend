import { LineChart } from '@mui/x-charts/LineChart';
import axios from "axios";
import { useEffect, useState } from 'react';
import '../CampaignCard/CampaignDashboard.css';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Define all months in order
const allMonths = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

export default function LineGraph() {
  const [totalAmountSum, setTotalAmountSum] = useState(0);
  const [chartData, setChartData] = useState<{ month: string; amount: number }[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/invoice/getinvoices`);
        console.log(response.data);

        // Convert response data into a map for easy lookup
        const invoiceMap = new Map(response.data.map((invoice: { month: string; totalAmount: number }) => [invoice.month, invoice.totalAmount]));

        // Ensure all months are included in the chart data
        const formattedData: any = allMonths.map((month) => ({
          month,
          amount: invoiceMap.get(month) || 0, // Default to 0 if month is missing
        }));

        setChartData(formattedData);
        setTotalAmountSum(formattedData.reduce((acc: any, item: { amount: any; }) => acc + item.amount, 0));
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <>
      <p className='heading-3'>Total Revenue</p>
      <p className='heading-2'>${totalAmountSum}</p>
      <LineChart
        width={1300}
        height={389}
        series={[
          { data: chartData.map((item) => item.amount), color: "#C7B0F6",
            area: true },
        ]}
        xAxis={[{ scaleType: "point", data: allMonths }]} 
        tooltip={{
          trigger: "item",
          sx: {
            backgroundColor: "#4A90E2", // dark bluish background
            color: "#ffffff", // white text
          },
        }}
      />
    </>
  );
}


