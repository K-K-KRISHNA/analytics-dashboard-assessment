import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import React, { useEffect, useMemo, useState } from "react";
import { EVColumns, EVTableProps } from "../../types/EvTypes";

const EVPieChart = ({
  data,
  isGroupByModels,
}: {
  data: EVTableProps["data"];
  isGroupByModels: boolean;
}) => {
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

  const groupDataByModel = (data: EVColumns[]) => {
    const groupedData: { [key: string]: number } = {};
    data.forEach((item) => {
      const model = item.model;
      if (groupedData[model]) {
        groupedData[model]++;
      } else {
        groupedData[model] = 1;
      }
    });
    const sortedData = Object.keys(groupedData)
      .map((model) => ({
        label: model,
        value: groupedData[model],
      }))
      .sort((first, second) => second.value - first.value);
    if (sortedData.length > 5) {
      const top5Models = sortedData.slice(0, 5);
      const others = sortedData.slice(5).reduce(
        (acc, curr) => {
          acc.value += curr.value;
          return acc;
        },
        { label: "Others", value: 0 }
      );
      return [...top5Models, others];
    }

    return sortedData;
  };

  useEffect(() => {
    const groupedData = isGroupByModels
      ? groupDataByModel(data)
      : groupDataByCountry(data);
    setPieData(groupedData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Typography variant="h1">
            {isGroupByModels ? "Model" : "County"} wise Vehicle Distribution
          </Typography>
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
              innerRadius: isGroupByModels ? 70 : undefined,
              outerRadius: isGroupByModels ? 90 : undefined,
            },
          ]}
          colors={
            isGroupByModels
              ? [
                  "#D0A2F7",
                  "#A72693",
                  "#D2DE32",
                  "#B7EFCD",
                  "#FF4545",
                  "#FDD043",
                ]
              : undefined
          }
          height={moreThan400 ? 200 : 200}
        />
      </Stack>
    </Box>
  );
};
export default EVPieChart;
