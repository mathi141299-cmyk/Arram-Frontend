import { Grid, IconButton, Typography, debounce } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { DatePicker, Sort, TextField } from "../../../components/basic";
import { DataTable } from "../../../components/shared";
import CustomFilterElement from "../../../components/shared/customFilter";
import { Link } from "react-router-dom";
import { RouteUrls } from "../../../constants/routes";
import {
  getAllAppointment,
  getAppointmentById,
} from "../../../services/appointmentService";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  EditIcon,
  PrintIcon,
  PrintTableIcon,
  ViewIcon,
} from "../../../assets/icons";
import { useReactToPrint } from "@kvnyu/react-to-print";
import PrintForm from "./print";
import { useNavigate } from "react-router-dom";
import { setCurrentPage } from "../../../redux/slices/pagination";
import ExpandedComponent from "../../../components/shared/dataTable/ExpandedComponent";

const AppointmentList = () => {
  const { appointmentUrl, createAppointmentUrl, clinicalUrl, editUrl } =
    RouteUrls;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { appointmentList } = useSelector(
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
  };

  const [ascendingOrderClicked, setAscendingOrderClicked] = useState(false);
  const [descendingOrderClicked, setDescendingOrderClicked] = useState(false);
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
  const [filters, setFilters] = useState<any>({
    name: "",
    gender: "",
    mobile: "",
    address: "",
    area: "",
    date: null,
    reason: "",
    status: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [formInfo, setFormInfo] = useState<any>();
  const [isDataTableLoading, setIsDataTableLoading] = useState(false);

  const printRef = useRef(null);
  const handleCancelPrint = async () => {
    // if (id) {
    navigate(`${RouteUrls.clinicalUrl}${RouteUrls.appointmentUrl}`);
    // }
  };
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onAfterPrint: () => handleCancelPrint(),
  });
  const handleSubmit = () => {
    handlePrint();
    setIsSubmit(false);
  };
  useEffect(() => {
    if (isSubmit) {
      handleSubmit();
    }
  }, [isSubmit]);

  const handlePrintChange = async (row: any) => {
    try {
      await getAppointmentById(row.customerId).then((res: any) => {
        // console.log("res.data", res.data);
        setFormInfo(res.data);
        setIsSubmit(true);
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const TableActions = ({ row }: any) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          textAlign: "center",
        }}
      >
        <div style={{ cursor: "pointer" }}>
          <Link
            to={`${clinicalUrl}${appointmentUrl}/${row.customerId}`}
            style={{
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <IconButton>
              <ViewIcon />
            </IconButton>
          </Link>
        </div>

        <Link
          to={`${clinicalUrl}${appointmentUrl}${editUrl}/${row.customerId}`}
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
            handlePrintChange(row);
          }}
        >
          <PrintTableIcon />
        </IconButton>
      </div>
    );
  };
  const columns: any[] = [
    {
      name: (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: "51px",
            cursor: "pointer",
          }}
          onClick={() => handleSorting("name")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Patient Name
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
            ascendingOnClick={() =>
              setAscendingOrderClicked(!descendingOrderClicked)
            }
            descendingOnClick={() =>
              setDescendingOrderClicked(!ascendingOrderClicked)
            }
          />
        </div>
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: "51px",
            cursor: "pointer",
          }}
          onClick={() => handleSorting("age")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Age
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "age" && sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "age" && sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </div>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row?.customer?.age}
        </Typography>
      ),

      sortable: false,
    },
    {
      name: (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: "51px",
            cursor: "pointer",
          }}
          onClick={() => handleSorting("gender")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Gender
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "gender" && sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "gender" && sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </div>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row?.customer?.gender}
        </Typography>
      ),

      sortable: false,
    },
    {
      name: (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: "51px",
            cursor: "pointer",
          }}
          onClick={() => handleSorting("mobile")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Mobile No
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
        </div>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row?.customer?.mobile}
        </Typography>
      ),

      sortable: false,
      minWidth: "130px",
    },
    {
      name: (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: "51px",
            cursor: "pointer",
          }}
          onClick={() => handleSorting("address")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Address
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "address" && sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "address" && sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </div>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row?.customer?.address?.address}
        </Typography>
      ),

      sortable: false,
    },
    {
      name: (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: "51px",
            cursor: "pointer",
          }}
          onClick={() => handleSorting("area")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Area
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
        </div>
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: "51px",
            cursor: "pointer",
          }}
          onClick={() => handleSorting("reason")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Reason
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "reason" && sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "reason" && sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </div>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row?.reason?.name}
        </Typography>
      ),

      sortable: false,
    },
    {
      name: (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: "51px",
            cursor: "pointer",
          }}
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
        </div>
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: "51px",
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() => handleSorting("tokenNo")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"} textAlign={"center"}>
            Token No
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "tokenNo" && sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "tokenNo" && sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </div>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row?.tokenNo}
        </Typography>
      ),

      sortable: false,
      minWidth: "150px",
    },
    {
      name: (
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            height: "51px",
            cursor: "pointer",
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

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFilters(() => ({
      ...filters,
      [name]: value,
    }));

    dispatch(setCurrentPage({ key: "appointmentList", value: 0 }));
  };

  const handleClearFilter = () => {
    setFilters({
      name: "",
      gender: "",
      mobile: "",
      address: "",
      area: "",
      date: null,
      reason: "",
      status: "",
    });
  };

  const appointmentFilter = [
    {
      gridProps: { xs: 12, sm: 6, md: 2.4, xl: 2.4 },
      children: (
        <TextField
          placeholder={"Enter Patient Name"}
          label={"Patient Name"}
          sx={{
            ...style.textFieldStyle,
            width: {
              xs: "95vw",
              sm: "230px",
            },
          }}
          name="name"
          value={filters.name}
          onChange={handleChange}
        />
      ),
    },
    {
      gridProps: { xs: 12, sm: 6, md: 2.4, xl: 2.4 },
      children: (
        <TextField
          placeholder={"Enter Mobile No"}
          label={"Mobile"}
          sx={{
            ...style.textFieldStyle,
            width: {
              xs: "95vw",
              sm: "230px",
            },
          }}
          name="mobile"
          value={filters.mobile}
          onChange={handleChange}
        />
      ),
    },
    {
      gridProps: { xs: 12, sm: 6, md: 2.4, xl: 2.4 },
      children: (
        <TextField
          placeholder={"Enter Area"}
          label={"Area"}
          sx={{
            ...style.textFieldStyle,
            width: {
              xs: "95vw",
              sm: "230px",
            },
          }}
          name="area"
          value={filters.area}
          onChange={handleChange}
        />
      ),
    },
    {
      gridProps: { xs: 12, sm: 6, md: 2.4, xl: 2.4 },
      children: (
        <DatePicker
          formControlStyle={{
            "& .MuiOutlinedInput-root": {
              height: "40px",
              borderRadius: "5px",
            },
            width: {
              xs: "95vw",
              sm: "230px",
            },
          }}
          label="Date"
          value={filters.date}
          onChange={(value: any) => {
            setFilters((prevState: any) => ({
              ...prevState,
              date: value,
            }));
            dispatch(setCurrentPage({ key: "appointmentList", value: 0 }));
          }}
          name={"date"}
        />
      ),
    },
  ];

  const [list, setList] = useState({
    count: 0,
    rows: [],
  });
  const debouncedGetCustomerList = useCallback(
    debounce((data: any) => {
      setIsDataTableLoading(true);
      getAllAppointment(data)
        .then((res: any) => {
          if (res.data) {
            setList(res.data);
          }
          setIsDataTableLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsDataTableLoading(false);
        });
    }, 300),
    []
  );

  useEffect(() => {
    const data = {
      ...filters,
      page: appointmentList.page + 1,
      size: appointmentList.pageSize,
      order: sortedField.order,
      column: sortedField.field,
    };

    if (filters.date) {
      data.date = moment(filters?.date?.$d).format("YYYY-MM-DD");
    } else {
      delete data.date;
    }

    debouncedGetCustomerList(data);
  }, [appointmentList, filters, sortedField]);
  const fields = [
    {
      label: "Patient Name",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.customer?.name}
        </Typography>
      ),
    },
    {
      label: "Age",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.customer?.age}
        </Typography>
      ),
    },
    {
      label: "Gender",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.customer?.gender}
        </Typography>
      ),
    },
    {
      label: "Mobile No",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.customer?.mobile}
        </Typography>
      ),
    },
    {
      label: " Address",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.customer?.address?.address}
        </Typography>
      ),
    },
    {
      label: "Area",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.customer?.address?.area?.name}
        </Typography>
      ),
    },
    {
      label: "Reason",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.reason?.name}
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
      label: "Token No",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.tokenNo}
        </Typography>
      ),
    },
  ];
  return (
    <>
      <Grid sx={{ mb: 3 }}>
        <Typography variant="h2" color="initial">
          Appointments List
        </Typography>
      </Grid>
      <CustomFilterElement
        data={appointmentFilter}
        isSearchEnabled={true}
        addButtonTitle="+ Add"
        onAddButtonClick={`${clinicalUrl}${appointmentUrl}${createAppointmentUrl}`}
        clearFilter={handleClearFilter}
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
        rows={list.rows}
        pageCount={list?.count}
        currentPage={"appointmentList"}
      />
      {/* <DataTable
        columns={columns}
        getRowId={(row: any) => `${String(row.id)}`}
        rows={list.rows}
        pageCount={list?.count}
        currentPage={"appointmentList"}
        // onRowClick={(row: any) =>

        // }
      /> */}
      <div style={{ display: "none" }}>
        <PrintForm
          // tokenNo={billdetails?.tokenNo}
          // area={authUser?.branch?.name}
          // quantity={billdetails?.quantity}
          formInfo={formInfo}
          printRef={printRef}
          isColorLogo={false}
        />
      </div>
    </>
  );
};

export default AppointmentList;
