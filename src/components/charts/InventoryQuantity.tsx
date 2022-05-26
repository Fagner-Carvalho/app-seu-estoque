import Typography from '@mui/material/Typography';
import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export default function InventoryQuantity(props: any) {
  const { data } = props;
  const green = '#4caf50';
  const orange = '#ff9800';
  const red = '#f44336';

  // eslint-disable-next-line consistent-return
  const getColor = (percent: number) => {
    if (percent >= 21) { return green; }
    if (percent >= 1 && percent <= 20) { return orange; }
    if (percent <= 0) { return red; }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom component="div" align="center">
        Quantidade no estoque por item
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar stackId="a" dataKey="value">
            {data.map((entry: { percentageminimuminventory: number; }) => (
              <Cell key="1" fill={getColor(entry.percentageminimuminventory)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
