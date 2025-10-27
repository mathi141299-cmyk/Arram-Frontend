import { useState, useEffect } from "react";
import { Grid, Typography, Box, MenuItem } from "@mui/material";
import { AutoComplete, DatePicker, Select, TextField } from "../../basic";
import { areaList } from "../../../constants/displayText";
import { useLocation } from "react-router-dom";
import {
  areaDetails,
  talukDetails,
  villageDetails,
} from "../../../services/masterService";

type PersonalInformationProps = {
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
  mobileRef?: any;
  autoCompleteClear?: any;
  isAgeRequired?: boolean;
  isGenderRequired?: boolean;
  areaEditable?: any;
  villageOptions?: any;
  viewMode?: any;
};

const PersonalInformation = ({
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
  mobileRef,
  autoCompleteClear,
  isAgeRequired = false,
  isGenderRequired = false,
  areaEditable,
  villageOptions,
  viewMode = false,
}: PersonalInformationProps) => {
  const location = useLocation();
  const [areaOptions, setAreaOptions] = useState<any>([]);

  return (
    <Grid container spacing={2}>
      <Grid item xl={12} xs={12}>
        <Typography variant="h4" color="primary.main" sx={{ mb: 2 }}>
          Personal Information
        </Typography>
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
        {location.pathname === "/admin/customer-registration/add-customer" ||
        editable ? (
          <TextField
            name={fieldData?.mobile?.name}
            value={fieldData?.mobile?.value}
            onChange={handleInputChange}
            label={
              <span>
                Mobile
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            }
            placeholder="Enter Mobile"
            height="51px"
            sx={{
              width: {
                xl: "431px",
                lg: "30vw",
                md: "32vw",
                sm: "45vw",
                xs: "95vw",
              },
            }}
            helperText={fieldData?.mobile?.helperText}
            error={Boolean(fieldData?.mobile?.isError)}
            disabled={disabled}
          />
        ) : (
          <AutoComplete
            inputRef={mobileRef}
            freeSolo={freeSolo}
            name={fieldData?.mobile?.name}
            value={fieldData?.mobile?.value}
            onChange={(e: any, newValue: any) =>
              handleAutoCompleteChange(e, newValue, "mobile")
            }
            inputValue={fieldData?.mobile?.mobile_input}
            onInputChange={(e: any, newInputValue: string) => {
              handleAutoCompleteInputChange(e, newInputValue, "mobile_input");
            }}
            clearOnEscape={true}
            getOptionLabel={(option: any) => option?.mobileNumber}
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
                  <Box>{option?.mobileNumber}</Box>
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
            optionName="mobileNumber"
            label={
              <span>
                Mobile
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            }
            placeholder="Enter Mobile "
            options={customersName}
            filterOptions={(options: any, state: any) => {
              const inputValue = state?.inputValue?.toLowerCase();

              return options?.filter(
                (option: any) =>
                  option?.mobileNumber?.toLowerCase()?.includes(inputValue) ||
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
            helperText={fieldData?.mobile?.helperText}
            error={Boolean(fieldData?.mobile?.isError)}
            // loadMore={loadMore}
            // hasNextPage={hasNextPage}
            // items={items}
            // loading={loading}
          />
        )}
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
          name={fieldData?.name?.name}
          value={fieldData?.name?.value}
          onChange={handleInputChange}
          label={
            <span>
              Customer Name
              <span style={{ color: "#F43F5E" }}> *</span>
            </span>
          }
          placeholder="Enter Customer Name"
          height="51px"
          sx={{
            width: {
              xl: "431px",
              lg: "30vw",
              md: "32vw",
              sm: "45vw",
              xs: "95vw",
            },
          }}
          helperText={fieldData?.name?.helperText}
          error={Boolean(fieldData?.name?.isError)}
          disabled={fieldData?.name?.isDisabled}
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
        {viewMode ? (
          <TextField
            label={
              <span>
                Village
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            }
            name={fieldData?.villageId?.name}
            value={fieldData?.villageId?.value}
            height="51px"
            disabled={disabled}
            sx={{
              // width: {
              //   sm: "431px",
              //   xs: "95vw",
              // },
              width: {
                xl: "431px",
                lg: "30vw",
                md: "32vw",
                sm: "45vw",
                xs: "95vw",
              },
            }}
          />
        ) : (
          <AutoComplete
            key={autoCompleteClear}
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
            disabled={disabled}
            disableClearable={true}
            freeSolo={false}
            helperText={fieldData?.villageId?.helperText}
            error={Boolean(fieldData?.villageId?.isError)}
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
        )}
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
          label={<span>Panchayat</span>}
          value={fieldData?.areaId?.value}
          name={fieldData?.areaId?.name}
          height="51px"
          disabled={true}
          helperText={fieldData?.areaId?.helperText}
          error={Boolean(fieldData?.areaId?.isError)}
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
          label="Aadhaar No"
          placeholder="Enter Aadhaar No"
          name={fieldData?.aadhaarNo?.name}
          value={fieldData?.aadhaarNo?.value}
          onChange={handleInputChange}
          height="51px"
          sx={{
            width: {
              xl: "431px",
              lg: "30vw",
              md: "32vw",
              sm: "45vw",
              xs: "95vw",
            },
          }}
          helperText={fieldData?.aadhaarNo?.helperText}
          error={fieldData?.aadhaarNo?.isError}
          disabled={disabled}
          inputProps={{ inputMode: "numeric" }}
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
            md: "0",
            sm: "0px",
            xs: "100px",
          },
        }}
      >
        <DatePicker
          label="DOB"
          name={fieldData?.dob?.name}
          value={fieldData?.dob?.value}
          onChange={(newValue: any) => handleDateChange(newValue, "dob")}
          sx={{
            width: {
              xl: "202px",
              lg: "14vw",
              md: "14.5vw",
              sm: "21vw",
              xs: "44vw",
            },
            height: "48px",
          }}
          disableFuture={true}
          disabled={disabled}
        />
        <TextField
          label={
            isAgeRequired ? (
              <span>
                Age
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            ) : (
              "Age"
            )
          }
          placeholder="Enter Age"
          height="51px"
          disabled={isAgeRequired ? false : disabled}
          value={fieldData?.age?.value}
          name={fieldData?.age?.name}
          onChange={handleInputChange}
          sx={{
            // width: {
            //   sm: "202px",
            //   xs: "45vw",
            // },
            width: {
              xl: "202px",
              lg: "14vw",
              md: "14.6vw",
              sm: "20.6vw",
              xs: "44vw",
            },
          }}
          helperText={fieldData?.age?.helperText}
          error={Boolean(fieldData?.age?.isError)}
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
            isGenderRequired ? (
              <span>
                Gender
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            ) : (
              "Gender"
            )
          }
          placeholder="Select Gender"
          value={fieldData?.gender?.value}
          name={fieldData?.gender?.name}
          onChange={handleInputChange}
          sx={{
            width: {
              xl: "431px",
              lg: "30vw",
              md: "32vw",
              sm: "45vw",
              xs: "95vw",
            },
          }}
          // width="431px"
          options={[
            { id: "Male", name: "Male" },
            {
              id: "Female",
              name: "Female",
            },
            {
              id: "Others",
              name: "Others",
            },
          ]}
          helperText={fieldData?.gender?.helperText}
          error={Boolean(fieldData?.gender?.isError)}
          disabled={isGenderRequired ? false : disabled}
        />
      </Grid>
    </Grid>
  );
};

export default PersonalInformation;
