import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Grid, Typography } from "@mui/material";
import {
  TextField,
  Button,
  DatePicker,
  Select,
} from "../../../components/basic";
import dayjs from "dayjs";
import {
  requiredValidator,
  updateFormDataWithHelperText,
  mobileNumberValidator,
} from "../../../utils/ValidationUtils";
import { useParams } from "react-router-dom";
import {
  createAdjustment,
  updateAdjustmentDetailsById,
  getAdjustmentDetailsById,
  getRestaurantBillDetails,
  getAdjustmentDetailByDateAndBranch,
} from "../../../services/adjustmentService";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  setSnackBarFailed,
  setSnackBarSuccess,
} from "../../../redux/slices/snackbar";
import { useNavigate } from "react-router-dom";
import { ConfirmationDialog } from "../../../components/shared";

const AdjustmentAddAndEdit = () => {
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

  const branchOptions = [
    { id: 1, name: "Kodumudi" },
    { id: 2, name: "Ganapathypalayam" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isAdjustmentExist, setIsAdjustmentExist] = useState(false);

  const [billQuantities, setBillQuantities] = useState<any>(0);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState<boolean>(false);
  const [
    isConfirmationDialogButtonLoading,
    setIsConfirmationDialogButtonLoading,
  ] = useState(false);

  const { id } = useParams();

  const initialAdjustmentError = {
    date: "",
    quantity: "",
    remarks: "",
    branchId: "",
  };

  const [adjustmentError, setAdjustmentError] = useState<any>(
    initialAdjustmentError
  );

  const initialAdjustmentInfoData = {
    date: dayjs(new Date()),
    quantity: null,
    remarks: "",
    branchId: null,
  };

  const [adjustmentData, setAdjustmentData] = useState<any>(
    initialAdjustmentInfoData
  );

  const fieldData = {
    date: {
      label: "Date",
      name: "date",
      value: adjustmentData.date,
      placeholder: "Date",
      isError: adjustmentData.date === "" ? false : true,
      helperText: adjustmentError.date,
      isDisabled: false,
    },
    quantity: {
      label: "Quantity",
      name: "quantity",
      value: adjustmentData.quantity,
      placeholder: "Enter Quantity",
      isError: adjustmentData.quantity === "" ? false : true,
      helperText: adjustmentError.quantity,
      isDisabled: false,
    },
    branchId: {
      label: "Branch",
      name: "branchId",
      value: adjustmentData.branchId,
      placeholder: "Select Branch",
      isError: adjustmentData.branchId === "" ? false : true,
      helperText: adjustmentError.branchId,
      isDisabled: false,
    },
    remarks: {
      label: "Remarks",
      name: "remarks",
      value: adjustmentData.remarks,
      placeholder: "Enter Remarks",
      isError: adjustmentData.remarks === "" ? false : true,
      helperText: adjustmentError.remarks,
      isDisabled: false,
    },
  };

  const [expensesFieldData, setExpensesFieldData] = useState<any>(fieldData);

  //form validation functions

  const handleValidation = (e: any) => {
    const { name, value, label } = e.target;

    switch (name) {
      case "date":
      case "quantity":
      case "branchId": {
        if (requiredValidator(value, label)) {
          updateFormDataWithHelperText(
            name,
            requiredValidator(value, label),
            setAdjustmentError
          );
        } else {
          updateFormDataWithHelperText(name, "", setAdjustmentError);
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
    setExpensesFieldData((prev: any) => {
      return Object.keys(prev).map((field: any) => {
        return {
          ...field,
          value: adjustmentData[field.name],
          isError: adjustmentError[field.name] === "" ? false : true,
          helperText: adjustmentError[field.name],
        };
      });
    });
  };

  useEffect(() => {
    updateFieldData();
  }, [adjustmentError, adjustmentData]);

  const handleDateChange = (newValue: any) => {
    setAdjustmentData((prev: any) => ({
      ...prev,
      date: newValue,
    }));

    handleValidation({
      target: {
        name: "date",
        value: newValue,
      },
    });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    let numericValue = value;

    if (name === "quantity") {
      numericValue = value.replace(/[^\d.]/g, "");
    }

    // console.log(
    //   "name, value, numericValue from handleInputChange",
    //   name,
    //   value,
    //   numericValue
    // );

    if (name === "quantity") {
      setAdjustmentData((prev: any) => ({
        ...prev,
        [name]: -numericValue,
      }));
    } else {
      setAdjustmentData((prev: any) => ({
        ...prev,
        [name]: numericValue,
      }));
    }

    handleValidation(e);
  };

  const getAdjustmentById = useCallback(async () => {
    if (!id) {
      // getBillDetails(adjustmentData?.date?.$d);
      return false;
    }
    try {
      await getAdjustmentDetailsById(id).then((result: any) => {
        let data = result?.data;

        // console.log("data from getAdjustmentDetailsById", data);

        setAdjustmentData({
          ...data,
          date: dayjs(data?.date),
          quantity: -data.quantity,
        });
        // getBillDetails(data?.date);
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, []);

  const getBillDetails = useCallback(
    async (date: any, branchId: any) => {
      try {
        await getRestaurantBillDetails({ date: date, branchId: branchId }).then(
          (result: any) => {
            let data = result?.data;

            if (adjustmentData.branchId !== null) {
              setBillQuantities(data.quantities);
            }
          }
        );
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    [adjustmentData]
  );

  const getAdjustmentByDateAndBranch = useCallback(
    async (date: any, branchId: any) => {
      if (adjustmentData?.date === null || adjustmentData?.branchId === null) {
        setIsAdjustmentExist(false);
        return false;
      }
      try {
        await getAdjustmentDetailByDateAndBranch({
          date: date,
          branchId: branchId,
        }).then((result: any) => {
          let data = result?.data;
          const adjustmentDataDate = moment(adjustmentData?.date?.$d).format(
            "YYYY-MM-DD"
          );
          // console.log(
          //   "data, adjustmentData, adjustmentData.date !== dayjs(data?.date), adjustmentData.quantity !== -data.quantity,adjustmentData.branchId !== data.branchId ,adjustmentData.remarks !== data.remarks from getAdjustmentDetailByDateAndBranch",
          //   data,
          //   adjustmentData,
          //   adjustmentDataDate !== data?.date,
          //   adjustmentData.quantity !== -data.quantity,
          //   adjustmentData.branchId !== data.branchId,
          //   adjustmentData.remarks !== data.remarks,
          //   adjustmentDataDate,
          //   data?.date
          // );

          if (!data) {
            setIsAdjustmentExist(false);
          }

          if (data) {
            if (
              adjustmentDataDate !== data?.date ||
              adjustmentData.quantity !== -data.quantity ||
              adjustmentData.branchId !== data.branchId ||
              adjustmentData.remarks !== data.remarks
            ) {
              setAdjustmentData({
                ...data,
                date: dayjs(data?.date),
                quantity: -data.quantity,
              });
              setIsAdjustmentExist(true);
            }
          }
        });
      } catch (error) {
        console.error("An error occurred:", error);
        setIsAdjustmentExist(false);
      }
    },
    [adjustmentData]
  );

  const handleSubmit = async () => {
    // console.log("adjustmentData from handleSubmit", adjustmentData);

    try {
      setIsButtonLoading(true);
      setIsConfirmationDialogButtonLoading(true);
      if (!id) {
        await createAdjustment({
          ...adjustmentData,
          quantity: -adjustmentData.quantity,
          date: moment(adjustmentData?.date?.$d).format("YYYY-MM-DD"),
        }).then((result: any) => {
          dispatch(
            setSnackBarSuccess({
              snackBarMessage: "Adjustment Created Successfully",
            })
          );
          setIsButtonLoading(false);
          setIsConfirmationDialogButtonLoading(false);

          navigate(-1);
        });
      } else {
        await updateAdjustmentDetailsById(id, {
          ...adjustmentData,
          quantity: -adjustmentData.quantity,
          date: moment(adjustmentData?.date?.$d).format("YYYY-MM-DD"),
        }).then((result: any) => {
          dispatch(
            setSnackBarSuccess({
              snackBarMessage: "Adjustment Updated Successfully",
            })
          );
          setIsButtonLoading(false);
          setIsConfirmationDialogButtonLoading(false);

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
  };

  const onSubmit = async () => {
    if (
      adjustmentData.date === null ||
      adjustmentData.quantity === null ||
      adjustmentData.branchId === null
    ) {
      validateForm();
    } else if (isAdjustmentExist) {
      setIsConfirmationDialogOpen(true);
    } else {
      handleSubmit();
    }
  };

  const handleConfirmDelete = async () => {
    handleSubmit();
  };

  const onConfirmationDialogClose = () => {
    setIsConfirmationDialogOpen(false);
  };

  // console.log(
  //   "moment.utc",
  //   moment.utc(adjustmentData?.date?.$d).format("YYYY-MM-DD")
  // );

  // console.log("isAdjustmentExist from main", isAdjustmentExist);

  useEffect(() => {
    // console.log("adjustmentData from useeffect", adjustmentData);
    getBillDetails(adjustmentData?.date?.$d, adjustmentData.branchId);
    getAdjustmentByDateAndBranch(
      adjustmentData?.date?.$d,
      adjustmentData.branchId
    );
  }, [adjustmentData.date, adjustmentData.branchId]);

  useEffect(() => {
    getAdjustmentById();
  }, []);

  return (
    <Grid container spacing={2}>
      <ConfirmationDialog
        open={isConfirmationDialogOpen}
        title={`Adjustment on ${
          adjustmentData?.date
            ? `${adjustmentData.date.$D}/${adjustmentData.date.$M + 1}/${
                adjustmentData.date.$y
              }`
            : ""
        } ${
          adjustmentData?.branchId
            ? adjustmentData.branchId === 1
              ? "for Kodumudi"
              : "for Ganapathypalayam"
            : ""
        } already exist, are you surely want to update it?`}
        handleClick={handleConfirmDelete}
        onClose={onConfirmationDialogClose}
        loading={isConfirmationDialogButtonLoading}
        confirmText="Update"
      />
      <Grid item xl={12} xs={12}>
        <Typography variant="h2" sx={{ mb: "20px" }}>
          Adjustment
        </Typography>
      </Grid>

      {/* <Grid
        sx={{
          width: "85%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
          mb: "20px",
        }}
      > */}
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
          label={
            <span>
              {fieldData.date.label}
              <span style={{ color: "#F43F5E" }}> *</span>
            </span>
          }
          name={fieldData.date.name}
          value={fieldData.date.value}
          onChange={handleDateChange}
          error={fieldData.date.isError}
          helperText={fieldData.date.helperText}
          disableFuture={false}
          sx={{ ...styles.datePickerStyle }}
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
        <Select
          label={
            <span>
              {fieldData.branchId.label}
              <span style={{ color: "#F43F5E" }}> *</span>
            </span>
          }
          name={fieldData.branchId.name}
          value={fieldData.branchId.value}
          onChange={handleInputChange}
          options={branchOptions}
          placeholder={fieldData.branchId.placeholder}
          error={fieldData.branchId.isError}
          helperText={fieldData.branchId.helperText}
          sx={{ ...styles.selectStyle }}
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
              {fieldData.quantity.label}
              <span style={{ color: "#F43F5E" }}> *</span>
            </span>
          }
          name={fieldData.quantity.name}
          value={fieldData.quantity.value}
          onChange={(e) => handleInputChange(e)}
          placeholder={fieldData.quantity.placeholder}
          error={fieldData.quantity.isError}
          helperText={fieldData.quantity.helperText}
          sx={{
            ...styles.textFieldStyle,
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
          name={fieldData.remarks.name}
          label={fieldData.remarks.label}
          value={fieldData.remarks.value}
          onChange={handleInputChange}
          placeholder={fieldData.remarks.placeholder}
          error={fieldData.remarks.isError}
          helperText={fieldData.remarks.helperText}
          sx={{ ...styles.textFieldStyle }}
        />
      </Grid>

      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: {
            xl: "431px",
            lg: "30vw",
            md: "32vw",
            sm: "45vw",
            xs: "95vw",
          },

          height: "120px",
          // gap: 3.5,
          mb: 3,
          mr: {
            xl: "200px",
            xs: "150px",
          },
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "space-between",
            justifyContent: "space-between",
            width: "50%",
            height: "100%",
          }}
        >
          <Typography sx={{ color: "#8A8A8A" }}>
            Meals As Of{" "}
            {adjustmentData?.date
              ? `${adjustmentData?.date?.$D}/${adjustmentData?.date?.$M + 1}/${
                  adjustmentData?.date?.$y
                }`
              : false}{" "}
            {adjustmentData?.branchId
              ? adjustmentData?.branchId === 1
                ? "for Kodumudi"
                : "for Ganapathypalayam"
              : false}
          </Typography>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "600",
              textAlign: "left",
            }}
          >
            {billQuantities || 0}
          </Typography>
        </Grid>

        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "space-between",
            justifyContent: "space-between",
            width: "50%",
            height: "100%",
          }}
        >
          <Typography sx={{ color: "#8A8A8A", textAlign: "left" }}>
            Meals As Of{" "}
            {adjustmentData?.date
              ? `${adjustmentData?.date?.$D}/${adjustmentData?.date?.$M + 1}/${
                  adjustmentData?.date?.$y
                }`
              : false}{" "}
            After Adjustment{" "}
            {adjustmentData?.branchId
              ? adjustmentData?.branchId === 1
                ? "for Kodumudi"
                : "for Ganapathypalayam"
              : false}
          </Typography>

          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "600",
              textAlign: "left",
            }}
          >
            {-(-billQuantities - adjustmentData?.quantity)}
          </Typography>
        </Grid>
      </Grid>
      {/* </Grid> */}
      <Grid item xl={12} xs={12}>
        <Button
          loading={isButtonLoading}
          buttonText="Submit"
          onClick={onSubmit}
          disabled={-adjustmentData?.quantity <= billQuantities ? false : true}
          sx={{ width: "210px", height: "50px", fontSize: "16px", mb: "100px" }}
        />
      </Grid>
    </Grid>
  );
};

export default AdjustmentAddAndEdit;
