import { Grid, Typography } from "@mui/material";

import {
  AddressInformation,
  PersonalInformation,
} from "../../../components/shared";
import { Button } from "../../../components/basic";
import { useCallback, useEffect, useState } from "react";
import {
  createCustomer,
  getCustomerById,
  updateCustomerWithId,
} from "../../../services/customerService";
import dayjs from "dayjs";
import moment from "moment";
import {
  requiredValidator,
  updateFormDataWithHelperText,
  mobileNumberValidator,
} from "../../../utils/ValidationUtils";
import { useNavigate, useParams } from "react-router-dom";
import { RouteUrls } from "../../../constants/routes";
import {
  setSnackBarFailed,
  setSnackBarSuccess,
} from "../../../redux/slices/snackbar";
import { useDispatch } from "react-redux";
import { customerPageConst } from "../../../constants/displayText";
import { villageDetails } from "../../../services/masterService";
import { debounce } from "@mui/material";

const AddCustomer = () => {
  const { id } = useParams();

  const [autoCompleteClear, setAutoCompleteClear] = useState<any>(false);
  const [villageOptions, setVillageOptions] = useState<any>([]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getCustomerById(id)
        .then((res: any) => {
          const customerDetail = res.data;

          // console.log("customerDetail from getCustomerById", customerDetail);
          setPersonalInfoData((prevState: any) => ({
            ...prevState,
            name: customerDetail?.name,
            aadhaarNo: customerDetail?.aadhaarNo,
            dob: customerDetail?.dob ? dayjs(customerDetail?.dob) : null,
          
            villageId: customerDetail?.address?.village
              ? customerDetail?.address?.village
              : customerDetail?.villageData,
            villageId_input: customerDetail?.address?.village?.name
              ? customerDetail?.address?.village?.name
              : customerDetail?.villageData?.name,
            areaId: {
              id: customerDetail?.address?.area?.id,
              name: customerDetail?.address?.area?.name,
            },
            talukId: {
              id: customerDetail?.address?.area?.taluk?.id,
              name: customerDetail?.address?.area?.taluk?.name,
            },
            cityId: {
              id: customerDetail?.address?.area?.city?.id,
              name: customerDetail?.address?.area?.city?.name,
            },
            gender: customerDetail?.gender,
            mobile: customerDetail?.mobile,
            age: customerDetail?.age,
            address: customerDetail?.address?.address,
            pinCode: customerDetail?.address?.pinCode,
            addressId: customerDetail?.address?.id,
          }));
          setAutoCompleteClear(!autoCompleteClear);

          setLoading(false);
        })
        .catch((err: any) => {
          setLoading(false);
        });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllVillages();
  }, []);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [personalInfoData, setPersonalInfoData] = useState<any>({
    name: "",
    mobile: "",
    aadhaarNo: "",
    dob: null,
    age: "",
    gender: "",
    address: "",
    pinCode: "",
    villageId: null,
    villageId_input: "",
    areaId: { id: null, name: "" },
    areaId_input: "",
    talukId: { id: null, name: "" },
    talukId_input: "",
    cityId: { id: null, name: "" },
    state: "TamilNadu",
  });
  const [formError, setFormError] = useState<any>({
    name: "",
    mobile: "",
    aadhaarNo: "",
    dob: "",
    gender: "",
    address: "",
    pinCode: "",
    villageId: "",
    areaId: "",
    talukId: "",
    cityId: "",
  });

  const fieldData: any = {
    name: {
      label: "Name",
      name: "name",
      value: personalInfoData.name,
      isError: Boolean(formError.name),
      helperText: formError.name,
    },
    mobile: {
      label: "Mobile",
      name: "mobile",
      value: personalInfoData.mobile,
      isError: Boolean(formError.mobile),
      helperText: formError.mobile,
    },
    aadhaarNo: {
      label: "Aadhaar No",
      name: "aadhaarNo",
      value: personalInfoData.aadhaarNo,
      isError: Boolean(formError.aadhaarNo),
      helperText: formError.aadhaarNo,
    },
    dob: {
      label: "DOB",
      name: "dob",
      value: personalInfoData.dob,
      isError: Boolean(formError.dob),
      helperText: formError.dob,
    },
    age: {
      label: "Age",
      name: "age",
      value: personalInfoData.age,
    },
    gender: {
      label: "Gender",
      name: "gender",
      value: personalInfoData.gender,
      isError: Boolean(formError.gender),
      helperText: formError.gender,
    },
    address: {
      label: "Address",
      name: "address",
      value: personalInfoData.address,
      isError: Boolean(formError.address),
      helperText: formError.address,
    },
    pinCode: {
      label: "Pincode",
      name: "pinCode",
      value: personalInfoData.pinCode,
      isError: Boolean(formError.pinCode),
      helperText: formError.pinCode,
    },
    villageId: {
      label: "Village",
      name: "villageId",
      value: personalInfoData?.villageId,
      villageId_input: personalInfoData?.villageId_input,
      isError: formError.villageId === "" ? false : true,
      helperText: formError.villageId,
    },
    areaId: {
      label: "Area/Locality",
      name: "areaId",
      value: personalInfoData?.areaId?.name,
      areaId_input: personalInfoData?.areaId_input,
      isError: Boolean(formError.areaId),
      helperText: formError.areaId,
    },
    talukId: {
      label: "Taluk",
      name: "talukId",
      value: personalInfoData?.talukId?.name,
      isError: formError.talukId === "" ? false : true,
      helperText: formError.talukId,
    },
    cityId: {
      label: "City/District/Town",
      name: "cityId",
      value: personalInfoData?.cityId?.name,
      isError: Boolean(formError.cityId),
      helperText: formError.cityId,
    },
    state: {
      label: "State",
      name: "state",
      value: personalInfoData.state,
      isError: Boolean(formError.state),
      helperText: formError.state,
    },
  };

  const [informationFieldData, setInformationFieldData] = useState(fieldData);

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

  const handleChange = useCallback((e: any) => {
    let { name, value } = e.target;

    if (name === "mobile") {
      if (value.length > 10) {
        value = value.slice(0, 10);

        handleValidation({
          target: {
            name: "mobile",
            value: value,
          },
        });
      } else {
        handleValidation({
          target: {
            name: "mobile",
            value: value,
          },
        });
      }
    } else {
      handleValidation(e);
    }

    // console.log("name, value from handleChange", name, value);

    setPersonalInfoData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleDateChange = (newValue: any, name: any) => {
    // const currentDate = dayjs();
    // const selectedDate = dayjs(newValue);
    // const age = currentDate.diff(selectedDate, "year");

    setPersonalInfoData((prevBookingData: any) => ({
      ...prevBookingData,
      [name]: newValue,
      // age: age,
    }));
    handleValidation({
      target: {
        name: "dob",
        value: newValue,
      },
    });
  };

  const handleAutoCompleteChange = (e: any, newValue: any, name: any) => {
    // console.log("newValue, name from handleAutoCompleteChange", newValue, name);
    if (newValue === null) {
      return false;
    }

    if (name === "villageId") {
      setPersonalInfoData((prevBookingData: any) => ({
        ...prevBookingData,
        [name]: newValue,
        villageId_input: newValue.name,
        areaId: { id: newValue?.area?.id, name: newValue?.area?.name },
        talukId: {
          id: newValue?.area?.taluk?.id,
          name: newValue?.area?.taluk?.name,
        },
        cityId: {
          id: newValue?.area?.city?.id,
          name: newValue?.area?.city?.name,
        },
      }));
    }
  };
  // console.log("personalInfoData from main", personalInfoData);

  const handleAutoCompleteInputChange = (
    e: any,
    newInputValue: string,
    name: string
  ) => {
    // console.log(
    //   "mnmnmn name, newInputValue from handleAutoCompleteInputChange",
    //   name,
    //   newInputValue
    // );

    if (
      name === "villageId_input" &&
      newInputValue === "" &&
      // personalInfoData.mobile !== ""
      // &&
      id
    ) {
      return false;
    }

    setPersonalInfoData((prevBookingData: any) => ({
      ...prevBookingData,
      [name]: newInputValue,
      // mobile: newInputValue,
    }));
    // setAutoCompleteClear(!autoCompleteClear);

    handleValidation({
      target: {
        name: "villageId",
        value: newInputValue,
      },
    });

    getAllVillages(newInputValue);
  };

  const handleValidation = (e: any) => {
    const { name, value, label } = e.target;

    // console.log(
    //   "name, value, label  from handleValidation",
    //   name,
    //   value,
    //   label
    // );
    switch (name) {
      case "name": {
        if (requiredValidator(value, label)) {
          updateFormDataWithHelperText(
            name,
            requiredValidator(value, label),
            setFormError
          );
        } else {
          updateFormDataWithHelperText(name, "", setFormError);
        }
        break;
      }
      case "mobile": {
        if (mobileNumberValidator(value, label)) {
          updateFormDataWithHelperText(
            name,
            mobileNumberValidator(value, label),
            setFormError
          );
        } else {
          updateFormDataWithHelperText(name, "", setFormError);
        }
        break;
      }
      case "villageId": {
        if (requiredValidator(value, label)) {
          updateFormDataWithHelperText(
            name,
            requiredValidator(value, label),
            setFormError
          );
        } else {
          updateFormDataWithHelperText(name, "", setFormError);
        }
        break;
      }
      default:
        break;
    }
  };

  const validateForm = () => {
    for (const fieldName in fieldData) {
      if ((fieldData as any)[fieldName]?.name) {
        handleValidation({ target: (fieldData as any)[fieldName] });
      }
    }
  };

  const updateLogInFormData = () => {
    setInformationFieldData((prevFieldData: any) => {
      return Object.keys(prevFieldData).map((field: any) => {
        return {
          ...field,
          value: personalInfoData[field.name],
          helperText: formError[field.name],
          isError: formError[field.name] === "" ? false : true,
        };
      });
    });
  };

  useEffect(() => {
    updateLogInFormData();
  }, [formError, personalInfoData]);

  const { name, mobile, villageId } = personalInfoData;

  const handleSubmit = async () => {
    if (
      mobileNumberValidator(Number(mobile), "mobile") ||
      name === "" ||
      villageId === null
    ) {
      validateForm();
    } else {
      setLoading(true);
      let editData;
      let data = {
        name: personalInfoData.name,
        mobile: personalInfoData.mobile,
        aadhaarNo: personalInfoData.aadhaarNo,
        dob: personalInfoData?.dob
          ? moment(personalInfoData?.dob?.$d).format("YYYY-MM-DD")
          : null,
        age: personalInfoData.age || null,
        gender: personalInfoData.gender,
        address: {
          address: personalInfoData.address,
          pinCode: personalInfoData.pinCode,
          villageId: personalInfoData?.villageId?.id,
          areaId: personalInfoData?.areaId?.id,
          talukId: personalInfoData?.talukId?.id,
          cityId: personalInfoData?.cityId?.id,
        },
      };

      if (id) {
        editData = {
          ...data,
          address: {
            ...data.address,
            id: personalInfoData.addressId,
          },
        };
      }

      try {
        let res;
        if (id) {
          res = await updateCustomerWithId(id, editData);
        } else {
          res = await createCustomer(data);
        }
        if (res) {
          dispatch(
            setSnackBarSuccess({
              snackBarMessage: customerPageConst.CUSTOMER_CREATED,
            })
          );
          setLoading(false);
          navigate(`${RouteUrls.adminUrl}${RouteUrls.customerRegistrationUrl}`);
        }
      } catch (error: any) {
        console.log("Error occurred:", error);
        setLoading(false);
        dispatch(
          setSnackBarFailed({
            snackBarMessage: error.response.data.message,
          })
        );
      }
    }
    setLoading(false);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xl={12} xs={12}>
        <Typography variant="h2" color="textPrimary.main">
          Customer Registration
        </Typography>
      </Grid>
      <Grid item xl={12} xs={12}>
        <PersonalInformation
          fieldData={fieldData}
          handleInputChange={handleChange}
          formError={formError}
          handleAutoCompleteChange={handleAutoCompleteChange}
          handleAutoCompleteInputChange={handleAutoCompleteInputChange}
          handleDateChange={handleDateChange}
          autoCompleteClear={autoCompleteClear}
          editable={!!id}
          villageOptions={villageOptions}
        />
      </Grid>
      <Grid item xl={12} xs={12}>
        <AddressInformation
          fieldData={fieldData}
          handleInputChange={handleChange}
          formError={formError}
        />
      </Grid>
      <Grid item xl={4.5} xs={12} sx={{ display: "flex", gap: 3.5 }}>
        <Button
          buttonText="Submit"
          loading={loading}
          sx={{
            width: "218px",
            height: "51px",
            mt: 3.5,
            mb: 2,
          }}
          onClick={handleSubmit}
        />
      </Grid>
    </Grid>
  );
};

export default AddCustomer;
