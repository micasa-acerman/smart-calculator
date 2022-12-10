import React from 'react';
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

export default function Graph({ data }) {
  console.log(data);
  return (
    <ResponsiveContainer width={600} height={250}>
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
