import { useEffect, useState } from "react";
import {
  AdminIcon,
  ClinicIcon,
  HighlightedRestaurantIcon,
  MedicalCampIcon,
  SpiritualTourIcon,
  HighlightedMedicalCampIcon,
  RestaurantIcon,
  HighlightedSpiritualTourIcon,
  HighlightedClinicIcon,
  HighLightedAdminIcon,
  HighlightedFeedbackIcon,
  FeedbackIcon,
  DashboardIcon,
  HighLightedDashboardIcon,
  AdjustmentIcon,
  DonationsIcon,
  ExpensesIcon,
  NeetIcon,
  OthersIcon,
  ProfitAndLossIcon,
  HighlightedAdjustmentIcon,
  HighlightedDonationsIcon,
  HighlightedExpensesIcon,
  HighlightedNeetIcon,
  HighlightedOthersIcon,
  HighlightedProfitAndLossIcon,
  Adjustment,
  HighlightedAdjustment,
  Others,
  HighlightedOthers,
  HighlightedProfitAndLoss,
  ProfitAndLoss,
} from "../../../assets/icons";
import { RouteUrls } from "../../../constants/routes";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { permissionDetail } from "../../../services/masterService";
import { hasPermission } from "../../../utils/PermissionUtils";

const {
  restaurantUrl,
  adminUrl,
  customerRegistrationUrl,
  appointmentUrl,
  clinicalUrl,
  medicalCampUrl,
  spiritualTourUrl,
  reportUrl,
  dashboardUrl,
  expensesUrl,
  donationsUrl,
  medicalCampScheduleUrl,
  medicalCampAppointmentUrl,
  adjustmentUrl,
  neetUrl,
  scheduleUrl,
  registrationUrl,
  othersUrl,
  profitAndLossUrl,
} = RouteUrls;

const NavConfig = () => {
  const { authUser } = useSelector((state: RootState) => state.auth) as any;

  return [
    {
      title: "Dashboard",
      path: dashboardUrl,
      icon: <DashboardIcon />,
      activeIcon: <HighLightedDashboardIcon />,
      hasPermission: hasPermission(authUser?.permission, "Dashboard"),
    },
    {
      title: "Restaurant",
      path: `${restaurantUrl}`,
      icon: <RestaurantIcon />,
      activeIcon: <HighlightedRestaurantIcon />,
      hasPermission: hasPermission(authUser?.permission, "Restaurant"),
    },
    {
      title: "Medical Camp",
      path: medicalCampUrl,
      icon: <MedicalCampIcon />,
      activeIcon: <HighlightedMedicalCampIcon />,
      hasPermission: hasPermission(authUser?.permission, "Medical Camp"),
      children: [
        {
          title: "Schedule",
          path: medicalCampScheduleUrl,
          hasPermission: hasPermission(authUser?.permission, "Medical Camp"),
        },
        {
          title: "Appointment",
          path: medicalCampAppointmentUrl,
          hasPermission: hasPermission(authUser?.permission, "Medical Camp"),
        },
      ],
    },
    {
      title: "Clinic",
      // path: clinicalUrl,
      path: `${clinicalUrl}${appointmentUrl}`,
      icon: <ClinicIcon />,
      activeIcon: <HighlightedClinicIcon />,
      hasPermission: hasPermission(authUser?.permission, "Clinic"),
      // children: [
      //   {
      //     title: "Appointment",
      //   },
      // ],
    },
    {
      title: "Spiritual Tour",
      path: spiritualTourUrl,
      icon: <SpiritualTourIcon />,
      activeIcon: <HighlightedSpiritualTourIcon />,
      hasPermission: hasPermission(authUser?.permission, "Spiritual Tour"),
    },
    {
      title: "Donations",
      path: donationsUrl,
      icon: <DonationsIcon />,
      activeIcon: <HighlightedDonationsIcon />,
      hasPermission: hasPermission(authUser?.permission, "Donations"),
    },
    {
      title: "Expenses",
      path: expensesUrl,
      icon: <ExpensesIcon />,
      activeIcon: <HighlightedExpensesIcon />,
      hasPermission: hasPermission(authUser?.permission, "Expenses"),
    },
    {
      title: "Feedback",
      path: reportUrl,
      icon: <FeedbackIcon />,
      activeIcon: <HighlightedFeedbackIcon />,
      hasPermission: hasPermission(authUser?.permission, "Feedback"),
    },
    {
      title: "Adjustment",
      path: adjustmentUrl,
      icon: <img src={Adjustment} alt="" />,
      activeIcon: <img src={HighlightedAdjustment} alt="" />,
      hasPermission: hasPermission(authUser?.permission, "Adjustment"),
    },
    {
      title: "Neet",
      path: neetUrl,
      icon: <NeetIcon />,
      activeIcon: <HighlightedNeetIcon />,
      hasPermission: hasPermission(authUser?.permission, "Neet"),
      children: [
        {
          title: "Schedule",
          path: scheduleUrl,
          hasPermission: hasPermission(authUser?.permission, "Neet"),
        },
        {
          title: "Registration",
          path: registrationUrl,
          hasPermission: hasPermission(authUser?.permission, "Neet"),
        },
      ],
    },
    {
      title: "Others",
      path: othersUrl,
      icon: <img src={Others} alt="" />,
      activeIcon: <img src={HighlightedOthers} alt="" />,
      hasPermission: hasPermission(authUser?.permission, "Others"),
    },
    {
      title: "P&L Report",
      path: profitAndLossUrl,
      icon: <img src={ProfitAndLoss} alt="" />,
      activeIcon: <img src={HighlightedProfitAndLoss} alt="" />,
      hasPermission: hasPermission(authUser?.permission, "Profit And Loss"),
    },
    {
      title: "Admin",
      path: adminUrl,
      icon: <AdminIcon />,
      activeIcon: <HighLightedAdminIcon />,
      hasPermission: hasPermission(authUser?.permission, "Admin"),
      children: [
        {
          title: "Customer Registration",
          path: customerRegistrationUrl,
          hasPermission: hasPermission(
            authUser?.permission,
            "Customer Registration"
          ),
        },
      ],
    },
  ];
};
export default NavConfig;
