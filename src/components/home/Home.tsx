import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import csvFile from "./Electric_Vehicle_Population_Data.csv";
const Home = () => {
  const [jsonData, setJsonData] = useState<string[] | null>(null);
  const [finalData, setFinalData] = useState<any>(null);

  useEffect(() => {
    fetch(csvFile)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          complete: (result) => {
            setJsonData(result.data);
            converter(result.data);
          },
        });
      })
      .catch((error) => console.error("Error loading CSV:", error));
  }, []);

  const converter = (rows: string[][]) => {
    const headers = rows[0];
    const jsonData = rows.slice(1).map((row) => {
      const values = row;
      const obj = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = values[index]?.trim();
      });
      return obj;
    });
    setFinalData(jsonData);
  };

  return <h1>Hello World</h1>;
};

export default Home;
