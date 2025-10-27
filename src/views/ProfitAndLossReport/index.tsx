import React, { useMemo, useState, useEffect, useCallback } from "react";
import {
  Box,
  Grid,
  Typography,
  debounce,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { DatePicker, Select } from "../../components/basic";
import moment from "moment";
import dayjs from "dayjs";
import ProductRow from "./ProductRow";
import { getProfitAndLossSummary } from "../../services/profitAndLossService";
import { utils, writeFile } from "xlsx";
import { ExcelIcon } from "../../assets/icons";

const ProfitAndLossReport = () => {
  const styles = useMemo(
    () => ({
      tableContainerStyle: {
        borderRadius: "5px",
        boxShadow: "none",
        // overflow: "hidden",
        width: "auto",
        overflowX: { xs: "scroll", lg: "scroll" },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        ml: 3,
        mt: 2,
      },
      tableStyle: {
        borderRadius: "5px",
        border: "1px solid",
        borderColor: "var(--table-border)",
        width: "auto",
        overflowX: { xs: "scroll", lg: "scroll" },

        //  {
        // xs: "400vw",
        // sm: "200vw",
        // md: "120vw",
        // lg: "80vw",
        // },
        "& .MuiTableHead-root": {
          border: 0,
          borderRadius: "5px",
          width: "auto",
        },
        "& .MuiTableRow-head": {
          backgroundColor: "var(--table-header)",
          width: "auto",
        },
        " & .MuiTableBody-root": {
          border: 0,
        },
        "& .MuiTableRow-root": {
          height: "40px !important",
          maxHeight: "34px !important",
          minHeight: "0px",
          lineHeight: "0px",
          border: 0,
        },

        "& .MuiTableCell-root": {
          minHeight: "0px",
        },

        "& .MuiTableCell-head": {
          width: "auto",
          minWidth: "75px !important",
          height: "43px",
          maxHeight: "43px",
          minHeight: "0px",
          lineHeight: "0px",
          p: "0px 10px",
          fontSize: "13px",
          fontWeight: "600",
          borderBottom: 0,
          borderRight: 1,
          // borderRadius: "5px",
          borderColor: "var(--table-border)",
        },

        "& .MuiTableCell-body": {
          height: "40px !important",
          maxHeight: "32px !important",
          minHeight: "0px",
          lineHeight: "0px",
          p: "0px 10px",
          fontSize: "12px",
          fontWeight: "400",
          border: 1,
          borderColor: "var(--table-border)",
        },

        "& .MuiTableCell-body:has(.Mui-focused)": {
          borderColor: "primary.main",
          borderWidth: "2px",
          p: "0px",
          height: "31px",
        },

        "& .MuiTableCell-body:has(.css-1t4mgmb-MuiGrid-root)": {
          borderColor: "primary.main",
          borderWidth: "2px",
          p: "0px",
          height: "30px",
        },
        "& .deleteIconGrid": {
          cursor: "pointer",
          position: "absolute",
          right: {
            xs: "-10vw",
            sm: "-10vw",
            md: "-6vw",
            lg: "-2vw",
          },

          bottom: "5px",
        },
        "& .delete-icon": {
          mr: {
            xs: "10px",
            sm: "40px",
            md: "20px",
            lg: "0px",
          },
          mb: {
            xs: "5px",
          },
        },
      },
      textFieldStyle: {
        height: "34px",
        width: "auto",
        fontSize: "6px",

        "&>*": {
          border: 0,
        },
        "& .MuiOutlinedInput-root": {
          height: "34px",
          borderRadius: "0px",
          paddingLeft: "0px",
        },
        "& .MuiOutlinedInput-root.Mui-focused": {
          borderColor: "primary.main",
        },
        "& .MuiInputBase-input": {
          padding: "0px 10px",
          fontSize: "12px",
          fontWeight: "400",
          textAlign: "right",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "0px",
          height: "32px",
          maxHeight: "32px",
          top: 0,
        },

        "& input::placeholder": {
          fontSize: "12px",
        },
      },
    }),
    []
  );

  const filterTypeOptions = [
    { id: "Monthly", name: "Monthly" },
    {
      id: "Daily",
      name: "Daily",
    },
  ];

  const [tableHeaderCells, setTableHeaderCells] = useState<any>([]);

  const initialBillProduct = [
    [{ name: "Restaurant", isTitle: true }],
    [
      { name: "Ganapathipalyam" },
      { value: 100 },
      { value: 400 },
      { value: 500 },
      { value: 500 },
      { value: 5400 },
      { value: 2500 },
      { value: 5100 },
      { value: 3500 },
      { value: 8500 },
      { value: "" },
      { value: 5500 },
      { value: 5900 },
      { value: 5900 },
    ],
    [
      { name: "Kodumudi" },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 5900 },
      { value: 300 },
      { value: "" },
    ],
    [
      { name: "Total" },
      { value: 100, isTitle: true },
      { value: 5400, isTitle: true },
      { value: 200, isTitle: true },
      { value: 700, isTitle: true },
      { value: 300, isTitle: true },
      { value: 200, isTitle: true },
      { value: 100, isTitle: true },
      { value: 300, isTitle: true },
      { value: 200, isTitle: true },
      { value: 900, isTitle: true },
      { value: 300, isTitle: true },
      { value: 300, isTitle: true },
      { value: 200, isTitle: true },
    ],
    [
      { name: "Revenue", isTitle: true },
      { value: 100 },
      { value: "" },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: "" },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 200 },
    ],
    [],
    [{ name: "Clinic", isTitle: true }],
    [
      { name: "Sivigari" },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 200 },
    ],
    [
      { name: "Modakurichi" },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 200 },
    ],
    [
      { name: "Total", isTitle: true },
      { value: 100, isTitle: true },
      { value: 300, isTitle: true },
      { value: 200, isTitle: true },
      { value: 100, isTitle: true },
      { value: 300, isTitle: true },
      { value: 200, isTitle: true },
      { value: 100, isTitle: true },
      { value: 300, isTitle: true },
      { value: 200, isTitle: true },
      { value: "", isTitle: true },
      { value: 300, isTitle: true },
      { value: 200, isTitle: true },
      { value: 200, isTitle: true },
    ],
    [
      { name: "Revenue" },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: "" },
      { value: 300 },
      { value: 200 },
      { value: 200 },
    ],
    [],

    [{ name: "Expenses", isTitle: true }],
    [
      { name: "Salary" },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: "" },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 200 },
    ],
    [
      { name: "Rent" },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: "" },
      { value: 200 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: "" },
      { value: 300 },
      { value: 200 },
    ],
    [
      { name: "Internet" },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: "" },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
    ],
    [
      { name: "EB" },
      { value: 100 },
      { value: "" },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
    ],
    [
      { name: "Fuel" },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 200 },
      { value: "" },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 200 },
      { value: 300 },
      { value: 200 },
      { value: "" },
      { value: 300 },
    ],
    [
      { name: "Petty Cash" },
      { value: 100 },
      { value: 200 },
      { value: 300 },
      { value: 200 },
      { value: "" },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: "" },
      { value: 200 },
    ],
    [
      { name: "Unavagam" },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 200 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: "" },
      { value: 100 },
      { value: 300 },
      { value: 200 },
    ],
    [
      { name: "Yathrai" },
      { value: 100 },
      { value: 200 },
      { value: 300 },
      { value: "" },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: "" },
    ],
    [
      { name: "BJP Office" },
      { value: 100 },
      { value: 200 },
      { value: "" },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: "" },
    ],
    [
      { name: "Kanavu Village" },
      { value: 100 },
      { value: "" },
      { value: 200 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 300 },
      { value: "" },
      { value: 100 },
      { value: 300 },
      { value: 200 },
    ],
    [
      { name: "Other Expenses" },
      { value: "" },
      { value: "" },
      { value: 200 },
      { value: "" },
      { value: 300 },
      { value: 200 },
      { value: 100 },
      { value: 200 },
      { value: 300 },
      { value: "" },
      { value: 100 },
      { value: 300 },
      { value: 200 },
    ],
    [
      { name: "Total ", isTitle: true },
      { value: 1000, isTitle: true },
      { value: 3000, isTitle: true },
      { value: 2000, isTitle: true },
      { value: 1002, isTitle: true },
      { value: 300, isTitle: true },
      { value: 300, isTitle: true },
      { value: 200, isTitle: true },
      { value: 100, isTitle: true },
      { value: 300, isTitle: true },
      { value: 2000, isTitle: true },
      { value: 1223, isTitle: true },
      { value: 3000, isTitle: true },
      { value: 200, isTitle: true },
    ],
    [],
    [
      { name: "Donation", isTitle: true },
      { value: 100, isTitle: true },
      { value: "", isTitle: true },
      { value: 200, isTitle: true },
      { value: 100, isTitle: true },
      { value: "", isTitle: true },
      { value: "", isTitle: true },
      { value: 200, isTitle: true },
      { value: 100, isTitle: true },
      { value: 300, isTitle: true },
      { value: 200, isTitle: true },
      { value: "", isTitle: true },
      { value: 300, isTitle: true },
      { value: 200, isTitle: true },
    ],
    [],
    [
      { name: "P & L ", isTitle: true },
      { value: "", isTitle: true },
      { value: 300, isTitle: true },
      { value: 200, isTitle: true },
      { value: 100, isTitle: true },
      { value: 300, isTitle: true },
      { value: "", isTitle: true },
      { value: 200, isTitle: true },
      { value: "", isTitle: true },
      { value: 300, isTitle: true },
      { value: 200, isTitle: true },
      { value: "", isTitle: true },
      { value: 300, isTitle: true },
      { value: "", isTitle: true },
    ],
    [],
  ];

  const [billProducts, setBillProducts] = useState<any[]>([]);

  const initialData = {
    fromMonth: null,
    toMonth: null,
    month: null,
    filterType: null,
  };

  const [filterData, setFilterData] = useState<string | Date | any>(
    initialData
  );
  const [isDataTableLoading, setIsDataTableLoading] = useState(false);
  const [reportData, setReportData] = useState<any>([]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFilterData((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    if (value === "Daily") {
      setFilterData((prev: any) => ({
        ...prev,
        fromMonth: null,
        toMonth: null,
      }));
    }

    if (value === "Monthly") {
      setFilterData((prev: any) => ({
        ...prev,
        month: null,
      }));
    }
  };

  const handleDateChange = (newValue: any, name: any) => {
    setFilterData((prevBookingData: any) => ({
      ...prevBookingData,
      [name]: newValue,
    }));
  };

  const getProfitAndLossSummaryDetails = useCallback(
    debounce(async (data: any) => {
      try {
        setIsDataTableLoading(true);
        await getProfitAndLossSummary(data).then((result: any) => {
          let data = result?.data;

          setTableHeaderCells(data?.tableHeaderCells);
          setBillProducts(data?.rows);
          setReportData(data?.excelExportRows);
        });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }, 300),
    [filterData]
  );

  useEffect(() => {
    if (
      (filterData.filterType === "Monthly" &&
        filterData.fromMonth !== null &&
        filterData.toMonth !== null) ||
      (filterData.filterType === "Daily" && filterData.month !== null)
    ) {
      getProfitAndLossSummaryDetails({
        ...filterData,
        // fromMonth: filterData.fromMonth
        //   ? moment(filterData?.fromMonth).format("YYYY-MM")
        //   : null,
        // toMonth: filterData.toMonth
        //   ? moment(filterData?.toMonth).format("YYYY-MM")
        //   : null,
        // month: filterData.month
        //   ? moment(filterData?.month).format("YYYY-MM")
        //   : null,
        fromMonth: filterData?.fromMonth
          ? `${filterData?.fromMonth?.$y}-${filterData?.fromMonth?.$M + 1}`
          : null,
        toMonth: filterData?.toMonth
          ? `${filterData?.toMonth?.$y}-${filterData?.toMonth?.$M + 1}`
          : null,
        month: filterData?.month
          ? `${filterData?.month?.$y}-${filterData?.month?.$M + 1}`
          : null,
        filterType: filterData?.filterType,
      });
    }
  }, [filterData]);

  const generateExcel = () => {
    const data = reportData;
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet(data);

    utils.book_append_sheet(wb, ws, "Sheet1");

    writeFile(wb, `P&L_report.xlsx`);
  };

  return (
    <Grid sx={{ width: "auto" }} container spacing={4}>
      <Grid item>
        <Box
          sx={{
            width: { xs: "65vw", xl: "80vw" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h2"
            color="primary.main"
            sx={{
              mt: 2.7,
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            Report
          </Typography>
          <>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: { xs: "column", lg: "row" },
                gap: 2,
              }}
            >
              <Box sx={{ mt: 2.8 }}>
                <Select
                  label=""
                  placeholder="Select Filter"
                  value={filterData.filterType}
                  name={"filterType"}
                  onChange={handleInputChange}
                  sx={{
                    width: {
                      xs: "95vw",
                      sm: "230px",
                    },
                  }}
                  // width="202px"
                  options={filterTypeOptions}
                />
              </Box>
              {filterData.filterType === "Monthly" ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <DatePicker
                    views={["year", "month"]}
                    format={"MM/YYYY"}
                    value={filterData.fromMonth}
                    name={"date"}
                    onMonthChange={(newValue: any) =>
                      handleDateChange(newValue, "fromMonth")
                    }
                    maxDate={filterData.toMonth}
                    label="From Month"
                    sx={{
                      width: {
                        xs: "95vw",
                        sm: "230px",
                      },
                      height: "48px",
                    }}
                  />{" "}
                  <DatePicker
                    views={["year", "month"]}
                    format={"MM/YYYY"}
                    value={filterData.toMonth}
                    name={"date"}
                    onMonthChange={(newValue: any) =>
                      handleDateChange(newValue, "toMonth")
                    }
                    minDate={filterData.fromMonth}
                    label="To Month"
                    sx={{
                      width: {
                        xs: "95vw",
                        sm: "230px",
                      },
                      height: "48px",
                    }}
                  />
                </Box>
              ) : (
                ""
              )}
              {filterData.filterType == "Daily" ? (
                <DatePicker
                  views={["year", "month"]}
                  format={"MM/YYYY"}
                  value={filterData.month}
                  name={"month"}
                  onMonthChange={(newValue: any) =>
                    handleDateChange(newValue, "month")
                  }
                  label="Select Month"
                  sx={{
                    width: {
                      xs: "95vw",
                      sm: "230px",
                    },
                    height: "48px",
                  }}
                />
              ) : (
                ""
              )}
            </Box>
            <Grid
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "flex-start", md: "center" },
                justifyContent: { xs: "flex-start", md: "center" },
                p: { xs: "4px 0", md: "2px 0" },
              }}
            >
              <IconButton
                onClick={() => {
                  generateExcel();
                }}
              >
                <ExcelIcon />
              </IconButton>
            </Grid>
          </>
        </Box>
      </Grid>
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          overflowX: { md: "scroll", lg: "hidden" },
          mb: "100px",
        }}
      >
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            overflowX: { md: "scroll", lg: "hidden" },
          }}
        >
          <TableContainer
            className="table-container"
            component={Paper}
            sx={{
              ...styles.tableContainerStyle,
            }}
          >
            <Table sx={{ ...styles.tableStyle }} aria-label="simple table">
              <TableHead sx={{ width: "auto" }}>
                <TableRow sx={{ width: "auto" }}>
                  {tableHeaderCells.map((cell: any, index: number) => {
                    return (
                      <TableCell
                        align={"left"}
                        key={index}
                        sx={{ width: "auto", minWidth: "75px !important" }}
                      >
                        {cell}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>

              <TableBody sx={{ height: "auto", width: "auto", mb: "200px" }}>
                {billProducts.map((row: any, index: number) => {
                  return (
                    <ProductRow
                      key={row.id}
                      index={index}
                      row={row}
                      tableHeaderCells={tableHeaderCells}
                      styles={styles}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfitAndLossReport;
