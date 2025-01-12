import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import React, { useEffect, useMemo, useState } from "react";
import { EVColumns, EVTableProps } from "../../types/EvTypes";

const EVPieChart = ({ data }: { data: EVTableProps["data"] }) => {
  const [pieData, setPieData] = useState<{ label: string; value: number }[]>(
    []
  );
  const moreThan400 = useMediaQuery("(min-width:400px)");
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

  const total = useMemo(() => {
    let sum = 0;
    for (let each of pieData) {
      sum += each.value;
    }
    return sum;
  }, [pieData]);

  return (
    <Box sx={{ width: "100%", py: 2 }}>
      <Stack direction={"column"} justifyContent={"space-between"}>
        <Stack mb={10}>
          <Typography variant="h1">County-wise Vehicle Distribution</Typography>
          <Typography variant="body2">
            ( Tap on Each Portion To View More Details )
          </Typography>
        </Stack>
        <PieChart
          series={[
            {
              valueFormatter: (obj) =>
                `${obj.value} ( ${((obj.value / total) * 100).toFixed(2)}% )`,
              data: pieData,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          height={moreThan400 ? 200 : 200}
        />
      </Stack>
    </Box>
  );
};
export default EVPieChart;
