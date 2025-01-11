import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { EVColumns, EVTableProps } from "../../types/EvTypes";

type SingleData = {
  name: number;
  Tesla: number;
  Chevrolet: number;
  Nissan: number;
  others: number;
};
const EVBarCharts = ({ columns, data }: EVTableProps) => {
  const [barData, setBarData] = useState<SingleData[]>([]);
  function groupByYearWithMakes(rawData: EVColumns[]): SingleData[] {
    const targetMakes = ["TESLA", "NISSAN", "CHEVROLET"];
    const groupedData: { [year: string]: { [make: string]: number } } = {};
    rawData.forEach(({ modalYear, make }) => {
      if (!groupedData[modalYear]) {
        groupedData[modalYear] = {};
      }

      const key = targetMakes.includes(make) ? make : "OTHERS";
      groupedData[modalYear][key] = (groupedData[modalYear][key] || 0) + 1;
    });

    const result: SingleData[] = Object.entries(groupedData).map(
      ([year, makes]) => {
        const yearData: SingleData = {
          name: Number(year),
          Tesla: makes["TESLA"] || 0,
          Chevrolet: makes["CHEVROLET"] || 0,
          Nissan: makes["NISSAN"] || 0,
          others: makes["OTHERS"] || 0,
        };
        return yearData;
      }
    );

    return result;
  }

  useEffect(() => {
    const temp = groupByYearWithMakes(data);
    setBarData(temp);
  }, [data]);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <Typography textAlign={"center"} fontWeight={"bold"}>
        Last 10 Years Trends in EV Production
      </Typography>
      <ResponsiveContainer>
        <BarChart
          data={barData.filter((each) => each.name >= 2014)}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Tesla" fill="#8884d8" />
          <Bar dataKey="Chevrolet" fill="#82ca9d" />
          <Bar dataKey="Nissan" fill="#52ca9d" />
          <Bar dataKey="others" fill="#12ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EVBarCharts;
