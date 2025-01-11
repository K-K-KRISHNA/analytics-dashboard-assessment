import { Stack } from "@mui/material";
import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import EVBarCharts from "../barchart/EVBarChart.tsx";
import EVPieChart from "../pieChart/EVPieChart.tsx";
import { columns, EVColumns, evColumnsKeys } from "./../../types/EvTypes.ts";
import EVTable from "./../table/EVTable.tsx";
import csvFile from "./Electric_Vehicle_Population_Data.csv";
const Home = () => {
  const [finalData, setFinalData] = useState<EVColumns[]>([]);

  useEffect(() => {
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

  return (
    <Stack p={2} gap={6} sx={{ boxSizing: "border-box" }}>
      <Stack
        alignItems={"center"}
        direction={{ xs: "column", lg: "row" }}
        justifyContent={"space-between"}
      >
        <EVPieChart columns={columns} data={finalData} />
        <EVBarCharts columns={columns} data={finalData} />
      </Stack>
      <EVTable columns={columns} data={finalData} />
    </Stack>
  );
};

export default Home;
