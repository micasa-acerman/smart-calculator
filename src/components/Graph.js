import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const TEST_DATA = [
  {
    name: '1',
    uv: 4000,
    pv: 2400
  },
  {
    name: '2',
    uv: 3000,
    pv: 1398
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300
  }
];

export default function Graph({ data }) {
  console.log(data);
  return (
    <ResponsiveContainer width={730} height={250}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          name="Функция"
          dataKey="function"
          stroke="#9b59b6"
          displayName="Martinsh"
        />
        <Line name="Точки" type="monotone" dataKey="points" stroke="#1abc9c" />
      </LineChart>
    </ResponsiveContainer>
  );
}
