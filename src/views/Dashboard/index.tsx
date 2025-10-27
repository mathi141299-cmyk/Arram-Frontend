import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { totalReportDetail } from "../../services/masterService";
import Summary from "./Summary";

const Dashboard = () => {
  const initialTotalReport = {
    totalBillsKodumudi: null,
    totalBillsGanapathipalayam: null,
    todayBillsKodumudi: null,
    todayBillsGanapathipalayam: null,
    totalAppointmentsModakurichi: null,
    totalAppointmentsSivagiri: null,
    todayAppointmentsModakurichi: null,
    todayAppointmentsSivagiri: null,
    totalMedicalCampCount: null,
    todayMedicalCampCount: null,
    totalSpiritualTourCount: null,
    todaySpiritualTourCount: null,
    totalSpiritualToursBeneficiaries: null,
    totalMedicalCampBeneficiaries: null,
    totalBillsFeedbackKodumudi: null,
    todayBillsFeedbackKodumudi: null,
    totalBillsFeedbackGanapathipalayam: null,
    todayBillsFeedbackGanapathipalayam: null,
    totalAppointmentsFeedbackModakurichi: null,
    todayAppointmentsFeedbackModakurichi: null,
    totalAppointmentsFeedbackSivagiri: null,
    todayAppointmentsFeedbackSivagiri: null,
    totalMedicalCampFeedback: null,
    todayMedicalCampFeedback: null,
    totalSpiritualTourFeedback: null,
    todaySpiritualTourFeedback: null,
    totalDonationsKodumudi: null,
    totalDonationsGanapathipalayam: null,
    totalDonationsModakurichi: null,
    totalDonationsSivagiri: null,
    todayDonationsKodumudi: null,
    todayDonationsGanapathipalayam: null,
    todayDonationsModakurichi: null,
    todayDonationsSivagiri: null,
    totalExpensesKodumudi: null,
    totalExpensesGanapathipalayam: null,
    totalExpensesModakurichi: null,
    totalExpensesSivagiri: null,
    todayExpensesKodumudi: null,
    todayExpensesGanapathipalayam: null,
    todayExpensesModakurichi: null,
    todayExpensesSivagiri: null,
    totalBillsAdjustmentKodumudi: null,
    totalBillsAdjustmentGanapathipalayam: null,
    todayBillsAdjustmentKodumudi: null,
    todayBillsAdjustmentGanapathipalayam: null,
    totalDonations: null,
    todayDonations: null,
    totalExpenses: null,
    todayExpenses: null,
  };

  const [totalReportData, setTotalReportData] =
    useState<any>(initialTotalReport);

  const getTotalReport = async () => {
    try {
      await totalReportDetail().then((result: any) => {
        // console.log("mnmnmn result from getTotalReport", result);
        let data = result?.data;

        setTotalReportData(result?.data);
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getTotalReport();
  }, []);

  return (
    <Grid sx={{ width: "auto", mb: "100px" }}>
      <Summary totalReportData={totalReportData} />
    </Grid>
  );
};

export default Dashboard;
