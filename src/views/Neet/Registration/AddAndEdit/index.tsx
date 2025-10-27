import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Grid, Typography, debounce, MenuItem, Box } from "@mui/material";
import {
  TextField,
  Button,
  DatePicker,
  Select,
  AutoComplete,
  Radio,
} from "../../../../components/basic";
import dayjs from "dayjs";
import {
  requiredValidator,
  updateFormDataWithHelperText,
  mobileNumberValidator,
} from "../../../../utils/ValidationUtils";
import { useParams } from "react-router-dom";
import {
  createRegistration,
  getRegistrationDetailsById,
  getAllSchedules,
  updateRegistrationDetailsById,
} from "../../../../services/neetService";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  setSnackBarFailed,
  setSnackBarSuccess,
} from "../../../../redux/slices/snackbar";
import { useNavigate } from "react-router-dom";
import { villageDetails } from "../../../../services/masterService";
import { CustomerDetails } from "../../../../services/customerService";

const NeetRegistrationAddAndEdit = () => {
  const styles = useMemo(
    () => ({
      textFieldStyle: {
        width: {
          xl: "431px",
          lg: "30vw",
          md: "32vw",
          sm: "45vw",
          xs: "95vw",
        },
        // mr: "20px",
        "& .MuiOutlinedInput-root": {
          height: "48px",
          borderRadius: "8px",
          paddingLeft: "8px",
        },
      },
      selectStyle: {
        width: {
          xl: "431px",
          lg: "30vw",
          md: "32vw",
          sm: "45vw",
          xs: "95vw",
        },
        height: "48px",
        boxShadow: "none",
        borderRadius: "8px",
      },
      datePickerStyle: {
        width: {
          xl: "431px",
          lg: "30vw",
          md: "32vw",
          sm: "45vw",
          xs: "95vw",
        },
        // mr: "20px",
        "& .MuiOutlinedInput-root": {
          width: {
            xl: "431px",
            lg: "30vw",
            md: "32vw",
            sm: "45vw",
            xs: "95vw",
          },
          borderRadius: "8px",
          paddingLeft: "15px",
        },
      },
    }),
    []
  );

  const genderOptions = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
  ];

  const schoolTypeOptions = [
    {
      id: 1,
      name: "Govt",
    },
    {
      id: 2,
      name: "Private",
    },
  ];

  const mediumOptions = [
    {
      id: 1,
      name: "Tamil",
    },
    {
      id: 2,
      name: "English",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [villageOptions, setVillageOptions] = useState<any>([]);
  const [neetScheduleOptions, setNeetScheduleOptions] = useState<any>([]);
  const [customerId, setCustomerId] = useState<any>(null);
  const [customerAddressId, setCustomerAddressId] = useState<any>(null);
  const [mobileOptions, setMobileOptions] = useState<any>([]);

  const { id } = useParams();

  const initialRegistrationError = {
    scheduleId: "",
    registrationNumber: "", //*
    name: "", //*
    contactNumberOne: "", //*
    contactNumberTwo: "",
    dob: "",
    gender: "",
    schoolName: "", //*
    schoolLocation: "",
    schoolType: "",
    medium: "",
    sslcMark: "", //*
    neetApplicationNumber: "", //*
    aadhaarNo: "",
    address: "",
    villageId: "",
    villageId_input: "",
    reference: "",
  };

  const [registrationError, setRegistrationError] = useState<any>(
    initialRegistrationError
  );

  const initialRegistrationData = {
    scheduleId: null,
    scheduleId_input: "",
    scheduleDate: null,
    scheduleName: "",
    scheduleLocation: "",
    registrationNumber: null,
    name: "",
    contactNumberOne: null,
    contactNumberOne_input: "",
    contactNumberTwo: "",
    dob: null,
    gender: null,
    schoolName: "",
    schoolLocation: "",
    schoolType: null,
    medium: null,
    sslcMark: null,
    neetApplicationNumber: null,
    aadhaarNo: null,
    address: "",
    villageId: null,
    villageId_input: "",
    reference: "",
  };

  const [registrationData, setRegistrationData] = useState<any>(
    initialRegistrationData
  );

  const fieldData = {
    scheduleId: {
      label: "Schedule Name",
      name: "scheduleId",
      value: registrationData.scheduleId,
      scheduleId_input: registrationData.scheduleId_input,
      placeholder: "Select Schedule Name",
      isError: registrationError.scheduleId === "" ? false : true,
      helperText: registrationError.scheduleId,
      isDisabled: false,
    },
    registrationNumber: {
      label: "Registration Number",
      name: "registrationNumber",
      value: registrationData.registrationNumber,
      placeholder: " Enter registration Number",
      isError: registrationError.registrationNumber === "" ? false : true,
      helperText: registrationError.registrationNumber,
      isDisabled: false,
    },
    name: {
      label: "Name",
      name: "name",
      value: registrationData.name,
      placeholder: " Enter Name",
      isError: registrationError.name === "" ? false : true,
      helperText: registrationError.name,
      isDisabled: false,
    },
    contactNumberOne: {
      label: "Primary Contact Number",
      name: "contactNumberOne",
      value: registrationData.contactNumberOne,
      contactNumberOne_input: registrationData.contactNumberOne_input,
      placeholder: "Enter Primary Contact Number",
      isError: registrationError.contactNumberOne === "" ? false : true,
      helperText: registrationError.contactNumberOne,
      isDisabled: false,
    },
    contactNumberTwo: {
      label: "Secondary Contact Number",
      name: "contactNumberTwo",
      value: registrationData.contactNumberTwo,
      placeholder: "Secondary Enter Contact Number",
      isError: registrationError.contactNumberTwo === "" ? false : true,
      helperText: registrationError.contactNumberTwo,
      isDisabled: false,
    },
    villageId: {
      label: "Village",
      name: "villageId",
      value: registrationData.villageId,
      villageId_input: registrationData.villageId_input,
      placeholder: "Select Village",
      isError: registrationError.villageId === "" ? false : true,
      helperText: registrationError.villageId,
      isDisabled: false,
    },
    dob: {
      label: "Date Of Birth",
      name: "dob",
      value: registrationData.dob,
      placeholder: "",
      isError: registrationError.dob === "" ? false : true,
      helperText: registrationError.dob,
      isDisabled: false,
    },
    gender: {
      label: "Gender",
      name: "gender",
      value: registrationData.gender,
      placeholder: "Select Gender",
      isError: registrationError.gender === "" ? false : true,
      helperText: registrationError.gender,
      isDisabled: false,
    },
    schoolName: {
      label: "School Name",
      name: "schoolName",
      value: registrationData.schoolName,
      placeholder: "Enter School Name",
      isError: registrationError.schoolName === "" ? false : true,
      helperText: registrationError.schoolName,
      isDisabled: false,
    },
    schoolLocation: {
      label: "School Location",
      name: "schoolLocation",
      value: registrationData.schoolLocation,
      placeholder: "Enter School Location",
      isError: registrationError.schoolLocation === "" ? false : true,
      helperText: registrationError.schoolLocation,
      isDisabled: false,
    },
    schoolType: {
      label: "School Type",
      name: "schoolType",
      value: registrationData.schoolType,
      placeholder: "Choose School Type",
      isError: registrationError.schoolType === "" ? false : true,
      helperText: registrationError.schoolType,
      isDisabled: false,
    },
    medium: {
      label: "Medium",
      name: "medium",
      value: registrationData.medium,
      placeholder: "Choose Medium",
      isError: registrationError.medium === "" ? false : true,
      helperText: registrationError.medium,
      isDisabled: false,
    },
    sslcMark: {
      label: "SSLC Mark",
      name: "sslcMark",
      value: registrationData.sslcMark,
      placeholder: "Enter SSLC Mark",
      isError: registrationError.sslcMark === "" ? false : true,
      helperText: registrationError.sslcMark,
      isDisabled: false,
    },
    neetApplicationNumber: {
      label: "Neet Application Number",
      name: "neetApplicationNumber",
      value: registrationData.neetApplicationNumber,
      placeholder: "Enter Neet Application Number",
      isError: registrationError.neetApplicationNumber === "" ? false : true,
      helperText: registrationError.neetApplicationNumber,
      isDisabled: false,
    },
    aadhaarNo: {
      label: "Aadhar Number",
      name: "aadhaarNo",
      value: registrationData.aadhaarNo,
      placeholder: "Enter Aadhar Number",
      isError: registrationError.aadhaarNo === "" ? false : true,
      helperText: registrationError.aadhaarNo,
      isDisabled: false,
    },
    address: {
      label: "Address",
      name: "address",
      value: registrationData.address,
      placeholder: "Enter Address",
      isError: registrationError.address === "" ? false : true,
      helperText: registrationError.address,
      isDisabled: false,
    },
    reference: {
      label: "Reference",
      name: "reference",
      value: registrationData.reference,
      placeholder: "Enter Reference",
      isError: registrationError.reference === "" ? false : true,
      helperText: registrationError.reference,
      isDisabled: false,
    },
  };

  const [registrationFieldData, setRegistrationFieldData] =
    useState<any>(fieldData);

  //form validation functions

  const handleValidation = (e: any) => {
    const { name, value, label } = e.target;

    // console.log("name, value, label", name, value, label);

    switch (name) {
      case "scheduleId":
      case "name":
      case "villageId": {
        if (requiredValidator(value, label)) {
          updateFormDataWithHelperText(
            name,
            requiredValidator(value, label),
            setRegistrationError
          );
        } else {
          updateFormDataWithHelperText(name, "", setRegistrationError);
        }
        break;
      }
      case "contactNumberOne": {
        if (
          mobileNumberValidator(
            value !== null
              ? typeof value !== "object"
                ? value.slice(0, 10)
                : value?.mobile
              : fieldData.contactNumberOne.contactNumberOne_input,
            label
          )
        ) {
          updateFormDataWithHelperText(
            name,
            mobileNumberValidator(
              value !== null
                ? typeof value !== "object"
                  ? value.slice(0, 10)
                  : value?.mobile
                : fieldData.contactNumberOne.contactNumberOne_input,
              label
            ),
            setRegistrationError
          );
        } else {
          updateFormDataWithHelperText(name, "", setRegistrationError);
        }
        break;
      }
      default:
        break;
    }
  };

  const validateForm = () => {
    for (const fieldName in fieldData) {
      if ((fieldData as any)[fieldName].name) {
        handleValidation({ target: (fieldData as any)[fieldName] });
      }
    }
  };

  const updateFieldData = () => {
    setRegistrationFieldData((prev: any) => {
      return Object.keys(prev).map((field: any) => {
        return {
          ...field,
          value: registrationData[field.name],
          isError: registrationError[field.name] === "" ? false : true,
          helperText: registrationError[field.name],
        };
      });
    });
  };

  useEffect(() => {
    updateFieldData();
  }, [registrationError, registrationData]);

  const getAllVillages = useCallback(
    debounce(async (search?: string | number) => {
      try {
        const data = {
          search: search,
          page: 1,
          size: "20",
        };
        return villageDetails(data).then((result: any) => {
          let data = result?.data;
          setVillageOptions(data);
        });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }, 300),
    []
  );

  const getAllCustomers = useCallback(
    debounce(async (search?: string | number) => {
      try {
        const data = {
          search: search,
          page: 1,
          size: "20",
        };
        return await CustomerDetails(data).then((result: any) => {
          let data = result?.data?.rows;
          if (data.length > 0) {
            setMobileOptions(data);
          }
        });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }, 300),
    []
  );

  useEffect(() => {
    getAllVillages();
    getAllCustomers();
  }, []);

  const handleDateChange = (newValue: any) => {
    setRegistrationData((prev: any) => ({
      ...prev,
      dob: newValue,
    }));

    handleValidation({
      target: {
        name: "dob",
        value: newValue,
      },
    });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    let numericValue = value;

    if (name === "contactNumberOne" || name === "contactNumberTwo") {
      numericValue = value.replace(/[^\d.]/g, "").slice(0, 10);
    }

    setRegistrationData((prev: any) => ({
      ...prev,
      [name]: numericValue,
    }));

    handleValidation(e);
  };

  const handleRadioChange = (e: any) => {
    const { name, value } = e.target;

    setRegistrationData((prevBookingData: any) => ({
      ...prevBookingData,
      [name]: value,
    }));
  };

  const handleAutoCompleteChange = useCallback(
    (e: any, newValue: any, name: string) => {
      // console.log("qwerty newValue from handleAutoCompleteChange", newValue);

      if (newValue === null) {
        return false;
      }

      if (name === "villageId") {
        setRegistrationData((prev: any) => ({
          ...prev,
          [name]: newValue,
        }));
      }

      if (name === "scheduleId") {
        setRegistrationData((prev: any) => ({
          ...prev,
          [name]: newValue,
          scheduleDate: newValue?.date,
          scheduleName: newValue?.name,
          scheduleLocation: newValue?.location,
        }));
      }

      if (name === "contactNumberOne") {
        setRegistrationData((prev: any) => ({
          ...prev,
          [name]: newValue,
          contactNumberOne_input: newValue?.mobile,
          name: newValue?.name,
          dob: newValue?.dob ? dayjs(newValue?.dob) : prev.dob,
          gender: newValue?.gender,
          aadhaarNo: newValue?.aadhaarNo,
          address: newValue?.address?.address,
          villageId: newValue?.address?.village,
          villageId_input: newValue?.address?.village?.name,
        }));

        handleValidation({
          target: {
            name: "name",
            value: newValue?.name,
          },
        });

        handleValidation({
          target: {
            name: "villageId",
            value: newValue?.address?.village?.name,
          },
        });
      }

      handleValidation({
        target: {
          name: name,
          value: newValue,
        },
      });
    },
    []
  );

  const handleAutoCompleteInputChange: any = useCallback(
    (e: any, newInputValue: any, name: string) => {
      // console.log(
      //   "qwerty name, newInputValue from handleAutoCompleteInputChange",
      //   name,
      //   newInputValue,
      //   registrationData?.scheduleId,
      //   id,
      //   registrationData?.scheduleId !== null || id,
      //   newInputValue === "" &&
      //     name === "scheduleId_input" &&
      //     (registrationData?.scheduleId !== null || id)
      // );

      if (
        newInputValue === "" &&
        name === "scheduleId_input" &&
        (registrationData?.scheduleId !== null || id)
      ) {
        return false;
      }

      if (
        newInputValue === "" &&
        name === "villageId_input"
        //  &&
        // (registrationData?.villageId !== null || id)
      ) {
        return false;
      }

      if (name === "villageId_input") {
        setRegistrationData((prev: any) => ({
          ...prev,
          [name]: newInputValue,
        }));
        getAllVillages(newInputValue);

        handleValidation({
          target: {
            name: "villageId",
            value: newInputValue,
          },
        });
      }

      if (name === "scheduleId_input") {
        setRegistrationData((prev: any) => ({
          ...prev,
          [name]: newInputValue,
        }));
        getAllSchedulesList(newInputValue);

        handleValidation({
          target: {
            name: "scheduleId",
            value: newInputValue,
          },
        });
      }

      if (name === "contactNumberOne_input") {
        setRegistrationData((prev: any) => ({
          ...prev,
          [name]:
            newInputValue !== null ? newInputValue.slice(0, 10) : newInputValue,
        }));
        getAllCustomers(newInputValue);

        handleValidation({
          target: {
            name: "contactNumberOne",
            value: newInputValue,
          },
        });
      }
    },
    []
  );

  const getRegistrationById = async () => {
    if (!id) {
      setCustomerId(null);
      return false;
    }
    try {
      await getRegistrationDetailsById(id).then((result: any) => {
        let data = result?.data;

        // console.log("qwerty data from getRegistrationDetailsById", data);

        const newData = {
          scheduleId: data?.neetMaster,
          scheduleId_input: data?.neetMaster?.name,
          scheduleDate: data?.neetMaster?.date,
          scheduleLocation: data?.neetMaster?.location,
          registrationNumber: data?.registrationNumber,
          name: data?.customer?.name,
          contactNumberOne: data?.customer,
          contactNumberOne_input: data?.customer?.mobile,
          contactNumberTwo: data?.mobileNumber,
          dob: dayjs(data?.customer?.dob),
          gender: data?.customer?.gender,
          schoolName: data?.schoolName,
          schoolLocation: data?.schoolLocation,
          schoolType: data?.schoolType,
          medium: data?.medium,
          sslcMark: data?.sslcMark,
          neetApplicationNumber: data?.neetApplicationNumber,
          aadhaarNo: data?.customer?.aadhaarNo,
          address: data?.customer?.address?.address,
          villageId: data?.customer?.address?.village?.id,
          villageId_input: data?.customer?.address?.village?.name,
          reference: data?.reference,
        };

        setRegistrationData(newData);
        setCustomerId(data?.customer?.id);
        setCustomerAddressId(data?.customer?.address?.id);
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleSubmit = async () => {
    if (
      registrationData.scheduleId === null ||
      registrationData.name === "" ||
      registrationData.villageId === null ||
      mobileNumberValidator(
        registrationData.contactNumberOne_input,
        "Primary Contact Number"
      )
    ) {
      validateForm();
    } else {
      try {
        setIsButtonLoading(true);
        const data = {
          customerData: {
            mobile: registrationData.contactNumberOne
              ? registrationData.contactNumberOne?.mobile
              : registrationData.contactNumberOne_input,
            name: registrationData.name,
            dob: registrationData.dob,
            gender: registrationData.gender,
            aadhaarNo: registrationData.aadhaarNo,
            address: {
              id: customerAddressId,
              address: registrationData.address,
              villageId: registrationData?.villageId?.id,
              areaId: registrationData?.villageId?.area?.id,
              talukId: registrationData?.villageId?.area?.taluk?.id,
              cityId: registrationData?.villageId?.area?.city?.id,
            },
          },
          studentData: {
            customerId: customerId,
            neetMasterId: registrationData?.scheduleId?.id,
            registrationNumber: registrationData?.registrationNumber,
            mobileNumber: registrationData.contactNumberTwo,
            schoolName: registrationData.schoolName,
            schoolLocation: registrationData.schoolLocation,
            schoolType: registrationData.schoolType,
            medium: registrationData.medium,
            sslcMark: registrationData.sslcMark,
            neetApplicationNumber: registrationData.neetApplicationNumber,
            reference: registrationData.reference,
          },
        };

        if (!id) {
          await createRegistration(data).then((result: any) => {
            dispatch(
              setSnackBarSuccess({
                snackBarMessage: "Registration Created Successfully",
              })
            );
            setIsButtonLoading(false);
            navigate(-1);
          });
        } else {
          await updateRegistrationDetailsById(id, data).then((result: any) => {
            dispatch(
              setSnackBarSuccess({
                snackBarMessage: "Registration Updated Successfully",
              })
            );
            setIsButtonLoading(false);
            navigate(-1);
          });
        }
      } catch (error) {
        dispatch(
          setSnackBarFailed({
            snackBarMessage: "something went wrong",
          })
        );
        setIsButtonLoading(false);
        console.error("An error occurred:", error);
      }
    }
  };

  const getAllSchedulesList = useCallback(
    debounce(async (search?: string | number) => {
      try {
        const data = {
          search: search,
          page: 1,
          size: "20",
        };
        return getAllSchedules(data).then((result: any) => {
          let data = result?.data?.rows;

          // console.log("data from getAllSchedulesList", data);

          setNeetScheduleOptions(data);
        });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }, 300),
    []
  );

  useEffect(() => {
    getRegistrationById();
    getAllSchedulesList();
  }, []);

  return (
    <Grid
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Typography variant="h2" sx={{ mb: "20px" }}>
        Neet Registration
      </Typography>
      <Typography variant="h4" color="primary.main" sx={{ mb: "32px" }}>
        Schedule Information
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mb: 3 }}
        // sx={{
        //   width: "85%",
        //   display: "flex",
        //   flexWrap: "wrap",
        //   alignItems: "center",
        //   justifyContent: "space-between",
        //   gap: 3,
        //   mb: "20px",
        // }}
      >
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <AutoComplete
            label={
              <span>
                {fieldData?.scheduleId?.label}
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            }
            placeholder={fieldData?.scheduleId?.placeholder}
            name="scheduleId"
            value={fieldData?.scheduleId?.value}
            inputValue={fieldData?.scheduleId?.scheduleId_input}
            disableClearable={true}
            freeSolo={false}
            helperText={fieldData?.scheduleId?.helperText}
            error={fieldData?.scheduleId?.isError}
            onChange={(e: any, newValue: any) => {
              handleAutoCompleteChange(e, newValue, "scheduleId");
            }}
            onInputChange={(e: any, newInputValue: any) => {
              handleAutoCompleteInputChange(
                e,
                newInputValue,
                "scheduleId_input"
              );
            }}
            renderOption={(props: any, option: any) => {
              return (
                <MenuItem
                  key={option.id}
                  sx={{
                    "&:hover, &.Mui-focused:hover": {
                      color: "backgroundPrimary.main",
                      backgroundColor: "primary.main",
                    },
                    borderRadius: "5px",
                    p: "15px",
                    m: "0 5px",
                    gap: 10,
                  }}
                  {...props}
                >
                  <Box>{option?.name}</Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    ( {moment(option?.date).format("DD-MM-YYYY")})
                  </Box>
                </MenuItem>
              );
            }}
            getOptionLabel={(option: any) => option?.name}
            filterOptions={(options: any, state: any) => {
              const inputValue = state?.inputValue?.toLowerCase();

              return options?.filter(
                (option: any) =>
                  option?.name?.toLowerCase()?.includes(inputValue) ||
                  option?.date.toLowerCase()?.includes(inputValue)
              );
            }}
            options={neetScheduleOptions}
            optionName="name"
            sx={{
              width: {
                xl: "431px",
                lg: "30vw",
                md: "32vw",
                sm: "45vw",
                xs: "95vw",
              },
            }}
          />
        </Grid>
        {/* <TextField
          label="Schedule Name"
          name="name"
          value={scheduleData.name}
          sx={{ ...styles.textFieldStyle }}
        /> */}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <TextField
            label="Date"
            name="date"
            value={registrationData.scheduleDate}
            placeholder="DD/MM/YYYY"
            disabled={true}
            sx={{ ...styles.textFieldStyle }}
          />
        </Grid>{" "}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <TextField
            label="Location"
            name="location"
            value={registrationData.scheduleLocation}
            placeholder="Ex- Kodumudi"
            disabled={true}
            sx={{ ...styles.textFieldStyle }}
          />
        </Grid>
      </Grid>
      <Typography variant="h4" color="primary.main" sx={{ mb: "32px" }}>
        Student Information
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mb: 3 }}
        // sx={{
        //   width: "85%",
        //   display: "flex",
        //   flexWrap: "wrap",
        //   alignItems: "center",
        //   justifyContent: "space-between",
        //   gap: 3,
        //   mb: "20px",
        // }}
      >
        {/* <TextField
          label={
            <span>
              {fieldData.contactNumberOne.label}
              <span style={{ color: "#F43F5E" }}> *</span>
            </span>
          }
          name={fieldData.contactNumberOne.name}
          value={fieldData.contactNumberOne.value}
          onChange={handleInputChange}
          placeholder={fieldData.contactNumberOne.placeholder}
          error={fieldData.contactNumberOne.isError}
          helperText={fieldData.contactNumberOne.helperText}
          sx={{ ...styles.textFieldStyle }}
        /> */}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <AutoComplete
            label={
              <span>
                {fieldData.contactNumberOne.label}
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            }
            value={fieldData.contactNumberOne.value}
            inputValue={fieldData.contactNumberOne.contactNumberOne_input}
            name="contactNumberOne"
            placeholder={fieldData.contactNumberOne.placeholder}
            onChange={(e: any, newValue: any) => {
              handleAutoCompleteChange(e, newValue, "contactNumberOne");
            }}
            onInputChange={(e: any, newInputValue: any) => {
              handleAutoCompleteInputChange(
                e,
                newInputValue,
                "contactNumberOne_input"
              );
            }}
            options={mobileOptions}
            error={fieldData.contactNumberOne.isError}
            helperText={fieldData.contactNumberOne.helperText}
            renderOption={(props: any, option: any) => {
              return (
                <MenuItem
                  key={option.id}
                  sx={{
                    "&:hover, &.Mui-focused:hover": {
                      color: "backgroundPrimary.main",
                      backgroundColor: "primary.main",
                    },
                    borderRadius: "5px",
                    p: "15px",
                    m: "0 5px",
                    gap: 10,
                  }}
                  {...props}
                >
                  <Box>{option?.mobile}</Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    ( {option?.name})
                  </Box>
                </MenuItem>
              );
            }}
            freeSolo={true}
            disabled={false}
            optionName="mobile"
            filterOptions={(options: any, state: any) => {
              const inputValue = state?.inputValue?.toLowerCase();

              return options?.filter(
                (option: any) =>
                  option?.mobile?.toLowerCase()?.includes(inputValue) ||
                  option?.name?.toLowerCase()?.includes(inputValue)
              );
            }}
            sx={{
              width: {
                xl: "431px",
                lg: "30vw",
                md: "32vw",
                sm: "45vw",
                xs: "95vw",
              },
            }}
          />
        </Grid>
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <TextField
            label={
              <span>
                {fieldData.name.label}
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            }
            name={fieldData.name.name}
            value={fieldData.name.value}
            onChange={handleInputChange}
            placeholder={fieldData.name.placeholder}
            error={fieldData.name.isError}
            helperText={fieldData.name.helperText}
            sx={{ ...styles.textFieldStyle }}
          />
        </Grid>{" "}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <TextField
            label={fieldData.registrationNumber.label}
            name={fieldData.registrationNumber.name}
            value={fieldData.registrationNumber.value}
            onChange={handleInputChange}
            placeholder={fieldData.registrationNumber.placeholder}
            error={fieldData.name.isError}
            helperText={fieldData.registrationNumber.helperText}
            sx={{ ...styles.textFieldStyle }}
          />
        </Grid>{" "}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <TextField
            label={fieldData.contactNumberTwo.label}
            name={fieldData.contactNumberTwo.name}
            value={fieldData.contactNumberTwo.value}
            onChange={handleInputChange}
            placeholder={fieldData.contactNumberTwo.placeholder}
            error={fieldData.contactNumberTwo.isError}
            helperText={fieldData.contactNumberTwo.helperText}
            sx={{ ...styles.textFieldStyle }}
          />
        </Grid>{" "}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <AutoComplete
            label={
              <span>
                Village
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            }
            placeholder="Select Village"
            name={fieldData?.villageId?.name}
            value={fieldData?.villageId?.value}
            inputValue={fieldData?.villageId?.villageId_input}
            disabled={false}
            disableClearable={true}
            freeSolo={false}
            helperText={fieldData?.villageId?.helperText}
            error={fieldData?.villageId?.isError}
            onChange={(e: any, newValue: any) => {
              handleAutoCompleteChange(e, newValue, "villageId");
            }}
            onInputChange={(e: any, newInputValue: any) => {
              handleAutoCompleteInputChange(
                e,
                newInputValue,
                "villageId_input"
              );
            }}
            renderOption={(props: any, option: any) => {
              return (
                <MenuItem
                  key={option.id}
                  sx={{
                    "&:hover, &.Mui-focused:hover": {
                      color: "backgroundPrimary.main",
                      backgroundColor: "primary.main",
                    },
                    borderRadius: "5px",
                    p: "15px",
                    m: "0 5px",
                    gap: 10,
                  }}
                  {...props}
                >
                  <Box>{option?.area?.name}</Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    ( {option?.name})
                  </Box>
                </MenuItem>
              );
            }}
            getOptionLabel={(option: any) => option?.name}
            filterOptions={(options: any, state: any) => {
              const inputValue = state?.inputValue?.toLowerCase();

              return options?.filter(
                (option: any) =>
                  option?.name?.toLowerCase()?.includes(inputValue) ||
                  option?.area?.name?.toLowerCase()?.includes(inputValue)
              );
            }}
            options={villageOptions}
            optionName="name"
            sx={{
              width: {
                xl: "431px",
                lg: "30vw",
                md: "32vw",
                sm: "45vw",
                xs: "95vw",
              },
            }}
          />
        </Grid>{" "}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <DatePicker
            label={fieldData.dob.label}
            name={fieldData.dob.name}
            value={fieldData.dob.value}
            onChange={handleDateChange}
            error={fieldData.dob.isError}
            helperText={fieldData.dob.helperText}
            disableFuture={false}
            sx={{ ...styles.datePickerStyle }}
          />
        </Grid>{" "}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <Select
            label={fieldData.gender.label}
            name={fieldData.gender.name}
            value={fieldData.gender.value}
            options={genderOptions}
            onChange={handleInputChange}
            placeholder={fieldData.gender.placeholder}
            error={fieldData.gender.isError}
            helperText={fieldData.gender.helperText}
            selectedType="name"
            sx={{ ...styles.textFieldStyle }}
          />
        </Grid>{" "}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <TextField
            label={fieldData.schoolName.label}
            name={fieldData.schoolName.name}
            value={fieldData.schoolName.value}
            onChange={handleInputChange}
            placeholder={fieldData.schoolName.placeholder}
            error={fieldData.schoolName.isError}
            helperText={fieldData.schoolName.helperText}
            sx={{ ...styles.textFieldStyle }}
          />
        </Grid>{" "}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <TextField
            label={fieldData.schoolLocation.label}
            name={fieldData.schoolLocation.name}
            value={fieldData.schoolLocation.value}
            onChange={handleInputChange}
            placeholder={fieldData.schoolLocation.placeholder}
            error={fieldData.schoolLocation.isError}
            helperText={fieldData.schoolLocation.helperText}
            sx={{ ...styles.textFieldStyle }}
          />
        </Grid>{" "}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <Radio
            label={fieldData.schoolType.label}
            name={fieldData.schoolType.name}
            value={fieldData.schoolType.value}
            onChange={handleRadioChange}
            options={schoolTypeOptions}
            helperText={fieldData?.schoolType?.helperText}
            error={fieldData?.schoolType?.isError}
            disabled={fieldData?.schoolType?.isDisabled}
            sx={{
              width: {
                xl: "431px",
                lg: "30vw",
                md: "32vw",
                sm: "45vw",
                xs: "95vw",
              },
              // mr: "130px",
            }}
          />
        </Grid>{" "}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <Radio
            label={fieldData.medium.label}
            name={fieldData.medium.name}
            value={fieldData.medium.value}
            onChange={handleRadioChange}
            options={mediumOptions}
            helperText={fieldData?.medium?.helperText}
            error={fieldData?.medium?.isError}
            sx={{
              width: {
                xl: "431px",
                lg: "30vw",
                md: "32vw",
                sm: "45vw",
                xs: "95vw",
              },
              // mr: "130px",
            }}
            disabled={fieldData?.medium?.isDisabled}
          />
        </Grid>{" "}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <TextField
            label={fieldData.sslcMark.label}
            name={fieldData.sslcMark.name}
            value={fieldData.sslcMark.value}
            onChange={handleInputChange}
            placeholder={fieldData.sslcMark.placeholder}
            error={fieldData.sslcMark.isError}
            helperText={fieldData.sslcMark.helperText}
            sx={{ ...styles.textFieldStyle }}
          />
        </Grid>{" "}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <TextField
            label={fieldData.neetApplicationNumber.label}
            name={fieldData.neetApplicationNumber.name}
            value={fieldData.neetApplicationNumber.value}
            onChange={handleInputChange}
            placeholder={fieldData.neetApplicationNumber.placeholder}
            error={fieldData.neetApplicationNumber.isError}
            helperText={fieldData.neetApplicationNumber.helperText}
            sx={{ ...styles.textFieldStyle }}
          />
        </Grid>{" "}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <TextField
            label={fieldData.aadhaarNo.label}
            name={fieldData.aadhaarNo.name}
            value={fieldData.aadhaarNo.value}
            onChange={handleInputChange}
            placeholder={fieldData.aadhaarNo.placeholder}
            error={fieldData.aadhaarNo.isError}
            helperText={fieldData.aadhaarNo.helperText}
            sx={{ ...styles.textFieldStyle }}
          />
        </Grid>{" "}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <TextField
            label={fieldData.address.label}
            name={fieldData.address.name}
            value={fieldData.address.value}
            onChange={handleInputChange}
            placeholder={fieldData.address.placeholder}
            error={fieldData.address.isError}
            helperText={fieldData.address.helperText}
            sx={{ ...styles.textFieldStyle }}
          />
        </Grid>{" "}
        <Grid
          item
          sx={{
            mr: {
              xl: "100px",
              lg: "75px",
              md: "0",
              sm: "0px",
              xs: "100px",
            },
          }}
        >
          <TextField
            label={fieldData.reference.label}
            name={fieldData.reference.name}
            value={fieldData.reference.value}
            onChange={handleInputChange}
            placeholder={fieldData.reference.placeholder}
            error={fieldData.reference.isError}
            helperText={fieldData.reference.helperText}
            sx={{ ...styles.textFieldStyle }}
          />
        </Grid>
      </Grid>
      <Button
        loading={isButtonLoading}
        buttonText="Submit"
        onClick={handleSubmit}
        sx={{ width: "210px", height: "50px", fontSize: "16px", m: "50px 0px" }}
      />
    </Grid>
  );
};

export default NeetRegistrationAddAndEdit;
