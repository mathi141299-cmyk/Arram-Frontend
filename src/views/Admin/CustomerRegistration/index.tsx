import { Grid, IconButton, Typography, debounce } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Sort, TextField } from "../../../components/basic";
import { DataTable } from "../../../components/shared";
import { EditIcon } from "../../../assets/icons";
import CustomFilterElement from "../../../components/shared/customFilter";
import { RouteUrls } from "../../../constants/routes";
import { getCustomerList } from "../../../services/customerService";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Link } from "react-router-dom";
import ExpandedComponent from "../../../components/shared/dataTable/ExpandedComponent";

const CustomerRegistration = () => {
  const { customerRegistrationUrl, adminUrl, addCustomerUrl } = RouteUrls;
  const { customerRegistration } = useSelector(
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
  const TableActions = ({ row }: any) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Link
          to={`${adminUrl}${customerRegistrationUrl}/${row.id}`}
          style={{
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
      </div>
    );
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
  const [isDataTableLoading, setIsDataTableLoading] = useState(false);

  const handleSorting = (field: string) => {
    setIsFieldSort(!isFieldSort);
    setSortedField({ field: field, order: isFieldSort ? "ASC" : "DESC" });
  };
  const [filters, setFilters] = useState({
    name: "",
    mobile: "",
    area: "",
    pinCode: "",
  });
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
            Customer Name
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
          {row.name}
        </Typography>
      ),
      sortable: false,
      minWidth: "165px",
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
            Mobile
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
          {row?.mobile}
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
          onClick={() => handleSorting("aadhaarNo")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Aadhaar No
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "aadhaarNo" && sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "aadhaarNo" && sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </div>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row.aadhaarNo}
        </Typography>
      ),
      sortable: false,
      minWidth: "140px",

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
          {row.gender}
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
        </div>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row?.address?.area?.name}
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
          onClick={() => handleSorting("pinCode")}
        >
          <Typography fontSize={"13px"} fontWeight={"600"}>
            Pincode
          </Typography>
          <Sort
            ascendingActive={
              sortedField.field === "pinCode" && sortedField.order === "ASC"
                ? true
                : false
            }
            descendingActive={
              sortedField.field === "pinCode" && sortedField.order === "DESC"
                ? true
                : false
            }
          />
        </div>
      ),
      selector: (row: any) => (
        <Typography variant="h5" fontSize={"13px"}>
          {row.address?.pinCode}
        </Typography>
      ),

      sortable: false,
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
      minWidth: 80,
      sortable: false,
    },
  ];

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFilters(() => ({
      ...filters,
      [name]: value,
    }));
  };

  const handleClearFilter = () => {
    setFilters({
      name: "",
      mobile: "",
      area: "",
      pinCode: "",
    });
  };

  const appointmentFilter = [
    {
      gridProps: { xs: 12, sm: 6, md: 4, xl: 2 },
      children: (
        <TextField
          placeholder={"Enter Customer Name"}
          label={"Customer Name"}
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
      gridProps: { xs: 12, sm: 6, md: 4, xl: 2 },
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
      gridProps: { xs: 12, sm: 6, md: 4, xl: 2 },
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
      gridProps: { xs: 12, sm: 6, md: 4, xl: 2 },
      children: (
        <TextField
          placeholder={"Enter Pincode"}
          label={"Pincode"}
          sx={{
            ...style.textFieldStyle,
            width: {
              xs: "95vw",
              sm: "230px",
            },
          }}
          name="pinCode"
          value={filters.pinCode}
          onChange={handleChange}
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
      getCustomerList(data)
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
    debouncedGetCustomerList({
      ...filters,
      page: customerRegistration.page + 1,
      size: customerRegistration.pageSize,
      column: sortedField.field,
      order: sortedField.order,
    });
  }, [filters, customerRegistration, sortedField]);

  const fields = [
    {
      label: "Customer Name",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row.name}
        </Typography>
      ),
    },
    {
      label: "Mobile No",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.mobile}
        </Typography>
      ),
    },
    {
      label: "Aadhaar No",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row.aadhaarNo}
        </Typography>
      ),
    },
    {
      label: "Gender",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row.gender}
        </Typography>
      ),
    },
    {
      label: "Panchayat",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row?.address?.area?.name}
        </Typography>
      ),
    },
    {
      label: "Pincode",
      children: (row: any) => (
        <Typography variant="h5" fontSize={14}>
          {row.address?.pinCode}
        </Typography>
      ),
    },
  ];

  return (
    <>
      <Grid sx={{ mb: 3 }}>
        <Typography variant="h2" color="initial">
          Customers List
        </Typography>
      </Grid>
      <CustomFilterElement
        data={appointmentFilter}
        isSearchEnabled={true}
        clearFilter={handleClearFilter}
        addButtonTitle="+ Add"
        onAddButtonClick={`${adminUrl}${customerRegistrationUrl}${addCustomerUrl}`}
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
        currentPage={"customerRegistration"}
      />
      {/* <DataTable
        columns={columns}
        getRowId={(row: any) => `${String(row.id)}`}
        rows={list.rows}
        pageCount={list?.count}
        currentPage={"customerRegistration"}
      /> */}
    </>
  );
};

export default CustomerRegistration;
