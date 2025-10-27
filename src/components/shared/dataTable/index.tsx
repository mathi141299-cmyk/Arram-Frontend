import React, { useState } from "react";
import DataTable from "react-data-table-component";
import TablePagination from "./TablePagination";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { PageLoader } from "../../basic";

interface CustomDataGridProps {
  flag?: boolean;
  title?: string;
  subtitle?: string;
  columns: any;
  rows?: any;
  isEnableActionBtn?: boolean;
  addButtonTitle?: string;
  addButtonTitle2?: string;
  editButtonTitle?: string;
  isShowExport?: boolean;
  searchEnabled?: boolean;
  currentPage?: any;
  onAddUserClick?: () => void;
  onUploadButtonClick?: any;
  onEditClick?: any;
  onDeleteClick?: any;
  onAddButtonClick?: () => void;
  onAddButtonClick2?: () => void;
  handleFilterClick?: () => void;
  onUpdateButtonClick?: () => void;
  onExportClick?: () => void;
  handleSearch?: any;
  pageCount?: number | any;
  hideActionsCondition?: any;
  getRowId?: any;
  getRowClassName?: any;
  onRowClick?: any;
  sortModel?: () => void;
  onSortModelChange?: () => void;
  sortingMode?: string;
  isFilterEnabled?: boolean;
  isSearchOpen?: boolean;
  isFilterOpen?: boolean;
  FilterElement?: React.ComponentType<any>;
  SearchElement?: React.ComponentType<any>;
  handleSearchClick?: () => void;
  loading?: any;
  tableOnly?: boolean;
  customizedTable?: boolean;
  onCellEditStart?: any;
  onCellEditStop?: any;
  expandableRowsComponent?: any;
  CustomPagination?: any;
}
const TableDataGrid = React.memo((props: CustomDataGridProps) => {
  const {
    columns,
    rows,
    getRowId,
    getRowClassName,
    onRowClick,
    pageCount,
    currentPage,
    loading,
    tableOnly,
    customizedTable,
    onCellEditStart,
    onCellEditStop,
    expandableRowsComponent,
    CustomPagination,
  } = props;
  const isScreenSmall = useMediaQuery("(max-width:1200px)");

  const customStyles: any = {
    // pagination: {
    //   style: {
    //     display: "none", // Hide default pagination controls
    //   },
    // },  header: {
    header: {
      style: {
        // minWidth: "10px",
        // maxWidth: "200px",
        width: "160px",
        whiteSpace: "nowrap",
        fontSize: "13px",
        fontWeight: "600",
      },
    },

    headRow: {
      style: {
        // borderLeft: "1px solid #E5E7EB",
        // borderRight: "1px solid #E5E7EB",
        background: "rgba(199, 221, 199, 0.19)",
        // borderTopLeftRadius: "8px",
        // borderTopRightRadius: "8px",
        // fontSize:"10px !important"
      },
    },
    headCells: {
      style: {
        color: "#597F59",
        fontSize: "14px",
        fontWeight: "900",
        // minWidth: "100px",
        // maxWidth: "200px",
        // whiteSpace: "nowrap",
        // width: "100%",
        // maxWidth: "150px",
        // minWidth: "150px",
        // maxWidth: "155px",
      },
    },
    rows: {
      style: {
        "&:hover": {
          backgroundColor: "#F4F4F5",
          cursor: "pointer",
        },
      },
    },
    cells: {
      style: {
        color: "#111827",
        fontSize: "18px",
      },
    },
    table: {
      style: {
        borderCollapse: "separate",
        borderSpacing: "0 8px",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid #E5E7EB",
      },
    },
    rowHover: {
      style: {
        cursor: "pointer",
        backgroundColor: "red !important", // Example background color on hover
      },
    },
  };
  // console.log("Pagination props:", currentPage, pageCount);
  // console.log("Rows type:", rows);
  // console.log("columns type:", columns);

  return (
    <Box
      style={{ width: "auto", height: "auto", padding: 0, marginTop: "25px" }}
    >
      <DataTable
        columns={columns}
        data={rows}
        pagination
        customStyles={{
          ...customStyles,
        }}
        paginationPerPage={20}
        paginationComponent={() => (
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            currentPage={currentPage}
            totalCount={pageCount}
          />
        )}
        // paginationRowsPerPageOptions={[5, 10, 15, 20]}
        // paginationComponentOptions={{
        //   rowsPerPageText: "Rows per page:",
        //   rangeSeparatorText: "of",
        //   selectAllRowsItem: true,
        //   selectAllRowsItemText: "All",
        // }}
        expandableRows={isScreenSmall ? true : false}
        expandableRowsComponent={expandableRowsComponent}
        progressPending={loading}
        highlightOnHover
        // responsive
        // pointerOnHover
        // noDataComponent={"no rows"}
        // selectableRowsHighlight
        progressComponent={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "58vh",
              gap: 2,
            }}
          >
            <CircularProgress />
            <Typography variant="h2" color="initial">
              Loading
            </Typography>
          </Box>
        }
        persistTableHead
      />
    </Box>
  );
});
export default TableDataGrid;
