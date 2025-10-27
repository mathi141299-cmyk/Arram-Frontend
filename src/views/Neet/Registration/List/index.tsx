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
  getAllRegistrations,
  deleteRegistrationDetailsById,
} from "../../../../services/neetService";
import moment from "moment";
import ExpandedComponent from "../../../../components/shared/dataTable/ExpandedComponent";

const NeetRegistrationList = () => {
  const { neetUrl, registrationUrl, createUrl, editUrl } = RouteUrls;
  const dispatch = useDispatch();

  const { NeetRegistrationList } = useSelector(
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
    name: "",
    mobile: "",
    area: "",
    neetMasterLocation: "",
    neetMasterDate: null,
    neetMasterName: "",
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
    dispatch(setCurrentPage({ key: "NeetRegistrationList", value: 0 }));
  };

  const handleDateChange = (newValue: any, name: string) => {
    // console.log("qwerty newValue,name", newValue, name);
    setFilters((prev: any) => ({
      ...prev,
      [name]: newValue,
    }));
    dispatch(setCurrentPage({ key: "NeetRegistrationList", value: 0 }));
  };

  const handleClearFilter = () => {
    setFilters(initialFilters);
  };

  const handleDelete = async (id: any) => {
    try {
      setIsDataTableLoading(true);
      setIsButtonLoading(true);
      await deleteRegistrationDetailsById(id).then((result: any) => {
        setIsDataTableLoading(false);

        getAllRegistrationsList({
          ...filters,
          page: NeetRegistrationList.page + 1,
          size: NeetRegistrationList.pageSize,
          column: sortedField.field,
          order: sortedField.order,
        });
        dispatch(
          setSnackBarSuccess({
            snackBarMessage: "Registration Deleted Successfully",
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

  const appointmentFilter = [
    {
      gridProps: { xs: 12, sm: 6, md: 4, xl: 2 },
      children: (
        <TextField
          placeholder="Enter Camp Name"
          label="Camp Name"
          name="neetMasterName"
          value={filters.neetMasterName}
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
          name="neetMasterDate"
          label="Camp Date"
          value={filters?.neetMasterDate}
          disableFuture={false}
          onChange={(newValue: any) =>
            handleDateChange(newValue, "neetMasterDate")
          }
          sx={{
            ...style.datePickerStyle,
            // width: {
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
        <TextField
          value={filters.neetMasterLocation}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter Camp Location"
          label="Camp Location"
          name="neetMasterLocation"
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
    // {
    //   gridProps: { xs: 12, sm: 6, md: 4, xl: 2 },
    //   children: (
    //     <TextField
    //       placeholder="Enter Name"
    //       label="Student Name"
    //       name="name"
    //       value={filters.name}
    //       onChange={handleInputChange}
    //       sx={{
    //         ...style.textFieldStyle,
    //       }}
    //     />
    //   ),
    // },
    {
      gridProps: { xs: 12, sm: 6, md: 4, xl: 2 },
      children: (
        <TextField
          value={filters.mobile}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter Contact Number"
          label="Contact Number"
          name="mobile"
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
    {
      gridProps: { xs: 12, sm: 6, md: 4, xl: 2 },
      children: (
        <TextField
          value={filters.area}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter Panchayat"
          label="Panchayat"
          name="area"
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
          to={`${neetUrl}${registrationUrl}${editUrl}/${row.id}`}
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
          onClick={() => handleSorting("neetMasterName")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Name
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "neetMasterName" &&
              sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "neetMasterName" &&
              sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </Grid>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row?.neetMaster?.name}
        </Typography>
      ),

      sortable: false,
    },
    {
      name: (
        <Grid
          sx={{ ...style.tableHeaderCellStyle }}
          onClick={() => handleSorting("neetMasterDate")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Date
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "neetMasterDate" &&
              sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "neetMasterDate" &&
              sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </Grid>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {moment(row?.neetMaster?.date, "YYYY-MM-DD").format("DD-MM-YYYY")}
        </Typography>
      ),
      sortable: false,
    },
    {
      name: (
        <Grid
          sx={{ ...style.tableHeaderCellStyle }}
          onClick={() => handleSorting("neetMasterLocation")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Camp Location
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "neetMasterLocation" &&
              sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "neetMasterLocation" &&
              sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </Grid>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row?.neetMaster?.location}
        </Typography>
      ),

      sortable: false,
      minWidth: "160px",
    },
    {
      name: (
        <Grid
          sx={{ ...style.tableHeaderCellStyle }}
          onClick={() => handleSorting("name")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Student Name
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
          {row?.customer?.name}
        </Typography>
      ),
      sortable: false,
      minWidth: "160px",
    },
    {
      name: (
        <Grid
          sx={{ ...style.tableHeaderCellStyle }}
          onClick={() => handleSorting("dob")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            DOB
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "dob" && sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "dob" && sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </Grid>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row?.customer?.dob}
        </Typography>
      ),
      sortable: false,
    },
    {
      name: (
        <Grid
          sx={{ ...style.tableHeaderCellStyle }}
          onClick={() => handleSorting("schoolName")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            School Name
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "schoolName" && sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "schoolName" && sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </Grid>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row?.schoolName}
        </Typography>
      ),
      minWidth: "160px",
      sortable: false,
    },
    {
      name: (
        <Grid
          sx={{ ...style.tableHeaderCellStyle }}
          onClick={() => handleSorting("mobile")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Contact Number
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "mobile" && sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "mobile" && sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </Grid>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row?.customer?.mobile}
        </Typography>
      ),

      sortable: false,
      minWidth: "170px",
    },
    {
      name: (
        <Grid
          sx={{ ...style.tableHeaderCellStyle }}
          onClick={() => handleSorting("area")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Panchayat
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "area" && sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "area" && sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </Grid>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row?.customer?.address?.area?.name}
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

  const getAllRegistrationsList = useCallback(
    debounce(async (data: any) => {
      // console.log("data from getAllRegistrationsList", data);
      try {
        setIsDataTableLoading(true);
        await getAllRegistrations(data).then((result: any) => {
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
    getAllRegistrationsList({
      ...filters,
      neetMasterDate: filters?.neetMasterDate?.$d,
      page: NeetRegistrationList.page + 1,
      size: NeetRegistrationList.pageSize,
      column: sortedField.field,
      order: sortedField.order,
    });
  }, [
    filters,
    NeetRegistrationList.page,
    NeetRegistrationList.pageSize,
    sortedField,
  ]);

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
          {row?.neetMaster?.name}
        </Typography>
      ),
    },
    {
      label: "Date",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {moment(row?.neetMaster?.date, "YYYY-MM-DD").format("DD-MM-YYYY")}
        </Typography>
      ),
    },
    {
      label: "Camp Location",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.neetMaster?.location}
        </Typography>
      ),
    },
    {
      label: "Student Name",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.customer?.name}
        </Typography>
      ),
    },
    {
      label: "DOB",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.customer?.dob}
        </Typography>
      ),
    },
    {
      label: "School Name",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.schoolName}
        </Typography>
      ),
    },
    {
      label: "Contact Number",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.customer?.mobile}
        </Typography>
      ),
    },
    {
      label: "Panchayat",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.customer?.address?.area?.name}
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
          Neet Students
        </Typography>
      </Grid>
      <CustomFilterElement
        data={appointmentFilter}
        isSearchEnabled={true}
        clearFilter={handleClearFilter}
        addButtonTitle="+ Add"
        onAddButtonClick={`${neetUrl}${registrationUrl}${createUrl}`}
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
        currentPage="NeetRegistrationList"
      />
      {/* <DataTable
        loading={isDataTableLoading}
        columns={columns}
        getRowId={(row: any) => `${String(row.id)}`}
        rows={list}
        pageCount={pageCount}
        currentPage="NeetRegistrationList"
      /> */}
    </>
  );
};

export default NeetRegistrationList;
