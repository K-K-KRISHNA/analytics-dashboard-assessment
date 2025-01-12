import { Box, Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import EVBarCharts from "../barchart/EVBarChart.tsx";
import EVPieChart from "../pieChart/EVPieChart.tsx";
import { columns, EVColumns, evColumnsKeys } from "./../../types/EvTypes.ts";
import EVTable from "./../table/EVTable.tsx";
import Loading from "./Animation - 1736649610454.json";
import csvFile from "./Electric_Vehicle_Population_Data.csv";

const Home = () => {
  const [finalData, setFinalData] = useState<EVColumns[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    fetch(csvFile)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          complete: (result) => {
            converter(result.data);
          },
        });
      })
      .catch((error) => console.error("Error loading CSV:", error));
  }, []);

  const converter = (rows: string[][]) => {
    const jsonData = rows.slice(1, rows.length - 1).map((row) => {
      const values = row;
      const obj = {};
      evColumnsKeys.forEach((header, index) => {
        obj[header] = values[index]?.trim();
      });
      return obj as EVColumns;
    });
    setFinalData(jsonData);
  };

  if (isLoading)
    return (
      <Stack
        width={"100%"}
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ backgroundColor: "#FF650020" }}
      >
        <Box width={{ xs: 200, sm: 275, md: 450 }}>
          <Lottie animationData={Loading} loop={true} />
          <Typography
            fontWeight={"bold"}
            fontSize={16}
            color="primary"
            mt={{ xs: 0, md: -7.5 }}
            textAlign={"center"}
          >
            Please Wait We are Preparing the Best...
          </Typography>
        </Box>
      </Stack>
    );

  return (
    <Stack
      p={2}
      rowGap={10}
      sx={{ boxSizing: "border-box", backgroundColor: "#FF650020" }}
    >
      <Stack
        alignItems={"center"}
        direction={{ xs: "column", lg: "row" }}
        justifyContent={"space-between"}
        rowGap={10}
      >
        <EVPieChart data={finalData} />
        <EVBarCharts data={finalData} />
      </Stack>
      <EVTable columns={columns} data={finalData} />
    </Stack>
  );
};

export default Home;
