import { Box, Grid, MenuItem, Typography } from "@mui/material";
import { AutoComplete, DatePicker, Select, TextField } from "../../basic";
import { areaList } from "../../../constants/displayText";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { areaDetails } from "../../../services/masterService";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type CampInformationProps = {
  freeSolo?: boolean;
  handleInputChange?: any;
  handleAutoCompleteChange?: any;
  customersName?: any;
  handleAutoCompleteInputChange?: any;
  handleDateChange?: any;
  mobileNos?: any;
  formError?: any;
  fieldData?: any;
  disabled?: any;
  editable?: any;
  loadMore?: any;
  loading?: any;
  items?: any;
  hasNextPage?: any;
  typeList?: any;
  departmentList?: any;
  isMedicalCampInfoDepartmentDisabled?: any;
  customized?: any;
  campDateRef?: any;
  campDatesLists?: any;
};

const CampInformation = ({
  fieldData,
  freeSolo = false,
  handleInputChange,
  customersName,
  handleAutoCompleteChange,
  handleAutoCompleteInputChange,
  handleDateChange,
  mobileNos,
  disabled,
  editable,
  loadMore,
  loading,
  items,
  hasNextPage,
  typeList,
  departmentList,
  isMedicalCampInfoDepartmentDisabled,
  customized,
  campDateRef,
  campDatesLists,
}: CampInformationProps) => {
  const style = {
    textFieldStyle: {
      width: "100%",
      "& .MuiOutlinedInput-root": {
        height: "48px",
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
  // console.log("typeList from campinfo", typeList);

  const [areaOptions, setAreaOptions] = useState<any>([]);

  const getAllAreas = async () => {
    try {
      await areaDetails().then((result: any) => {
        let data = result?.data;

        // console.log("data from getAllAreas", data);

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

  // console.log("campDatesLists from main", campDatesLists);

  return (
    <Grid container spacing={2}>
      <Grid item xl={12} xs={12}>
        <Typography variant="h4" color="primary.main" sx={{ mb: 2 }}>
          Camp Information
        </Typography>
      </Grid>
      {customized && (
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
            inputRef={campDateRef}
            freeSolo={freeSolo}
            name={fieldData?.medicalCampDate?.name}
            value={fieldData?.medicalCampDate?.value}
            onChange={(e: any, newValue: any) =>
              handleAutoCompleteChange(e, newValue, "medicalCampDate")
            }
            inputValue={fieldData?.medicalCampDate?.medicalCampDate_input}
            onInputChange={(e: any, newInputValue: string) => {
              handleAutoCompleteInputChange(
                e,
                newInputValue,
                "medicalCampDate_input"
              );
            }}
            clearOnEscape={true}
            getOptionLabel={(option: any) => option?.formattedDate}
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
                  <Box>{option?.formattedDate}</Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    ( {option?.location})
                  </Box>
                </MenuItem>
              );
            }}
            optionName="date"
            label={
              <span>
                Camp Date
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            }
            placeholder="Enter DD/MM/YYYY "
            options={campDatesLists}
            filterOptions={(options: any, state: any) => {
              const inputValue = state?.inputValue?.toLowerCase();

              return options?.filter(
                (option: any) =>
                  option?.formattedDate?.toLowerCase()?.includes(inputValue) ||
                  option?.location?.toLowerCase()?.includes(inputValue)
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
            helperText={fieldData?.medicalCampDate?.helperText}
            error={Boolean(fieldData?.medicalCampDate?.isError)}
          />
        </Grid>
      )}
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
          label="Type"
          placeholder="Select Type"
          value={fieldData?.type?.value}
          name={fieldData?.type?.name}
          onChange={handleInputChange}
          // width="431px"
          options={typeList}
          sx={{
            width: {
              xl: "431px",
              lg: "30vw",
              md: "32vw",
              sm: "45vw",
              xs: "95vw",
            },
          }}
          helperText={fieldData?.type?.helperText}
          error={Boolean(fieldData?.type?.isError)}
          disabled={customized ? true : disabled}
        />
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          gap: 3.5,
          mr: {
            xl: "100px",
            lg: "75px",
            md: "10px",
            sm: "10px",
            xs: "100px",
          },
        }}
      >
        {customized ? (
          <TextField
            sx={{
              ...style.textFieldStyle,
              width: {
                xl: "202px",
                lg: "14vw",
                md: "14vw",
                sm: "20vw",
                xs: "44vw",
              },
            }}
            label={
              <span>
                Date
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            }
            placeholder="Select Date"
            name={fieldData?.campDate?.name}
            value={fieldData?.campDate?.value}
            disabled={customized ? true : disabled}
          />
        ) : (
          <DatePicker
            label={
              <span>
                Date
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            }
            value={fieldData?.campDate?.value}
            onChange={(newValue: any) => handleDateChange(newValue, "campDate")}
            helperText={fieldData?.campDate?.helperText}
            error={fieldData?.campDate?.isError}
            name={"campDate"}
            sx={{
              width: {
                xl: "202px",
                lg: "14vw",
                md: "14vw",
                sm: "21vw",
                xs: "44vw",
              },
              height: "48px",
            }}
            disabled={customized ? true : disabled}
          />
        )}
        {customized ? (
          <TextField
            sx={{
              ...style.textFieldStyle,
              width: {
                xl: "202px",
                lg: "13.5vw",
                md: "14vw",
                sm: "20vw",
                xs: "44vw",
              },
            }}
            label={
              <span>
                Location
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            }
            placeholder="Select Location"
            name={fieldData?.location?.name}
            value={fieldData?.location?.value}
            disabled={customized ? true : disabled}
          />
        ) : (
          <AutoComplete
            // key={autoCompleteClear}
            label={
              <span>
                Location
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            }
            placeholder="Select Location"
            name={fieldData?.location?.name}
            value={fieldData?.location?.value}
            inputValue={fieldData?.location?.location_input}
            // disabled={disabled}
            disableClearable={true}
            freeSolo={false}
            helperText={fieldData?.location?.helperText}
            error={Boolean(fieldData?.location?.isError)}
            onChange={(e: any, newValue: any) => {
              handleAutoCompleteChange(e, newValue, "location");
            }}
            onInputChange={(e: any, newInputValue: any) => {
              handleAutoCompleteInputChange(e, newInputValue, "location_input");
            }}
            options={areaOptions}
            optionName="name"
            sx={{
              width: {
                xl: "202px",
                lg: "13.5vw",
                md: "14.5vw",
                sm: "20vw",
                xs: "44vw",
              },
            }}
            disabled={customized ? true : disabled}
          />
        )}
      </Grid>
      {fieldData?.department && (
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
            label="Department"
            placeholder="Select Department"
            value={fieldData?.department?.value}
            name={fieldData?.department?.name}
            onChange={handleInputChange}
            // width="431px"
            options={departmentList}
            // disabled={isMedicalCampInfoDepartmentDisabled}
            disabled={
              customized
                ? isMedicalCampInfoDepartmentDisabled
                : isMedicalCampInfoDepartmentDisabled
            }
            sx={{
              width: {
                xl: "431px",
                lg: "30vw",
                md: "32vw",
                sm: "45vw",
                xs: "95vw",
              },
            }}
            helperText={fieldData?.department?.helperText}
            error={Boolean(fieldData?.department?.isError)}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default CampInformation;
