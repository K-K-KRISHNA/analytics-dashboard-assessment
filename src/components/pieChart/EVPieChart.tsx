import { Paper, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import React, { useEffect, useState } from "react";
import { EVColumns, EVTableProps } from "../../types/EvTypes";

const EVPieChart = ({ data, columns }: EVTableProps) => {
  const [pieData, setPieData] = useState<{ label: string; value: number }[]>(
    []
  );
  const groupDataByCountry = (data: EVColumns[]) => {
    const groupedData: { [key: string]: number } = {};
    data.forEach((item) => {
      const country = item.country;
      if (groupedData[country]) {
        groupedData[country]++;
      } else {
        groupedData[country] = 1;
      }
    });
    const sortedData = Object.keys(groupedData)
      .map((country) => ({
        label: country,
        value: groupedData[country],
      }))
      .sort((first, second) => second.value - first.value);
    if (sortedData.length > 5) {
      const top5Countries = sortedData.slice(0, 5);
      const others = sortedData.slice(5).reduce(
        (acc, curr) => {
          acc.value += curr.value;
          return acc;
        },
        { label: "Others", value: 0 }
      );
      return [...top5Countries, others];
    }
    return sortedData;
  };

  useEffect(() => {
    const groupedData = groupDataByCountry(data);
    setPieData(groupedData);
  }, [data]);

  return (
    <Paper sx={{ width: "100%", py: 2 }}>
      <Stack direction={"column"} justifyContent={"space-around"}>
        <Typography mb={10} fontWeight={"bold"} textAlign={"center"}>
          County-wise Vehicle Distribution
        </Typography>
        <PieChart
          series={[
            {
              data: pieData,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          height={200}
        />
      </Stack>
    </Paper>
  );
};
export default EVPieChart;
