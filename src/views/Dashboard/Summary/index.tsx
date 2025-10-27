import React from "react";
import { Grid, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
const Summary = ({ totalReportData }: any) => {
  const {
    totalBillsKodumudi,
    totalBillsGanapathipalayam,
    todayBillsKodumudi,
    todayBillsGanapathipalayam,
    totalAppointmentsModakurichi,
    totalAppointmentsSivagiri,
    todayAppointmentsModakurichi,
    todayAppointmentsSivagiri,
    totalMedicalCampCount,
    todayMedicalCampCount,
    totalSpiritualTourCount,
    todaySpiritualTourCount,
    totalSpiritualToursBeneficiaries,
    totalMedicalCampBeneficiaries,
    totalBillsFeedbackKodumudi,
    todayBillsFeedbackKodumudi,
    totalBillsFeedbackGanapathipalayam,
    todayBillsFeedbackGanapathipalayam,
    totalAppointmentsFeedbackModakurichi,
    todayAppointmentsFeedbackModakurichi,
    totalAppointmentsFeedbackSivagiri,
    todayAppointmentsFeedbackSivagiri,
    totalMedicalCampFeedback,
    todayMedicalCampFeedback,
    totalSpiritualTourFeedback,
    todaySpiritualTourFeedback,
    totalDonationsKodumudi,
    totalDonationsGanapathipalayam,
    totalDonationsModakurichi,
    totalDonationsSivagiri,
    todayDonationsKodumudi,
    todayDonationsGanapathipalayam,
    todayDonationsModakurichi,
    todayDonationsSivagiri,
    totalExpensesKodumudi,
    totalExpensesGanapathipalayam,
    totalExpensesModakurichi,
    totalExpensesSivagiri,
    todayExpensesKodumudi,
    todayExpensesGanapathipalayam,
    todayExpensesModakurichi,
    todayExpensesSivagiri,
    totalBillsAdjustmentKodumudi,
    totalBillsAdjustmentGanapathipalayam,
    todayBillsAdjustmentKodumudi,
    todayBillsAdjustmentGanapathipalayam,
    totalDonations,
    todayDonations,
    totalExpenses,
    todayExpenses,
  } = totalReportData;

  const restaurantInformation: any = [
    {
      name: "",
      total: "Kodumudi",
      today: "Ganapathipalayam",
    },
    {
      name: "Meals As Of Today",
      total: todayBillsKodumudi,
      today: todayBillsGanapathipalayam,
    },
    {
      name: "Adjustment As Of Today",
      total: todayBillsAdjustmentKodumudi,
      today: todayBillsAdjustmentGanapathipalayam,
    },
    {
      name: "Meals Overall",
      total: totalBillsKodumudi,
      today: totalBillsGanapathipalayam,
    },
    {
      name: "Adjustment Overall",
      total: totalBillsAdjustmentKodumudi,
      today: totalBillsAdjustmentGanapathipalayam,
    },
    {
      name: "Feedback Call As Of Today",
      total: todayBillsFeedbackKodumudi,
      today: todayBillsFeedbackGanapathipalayam,
    },
    {
      name: "Feedback Call Overall",
      total: totalBillsFeedbackKodumudi,
      today: totalBillsFeedbackGanapathipalayam,
    },
  ];

  const appointmentInformation: any = [
    // {
    //   name: "",
    //   total: "Total",
    //   today: "Today",
    // },
    // {
    //   name: "Modakurichi",
    //   total: totalAppointmentsModakurichi,
    //   today: todayAppointmentsModakurichi,
    // },
    // {
    //   name: "Sivagiri",
    //   total: totalAppointmentsSivagiri,
    //   today: todayAppointmentsSivagiri,
    // },

    {
      name: "",
      total: "Modakurichi",
      today: "Sivagiri",
    },
    {
      name: "Appointments As Of Today",
      total: todayAppointmentsModakurichi,
      today: todayAppointmentsSivagiri,
    },
    {
      name: "Appointments Overall",
      total: totalAppointmentsModakurichi,
      today: totalAppointmentsSivagiri,
    },
    {
      name: "Feedback Call As Of Today",
      total: todayAppointmentsFeedbackModakurichi,
      today: todayAppointmentsFeedbackSivagiri,
    },
    {
      name: "Feedback Call Overall",
      total: totalAppointmentsFeedbackModakurichi,
      today: totalAppointmentsFeedbackSivagiri,
    },
  ];

  const medicalCampInformation: any = [
    // {
    //   name: "",
    //   total: "Total",
    //   today: "Beneficiaries",
    // },
    // {
    //   name: "All",
    //   total: totalMedicalCampCount,
    //   today: totalMedicalCampBeneficiaries,
    // },
    // {
    //   name: "",
    //   total: " ",
    // },
    {
      name: "Medical Camps Overall",
      total: totalMedicalCampCount,
    },
    {
      name: "Medical Camps Beneficiaries",
      total: totalMedicalCampBeneficiaries,
    },
    {
      name: "Feedback Call As Of Today",
      total: todayMedicalCampFeedback,
    },
    {
      name: "Feedback Call Overall",
      total: totalMedicalCampFeedback,
    },
  ];

  const spiritualTourInformation: any = [
    // {
    //   name: "",
    //   total: " ",
    // },
    {
      name: "Spiritual Tours Overall",
      total: totalSpiritualTourCount,
    },
    {
      name: "Spiritual Tours Beneficiaries",
      total: totalSpiritualToursBeneficiaries,
    },
    {
      name: "Feedback Call As Of Today",
      total: todaySpiritualTourFeedback,
    },
    {
      name: "Feedback Call Overall",
      total: totalSpiritualTourFeedback,
    },
  ];

  const donationsInformation: any = [
    // {
    //   name: "",
    //   total: " ",
    // },
    {
      name: "Donations Overall",
      total: totalDonations,
    },
    {
      name: "Donations As Of Today",
      total: todayDonations,
    },
  ];

  const expensesInformation: any = [
    // {
    //   name: "",
    //   total: " ",
    // },
    {
      name: "Expenses Overall",
      total: totalExpenses,
    },
    {
      name: "Expenses As Of Today",
      total: todayExpenses,
    },
  ];

  // const donationsInformation: any = [
  //   {
  //     name: "",
  //     Kodumudi: "Kodumudi",
  //     Ganapathipalayam: "Ganapathipalayam",
  //     Modakurichi: "Modakurichi",
  //     Sivagiri: "Sivagiri",
  //   },
  //   {
  //     name: "Donation Amount As Of Today",
  //     Kodumudi: todayDonationsKodumudi,
  //     Ganapathipalayam: todayDonationsGanapathipalayam,
  //     Modakurichi: todayDonationsModakurichi,
  //     Sivagiri: todayDonationsSivagiri,
  //   },
  //   {
  //     name: "Donation Amount Overall",
  //     Kodumudi: totalDonationsKodumudi,
  //     Ganapathipalayam: totalDonationsGanapathipalayam,
  //     Modakurichi: totalDonationsModakurichi,
  //     Sivagiri: totalDonationsSivagiri,
  //   },
  // ];

  // const expensesInformation: any = [
  //   {
  //     name: "",
  //     Kodumudi: "Kodumudi",
  //     Ganapathipalayam: "Ganapathipalayam",
  //     Modakurichi: "Modakurichi",
  //     Sivagiri: "Sivagiri",
  //   },
  //   {
  //     name: "Donation Amount As Of Today",
  //     Kodumudi: todayExpensesKodumudi,
  //     Ganapathipalayam: todayExpensesGanapathipalayam,
  //     Modakurichi: todayExpensesModakurichi,
  //     Sivagiri: todayExpensesSivagiri,
  //   },
  //   {
  //     name: "Donation Amount Overall",
  //     Kodumudi: totalExpensesKodumudi,
  //     Ganapathipalayam: totalExpensesGanapathipalayam,
  //     Modakurichi: totalExpensesModakurichi,
  //     Sivagiri: totalExpensesSivagiri,
  //   },
  // ];

  return (
    <Grid
      container
      sx={{
        width: { xs: "98vw", md: "65vw", lg: "74vw" },
        display: "flex",
        flexWrap: "wrap",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "flex-start",
        mb: "50px",
        gap: 2,
      }}
    >
      {/* bills */}

      <Box
        sx={{
          width: { xs: "95vw", md: "65vw", lg: "35vw" },
          display: "flex",
          flexDirection: "column",
          border: 1,
          borderColor: "greyScale.lighter",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            pl: 2,
            borderBottom: 1,
            borderColor: "greyScale.lighter",
            backgroundColor: "rgba(199, 221, 199, 0.19)",
          }}
        >
          <Typography
            variant="h3"
            color="initial"
            sx={{
              fontSize: "12px",
              fontWeight: "600",
              color: "primary.main",
            }}
          >
            Restaurant Information
          </Typography>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            border: "none !important",
            boxShadow: "none !important",
            // borderBottom: 1,
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none ",
              fontSize: "1rem !important",
              h5: {
                fontSize: "13px",
                fontWeight: "400",
              },
            },
          }}
        >
          <Table>
            {/* <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Today</TableCell>
              </TableRow>
            </TableHead> */}
            <TableBody sx={{ borderBottom: "none " }}>
              {restaurantInformation.map((row: any, index: any) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      borderRight: 1,
                      borderColor: "greyScale.lighter",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: index === 0 ? "#597F59" : "greyScale.main",
                      fontWeight: index === 0 ? "600" : "500",
                      borderRight: 1,
                      borderColor: "greyScale.lighter",
                    }}
                  >
                    {row.total || 0}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: index === 0 ? "#597F59" : "greyScale.main",
                      fontWeight: index === 0 ? "600" : "500",
                      borderColor: "greyScale.lighter",
                    }}
                  >
                    {row.today || 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box
        sx={{
          width: { xs: "95vw", md: "65vw", lg: "35vw" },
          display: "flex",
          flexDirection: "column",
          border: 1,
          borderColor: "greyScale.lighter",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            pl: 2,
            borderBottom: 1,
            borderColor: "greyScale.lighter",
            backgroundColor: "rgba(199, 221, 199, 0.19)",
          }}
        >
          <Typography
            variant="h3"
            color="initial"
            sx={{
              fontSize: "12px",
              fontWeight: "600",
              color: "primary.main",
            }}
          >
            Appointment Information
          </Typography>
        </Box>
        <TableContainer
          // component={Paper}
          sx={{
            border: "none !important",
            boxShadow: "none !important",
            // borderBottom: 1,
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none ",
              fontSize: "1rem !important",
              h5: {
                fontSize: "13px",
                fontWeight: "400",
              },
            },
          }}
        >
          <Table sx={{ height: "80%" }}>
            <TableBody sx={{ borderBottom: "none " }}>
              {appointmentInformation.map((row: any, index: any) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      borderRight: 1,
                      borderColor: "greyScale.lighter",
                      height: "25%",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: index === 0 ? "#597F59" : "greyScale.main",
                      fontWeight: index === 0 ? "600" : "500",
                      borderRight: 1,
                      borderColor: "greyScale.lighter",
                    }}
                  >
                    {row.total || 0}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: index === 0 ? "#597F59" : "greyScale.main",
                      fontWeight: index === 0 ? "600" : "500",
                      borderColor: "greyScale.lighter",
                    }}
                  >
                    {row.today || 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* medical camps */}
      <Box
        sx={{
          width: { xs: "95vw", md: "65vw", lg: "35vw" },
          display: "flex",
          flexDirection: "column",
          border: 1,
          borderColor: "greyScale.lighter",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            pl: 2,
            borderBottom: 1,
            borderColor: "greyScale.lighter",
            backgroundColor: "rgba(199, 221, 199, 0.19)",
          }}
        >
          <Typography
            variant="h3"
            color="initial"
            sx={{
              fontSize: "12px",
              fontWeight: "600",
              color: "primary.main",
            }}
          >
            Medical Camp Information
          </Typography>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            border: "none !important",
            boxShadow: "none !important",
            // borderBottom: 1,
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none ",
              fontSize: "1rem !important",
              h5: {
                fontSize: "13px",
                fontWeight: "400",
              },
            },
          }}
        >
          <Table>
            <TableBody sx={{ borderBottom: "none " }}>
              {medicalCampInformation.map((row: any, index: any) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      borderRight: 1,
                      borderColor: "greyScale.lighter",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "greyScale.main",
                      fontWeight: index === 0 ? "600" : "500",
                      // borderRight: 1,
                      borderColor: "greyScale.lighter",
                    }}
                  >
                    {row.total || 0}
                  </TableCell>
                  {/* <TableCell
                    align="center"
                    sx={{
                      color: index === 0 ? "#597F59" : "greyScale.main",
                      fontWeight: index === 0 ? "600" : "500",
                      borderColor: "greyScale.lighter",
                    }}
                  >
                    {row.today || 0}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* spiritual tours */}
      <Box
        sx={{
          width: { xs: "95vw", md: "65vw", lg: "35vw" },
          display: "flex",
          flexDirection: "column",
          border: 1,
          borderColor: "greyScale.lighter",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            pl: 2,
            borderBottom: 1,
            borderColor: "greyScale.lighter",
            backgroundColor: "rgba(199, 221, 199, 0.19)",
          }}
        >
          <Typography
            variant="h3"
            color="initial"
            sx={{
              fontSize: "12px",
              fontWeight: "600",
              color: "primary.main",
            }}
          >
            Spiritual Tour Information
          </Typography>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            border: "none !important",
            boxShadow: "none !important",
            // borderBottom: 1,
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none ",
              fontSize: "1rem !important",
              h5: {
                fontSize: "13px",
                fontWeight: "400",
              },
            },
          }}
        >
          <Table>
            <TableBody sx={{ borderBottom: "none " }}>
              {spiritualTourInformation.map((row: any, index: any) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      borderRight: 1,
                      borderColor: "greyScale.lighter",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color:  "greyScale.main",
                      fontWeight: index === 0 ? "600" : "500",
                      // borderRight: 1,
                      borderColor: "greyScale.lighter",
                    }}
                  >
                    {row.total || 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* donations */}

      {/* donations */}
      <Box
        sx={{
          width: { xs: "95vw", md: "65vw", lg: "35vw" },
          display: "flex",
          flexDirection: "column",
          border: 1,
          borderColor: "greyScale.lighter",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            pl: 2,
            borderBottom: 1,
            borderColor: "greyScale.lighter",
            backgroundColor: "rgba(199, 221, 199, 0.19)",
          }}
        >
          <Typography
            variant="h3"
            color="initial"
            sx={{
              fontSize: "12px",
              fontWeight: "600",
              color: "primary.main",
            }}
          >
            Donations Information
          </Typography>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            border: "none !important",
            boxShadow: "none !important",
            // borderBottom: 1,
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none ",
              fontSize: "1rem !important",
              h5: {
                fontSize: "13px",
                fontWeight: "400",
              },
            },
          }}
        >
          <Table>
            <TableBody sx={{ borderBottom: "none " }}>
              {donationsInformation.map((row: any, index: any) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      borderRight: 1,
                      borderColor: "greyScale.lighter",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "greyScale.main",
                      fontWeight: index === 0 ? "600" : "500",
                      // borderRight: 1,
                      borderColor: "greyScale.lighter",
                    }}
                  >
                    {row.total || 0}
                  </TableCell>
                  {/* <TableCell
                    align="center"
                    sx={{
                      color: index === 0 ? "#597F59" : "greyScale.main",
                      fontWeight: index === 0 ? "600" : "500",
                      borderColor: "greyScale.lighter",
                    }}
                  >
                    {row.today || 0}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* expenses */}
      <Box
        sx={{
          width: { xs: "95vw", md: "65vw", lg: "35vw" },
          display: "flex",
          flexDirection: "column",
          border: 1,
          borderColor: "greyScale.lighter",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            pl: 2,
            borderBottom: 1,
            borderColor: "greyScale.lighter",
            backgroundColor: "rgba(199, 221, 199, 0.19)",
          }}
        >
          <Typography
            variant="h3"
            color="initial"
            sx={{
              fontSize: "12px",
              fontWeight: "600",
              color: "primary.main",
            }}
          >
            Expenses Information
          </Typography>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            border: "none !important",
            boxShadow: "none !important",
            // borderBottom: 1,
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none ",
              fontSize: "1rem !important",
              h5: {
                fontSize: "13px",
                fontWeight: "400",
              },
            },
          }}
        >
          <Table>
            <TableBody sx={{ borderBottom: "none " }}>
              {expensesInformation.map((row: any, index: any) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      borderRight: 1,
                      borderColor: "greyScale.lighter",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color:  "greyScale.main",
                      fontWeight: index === 0 ? "600" : "500",
                      // borderRight: 1,
                      borderColor: "greyScale.lighter",
                    }}
                  >
                    {row.total || 0}
                  </TableCell>
                  {/* <TableCell
                    align="center"
                    sx={{
                      color: index === 0 ? "#597F59" : "greyScale.main",
                      fontWeight: index === 0 ? "600" : "500",
                      borderColor: "greyScale.lighter",
                    }}
                  >
                    {row.today || 0}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* <Grid
        container
        sx={{
          width: { xs: "95vw", md: "65vw", lg: "35vw" },
          display: "flex",
          flexDirection: "column",
          border: 1,
          borderColor: "greyScale.lighter",
          borderRadius: "5px",
        }}
      >
        <Grid
          sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            pl: 2,
            borderBottom: 1,
            borderColor: "greyScale.lighter",
          }}
        >
          <Typography
            variant="h3"
            color="initial"
            sx={{
              fontSize: "12px",
              fontWeight: "600",
              color: "primary.main",
            }}
          >
            Expenses Information
          </Typography>
        </Grid>
        <Grid
          container
          sx={{
            width: "100%",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center", md: "flex-start" },
              justifyContent: { xs: "space-around" },
            }}
          >
            <Grid
              item
              sx={{
                width: {
                  xs: "90%",
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                m: "15px 0px 10px 0px",
              }}
            >
              {expensesInformation.map((row: any, index: number) => {
                return (
                  <Grid
                    key={index}
                    sx={{
                      width: {
                        xs: "100%",
                        lg: "100%",
                      },
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      maxHeight: "35px",
                      mb: "23px",
                      color: "textPrimary.main",
                    }}
                    className="row"
                  >
                    <Typography
                      sx={{
                        width: "50%",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      {row.name}
                    </Typography>
                    <Typography
                      sx={{
                        width: "50%",
                        fontSize: "13px",
                        color:
                          index === 0 ? "textPrimary.main" : "greyScale.main",
                        fontWeight: index === 0 ? "600" : "500",
                        textAlign: "center",
                      }}
                    >
                      {row.total || 0}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default Summary;
