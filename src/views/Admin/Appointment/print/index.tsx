import { Box, Divider, Grid, Typography } from "@mui/material";
import { FormLogo, FormTitle, FormWaterMark } from "../../../../assets/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import moment from "moment";
import {
  PrintFormHeader,
  printDesignLogo,
  printTextLogo,
  blackUnderline,
  grayUnderline,
  printDesignColorLogo,
  printTextColorLogo,
  lightBlueUnderline,
  lightGreenUnderline,
} from "../../../../assets/images";

type PrintFormProps = {
  //   date: string;
  //   time: string;
  //   tokenNo: number | string;
  //   area: string;
  //   quantity: number | string;
  printRef?: any;
  formInfo?: any;
  isColorLogo?: any;
};

const PrintForm = ({ printRef, formInfo, isColorLogo }: PrintFormProps) => {
  //   const { printRef } = props;
  const { authUser } = useSelector((state: RootState) => state.auth) as any;

  // const printInformation = {
  //   "Patient Name": formInfo?.patient_name,
  //   Branch: formInfo?.appoint_date,
  //   "Age/Gender": formInfo?.patient_age,
  //   "Doctor Name": formInfo?.patient_sex ? "Male" : "Female",
  //   Mobile: formInfo?.purpose_name,
  //   Date: formInfo?.Date,
  //   Address: formInfo?.patient_mobile,
  //   "Token No": formInfo?.patient_mobile,
  // };

  const printInformation = [
    {
      name: "Patient Name",
      value: formInfo?.customer?.name,
    },

    {
      name: "Age / Gender",
      value:
        formInfo?.customer?.age && formInfo?.customer?.gender
          ? `${formInfo?.customer?.age} / ${formInfo?.customer?.gender}`
          : formInfo?.customer?.age || formInfo?.customer?.gender || "N/A",
    },

    {
      name: "Mobile",
      value: formInfo?.customer?.mobile,
    },

    {
      name: "Address",
      value: formInfo?.customer?.address?.address,
    },
  ];

  const printInformationTwo = [
    {
      name: "Branch",
      value: authUser?.branch?.name,
    },

    {
      name: "Doctor Name",
      value: formInfo?.consultant?.name,
    },

    {
      name: "Date",
      value: moment(formInfo?.date).format("DD-MM-YYYY"),
    },

    {
      name: "Token No",
      value: formInfo?.tokenNo,
    },
  ];

  const vitalDetails = [
    {
      name: "Height",
      value: formInfo?.height === "0" ? "-" : `${formInfo?.height}${"cm"}`,
    },

    {
      name: "Weight",
      value: formInfo?.weight === "0" ? "-" : `${formInfo?.weight}${"kg"}`,
    },
    {
      name: "BMI",
      value:
        formInfo?.bmi !== "NaN" && formInfo?.bmi !== "0"
          ? `${formInfo?.bmi}`
          : "-",
    },
    formInfo?.bp !== "" && {
      name: "BP",
      value: `${formInfo?.bp}${"mg/dL"}`,
    },
    formInfo?.temperature !== "" && {
      name: "Temperature",
      value: `${formInfo?.temperature}${"c"}`,
    },
  ];

  return (
    <Box
      ref={printRef}
      style={{
        fontFamily: "SanSerif",
        position: "relative",
        width: "100vw",
        height: "60vh",
      }}
    >
      {isColorLogo ? (
        <Grid
          style={{
            width: "90vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignItems: "center",
            marginTop: "2px",
            padding: "10px 0px 0px 0px",
            marginLeft: "35px",
          }}
        >
          <Grid
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <img src={printDesignColorLogo} alt="" />
            <img src={printTextColorLogo} alt="" />
          </Grid>
          <img
            src={lightBlueUnderline}
            alt=""
            style={{ marginBottom: "2px" }}
          />
          <img src={lightGreenUnderline} alt="" />
        </Grid>
      ) : (
        <Grid
          style={{
            width: "90vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignItems: "center",
            marginTop: "2px",
            padding: "10px 0px 0px 0px",
            marginLeft: "35px",
          }}
        >
          <Grid
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <img src={printDesignLogo} alt="" />
            <img src={printTextLogo} alt="" />
          </Grid>
          <img
            src={grayUnderline}
            alt=""
            style={{ marginBottom: "2px", height: "2px" }}
          />
          <img src={blackUnderline} alt="" style={{ height: "2px" }} />
        </Grid>
      )}

      <Grid
        container
        style={{
          width: "90vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          border: "1px solid #000000",
          borderRadius: "8px",
          marginLeft: "35px",
          marginTop: "20px",
        }}
      >
        <Grid
          container
          style={{
            width: "40vw",
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px",
            padding: "0px 10px",
          }}
        >
       
          <Grid
            container
            style={{
              width: "100%",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Grid
              item
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-around",
              }}
            >
              <Grid
                item
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: "15px 0px 10px 0px",
                }}
              >
                {printInformation.map((row: any, index: any) => {
                  return (
                    <Grid
                      key={index}
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        maxHeight: "35px",
                        marginBottom: "10px",
                        color: "textPrimary.main",
                      }}
                      className="row"
                    >
                      <Grid
                        style={{
                          width: "40%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "13px", fontWeight: "400" }}
                        >
                          {row.name}
                        </Typography>
                        <Typography
                          style={{ fontSize: "13px", fontWeight: "400" }}
                        >
                          :
                        </Typography>
                      </Grid>
                      <Grid
                        style={{
                          width: "60%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          paddingLeft: 3,
                        }}
                      >
                        <Typography
                          style={{
                            color: "greyScale.main",
                            marginLeft: "10px",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {row.value}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          style={{
            width: "40vw",
            display: "flex",
            flexDirection: "column",
            border: 1,
            borderColor: "greyScale.lighter",
            borderRadius: "5px",
            padding: "0px 10px",
          }}
        >
          <Grid
            container
            style={{
              width: "100%",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Grid
              item
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-around",
              }}
            >
              <Grid
                item
                style={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: "15px 0px 10px 0px",
                }}
              >
                {printInformationTwo.map((row: any, index: any) => {
                  return (
                    <Grid
                      key={index}
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        maxHeight: "35px",
                        marginBottom: "10px",
                        color: "textPrimary.main",
                      }}
                      className="row"
                    >
                      <Grid
                        style={{
                          width: "40%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "13px", fontWeight: "400" }}
                        >
                          {row.name}
                        </Typography>
                        <Typography
                          style={{ fontSize: "13px", fontWeight: "400" }}
                        >
                          :
                        </Typography>
                      </Grid>
                      <Grid
                        style={{
                          width: "60%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          paddingLeft: 3,
                        }}
                      >
                        <Typography
                          style={{
                            color:
                              row.name === "Branch" ? "initial" : "initial",
                            marginLeft: "10px",
                            fontSize: "13px",
                            fontWeight: row.name === "Branch" ? "900" : "600",
                          }}
                        >
                          {row.value}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        style={{
          width: "90vw",
          display: "flex",
          flexDirection: "column",
          // border: "1px solid red",
          border: "1px solid #000000",
          borderRadius: "8px",
          marginLeft: "35px",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <Grid
          container
          style={{
            width: "100%",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: "10px",
          }}
        >
          <Grid
            item
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-around",
            }}
          >
            <Grid
              item
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                // justifyContent: "space-between",
                margin: "15px 0px 10px 0px",
              }}
            >
              {vitalDetails.map((row: any, index: any) => {
                return (
                  <Grid
                    key={index}
                    style={{
                      width: "33%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      maxHeight: "35px",
                      marginBottom: "10px",
                      color: "textPrimary.main",
                    }}
                    className="row"
                  >
                    <Grid
                      style={{
                        width: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        style={{ fontSize: "13px", fontWeight: "400" }}
                      >
                        {row.name}
                      </Typography>
                      <Typography
                        style={{ fontSize: "13px", fontWeight: "400" }}
                      >
                        {row.name ? ":" : ""}
                      </Typography>
                    </Grid>
                    <Grid
                      style={{
                        width: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingLeft: 3,
                      }}
                    >
                      <Typography
                        style={{
                          color: "greyScale.main",
                          marginLeft: "10px",
                          fontSize: "13px",
                          fontWeight: "500",
                        }}
                      >
                        {row.value}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        style={{
          marginLeft: "40px",
          marginTop: "20px",

          // paddingLeft: 2,
          borderBottom: 1,
          // borderColor: "greyScale.lighter",
        }}
      >
        <Typography
          variant="h3"
          color="initial"
          style={{
            fontSize: "12px",
            fontWeight: "900",
            textDecoration: "underline",
          }}
        >
          <span style={{ textDecoration: "underline" }}>Fee Details:</span>
        </Typography>{" "}
        <Typography
          variant="h3"
          color="initial"
          style={{
            fontSize: "12px",
            fontWeight: "500",
            marginTop: "5px",
          }}
        >
          Registration Fee:{formInfo?.consultationFee} only/-
        </Typography>
      </Grid>

      <Grid
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "60px",
          paddingLeft: 2,
          borderBottom: 1,

          // borderColor: "greyScale.lighter",
        }}
      >
        <Typography
          variant="h3"
          color="initial"
          style={{
            fontSize: "12px",
            fontWeight: "600",
            marginTop: "25px",
          }}
        >
          Authorized Signatory
        </Typography>
      </Grid>
      <Box
        style={{
          width: "90%",
          height: "1px",
          backgroundColor: "#000000",
          marginLeft: "35px",
          marginTop: "8px",
        }}
      />
      <Box
        style={{
          //   display: "flex",
          position: "absolute",
          top: "28%",
          left: "40%",
          //   transform:trans
          zIndex: -100,
          //   justifyContent: "center",
        }}
      >
        <FormWaterMark />
      </Box>
    </Box>
  );
};

export default PrintForm;
