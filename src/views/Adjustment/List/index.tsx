import { useEffect, useState, useCallback } from "react";
import { Grid, IconButton, Typography, debounce } from "@mui/material";
import { Sort, TextField, DatePicker, Select } from "../../../components/basic";
import {
  DataTable,
  CustomFilterElement,
  ConfirmationDialog,
} from "../../../components/shared";
import { DeleteIcon, EditIcon } from "../../../assets/icons";
import { RouteUrls } from "../../../constants/routes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { Link } from "react-router-dom";
import {
  setSnackBarFailed,
  setSnackBarSuccess,
} from "../../../redux/slices/snackbar";
import { setCurrentPage } from "../../../redux/slices/pagination";
import {
  getAllAdjustments,
  deleteAdjustmentDetailsById,
} from "../../../services/adjustmentService";
import moment from "moment";
import ExpandedComponent from "../../../components/shared/dataTable/ExpandedComponent";

const AdjustmentList = () => {
  const { adjustmentUrl, createUrl, editUrl } = RouteUrls;
  const dispatch = useDispatch();

  const { AdjustmentList } = useSelector(
    (state: RootState) => state.pagination
  );

  const style = {
    textFieldStyle: {
      width: "100%",
      "& .MuiOutlinedInput-root": {
        height: "40px",
        borderRadius: "5px",
        paddingLeft: "8px",
        boxShadow: "none",
      },
    },
    selectStyle: {
      width: {
        xs: "200px",
        lg: "200px",
      },
      height: "40px",
      boxShadow: "none",
      borderRadius: "5px",
    },
    datePickerStyle: {
      width: {
        xs: "95vw",
        sm: "230px",
      },
      "& .MuiOutlinedInput-root": {
        width: {
          xs: "95vw",
          sm: "230px",
        },
        height: "40px",
        borderRadius: "5px",
        paddingLeft: "15px",
      },
    },
    addButton: {
      textTransform: "none",
      height: "40px",
      width: "auto",
      maxWidth: "max-content",
      backgroundColor: "primary.main",
      color: "#FFFFFF",
      border: "none",
      fontSize: "14px",
      weight: 400,
    },
    tableHeaderCellStyle: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      height: "51px",
      cursor: "pointer",
    },
  };

  const branchOptions = [
    { id: 1, name: "Kodumudi" },
    { id: 2, name: "Ganapathypalayam" },
  ];

  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState<boolean>(false);
  const [isFieldSort, setIsFieldSort] = useState<boolean>(false);

  const [sortedField, setSortedField] = useState<{
    order: string | null;
    field: string | null;
  }>({
    order: null,
    field: null,
  });

  const handleSorting = (field: string) => {
    setIsFieldSort(!isFieldSort);
    setSortedField({ field: field, order: isFieldSort ? "ASC" : "DESC" });
  };

  const initialFilters = {
    date: null,
    branchId: null,
  };

  const [filters, setFilters] = useState<any>(initialFilters);

  const [list, setList] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [isDataTableLoading, setIsDataTableLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const [idToBeDeleted, setIdToBeDeleted] = useState<any>(null);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [name]: value,
    }));
    dispatch(setCurrentPage({ key: "AdjustmentList", value: 0 }));
  };

  const handleDateChange = (newValue: any, name: string) => {
    setFilters((prev: any) => ({
      ...prev,
      [name]: newValue,
    }));
    dispatch(setCurrentPage({ key: "AdjustmentList", value: 0 }));
  };

  const handleClearFilter = () => {
    setFilters(initialFilters);
  };

  const handleDelete = async (id: any) => {
    try {
      setIsDataTableLoading(true);
      setIsButtonLoading(true);
      await deleteAdjustmentDetailsById(id).then((result: any) => {
        setIsDataTableLoading(false);

        getAllAdjustmentsList({
          ...filters,
          page: AdjustmentList.page + 1,
          size: AdjustmentList.pageSize,
          column: sortedField.field,
          order: sortedField.order,
        });

        dispatch(
          setSnackBarSuccess({
            snackBarMessage: "Adjustment Deleted Successfully",
          })
        );

        setIsConfirmationDialogOpen(false);
        setIsButtonLoading(false);
        setIdToBeDeleted(null);
      });
    } catch (error) {
      setIsConfirmationDialogOpen(false);
      setIsButtonLoading(false);
      setIdToBeDeleted(null);
      dispatch(
        setSnackBarFailed({
          snackBarMessage: "something went wrong",
        })
      );
      console.error("An error occurred:", error);
    }
  };

  const adjustmentFilter: any = [
    {
      gridProps: { xs: 12, sm: 6, md: 4, xl: 2 },
      children: (
        <DatePicker
          name="date"
          label="Date"
          value={filters?.date}
          disableFuture={false}
          onChange={(newValue: any) => handleDateChange(newValue, "date")}
          sx={{
            ...style.datePickerStyle,
            // xs:"95vw",: {
            //   xs:"95vw",
            //   sm: "230px",
            // },
          }}
        />
      ),
    },
    {
      gridProps: { xs: 12, sm: 6, md: 4, xl: 2 },
      children: (
        <Select
          label="Branch"
          name="branchId"
          value={filters.branchId}
          onChange={(e) => handleInputChange(e)}
          placeholder="Select Branch"
          options={branchOptions}
          // width="200px"
          sx={{
            ...style.selectStyle,
            width: {
              xs: "95vw",
              sm: "230px",
            },
          }}
        />
      ),
    },
  ];

  const TableActions = ({ row }: any) => {
    return (
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Link
          to={`${adjustmentUrl}${editUrl}/${row.id}`}
          style={{
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>

        <IconButton
          onClick={() => {
            setIsConfirmationDialogOpen(true);
            setIdToBeDeleted(row?.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    );
  };

  const columns: any[] = [
    {
      name: (
        <Grid
          sx={{ ...style.tableHeaderCellStyle }}
          onClick={() => handleSorting("date")}
        >
                             <Typography fontSize={"13px"} fontWeight={"600"}>

            Date
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "date" && sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "date" && sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </Grid>
      ),
      selector: (row: any) => (
                <Typography variant="h5" fontSize={"13px"}>

          {moment(row?.date, "YYYY-MM-DD").format("DD-MM-YYYY")}
        </Typography>
      ),
      sortable: false,
    },
    {
      name: (
        <Grid
          sx={{ ...style.tableHeaderCellStyle }}
          onClick={() => handleSorting("quantity")}
        >
                             <Typography fontSize={"13px"} fontWeight={"600"}>

            Quantity
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "quantity" && sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "quantity" && sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </Grid>
      ),
      selector: (row: any) => (
                <Typography variant="h5" fontSize={"13px"}>

          {row?.quantity}
        </Typography>
      ),
      sortable: false,
    },
    {
      name: (
        <Grid
          sx={{ ...style.tableHeaderCellStyle }}
          onClick={() => handleSorting("branchId")}
        >
                             <Typography fontSize={"13px"} fontWeight={"600"}>

            Branch
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "branchId" && sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "branchId" && sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </Grid>
      ),
      selector: (row: any) => (
                <Typography variant="h5" fontSize={"13px"}>

          {row?.branch?.name}
        </Typography>
      ),
      sortable: false,
    },
    {
      name: (
        <Grid
          sx={{
            ...style.tableHeaderCellStyle,
            justifyContent: "flex-end",
            pr: "20px",
          }}
        >
                             <Typography fontSize={"13px"} fontWeight={"600"}>

            Actions
          </Typography>
        </Grid>
      ),
      selector: (row: any) => {
        return <TableActions row={row} />;
      },
      sortable: false,
    },
  ];

  const getAllAdjustmentsList = useCallback(
    debounce(async (data: any) => {
      try {
        setIsDataTableLoading(true);
        await getAllAdjustments(data).then((result: any) => {
          let data = result?.data;
          setList(data?.rows);
          setPageCount(data?.count);
          setIsDataTableLoading(false);
        });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }, 300),
    []
  );

  useEffect(() => {
    getAllAdjustmentsList({
      ...filters,
      date: filters?.date?.$d,
      page: AdjustmentList.page + 1,
      size: AdjustmentList.pageSize,
      column: sortedField.field,
      order: sortedField.order,
    });
  }, [filters, AdjustmentList.page, AdjustmentList.pageSize, sortedField]);

  const onConfirmationDialogClose = () => {
    setIsConfirmationDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (idToBeDeleted === null) {
      return false;
    } else {
      handleDelete(idToBeDeleted);
    }
  };
  const fields = [
    {
      label: "Date",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {moment(row?.date, "YYYY-MM-DD").format("DD-MM-YYYY")}
        </Typography>
      ),
    },
    {
      label: "Quantity",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.quantity}
        </Typography>
      ),
    },
    {
      label: "Branch",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.branch?.name}
        </Typography>
      ),
    },
  ];

  return (
    <>
      <ConfirmationDialog
        open={isConfirmationDialogOpen}
        title="Are you surely want to delete?"
        handleClick={handleConfirmDelete}
        onClose={onConfirmationDialogClose}
        loading={isButtonLoading}
      />
      <Grid sx={{ mb: 3 }}>
        <Typography variant="h2" color="initial">
          Adjustment
        </Typography>
      </Grid>
      <CustomFilterElement
        data={adjustmentFilter}
        isSearchEnabled={true}
        clearFilter={handleClearFilter}
        addButtonTitle="+ Add"
        onAddButtonClick={`${adjustmentUrl}${createUrl}`}
      />
      <DataTable
        columns={columns}
        rows={list}
        expandableRowsComponent={({ data }: any) => (
          <ExpandedComponent
            data={data}
            fields={fields}
            ActionsComponent={TableActions}
          />
        )}
        loading={isDataTableLoading}
        pageCount={pageCount}
        currentPage="AdjustmentList"
      />
      {/* <DataTable
        loading={isDataTableLoading}
        columns={columns}
        getRowId={(row: any) => `${String(row.id)}`}
        rows={list}
        pageCount={pageCount}
        currentPage="AdjustmentList"
      /> */}
    </>
  );
};

export default AdjustmentList;
