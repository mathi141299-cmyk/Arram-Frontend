import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Grid, Typography } from "@mui/material";
import {
  TextField,
  Button,
  DatePicker,
  AutoComplete,
} from "../../../../components/basic";
import dayjs from "dayjs";
import {
  requiredValidator,
  updateFormDataWithHelperText,
} from "../../../../utils/ValidationUtils";
import { useParams } from "react-router-dom";
import {
  createSchedule,
  getScheduleDetailsById,
  updateScheduleDetailsById,
} from "../../../../services/neetService";
import { useDispatch } from "react-redux";
import {
  setSnackBarFailed,
  setSnackBarSuccess,
} from "../../../../redux/slices/snackbar";
import { useNavigate } from "react-router-dom";
import { areaDetails } from "../../../../services/masterService";
import moment from "moment";

const NeetScheduleAddAndEdit = () => {
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
        mr: "20px",
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [areaOptions, setAreaOptions] = useState<any>([]);

  const { id } = useParams();

  const initialScheduleError = {
    date: "",
    name: "",
    location: "",
  };

  const [scheduleError, setScheduleError] = useState<any>(initialScheduleError);

  const initialScheduleData = {
    date: dayjs(new Date()),
    name: "",
    location: null,
    location_input: "",
  };

  const [scheduleData, setScheduleData] = useState<any>(initialScheduleData);

  const fieldData = {
    date: {
      label: "Date",
      name: "date",
      value: scheduleData.date,
      placeholder: "Date",
      isError: scheduleError.date === "" ? false : true,
      helperText: scheduleError.date,
      isDisabled: false,
    },
    name: {
      label: "Name",
      name: "name",
      value: scheduleData.name,
      placeholder: "Enter Name",
      isError: scheduleError.name === "" ? false : true,
      helperText: scheduleError.name,
      isDisabled: false,
    },
    location: {
      label: "Location",
      name: "location",
      value: scheduleData.location,
      location_input: scheduleData.location_input,
      placeholder: "Select Location",
      isError: scheduleError.location === "" ? false : true,
      helperText: scheduleError.location,
      isDisabled: false,
    },
  };

  const [scheduleFieldData, setScheduleFieldData] = useState<any>(fieldData);

  //form validation functions

  const handleValidation = (e: any) => {
    const { name, value, label } = e.target;

    switch (name) {
      case "date":
      case "name":
      case "location": {
        if (requiredValidator(value, label)) {
          updateFormDataWithHelperText(
            name,
            requiredValidator(value, label),
            setScheduleError
          );
        } else {
          updateFormDataWithHelperText(name, "", setScheduleError);
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
    setScheduleFieldData((prev: any) => {
      return Object.keys(prev).map((field: any) => {
        return {
          ...field,
          value: scheduleData[field.name],
          isError: scheduleError[field.name] === "" ? false : true,
          helperText: scheduleError[field.name],
        };
      });
    });
  };

  useEffect(() => {
    updateFieldData();
  }, [scheduleError, scheduleData]);

  const getAllAreas = async () => {
    try {
      await areaDetails().then((result: any) => {
        let data = result?.data;

        if (data.length > 0) {
          setAreaOptions(data);
        }
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getAllAreas();
  }, []);

  const handleDateChange = (newValue: any) => {
    setScheduleData((prev: any) => ({
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

    setScheduleData((prev: any) => ({
      ...prev,
      [name]: numericValue,
    }));

    handleValidation(e);
  };

  const handleAutoCompleteChange = useCallback(
    (e: any, newValue: any, name: string) => {
      if (newValue === null) {
        return false;
      }

      if (name === "location") {
        setScheduleData((prev: any) => ({
          ...prev,
          [name]: newValue.name,
        }));
        handleValidation({
          target: {
            name: "location",
            value: newValue.name,
          },
        });
      }
    },
    []
  );

  const handleAutoCompleteInputChange: any = (
    e: any,
    newInputValue: any,
    name: string
  ) => {
    if (
      newInputValue === "" &&
      name === "location_input" &&
      scheduleData.location !== null
    ) {
      return false;
    }

    if (name === "location_input") {
      setScheduleData((prev: any) => ({
        ...prev,
        [name]: newInputValue,
      }));
    }
  };

  const getScheduleById = async () => {
    if (!id) {
      return false;
    }
    try {
      await getScheduleDetailsById(id).then((result: any) => {
        let data = result?.data;

        setScheduleData({
          date: dayjs(data?.date),
          name: data?.name,
          location: data?.location,
          location_input: data?.location,
        });
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleSubmit = async () => {
    if (
      scheduleData.date === null ||
      scheduleData.name === "" ||
      scheduleData.location === null
    ) {
      validateForm();
    } else {
      try {
        setIsButtonLoading(true);

        if (!id) {
          await createSchedule({
            ...scheduleData,
            date: scheduleData?.date?.$d,
          }).then((result: any) => {
            dispatch(
              setSnackBarSuccess({
                snackBarMessage: "Schedule Created Successfully",
              })
            );
            setIsButtonLoading(false);
            navigate(-1);
          });
        } else {
          await updateScheduleDetailsById(id, scheduleData).then(
            (result: any) => {
              dispatch(
                setSnackBarSuccess({
                  snackBarMessage: "Schedule Updated Successfully",
                })
              );
              setIsButtonLoading(false);
              navigate(-1);
            }
          );
        }
      } catch (error: any) {
        dispatch(
          setSnackBarFailed({
            snackBarMessage: `${error?.response?.data?.message}`,
          })
        );
        setIsButtonLoading(false);
        console.error("An error occurred:", error);
      }
    }
  };

  useEffect(() => {
    getScheduleById();
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
        Neet Schedule
      </Typography>
      <Grid
        container
        // sx={{
        //   width: "65%",
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
          <AutoComplete
            label={
              <span>
                {fieldData?.location?.label}
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            }
            placeholder={fieldData?.location?.placeholder}
            name={fieldData?.location?.name}
            value={fieldData?.location?.value}
            inputValue={fieldData?.location?.location_input}
            disabled={false}
            disableClearable={true}
            freeSolo={false}
            helperText={fieldData?.location?.helperText}
            error={fieldData?.location?.isError}
            options={areaOptions}
            onChange={(e: any, newValue: any) => {
              handleAutoCompleteChange(e, newValue, "location");
            }}
            onInputChange={(e: any, newInputValue: any) => {
              handleAutoCompleteInputChange(e, newInputValue, "location_input");
            }}
            getOptionLabel={(option: any) => option?.name}
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
      </Grid>
      <Button
        loading={isButtonLoading}
        buttonText="Submit"
        onClick={handleSubmit}
        sx={{
          width: "210px",
          height: "50px",
          fontSize: "16px",
          m: "50px 0px",
        }}
      />
    </Grid>
  );
};

export default NeetScheduleAddAndEdit;
