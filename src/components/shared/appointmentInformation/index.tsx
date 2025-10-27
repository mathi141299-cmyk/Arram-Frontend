import { Box, Grid, Typography } from "@mui/material";
import { DatePicker, Select, TextField, AutoComplete } from "../../basic";
type AppointmentInformationProps = {
  fieldData?: any;
  handleChange?: any;
  handleDateChange?: any;
  currentToken?: any;
  isTokenVisible?: any;
  consultantList?: any;
  reasonList?: any;
  disabled?: boolean;
  tokenNo?: string | number;
  isConsultationFeeEnabled?: boolean;
  isConsultantRequired?: boolean;
  isWeightRequired?: boolean;
  isHeightRequired?: boolean;
  autoCompleteClearTwo?: any;
  handleAutoCompleteChange?: any;
  handleAutoCompleteInputChange?: any;
  areaEditable?: any;
};

export default function AppointmentInformation({
  fieldData,
  handleChange,
  handleDateChange,
  currentToken,
  isTokenVisible,
  consultantList,
  reasonList,
  disabled,
  isConsultationFeeEnabled = false,
  isConsultantRequired = false,
  isWeightRequired = false,
  isHeightRequired = false,
  tokenNo = 0,
  autoCompleteClearTwo,
  handleAutoCompleteChange,
  handleAutoCompleteInputChange,
  areaEditable,
}: AppointmentInformationProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xl={12} xs={12} sx={{ mb: 3 }}>
        <Typography variant="h4" color="primary.main">
          Appointment Information
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
          // mb: 3,
        }}
      >
        {areaEditable !== true ? (
          <AutoComplete
            key={autoCompleteClearTwo}
            placeholder="Enter Reason"
            label={
              <span>
                Reason
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            }
            name={fieldData?.reason?.name}
            value={fieldData?.reason?.value}
            inputValue={fieldData?.reason?.reason_input}
            // disabled={disabled}
            disableClearable={true}
            freeSolo={false}
            helperText={fieldData?.reason?.helperText}
            error={Boolean(fieldData?.reason?.isError)}
            onChange={(e: any, newValue: any) => {
              handleAutoCompleteChange(e, newValue, "reason");
            }}
            onInputChange={(e: any, newInputValue: any) => {
              handleAutoCompleteInputChange(e, newInputValue, "reason_input");
            }}
            options={reasonList}
            optionName="name"
            sx={{
              width: {
                xl: "431px",
                lg: "30vw",
                md: "31.5vw",
                sm: "45vw",
                xs: "95vw",
              },
            }}
          />
        ) : (
          <TextField
            label={
              <span>
                Reason
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            }
            placeholder="Select reason"
            name={fieldData?.reason?.name}
            value={fieldData?.reason?.value}
            height="51px"
            sx={{
              width: {
                xl: "431px",
                lg: "30vw",
                md: "31.5vw",
                sm: "45vw",
                xs: "95vw",
              },
            }}
            disabled={disabled}
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
          // mb: 3,
        }}
      >
        <Select
          // width="431px"
          onChange={handleChange}
          placeholder="Enter Consultant"
          name={fieldData?.consultant?.name}
          value={fieldData?.consultant?.value}
          sx={{
            width: {
              xl: "431px",
              lg: "30vw",
              md: "31.5vw",
              sm: "45vw",
              xs: "95vw",
            },
          }}
          options={consultantList}
          helperText={fieldData?.consultant?.helperText}
          error={fieldData?.consultant?.isError}
          label={
            isConsultantRequired ? (
              <span>
                Consultant
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            ) : (
              "Consultant"
            )
          }
          disabled={disabled}
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
            sm: "5px",
            xs: "100px",
          },
          // mb: 3,
        }}
      >
        <TextField
          label="BP"
          placeholder="BP"
          height="51px"
          sx={{
            width: {
              xl: "202px",
              lg: "14vw",
              md: "15vw",
              sm: "20.5vw",
              xs: "44vw",
            },
          }}
          name="bp"
          value={fieldData?.bp?.value}
          onChange={handleChange}
          helperText={fieldData?.bp?.helperText}
          error={fieldData?.bp?.isError}
          disabled={disabled}
        />
        <TextField
          label={
            isWeightRequired ? (
              <span>
                Weight
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            ) : (
              "Weight"
            )
          }
          placeholder="Weight"
          height="51px"
          sx={{
            width: {
              xl: "202px",
              lg: "14vw",
              md: "14vw",
              sm: "20.5vw",
              xs: "44vw",
            },
          }}
          name="weight"
          value={fieldData?.weight?.value}
          helperText={fieldData?.weight?.helperText}
          error={fieldData?.weight?.isError}
          onChange={handleChange}
          disabled={disabled}

          // type={"number"}
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
          // mb: 3,
        }}
      >
        <TextField
          label={
            isHeightRequired ? (
              <span>
                Height
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            ) : (
              "Height"
            )
          }
          placeholder="Height"
          height="51px"
          sx={{
            width: {
              xl: "202px",
              lg: "13.5vw",
              md: "14vw",
              sm: "20vw",
              xs: "44vw",
            },
          }}
          name="height"
          onChange={handleChange}
          value={fieldData?.height?.value}
          helperText={fieldData?.height?.helperText}
          error={fieldData?.height?.isError}
          disabled={disabled}

          // type={"number"}
        />
        <TextField
          label="Temperature"
          placeholder="Temperature"
          height="51px"
          sx={{
            width: {
              xl: "202px",
              lg: "14vw",
              md: "14vw",
              sm: "20vw",
              xs: "44vw",
            },
          }}
          name="temperature"
          onChange={handleChange}
          value={fieldData?.temperature?.value}
          helperText={fieldData?.temperature?.helperText}
          error={fieldData?.temperature?.isError}
          disabled={disabled}
        />
        {/* <Select
          label="Sugar Test"
          placeholder="Sugar Test"
          sx={{
            width: {
              xl: "202px",
              xs: "155px",
            },
          }}
          width="201px"
          name="sugarTest"
          value={fieldData.sugarTest.value}
          helperText={fieldData.sugarTest.helperText}
          error={fieldData.sugarTest.isError}
          onChange={handleChange}
          options={[
            { id: "Yes", name: "Yes" },
            { id: "No", name: "No" },
          ]}
        /> */}
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
          // mb: 3,
        }}
      >
        <TextField
          label="BMI"
          placeholder="BMI"
          height="51px"
          sx={{
            width: {
              xl: "202px",
              lg: "13.5vw",
              md: "14vw",
              sm: "21vw",
              xs: "44vw",
            },
          }}
          name="bmi"
          value={fieldData?.bmi?.value}
          helperText={fieldData?.bmi?.helperText}
          error={fieldData?.bmi?.isError}
          onChange={handleChange}
          disabled
        />
        <DatePicker
          label={
            <span>
              Date
              <span style={{ color: "#F43F5E" }}> *</span>
            </span>
          }
          value={fieldData?.date?.value}
          onChange={(newValue: any) => handleDateChange(newValue, "date")}
          helperText={fieldData?.date?.helperText}
          error={fieldData?.date?.isError}
          name={"date"}
          sx={{
            width: {
              xl: "202px",
              lg: "13.5vw",
              md: "14.5vw",
              sm: "21vw",
              xs: "44vw",
            },
            height: "48px",
          }}
          disabled={disabled}
        />
      </Grid>

      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: {
            xl: "431px",
            lg: "30vw",
            md: "31.5vw",
            sm: "45vw",
            xs: "95vw",
          },
          gap: 3.5,
          // mb: 3,
          pl: "24px",
        }}
      >
        {isTokenVisible && (
          <Grid>
            <Typography sx={{ color: "#8A8A8A" }}>Token No</Typography>

            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {tokenNo || currentToken + 1}
            </Typography>
          </Grid>
        )}
        {isConsultationFeeEnabled && (
          <Grid>
            <Typography sx={{ color: "#8A8A8A" }}>
              {fieldData.consultantFee.label}
            </Typography>

            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {fieldData.consultantFee.value || 0}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
