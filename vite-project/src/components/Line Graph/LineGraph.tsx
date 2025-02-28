import { LineChart } from '@mui/x-charts/LineChart';

const lastYear = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 2000, 2780, 1890, 2390, 3490];
const currentYear = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 3908, 4800, 3800, 4300, 6849];
const xLabels = [
  'Jan',
   'Feb',
   'Mar',
   'Apr',
   'May',
   'Jun',
   'Jul',
   'Aug',
   'Sep',
   'Oct',
   'Nov',
   'Dec'
];

export default function LineGraph() {
  return (
    <LineChart
      width={900}
      height={400}
      series={[
        { data: lastYear, label: 'Last Year' },
        { data: currentYear, label: 'Current Year' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}
