import { Grid, Typography, debounce } from "@mui/material";
import {
  AddressInformation,
  PersonalInformation,
} from "../../../../components/shared";
import { Button } from "../../../../components/basic";
import { useCallback, useEffect, useState } from "react";
import {
  CustomerDetails,
  PersonalInformationDetails,
  consultantDetails,
  reasonDetails,
} from "../../../../services/customerService";
import dayjs from "dayjs";
import moment from "moment";
import {
  requiredValidator,
  updateFormDataWithHelperText,
  mobileNumberValidator,
} from "../../../../utils/ValidationUtils";
import { useNavigate, useParams } from "react-router-dom";
import { RouteUrls } from "../../../../constants/routes";
import AppointmentInformation from "../../../../components/shared/appointmentInformation";
import {
  createAppointment,
  getAppointmentById,
  getTokenNumber,
  updateAppointmentById,
} from "../../../../services/appointmentService";
import {
  setSnackBarFailed,
  setSnackBarSuccess,
} from "../../../../redux/slices/snackbar";
import { useDispatch } from "react-redux";
import { appointmentPageConst } from "../../../../constants/displayText";
import { useLoadItems } from "../../../../hooks/useLoadItemsHook";
import { villageDetails } from "../../../../services/masterService";

const AddAppointment = () => {
  const { id } = useParams();
  const [currentToken, setCurrentToken] = useState(0);
  const [customersName, setCustomersName] = useState<any>([]);
  const [consultantList, setConsultantList] = useState<any>([]);
  const [reasonList, setReasonList] = useState<any>([]);
  const [tokenNo, setTokenNumber] = useState();
  const [autoCompleteClear, setAutoCompleteClear] = useState<any>(false);
  const [autoCompleteClearTwo, setAutoCompleteClearTwo] = useState<any>(false);
  const [villageOptions, setVillageOptions] = useState<any>([]);

  const getAllCustomers = useCallback(
    debounce(async (search?: string | number) => {
      try {
        const data = {
          search: search,
          page: 1,
          size: "20",
        };
        return CustomerDetails(data).then((result: any) => {
          let data = result?.data?.rows;
          const customersList = data?.map((uniqueData: any) => {
            return {
              id: uniqueData.id,
              name: uniqueData.name,
              mobileNumber: uniqueData.mobile,
            };
          });

          setCustomersName(customersList);
        });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }, 300),
    []
  );

  const getAllReasons = async () => {
    try {
      return await reasonDetails().then((result: any) => {
        let data = result?.data;

        const reasonsList = data?.map((uniqueData: any) => {
          return {
            id: uniqueData.id,
            name: uniqueData.name,
          };
        });
        setReasonList(reasonsList);
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getAllConsultants = async () => {
    try {
      return await consultantDetails().then((result: any) => {
        let data = result?.data;

        const consultantList = data?.map((uniqueData: any) => {
          return {
            id: uniqueData.id,
            name: uniqueData.name,
          };
        });
        setConsultantList(consultantList);
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getAllCustomers();
    getAllReasons();
    getAllConsultants();
    getAllVillages();
    getTokenNumber(moment().format("YYYY-MM-DD"))
      .then((res: any) => {
        const customerDetail = res.data.tokenNo;
        setCurrentToken(customerDetail);
        setIsLoading(false);
      })
      .catch((err: any) => {
        setIsLoading(false);
      });
    setIsLoading(false);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { appointmentUrl, clinicalUrl } = RouteUrls;

  const initialData = {
    name: "",
    name_input: "",
    mobile: null,
    mobile_input: "",
    aadhaarNo: "",
    dob: null,
    age: null,
    address: "",
    pinCode: null,
    villageId: null,
    villageId_input: null,
    areaId: { id: null, name: "" },
    areaId_input: "",
    talukId: { id: null, name: "" },
    cityId: { id: null, name: "" },
    gender: null,
    branchId: 1,
    addressId: null,
    bp: "",
    temperature: "",
    consultant: "",
    reason: null,
    reason_input: "",
    bmi: "",
    weight: null,
    height: null,
    sugarTest: "",
    paymentType: "",
    status: "",
    date: dayjs(new Date()),
    consultantFee: 20,
    isDisabled: false,
  };

  const [personalInfoData, setPersonalInfoData] = useState<any>(initialData);

  const [formError, setFormError] = useState<any>({
    name: "",
    name_input: "",
    mobile: "",
    aadhaarNo: "",
    dob: "",
    age: "",
    gender: "",
    address: "",
    pinCode: "",
    bp: "",
    temperature: "",
    consultant: "",
    reason: "",
    bmi: "",
    weight: "",
    height: "",
    sugarTest: "",
    paymentType: "",
    status: "",
    date: "",
    villageId: "",
    areaId: "",
    talukId: "",
  });

  const [isDisable, setIsDisable] = useState(false);

  const dispatch = useDispatch();

  const fieldData: any = {
    name: {
      label: "Name",
      name: "name",
      name_input: personalInfoData.name_input,
      value: personalInfoData.name,
      isError: Boolean(formError.name),
      helperText: formError.name,
    },
    mobile: {
      label: "Mobile",
      name: "mobile",
      value: personalInfoData.mobile,
      mobile_input: personalInfoData.mobile_input,
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
      isError: Boolean(formError.age),
      helperText: formError.age,
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
      value: personalInfoData.villageId,
      villageId_input: personalInfoData.villageId_input,
      isError: formError.villageId === "" ? false : true,
      helperText: formError.villageId,
    },
    areaId: {
      label: "Area/Locality",
      name: "areaId",
      value: personalInfoData?.areaId?.name,
      areaId_input: personalInfoData.areaId_input,
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
    bmi: {
      label: "Bmi",
      name: "bmi",
      value: personalInfoData.bmi,
      isError: Boolean(formError.bmi),
      helperText: formError.bmi,
    },
    weight: {
      label: "Weight",
      name: "weight",
      value: personalInfoData.weight,
      isError: Boolean(formError.weight),
      helperText: formError.weight,
    },
    height: {
      label: "Height",
      name: "height",
      value: personalInfoData.height,
      isError: Boolean(formError.height),
      helperText: formError.height,
    },
    reason: {
      label: "Reason",
      name: "reason",
      value: personalInfoData.reason,
      reason_input: personalInfoData.reason_input,
      isError: Boolean(formError.reason),
      helperText: formError.reason,
    },
    consultant: {
      label: "Consultant",
      name: "consultant",
      value: personalInfoData.consultant,
      isError: Boolean(formError.consultant),
      helperText: formError.consultant,
    },
    sugarTest: {
      label: "Sugar Test",
      name: "sugarTest",
      value: personalInfoData.sugarTest,
      isError: Boolean(formError.sugarTest),
      helperText: formError.sugarTest,
    },
    paymentType: {
      label: "Payment Type",
      name: "paymentType",
      value: personalInfoData.paymentType,
      isError: Boolean(formError.paymentType),
      helperText: formError.paymentType,
    },
    status: {
      label: "Status",
      name: "status",
      value: personalInfoData.status,
      isError: Boolean(formError.status),
      helperText: formError.status,
    },
    date: {
      label: "Date",
      name: "date",
      value: personalInfoData.date,
      isError: Boolean(formError.date),
      helperText: formError.date,
    },
    bp: {
      label: "BP",
      name: "bp",
      value: personalInfoData.bp,
      isError: Boolean(formError.bp),
      helperText: formError.bp,
    },
    temperature: {
      label: "Temperature",
      name: "temperature",
      value: personalInfoData.temperature,
      isError: Boolean(formError.temperature),
      helperText: formError.temperature,
    },
    consultantFee: {
      label: "Consultant Fee",
      name: "consultantFee",
      value: personalInfoData.consultantFee,
    },
  };

  const [appointmentFieldData, setAppointmentFieldData] =
    useState<any>(fieldData);

  useEffect(() => {
    if (id) {
      getAppointmentById(id)
        .then((res: any) => {
          const customerDetail = res.data;
          // console.log("customerDetail from getAppointmentById", customerDetail);
          setPersonalInfoData((prevState: any) => ({
            ...prevState,
            name: customerDetail?.customer?.name,
            mobile: customerDetail?.customer?.mobile,
            mobile_input: customerDetail?.customer?.mobile,
            aadhaarNo: customerDetail?.customer?.aadhaarNo,
            dob: customerDetail?.customer?.dob
              ? dayjs(customerDetail?.customer?.dob)
              : null,
            gender: customerDetail?.customer?.gender,
            address: customerDetail?.customer?.address?.address,
            age: customerDetail?.customer?.age,
            pinCode: customerDetail?.customer?.address?.pinCode,
            addressId: customerDetail?.customer?.address?.id,
            reason: customerDetail?.reason,
            reason_input: customerDetail?.reason?.name,
            consultant: Number(customerDetail?.consultant?.id),
            villageId: customerDetail?.customer?.address?.village
              ? customerDetail?.customer?.address?.village
              : customerDetail?.villageData,
            villageId_input: customerDetail?.customer?.address?.village?.name
              ? customerDetail?.customer?.address?.village?.name
              : customerDetail?.villageData?.name,
            // areaId:
            //   customerDetail?.customer?.address?.area?.id ||
            //   customerDetail?.customer?.address?.area_id,
            // talukId:
            //   customerDetail?.customer?.address?.area?.taluk?.id ||
            //   customerDetail?.customer?.address?.area?.taluk_id,
            // cityId:
            //   customerDetail?.customer?.address?.area?.city?.id ||
            //   customerDetail?.customer?.address?.area?.city_id,
            areaId: {
              id: customerDetail?.customer?.address?.area?.id,
              name: customerDetail?.customer?.address?.area?.name,
            },
            talukId: {
              id: customerDetail?.customer?.address?.area?.taluk?.id,
              name: customerDetail?.customer?.address?.area?.taluk?.name,
            },
            cityId: {
              id: customerDetail?.customer?.address?.area?.city?.id,
              name: customerDetail?.customer?.address?.area?.city?.name,
            },
            bp: customerDetail?.bp,
            bmi: customerDetail?.bmi,
            weight: customerDetail?.weight,
            height: customerDetail?.height,
            paymentType: customerDetail?.paymentType,
            date: customerDetail?.date ? dayjs(customerDetail?.date) : null,
            sugarTest: customerDetail?.sugarTest,
            temperature: customerDetail?.temperature,
            appointmentId: customerDetail.id,
            consultantFee: customerDetail?.consultationFee,
          }));
          setTokenNumber(customerDetail.tokenNo);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // console.log("name, value from handleChange", name, value);
    const newState = { ...personalInfoData, [name]: value };

    let numericValue = value;

    if (
      name === "aadhaarNo" ||
      name === "age" ||
      name === "pinCode" ||
      name === "quantity" ||
      name === "weight" ||
      name === "height" ||
      name === "bp" ||
      name === "temperature"
    ) {
      numericValue = value.replace(/[^\d.]/g, "");
    }
    setPersonalInfoData((prev: any) => ({
      ...prev,
      [name]: numericValue,
    }));

    if (
      (name === "weight" || name === "height") &&
      newState.height &&
      newState.weight
    ) {
      const heightInMeters = Number(newState["height"]) / 100;
      const bmiValue =
        newState.height !== "0" && newState.weight !== "0"
          ? (
              Number(newState["weight"]) /
              (heightInMeters * heightInMeters)
            ).toFixed(2)
          : "0";

      newState.bmi = bmiValue ? bmiValue : 0;
      setPersonalInfoData((prev: any) => ({
        ...prev,
        bmi: bmiValue !== "Nan" ? bmiValue : 0,
      }));
    }
    handleValidation(e);
  };

  const handleDateChange = (newValue: any, name: any) => {
    const currentDate = dayjs();
    const selectedDate = dayjs(newValue);
    const age = currentDate.diff(selectedDate, "year");

    if (name === "dob") {
      setPersonalInfoData((prevBookingData: any) => ({
        ...prevBookingData,
        [name]: newValue,
        age: age,
      }));

      handleValidation({
        target: {
          name: "age",
          value: age,
        },
      });
    } else {
      setPersonalInfoData((prevBookingData: any) => ({
        ...prevBookingData,
        [name]: newValue,
      }));
    }
    handleValidation({
      target: {
        name: name,
        value: newValue,
      },
    });
  };

  const handleAppointmentDateChange = (newValue: any) => {
    setPersonalInfoData((prev: any) => ({
      ...prev,
      date: newValue,
    }));
    handleValidation({ target: { name: "date", value: newValue } });
  };

  const handleValidation = (e: any) => {
    const { name, value, label } = e.target;

    // console.log(
    //   "qwerty name, value, label from handleValidation",
    //   name,
    //   value,
    //   label
    // );

    switch (name) {
      case "name":
      case "age":
      case "gender":
      case "weight":
      case "height":
      case "date":
      case "consultant":
      case "reason":
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
      case "mobile": {
        if (
          mobileNumberValidator(
            value !== null ? value.slice(0, 10) : fieldData.mobile.mobile_input,
            label
          )
        ) {
          updateFormDataWithHelperText(
            name,
            mobileNumberValidator(
              value !== null
                ? value.slice(0, 10)
                : fieldData.mobile.mobile_input,
              label
            ),
            setFormError
          );
          updateFormDataWithHelperText(
            name,
            mobileNumberValidator(fieldData.mobile.mobile_input, label),
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

  const updateFieldData = () => {
    setAppointmentFieldData((prev: any) => {
      return Object.keys(prev).map((field: any) => {
        return {
          ...field,
          value: personalInfoData[field.name],
          isError: formError[field.name] === "" ? false : true,
          helperText: formError[field.name],
        };
      });
    });
  };

  useEffect(() => {
    updateFieldData();
  }, [formError, personalInfoData]);

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

  const handleAutoCompleteChange = (e: any, newValue: any, name: any) => {
    // console.log("name, newValue from handleAutoCompleteChange", name, newValue);
    if (newValue === null) {
      return false;
    }
    if (name === "mobile") {
      setPersonalInfoData((prevBookingData: any) => ({
        ...prevBookingData,
        [name]: newValue.id,
        name: newValue.name,
        mobile_input: Number(newValue.mobileNumber),
      }));
    }

    if (name === "villageId") {
      setPersonalInfoData((prevBookingData: any) => ({
        ...prevBookingData,
        [name]: newValue,
        villageId_input: newValue.name,
        // areaId: newValue.area.id,
        // talukId: newValue.area.taluk.id,
        // cityId: newValue.area.city.id,
        areaId: { id: newValue.area.id, name: newValue.area.name },
        talukId: { id: newValue.area.taluk.id, name: newValue.area.taluk.name },
        cityId: { id: newValue.area.city.id, name: newValue.area.city.name },
      }));
    }
    if (name === "reason") {
      setPersonalInfoData((prevBookingData: any) => ({
        ...prevBookingData,
        [name]: newValue,
        reason_input: newValue.name,
      }));
    }
  };

  const handleAutoCompleteInputChange = (
    e: any,
    newInputValue: string,
    name: string
  ) => {
    let newName: string;

    // console.log(
    //   "newInputValue, name, personalInfoData.mobile,personalInfoData.mobile_input from handleAutoCompleteInputChange",
    //   newInputValue,
    //   name,
    //   personalInfoData.mobile,
    //   personalInfoData.mobile_input
    // );

    // const isEmpty =
    //   personalInfoData.mobile_input === "" && personalInfoData.mobile === null;

    if (
      name === "villageId_input" &&
      newInputValue === "" &&
      personalInfoData.mobile_input !== ""
    ) {
      return false;
    }

    if (
      name === "reason_input" &&
      newInputValue === "" &&
      personalInfoData.mobile !== null &&
      personalInfoData.mobile_input !== ""
    ) {
      return false;
    }

    if (name === "mobile_input") {
      if (newInputValue.length > 10) {
        newInputValue = newInputValue.slice(0, 10);
      }
    }

    if (newInputValue.includes(",")) {
      let splitArray = newInputValue.split(",").map((item: any) => item.trim());
      newName = splitArray[0];
    } else {
      newName = newInputValue;
    }

    const isCustomerPresent = customersName.some(
      (item: any) => item.name === newName
    );

    if (name === "mobile_input") {
      if (!isCustomerPresent) {
        setPersonalInfoData((prevBookingData: any) => ({
          ...prevBookingData,
          name: "",
          pinCode: "",
          addressId: null,
          [name]: newInputValue,
          mobile: null,
          villageId: null,
          villageId_input: "",
          areaId: { id: null, name: "" },
          areaId_input: "",
          talukId: { id: null, name: "" },
          cityId: { id: null, name: "" },
          age: "",
        }));
        setAutoCompleteClear(!autoCompleteClear);

        setIsDisable(false);
      } else {
        setPersonalInfoData((prevBookingData: any) => ({
          ...prevBookingData,
          [name]: newInputValue,
        }));
      }
      getAllCustomers(newInputValue);
    }

    if (name === "villageId_input") {
      setPersonalInfoData((prevBookingData: any) => ({
        ...prevBookingData,
        [name]: newInputValue,
      }));
      setAutoCompleteClearTwo(!autoCompleteClearTwo);
      getAllVillages(newInputValue);
    }
    if (name === "reason_input") {
      setPersonalInfoData((prevBookingData: any) => ({
        ...prevBookingData,
        [name]: newInputValue,
      }));
    }
    if (name === "mobile_input") {
      handleValidation({
        target: {
          name: "mobile",
          value: newInputValue,
        },
      });
    }
    if (name === "villageId_input") {
      handleValidation({
        target: {
          name: "villageId",
          value: newInputValue === "" ? "others" : newInputValue,
        },
      });
    }
    if (name === "reason_input") {
      handleValidation({
        target: {
          name: "reason",
          value: newInputValue,
        },
      });
    }
  };

  const {
    name,
    mobile,
    villageId,
    areaId,
    talukId,
    cityId,
    consultant,
    reason,
    name_input,
    mobile_input,
    date,
    age,
    gender,
    height,
    weight,
  } = personalInfoData;

  const handleSubmit = async () => {
    // console.log("personalInfoData from handleSubmit", personalInfoData);
    if (
      // mobile_input === "" ||
      mobileNumberValidator(Number(fieldData.mobile.mobile_input), "mobile") ||
      name === "" ||
      villageId === null ||
      consultant === "" ||
      reason === null ||
      date === null ||
      age === null ||
      gender === null ||
      height === null ||
      weight === null
    ) {
      validateForm();
    } else {
      let data = {
        name: personalInfoData.name,
        mobile: personalInfoData.mobile_input,
        aadhaarNo: personalInfoData.aadhaarNo,
        dob: personalInfoData?.dob
          ? moment(personalInfoData?.dob?.$d).format("YYYY-MM-DD")
          : null,
        age: personalInfoData?.age || null,
        gender: personalInfoData?.gender,
        address: {
          address: personalInfoData?.address,
          pinCode: personalInfoData?.pinCode,
          villageId: personalInfoData?.villageId?.id,
          areaId: personalInfoData?.areaId?.id,
          talukId: personalInfoData?.talukId?.id,
          cityId: personalInfoData?.cityId?.id,
        },
        appointment: {
          reasonId: personalInfoData?.reason?.id,
          consultantId: personalInfoData?.consultant,
          bp: personalInfoData?.bp,
          weight: personalInfoData?.weight,
          height: personalInfoData?.height,
          sugarTest: personalInfoData?.sugarTest,
          temperature: personalInfoData?.temperature,
          bmi: personalInfoData?.bmi,
          paymentType: personalInfoData?.paymentType,
          status: personalInfoData?.status,
          date: moment(personalInfoData?.date?.$d).format("YYYY-MM-DD"),
          consultationFee: personalInfoData?.consultantFee,
        },
      };

      setIsLoading(true);
      let editData;

      if (id) {
        editData = {
          ...data,
          appointment: {
            ...data.appointment,
            id: personalInfoData.appointmentId,
          },
          address: {
            ...data.address,
            id: personalInfoData.addressId,
          },
        };
      }

      try {
        let res;
        if (id) {
          res = await updateAppointmentById(id, editData);
        } else {
          res = await createAppointment(data);
        }
        if (res) {
          setIsLoading(false);
          navigate(`${clinicalUrl}${appointmentUrl}`);
          dispatch(
            setSnackBarSuccess({
              snackBarMessage: id
                ? appointmentPageConst.APPOINTMENT_UPDATED
                : appointmentPageConst.APPOINTMENT_CREATED,
            })
          );
        }
      } catch (error: any) {
        setIsLoading(false);
        dispatch(
          setSnackBarFailed({
            snackBarMessage: error.response.data.message,
          })
        );
      }
    }
    setIsLoading(false);
  };

  const getPersonalInformations = async () => {
    if (id !== undefined || mobile === null) {
      return false;
    } else {
      try {
        await PersonalInformationDetails(mobile).then((result: any) => {
          let data = result.data;
          let addressData = result?.data?.address;

          // console.log("result.data from getPersonalInformations", result.data);

          if (data && addressData) {
            setPersonalInfoData((prev: any) => ({
              ...prev,
              name: data?.name,
              aadhaarNo: data?.aadhaarNo,
              dob: data?.dob ? dayjs(data?.dob) : null,
              age: data?.age,
              gender: data?.gender,
              address: addressData?.address,
              pinCode: addressData?.pinCode,
              villageId: addressData?.village
                ? addressData?.village
                : result?.data?.villageData,
              villageId_input: addressData?.village?.name
                ? addressData?.village?.name
                : result?.data?.villageData?.name,
              // areaId: addressData?.area?.id || addressData?.area_id,
              // talukId:
              //   addressData?.area?.taluk?.id || addressData?.area?.taluk_id,
              // cityId: addressData?.area?.city?.id || addressData?.area?.city_id,
              areaId: {
                id: addressData?.area?.id,
                name: addressData?.area?.name,
              },
              talukId: {
                id: addressData?.area?.taluk?.id,
                name: addressData?.area?.taluk?.name,
              },
              cityId: {
                id: addressData?.area?.city?.id,
                name: addressData?.area?.city?.name,
              },
              addressId: addressData?.id,
              isDisabled: true,
            }));
            handleValidation({
              target: {
                name: "name",
                value: data.name,
              },
            });
            handleValidation({
              target: {
                name: "mobile",
                value: data.mobile,
              },
            });
            handleValidation({
              target: {
                name: "villageId",
                value: result?.data?.villageData?.name
                  ? result?.data?.villageData?.name
                  : addressData?.village?.name,
              },
            });
            setIsDisable(true);
          }
        });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  useEffect(() => {
    getPersonalInformations();
  }, [mobile]);

  return (
    <Grid container spacing={4}>
      <Grid item xl={12} xs={12}>
        <Typography variant="h2" color="textPrimary.main">
          Appointment Registration
        </Typography>
      </Grid>
      <Grid item xl={12} xs={12}>
        <PersonalInformation
          freeSolo={true}
          fieldData={fieldData}
          handleAutoCompleteChange={handleAutoCompleteChange}
          handleAutoCompleteInputChange={handleAutoCompleteInputChange}
          handleInputChange={handleChange}
          handleDateChange={handleDateChange}
          customersName={customersName}
          disabled={isDisable}
          // loadMore={loadMore}
          // hasNextPage={hasNextPage}
          // items={items}
          // loading={loading}
          // editable={Boolean(id)}
          editable={false}
          autoCompleteClear={autoCompleteClear}
          isAgeRequired={true}
          isGenderRequired={true}
          villageOptions={villageOptions}
        />
      </Grid>
      <Grid item xl={12} xs={12}>
        <AddressInformation
          fieldData={fieldData}
          handleInputChange={handleChange}
          disabled={isDisable}
        />
      </Grid>
      <Grid item xl={12} xs={12}>
        <AppointmentInformation
          fieldData={fieldData}
          handleChange={handleChange}
          handleDateChange={handleAppointmentDateChange}
          currentToken={currentToken}
          isTokenVisible={true}
          isConsultationFeeEnabled={true}
          reasonList={reasonList}
          consultantList={consultantList}
          tokenNo={tokenNo}
          isConsultantRequired={true}
          isWeightRequired={true}
          isHeightRequired={true}
          autoCompleteClearTwo={autoCompleteClearTwo}
          handleAutoCompleteChange={handleAutoCompleteChange}
          handleAutoCompleteInputChange={handleAutoCompleteInputChange}
        />
      </Grid>
      <Grid item xl={4.5} xs={12} sx={{ display: "flex", gap: 3.5 }}>
        <Button
          buttonText="Submit"
          loading={isLoading}
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

export default AddAppointment;
