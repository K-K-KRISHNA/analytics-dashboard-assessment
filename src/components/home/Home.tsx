import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import Table from "../table/EVTable.tsx";
import { columns, EVColumns, evColumnsKeys } from "./../../types/EvTypes.ts";
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

  return <Table columns={columns} data={finalData} />;
};

export default Home;
