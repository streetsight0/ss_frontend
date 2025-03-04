import { PieChart } from '@mui/x-charts/PieChart';

export default function PieChartBillBoardStatus() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Active' },
            { id: 1, value: 15, label: 'Inactive' },
            { id: 2, value: 20, label: 'Available' },
          ],
          innerRadius: 30,
          outerRadius: 100,
        },
      ]}
      width={400}
      height={300}
    />
  );
}
