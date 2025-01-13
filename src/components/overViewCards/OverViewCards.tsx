import { Box, Grid2, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { best, bestYear, speedoMeter, totalEVs } from "../../assets/assets.ts";
import { EachCardData, EVTableProps } from "../../types/EvTypes.ts";

const colors = [
  ["rgba(34, 193, 195, 0.5)", "rgba(253, 187, 45, 0.5)"],
  ["rgba(195,79,34,0.5)", "rgba(146,45,253,0.5)"],
  ["rgba(34,108,195,0.5)", "rgba(144,253,45,0.5)"],
  [" rgba(253,45,235,0.5)", "rgba(34,195,58,0.5)"],
];

const getCard = (
  title: string,
  value: string,
  imgPath: string,
  index: number
) => {
  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={imgPath}>
      <Paper
        elevation={3}
        sx={{
          height: 150,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          background: `linear-gradient(${index * 30}deg, ${
            colors[index][0]
          }  0%,${colors[index][1]} 100%)`,
        }}
      >
        <Box
          component={"img"}
          src={imgPath}
          sx={{ width: "100px", height: "100px" }}
        />
        <Box gap={3}>
          <Typography variant={"h3"}>{title}</Typography>
          <Typography variant="h3">{value}</Typography>
        </Box>
      </Paper>
    </Grid2>
  );
};

const OverViewCards = ({ data }: { data: EVTableProps["data"] }) => {
  const [cardsData, setCardsData] = useState<EachCardData[]>([]);
  useEffect(() => {
    if (data) {
      fillData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const getManufacturer = () => {
    const makeCounts = {};
    for (const evColumn of data) {
      const make = evColumn.make;
      makeCounts[make] = (makeCounts[make] || 0) + 1;
    }
    let topMake = "";
    let maxCount = 0;
    for (const make in makeCounts) {
      if (makeCounts[make] > maxCount) {
        maxCount = makeCounts[make];
        topMake = make;
      }
    }
    return topMake;
  };
  function getAvgRange() {
    const validRanges = data.filter(
      (evColumn) => evColumn.range !== "0" && evColumn.range !== ""
    );
    const totalRange = validRanges.reduce(
      (sum, evColumn) => sum + parseFloat(evColumn.range),
      0
    );
    const avgRange = totalRange / validRanges.length;
    return avgRange;
  }
  function findYearOfHighestEVGrowth() {
    const evsByYear = {};
    for (const ev of data) {
      const year = ev.modalYear;
      evsByYear[year] = evsByYear[year] || 0;
      evsByYear[year]++;
    }
    let prevYearCount = 0;
    let highestGrowthYear: null | string = null;
    let highestGrowthPercentage = 0;

    for (const year in evsByYear) {
      const currentYearCount = evsByYear[year];
      if (prevYearCount > 0) {
        const growthPercentage =
          ((currentYearCount - prevYearCount) / prevYearCount) * 100;
        if (growthPercentage > highestGrowthPercentage) {
          highestGrowthPercentage = growthPercentage;
          highestGrowthYear = year;
        }
      }
      prevYearCount = currentYearCount;
    }
    return highestGrowthYear;
  }

  const fillData = () => {
    const card1: EachCardData = {
      title: "Total EV's Registered",
      value: data.length.toString(),
      imagePath: totalEVs,
    };
    const card2: EachCardData = {
      title: "Top EV Manufacturer",
      value: getManufacturer(),
      imagePath: best,
    };
    const card3: EachCardData = {
      title: "Avg. Range",
      value: getAvgRange().toFixed(2).toString(),
      imagePath: speedoMeter,
    };
    const card4: EachCardData = {
      title: "Top Year On EV Growth",
      value: findYearOfHighestEVGrowth() ?? "20240",
      imagePath: bestYear,
    };
    setCardsData([card1, card2, card3, card4]);
  };
  return (
    <Stack>
      <Typography
        fontWeight={"bold"}
        sx={{
          textAlign: "center",
          fontSize: "28px",
          mb: 4,
          color: "#001A6E",
        }}
      >
        Electric Vehicle Data Explorer
      </Typography>
      <Grid2 container spacing={2}>
        {cardsData.map((card, index) =>
          getCard(card.title, card.value, card.imagePath, index)
        )}
      </Grid2>
    </Stack>
  );
};

export default OverViewCards;
