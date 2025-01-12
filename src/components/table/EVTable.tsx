import {
  KeyboardArrowDownSharp,
  KeyboardArrowUpSharp,
  SearchOutlined,
} from "@mui/icons-material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  Button,
  Collapse,
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
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { EVColumns, EVTableProps, SortByTypes } from "../../types/EvTypes.ts";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FF6500",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Row(props: { row: EVColumns; columns: EVTableProps["columns"] }) {
  const { row, columns } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {columns.map((each) => {
          const value = row[each.key];
          return (
            <StyledTableCell align="center">
              {value === "0" ? "N/A" : value}
            </StyledTableCell>
          );
        })}
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                fontSize={14}
                variant="h6"
                gutterBottom
                component="div"
              >
                Other Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">EV Type</TableCell>
                    <TableCell align="center">CAFV Eligibility</TableCell>
                    <TableCell align="center">Legislative District</TableCell>
                    <TableCell align="center">Electric Utility</TableCell>
                    <TableCell align="center">Location</TableCell>
                    <TableCell align="center">Base MSRP</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.vin + row.vehicleID}>
                    <TableCell align="center" sx={{ fontSize: "10px" }}>
                      {row.eat}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "10px" }}>
                      {row.cafv}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "10px" }}>
                      {row.district}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "10px" }}>
                      {row.electricUtility}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "10px" }}>
                      {row.vehicleLocation}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "10px" }}>
                      {row.baseMsrp === "0" ? "N/A" : row.baseMsrp}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const EVTable = ({ columns, data: rawData }: EVTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchBy, setSearchBy] = useState<"City" | "County" | "Make">("City");
  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState<EVTableProps["data"]>(rawData);
  const [sortBy, setSortBy] = useState<SortByTypes>("NONE");

  const handleChangePage = (_event: unknown, newPage: number) => {
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
        case "County":
          return each.country
            ?.toLocaleLowerCase()
            .includes(text.toLocaleLowerCase());
        case "Make":
          return each.make
            ?.toLocaleLowerCase()
            .includes(text.toLocaleLowerCase());
        default:
          return each.city
            ?.toLocaleLowerCase()
            .includes(text.toLocaleLowerCase());
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
    <Box sx={{ width: "100%", overflow: "hidden", p: 1 }}>
      <Typography variant="h1" mb={5}>
        Detailed Vehicle Information
      </Typography>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={3}
        mb={2}
      >
        <TextField
          sx={{ fontSize: "12px" }}
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
                    sx={{
                      fontSize: "12px",
                      textTransform: "capitalize",
                      width: 130,
                      color: "#FF6500",
                    }}
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
          <Box width={"120px"}>
            <Select
              sx={{ fontSize: "12px" }}
              fullWidth
              size="small"
              value={sortBy}
              onChange={selectionHandler}
            >
              {sortByOptions.map((each) => (
                <MenuItem sx={{ fontSize: "12px" }} value={each.value}>
                  {each.text}
                </MenuItem>
              ))}
            </Select>
          </Box>
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
      <TableContainer
        sx={{
          maxHeight: 600,
          borderRadius: "5px",
          border: `solid 2px #E16A54`,
          "::-webkit-scrollbar": {
            width: "7.5px",
          },

          /* Track */
          "::-webkit-scrollbar-track": {
            borderRadius: "10px",
          },

          /* Handle */
          "::-webkit-scrollbar-thumb": {
            background: "#FF650050",
            borderRadius: "10px",
          },

          /* Handle on hover */
          "::-webkit-scrollbar-thumb:hover": {
            background: "#FF6500 ",
          },
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.key} align={"center"}>
                  {column.text}
                </StyledTableCell>
              ))}
              <StyledTableCell key={"action"} align={"center"}>
                Action
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row row={row} columns={columns} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length === 0 ? (
        <Stack justifyContent={"center"} alignItems={"center"} height={300}>
          <Typography textAlign={"center"}>Data Not Found</Typography>
        </Stack>
      ) : (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {["City", "County", "Make"].map((each) => (
          <MenuItem
            disableTouchRipple
            onClick={() => handleClose(each as typeof searchBy)}
            sx={{ fontSize: "12px" }}
          >
            {each}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default EVTable;
