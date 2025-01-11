import {
  KeyboardArrowDownSharp,
  KeyboardArrowUpSharp,
  SearchOutlined,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { EVTableProps, SortByTypes } from "../../types/EvTypes.ts";

const EVTable = ({ columns, data: rawData }: EVTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchBy, setSearchBy] = useState<"City" | "Country" | "Make">("City");
  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState<EVTableProps["data"]>(rawData);
  const [sortBy, setSortBy] = useState<SortByTypes>("NONE");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const sortByOptions: { value: SortByTypes; text: string }[] = [
    {
      value: "NONE",
      text: "None",
    },
    {
      value: "SORT_BY_MODAL_YEAR_HIGH_TO_LOW",
      text: `Modal Year ${String.fromCharCode(8593)}`,
    },
    {
      value: "SORT_BY_MODAL_YEAR_LOW_TO_HIGH",
      text: `Modal Year ${String.fromCharCode(8595)}`,
    },
    {
      value: "SORT_BY_RANGE_HIGH_TO_LOW",
      text: `Range ${String.fromCharCode(8593)}`,
    },
    {
      value: "SORT_BY_RANGE_LOW_TO_HIGH",
      text: `Range ${String.fromCharCode(8595)}`,
    },
  ];

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type?: typeof searchBy) => {
    if (type) setSearchBy(type);
    setAnchorEl(null);
  };
  const selectionHandler = (event: SelectChangeEvent<SortByTypes>) => {
    const value: SortByTypes = event.target.value as SortByTypes;
    setSortBy(value);
    searchSortCombination(searchText, value);
  };
  const searchSortCombination = (text = searchText, activeSortBy = sortBy) => {
    let updatedData = rawData;

    updatedData = updatedData.filter((each) => {
      switch (searchBy) {
        case "Country":
          return each.country
            ?.toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase());
        case "Make":
          return each.make
            ?.toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase());
        default:
          return each.city
            ?.toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase());
      }
    });

    switch (activeSortBy) {
      case "SORT_BY_MODAL_YEAR_LOW_TO_HIGH":
        updatedData.sort(
          (first, second) => Number(first.modalYear) - Number(second.modalYear)
        );
        break;
      case "SORT_BY_MODAL_YEAR_HIGH_TO_LOW":
        updatedData.sort(
          (first, second) => Number(second.modalYear) - Number(first.modalYear)
        );
        break;
      case "SORT_BY_RANGE_LOW_TO_HIGH":
        updatedData.sort(
          (first, second) => Number(first.range) - Number(second.range)
        );
        break;
      case "SORT_BY_RANGE_HIGH_TO_LOW":
        updatedData.sort(
          (first, second) => Number(second.range) - Number(first.range)
        );
        break;
      default:
        break;
    }

    setData(updatedData);
  };

  useEffect(() => {
    setData(rawData);
  }, [rawData]);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <TextField
          size="small"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Button
                    disableElevation
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                    endIcon={
                      anchorEl !== null ? (
                        <KeyboardArrowUpSharp />
                      ) : (
                        <KeyboardArrowDownSharp />
                      )
                    }
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    variant="text"
                    sx={{ fontSize: "12px", textTransform: "capitalize" }}
                  >
                    Search By {searchBy}
                  </Button>
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton
                  onClick={() => searchSortCombination(searchText, sortBy)}
                >
                  <SearchOutlined />
                </IconButton>
              ),
            },
          }}
        />
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <Typography>Sort By</Typography>

          <Select size="small" value={sortBy} onChange={selectionHandler}>
            {sortByOptions.map((each) => (
              <MenuItem value={each.value}>{each.text}</MenuItem>
            ))}
          </Select>
          <Stack alignItems={"center"}>
            <Typography fontWeight={"bold"} fontSize={"10px"}>
              Low to High {String.fromCharCode(8595)}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={"10px"}>
              High to Low {String.fromCharCode(8593)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key} align={"center"}>
                  {column.text}
                </TableCell>
              ))}
              <TableCell key={"action"} align={"center"}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column, index) => {
                      const value = row[column.key];
                      return (
                        <TableCell
                          key={column.key + "" + index}
                          align={"center"}
                        >
                          {value === "0" ? "N/A" : value}
                        </TableCell>
                      );
                    })}
                    <TableCell align={"center"}>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ fontSize: "10px", textTransform: "capitalize" }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          disableTouchRipple
          onClick={() => handleClose("City")}
          sx={searchBy === "City" ? { color: "red" } : { color: "inherit" }}
        >
          City
        </MenuItem>
        <MenuItem
          disableTouchRipple
          sx={searchBy === "Country" ? { color: "red" } : { color: "inherit" }}
          onClick={() => handleClose("Country")}
        >
          Country
        </MenuItem>
        <MenuItem
          disableTouchRipple
          sx={searchBy === "Make" ? { color: "red" } : { color: "inherit" }}
          onClick={() => handleClose("Make")}
        >
          Make
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default EVTable;
