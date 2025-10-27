import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAppointmentById,
  updateAppointmentById,
} from "../../../../services/appointmentService";
import {
  Typography,
  TextField,
  Card,
  Grid,
  TextareaAutosize,
  FormHelperText,
  Box,
  IconButton,
} from "@mui/material";
import { Button, Select } from "../../../../components/basic";
import {
  AddressInformation,
  BillingInformation,
  PersonalInformation,
  AppointmentInformation,
} from "../../../../components/shared";
import { TurnedInNot } from "@mui/icons-material";
import dayjs from "dayjs";
import {
  CustomerDetails,
  consultantDetails,
  reasonDetails,
} from "../../../../services/customerService";
import {
  requiredValidator,
  updateFormDataWithHelperText,
} from "../../../../utils/ValidationUtils";
import { RouteUrls } from "../../../../constants/routes";
import {
  setSnackBarFailed,
  setSnackBarSuccess,
} from "../../../../redux/slices/snackbar";
import { useDispatch } from "react-redux";
import { appointmentPageConst } from "../../../../constants/displayText";
import { ViewPrintIcon } from "../../../../assets/icons";
import { useReactToPrint } from "@kvnyu/react-to-print";
import PrintForm from "../print";

export default function AppointmentDetails() {
  const { id }: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [appointmentDetails, setAppointmentDetails] = useState<any>({});
  const [feedBackValue, setFeedBackValue] = useState({ feedback: "" });
  const [consultantList, setConsultantList] = useState<any>([]);
  const [reasonList, setReasonList] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const { appointmentUrl, clinicalUrl } = RouteUrls;

  useEffect(() => {
    getAppointmentById(id)
      .then((res: any) => {
        // console.log("res from getAppointmentById", res);
        setAppointmentDetails(res.data);
        setFeedbackFormData((prev: any) => ({
          ...prev,
          text: res?.data?.text,
          type: res?.data?.type,
        }));
      })
      .then()
      .catch((error) => console.log(error));
  }, []);

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
    getAllConsultants();
    getAllReasons();
  }, []);

  // console.log("appointmentDetails", appointmentDetails);
  const initialFormError = {
    type: "",
    text: "",
  };
  const [feedbackFormError, setFeedbackFormError] =
    useState<any>(initialFormError);
  const initialData = {
    type: null,
    text: null,
  };

  const [feedbackFormData, setFeedbackFormData] = useState<string | Date | any>(
    initialData
  );
  // console.log("feedbackFormData", feedbackFormData);
  const fieldData: any = {
    name: {
      value: appointmentDetails?.customer?.name,
    },
    mobile: {
      value: appointmentDetails?.customer?.mobile,
    },
    aadhaarNo: {
      value: appointmentDetails?.customer?.aadhaarNo,
    },
    dob: {
      value: dayjs(appointmentDetails?.customer?.dob),
    },
    tokenNo: appointmentDetails.tokenNo,
    age: {
      value: appointmentDetails?.customer?.age,
    },
    gender: {
      value: String(appointmentDetails?.customer?.gender),
    },
    address: {
      value: appointmentDetails?.customer?.address?.address,
    },
    pinCode: {
      value: appointmentDetails?.customer?.address?.pinCode,
    },
    areaId: {
      value: appointmentDetails?.customer?.address?.area?.name,
      area_input: appointmentDetails?.customer?.address?.area?.name,
    },
    villageId: {
      value:
        appointmentDetails?.customer?.address?.village?.name ||
        appointmentDetails?.villageData?.name,
      villageId_input:
        appointmentDetails?.customer?.address?.village?.name ||
        appointmentDetails?.villageData?.name,
    },
    talukId: {
      value: appointmentDetails?.customer?.address?.area?.taluk?.name,
    },
    cityId: {
      value: appointmentDetails?.customer?.address?.area?.city?.name,
    },
    bmi: {
      value: appointmentDetails?.bmi,
    },
    weight: {
      value: appointmentDetails?.weight,
    },
    height: {
      value: appointmentDetails?.height,
    },
    reason: {
      value: appointmentDetails?.reason?.name,
    },
    consultant: {
      value: Number(appointmentDetails?.consultant?.id),
    },
    consultantFee: {
      label: "Consultation Fee",
      value: Number(appointmentDetails?.consultationFee),
    },
    date: {
      value: dayjs(appointmentDetails?.date),
    },
    bp: {
      value: appointmentDetails?.bp,
    },
    temperature: {
      value: appointmentDetails?.temperature,
    },
    text: {
      label: "Text Field",
      name: "text",
      value: feedbackFormData.text,
      isError: feedbackFormError.text === "" ? false : true,
      helperText: feedbackFormError.text,
    },
    type: {
      label: "Feed back",
      name: "type",
      value: feedbackFormData.type,
      isError: feedbackFormError.type === "" ? false : true,
      helperText: feedbackFormError.type,
    },
  };

  const [feedbackFieldData, setFeedbackFieldData] = useState(fieldData);

  const handleValidation = (e: any) => {
    const { name, value, label } = e.target;

    // console.log(
    // " name, value, label from handleValidation",
    // name,
    // value,
    // label
    // );
    switch (name) {
      case "type": {
        if (requiredValidator(value, label)) {
          updateFormDataWithHelperText(
            name,
            requiredValidator(value, label),
            setFeedbackFormError
          );
        } else {
          updateFormDataWithHelperText(name, "", setFeedbackFormError);
        }
        break;
      }
      case "text": {
        if (name === "text" && feedbackFormData.type === "Not Satisfied") {
          if (requiredValidator(value, label)) {
            updateFormDataWithHelperText(
              name,
              requiredValidator(value, label),
              setFeedbackFormError
            );
          } else {
            updateFormDataWithHelperText(name, "", setFeedbackFormError);
          }
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
    setFeedbackFieldData((prevFieldData: any) => {
      return Object.keys(prevFieldData).map((field: any) => {
        return {
          ...field,
          value: feedbackFormData[field.name],
          helperText: feedbackFormError[field.name],
          isError: feedbackFormError[field.name] === "" ? false : true,
        };
      });
    });
  };

  useEffect(() => {
    updateLogInFormData();
  }, [feedbackFormError, feedbackFormData]);

  const handleSubmit = async () => {
    if (
      feedbackFormData.type === null ||
      (feedbackFormData.type === "Not Satisfied" &&
        feedbackFormData.text === null)
    ) {
      validateForm();
    } else {
      try {
        setLoading(true);
        const data: any = {
          name: appointmentDetails?.customer?.name,
          mobile: appointmentDetails?.customer?.mobile,
          aadhaarNo: appointmentDetails?.customer?.aadhaarNo,
          dob: appointmentDetails?.customer?.dob,
          age: appointmentDetails?.customer?.age,
          gender: appointmentDetails?.customer?.gender,
          address: {
            id: appointmentDetails?.customer?.address?.id,
            address: appointmentDetails?.customer?.address?.address,
            pinCode: appointmentDetails?.customer?.address?.pinCode,
            villageId:
              appointmentDetails?.customer?.address?.village?.id ||
              appointmentDetails?.villageData?.id,
            areaId: appointmentDetails?.customer?.address?.areaId,
            talukId: appointmentDetails?.customer?.address?.talukId,
            cityId: appointmentDetails?.customer?.address?.cityId,
          },
          appointment: {
            id: appointmentDetails.id,
            reason: appointmentDetails?.reason?.id,
            consultant: appointmentDetails?.consultant?.id,
            bp: appointmentDetails?.bp,
            weight: appointmentDetails?.weight,
            height: appointmentDetails?.height,
            // sugarTest: "true",
            temperature: appointmentDetails?.temperature,
            bmi: appointmentDetails?.bmi,
            // paymentType: "free",
            // status: "ok",
            date: appointmentDetails?.date,
            type: feedbackFormData.type,
            text: feedbackFormData.text,
          },
        };
        // console.log("data from handleSubmit", data);

        return await updateAppointmentById(id, data).then((result: any) => {
          dispatch(
            setSnackBarSuccess({
              snackBarMessage: appointmentPageConst.APPOINTMENT_UPDATED,
            })
          );
          setLoading(false);
          navigate(`${clinicalUrl}${appointmentUrl}`);
        });
      } catch (error: any) {
        console.error("An error occurred:", error);
        dispatch(
          setSnackBarFailed({
            snackBarMessage: error.response.data.message,
          })
        );
      }
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFeedbackFormData((prev: any) => ({
      ...prev,
      type: value,
    }));
    handleValidation({
      target: {
        name: "type",
        value: value,
      },
    });
  };
  const handleTextAreaChange = (event: any) => {
    setFeedbackFormData((prev: any) => ({
      ...prev,
      text: event.target.value,
    }));
    handleValidation({
      target: {
        name: "text",
        value: event.target.value,
      },
    });
    // handleValidation(event);
  };

  const [isSubmit, setIsSubmit] = useState(false);
  const [formInfo, setFormInfo] = useState<any>();

  const printRef = useRef(null);
  const handleCancelPrint = async () => {
    // if (id) {
    navigate(`${RouteUrls.clinicalUrl}${RouteUrls.appointmentUrl}`);
    // }
  };
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    // onAfterPrint: () => handleCancelPrint(),
  });
  const handlePrintSubmit = () => {
    handlePrint();
    setIsSubmit(false);
  };
  useEffect(() => {
    if (isSubmit) {
      handlePrintSubmit();
    }
  }, [isSubmit]);

  const handlePrintChange = async (row: any) => {
    try {
      setIsSubmit(true);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <Grid container spacing={4}>
      <Grid item xl={12} xs={12} sx={{ mb: 0 }}>
        <Typography variant="h2" color="initial">
          Appointment Details
        </Typography>
      </Grid>
      <Grid item xl={12} xs={12}>
        <Box sx={{ position: "absolute", right: "33%", top: "10%" }}>
          <IconButton onClick={handlePrintChange} disableRipple>
            <ViewPrintIcon />
          </IconButton>
        </Box>
        <PersonalInformation
          fieldData={fieldData}
          // freeSolo={true}
          // handleAutoCompleteChange={handleAutoCompleteChange}
          // handleAutoCompleteInputChange={handleAutoCompleteInputChange}
          // handleInputChange={handleInputChange}
          // handleDateChange={handleDateChange}
          // customersName={customersName}
          // mobileNos={mobileNos}
          disabled={true}
          editable={true}
          areaEditable={true}
          viewMode={true}
          // loadMore={loadMore}
          // hasNextPage={hasNextPage}
          // items={items}
          // loading={loading}
        />
      </Grid>
      <Grid item xl={12} xs={12}>
        <AddressInformation
          // isToggleEnabled={true}
          fieldData={fieldData}
          // handleInputChange={handleInputChange}
          disabled={true}
        />
      </Grid>
      <Grid item xl={12} xs={12}>
        <AppointmentInformation
          fieldData={fieldData}
          reasonList={reasonList}
          consultantList={consultantList}
          disabled={true}
          isTokenVisible
          tokenNo={fieldData?.tokenNo || 0}
          areaEditable={true}
          isConsultationFeeEnabled={true}
        />
      </Grid>
      <Grid item xl={12} xs={12}>
        <div style={{ display: "none" }}>
          <PrintForm
            // tokenNo={billdetails?.tokenNo}
            // area={authUser?.branch?.name}
            // quantity={billdetails?.quantity}
            formInfo={appointmentDetails}
            printRef={printRef}
          />
        </div>
      </Grid>
      <Grid item xl={12} xs={12}>
        <Typography variant="h2" color="initial">
          Feedback
        </Typography>
      </Grid>
      <Grid
        item
        xl={12}
        xs={12}
        sx={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <Select
          label=""
          value={feedbackFormData?.type}
          name="feedback"
          onChange={handleInputChange}
          placeholder="Select Feedback"
          sx={{
            width: {
              xl: "441px",
              xs: "340px",
            },
          }}
          // width="441px"
          options={[
            { id: "Highly Satisfied", name: "😍 Highly Satisfied" },
            {
              id: "Satisfied",
              name: "🙂 Satisfied",
            },
            {
              id: "Not Satisfied",
              name: "😔 Not Satisfied",
            },
          ]}
          helperText={fieldData?.type?.helperText}
          error={Boolean(fieldData?.type?.isError)}
          // disabled={disabled}
        />
        {feedbackFormData.type === "Not Satisfied" && (
          <Box>
            <textarea
              style={{
                resize: "none",
                width: "421px",
                height: "140px",
                padding: "10px",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                boxShadow: "none",
                outline: "none",
                fontFamily: "inter",
                fontSize: "13px",
              }}
              spellCheck={false}
              name="feedbackText"
              placeholder="Type your Feedback"
              value={feedbackFormData.text}
              onChange={handleTextAreaChange}
            ></textarea>
            <Typography fontSize="11px" color="#d32f2f" sx={{ ml: 2 }}>
              {fieldData?.text?.helperText}
            </Typography>
          </Box>
        )}
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
}
