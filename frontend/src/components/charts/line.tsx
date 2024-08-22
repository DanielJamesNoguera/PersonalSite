import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

const SimpleLineChart = ({ chartData, keys, target, domain }: any) => {
  console.log(chartData, keys)

  interface DataPoint {
    [key: string]: any;
  }

  const calculateTrendLine = (data: DataPoint[], key: keyof DataPoint): DataPoint[] => {
    const n = data.length;
    const sumX = data.reduce((sum, _, index) => sum + index, 0);
    const sumY = data.reduce((sum, point) => sum + (point[key] as number), 0);
    const sumXY = data.reduce((sum, point, index) => sum + index * (point[key] as number), 0);
    const sumXX = data.reduce((sum, _, index) => sum + index * index, 0);
  
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
  
    return data.map((point, index) => ({
      ...point,
      Trend: ((intercept + slope * index).toFixed(2)),
    }));
  };

  const [trendData, setTrendData] = useState<DataPoint[]>([]);
  const [maxValue, setMaxValue] = useState<number>(0);

  useEffect(() => {
    const trendData = calculateTrendLine(chartData, keys[0]);
    const maxValue = Math.max(...chartData.map((point: any) => Math.max(point[keys[0]], point[keys[0]])));
    console.log(trendData);
    setMaxValue(maxValue);
    setTrendData(trendData);
  }, [chartData]);

  const CustomLabel = (viewBox: any ) => {
    const { x, y, value } = viewBox;
    return (
      <text x={x + 5} y={y - 10} fill="red" fontSize={12} textAnchor="middle">
        {value}
      </text>
    );
  };

  return (
    <ResponsiveContainer height={450}>
      <LineChart
        width={500}
        height={300}
        data={chartData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        {domain ? <YAxis domain={domain} /> : <YAxis />}
        <Tooltip />
        <Legend />
        {keys.map((key: any) => (
          <Line type="monotone" dataKey={key} stroke="#8884d8" activeDot={{ r: 8 }} />
        ))}
        <Line type="monotone" dataKey="Trend" data={trendData} stroke="#ff7300" dot={false} />
        <ReferenceLine y={maxValue} label={<CustomLabel viewBox={{ x: 0, y: maxValue, value: maxValue }} />} stroke="red" strokeDasharray="3 3" />

        {target && <ReferenceLine y={target} label={<CustomLabel viewBox={{ x: 0, y: target, value: target }} />} stroke="green" strokeDasharray="3 3" />}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;