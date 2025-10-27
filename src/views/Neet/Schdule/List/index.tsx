import { useEffect, useState, useCallback } from "react";
import { Grid, IconButton, Typography, debounce } from "@mui/material";
import { Sort, TextField, DatePicker } from "../../../../components/basic";
import {
  DataTable,
  CustomFilterElement,
  ConfirmationDialog,
} from "../../../../components/shared";
import { DeleteIcon, EditIcon } from "../../../../assets/icons";
import { RouteUrls } from "../../../../constants/routes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Link } from "react-router-dom";
import {
  setSnackBarFailed,
  setSnackBarSuccess,
} from "../../../../redux/slices/snackbar";
import { setCurrentPage } from "../../../../redux/slices/pagination";
import {
  getAllSchedules,
  deleteScheduleDetailsById,
} from "../../../../services/neetService";
import moment from "moment";
import ExpandedComponent from "../../../../components/shared/dataTable/ExpandedComponent";

const NeetScheduleList = () => {
  const { neetUrl, scheduleUrl, createUrl, editUrl } = RouteUrls;
  const dispatch = useDispatch();

  const { NeetScheduleList } = useSelector(
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
    name: "",
    location: "",
  };

  const [filters, setFilters] = useState<any>(initialFilters);

  const [list, setList] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [isDataTableLoading, setIsDataTableLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const [idToBeDeleted, setIdToBeDeleted] = useState<any>(null);
  const [panchayatOptions, setPanchayatOptions] = useState<any>([]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [name]: value,
    }));
    dispatch(setCurrentPage({ key: "NeetScheduleList", value: 0 }));
  };

  const handleDateChange = (newValue: any, name: string) => {
    setFilters((prev: any) => ({
      ...prev,
      [name]: newValue,
    }));
    dispatch(setCurrentPage({ key: "NeetScheduleList", value: 0 }));
  };

  const handleClearFilter = () => {
    setFilters(initialFilters);
  };

  const handleDelete = async (id: any) => {
    try {
      setIsDataTableLoading(true);
      setIsButtonLoading(true);
      await deleteScheduleDetailsById(id).then((result: any) => {
        setIsDataTableLoading(false);

        getAllScheduleList({
          ...filters,
          page: NeetScheduleList.page + 1,
          size: NeetScheduleList.pageSize,
          column: sortedField.field,
          order: sortedField.order,
        });
        dispatch(
          setSnackBarSuccess({
            snackBarMessage: "Neet Schedule Deleted Successfully",
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

  const scheduleFilter = [
    {
      gridProps: { xs: 12, sm: 6, md: 4, xl: 2 },
      children: (
        <TextField
          placeholder="Enter Name"
          label="Name"
          name="name"
          value={filters.name}
          onChange={handleInputChange}
          sx={{
            ...style.textFieldStyle,
            width: {
              xs: "95vw",
              sm: "230px",
            },
          }}
        />
      ),
    },
    {
      gridProps: { xs: 12, sm: 6, md: 4, xl: 2 },
      children: (
        <DatePicker
          name="date"
          label="Date"
          value={filters?.date}
          disableFuture={false}
          onChange={(newValue: any) => handleDateChange(newValue, "date")}
          sx={{ ...style.datePickerStyle }}
        />
      ),
    },
    {
      gridProps: { xs: 12, sm: 6, md: 4, xl: 2 },
      children: (
        <TextField
          value={filters.location}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter Location"
          label="Location"
          name="location"
          width="200px"
          sx={{
            ...style.textFieldStyle,
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
          to={`${neetUrl}${scheduleUrl}${editUrl}/${row.id}`}
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
          onClick={() => handleSorting("name")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Name
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "name" && sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "name" && sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </Grid>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row?.name}
        </Typography>
      ),
      sortable: false,
    },
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
          onClick={() => handleSorting("location")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Location
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "location" && sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "location" && sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </Grid>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row?.location}
        </Typography>
      ),
      sortable: false,
    },
    {
      name: (
        <Grid
          sx={{
            ...style.tableHeaderCellStyle,
            // justifyContent: "flex-end",
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

  const getAllScheduleList = useCallback(
    debounce(async (data: any) => {
      try {
        setIsDataTableLoading(true);
        await getAllSchedules(data).then((result: any) => {
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
    getAllScheduleList({
      ...filters,
      date: filters?.date?.$d,
      page: NeetScheduleList.page + 1,
      size: NeetScheduleList.pageSize,
      column: sortedField.field,
      order: sortedField.order,
    });
  }, [filters, NeetScheduleList.page, NeetScheduleList.pageSize, sortedField]);

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
      label: "Name",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.name}
        </Typography>
      ),
    },
    {
      label: "Date",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {moment(row?.date, "YYYY-MM-DD").format("DD-MM-YYYY")}
        </Typography>
      ),
    },
    {
      label: "Location",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.location}
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
          Neet Schedule
        </Typography>
      </Grid>
      <CustomFilterElement
        data={scheduleFilter}
        isSearchEnabled={true}
        clearFilter={handleClearFilter}
        addButtonTitle="+ Add"
        onAddButtonClick={`${neetUrl}${scheduleUrl}${createUrl}`}
      />

      <DataTable
        columns={columns}
        expandableRowsComponent={({ data }: any) => (
          <ExpandedComponent
            data={data}
            fields={fields}
            ActionsComponent={TableActions}
          />
        )}
        loading={isDataTableLoading}
        rows={list}
        pageCount={pageCount}
        currentPage="NeetScheduleList"
      />
      {/* <DataTable
        loading={isDataTableLoading}
        columns={columns}
        getRowId={(row: any) => `${String(row.id)}`}
        rows={list}
        pageCount={pageCount}
        currentPage="NeetScheduleList"
      /> */}
    </>
  );
};

export default NeetScheduleList;
