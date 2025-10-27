import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { RouteUrls } from "../constants/routes";

type PublicRoutesTypes = {
  isLoggedIn?: boolean;
};

const PublicRoutes = ({ isLoggedIn }: PublicRoutesTypes) => {
  const { authUser } = useSelector((state: RootState) => state.auth) as any;

  let initialRoute = "/";

  const permissionList = authUser?.permission;

  if (authUser.permission) {
    if (permissionList.includes("Dashboard")) {
      initialRoute = RouteUrls.dashboardUrl;
    } else if (permissionList.includes("Restaurant")) {
      initialRoute = RouteUrls.restaurantUrl;
    } else if (permissionList.includes("Medical Camp")) {
      initialRoute = `${RouteUrls.medicalCampUrl}${RouteUrls.medicalCampScheduleUrl}`;
    } else if (permissionList.includes("Clinic")) {
      initialRoute = `/clinical/appointment`;
    } else if (permissionList.includes("Spiritual Tour")) {
      initialRoute = RouteUrls.spiritualTourUrl;
    } else if (permissionList.includes("Feedback")) {
      initialRoute = RouteUrls.reportUrl;
    } else {
      initialRoute = RouteUrls.customerRegistrationUrl;
    }
  }
  // console.log("isLoggedIn from PublicRoutes", isLoggedIn);

  return !isLoggedIn ? <Outlet /> : <Navigate to={initialRoute} />;
};

export default PublicRoutes;
