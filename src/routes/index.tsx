import { RouteUrls } from "../constants/routes";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CustomerRegistration from "../views/Admin/CustomerRegistration";
import AddCustomer from "../views/Admin/CustomerRegistration/AddCustomer";
import Permissions from "../views/Admin/Permissions";
import UserRegistration from "../views/Admin/UserRegistration";
import SignIn from "../views/Auth";
import Restaurant from "../views/Restaurant";
import Appointment from "../views/Admin/Appointment";
import AddAppointment from "../views/Admin/Appointment/Add";
import AppointmentDetails from "../views/Admin/Appointment/view";
import MedicalCamp from "../views/MedicalCamp";
import AddCamp from "../views/MedicalCamp/AddCamp";
import SpiritualTourList from "../views/SpiritualTour/List";
import AddAndEditSpiritualTour from "../views/SpiritualTour/AddAndEdit";
import RestaurantBillList from "../views/Restaurant/list";
import { hasPermission } from "../utils/PermissionUtils";
import Error from "../views/Error";
import Report from "../views/Report";
import Dashboard from "../views/Dashboard";
import ExpensesList from "../views/Expenses/List";
import Donations from "../views/Donations";
import AddDonation from "../views/Donations/AddDonation";
import AddMedicalCampSchedule from "../views/MedicalCampSchedule/AddMedicalCampSchedule";
import MedicalCampSchedule from "../views/MedicalCampSchedule";
import ExpensesAddAndEdit from "../views/Expenses/AddAndEdit";
import AdjustmentList from "../views/Adjustment/List";
import AdjustmentAddAndEdit from "../views/Adjustment/AddAndEdit";
import NeetScheduleList from "../views/Neet/Schdule/List";
import NeetScheduleAddAndEdit from "../views/Neet/Schdule/AddAndEdit";
import NeetRegistrationList from "../views/Neet/Registration/List";
import NeetRegistrationAddAndEdit from "../views/Neet/Registration/AddAndEdit";
import WomenWelfareList from "../views/Others/WomenWelfare/List";
import WomenWelfareAddAndEdit from "../views/Others/WomenWelfare/AddAndEdit";
import Others from "../views/Others";
import FormersTrainingList from "../views/Others/FormersTraining/List";
import FormersTrainingAddAndEdit from "../views/Others/FormersTraining/AddAndEdit";
import ProfitAndLossReport from "../views/ProfitAndLossReport";

const Routes = () => {
  const { authUser } = useSelector((state: RootState) => state.auth) as any;

  const {
    signInUrl,
    restaurantUrl,
    customerRegistrationUrl,
    userRegistrationUrl,
    permissionsUrl,
    adminUrl,
    addCustomerUrl,
    appointmentUrl,
    createAppointmentUrl,
    clinicalUrl,
    medicalCampUrl,
    addCampUrl,
    spiritualTourUrl,
    createUrl,
    editUrl,
    reportUrl,
    dashboardUrl,
    expensesUrl,
    donationsUrl,
    addDonationUrl,
    medicalCampScheduleUrl,
    addScheduleUrl,
    medicalCampAppointmentUrl,
    adjustmentUrl,
    neetUrl,
    scheduleUrl,
    registrationUrl,
    othersUrl,
    womenWelfareUrl,
    farmersTrainingUrl,
    profitAndLossUrl,
  } = RouteUrls;

  const privateRoutes = [
    {
      path: "*",
      Component: <Error />,
    },
    {
      path: `${restaurantUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser.permission, "Restaurant") ? (
          <RestaurantBillList />
        ) : (
          <Error />
        )
      ) : (
        <RestaurantBillList />
      ),
    },
    {
      path: `${restaurantUrl}${createUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Restaurant") ? (
          <Restaurant />
        ) : (
          <Error />
        )
      ) : (
        <Restaurant />
      ),
    },
    {
      path: `${restaurantUrl}/:id`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Restaurant") ? (
          <Restaurant />
        ) : (
          <Error />
        )
      ) : (
        <Restaurant />
      ),
    },
    {
      path: `${medicalCampUrl}${medicalCampAppointmentUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Medical Camp") ? (
          <MedicalCamp />
        ) : (
          <Error />
        )
      ) : (
        <MedicalCamp />
      ),
    },
    {
      path: `${medicalCampUrl}${medicalCampAppointmentUrl}${addCampUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Medical Camp") ? (
          <AddCamp />
        ) : (
          <Error />
        )
      ) : (
        <AddCamp />
      ),
    },
    {
      path: `${medicalCampUrl}${medicalCampAppointmentUrl}/:id`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Medical Camp") ? (
          <AddCamp />
        ) : (
          <Error />
        )
      ) : (
        <AddCamp />
      ),
    },
    {
      path: `${medicalCampUrl}${medicalCampScheduleUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Medical Camp") ? (
          <MedicalCampSchedule />
        ) : (
          <Error />
        )
      ) : (
        <MedicalCampSchedule />
      ),
    },
    {
      path: `${medicalCampUrl}${medicalCampScheduleUrl}${addScheduleUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Medical Camp") ? (
          <AddMedicalCampSchedule />
        ) : (
          <Error />
        )
      ) : (
        <AddMedicalCampSchedule />
      ),
    },
    {
      path: `${medicalCampUrl}${medicalCampScheduleUrl}${editUrl}/:id`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Medical Camp") ? (
          <AddMedicalCampSchedule />
        ) : (
          <Error />
        )
      ) : (
        <AddMedicalCampSchedule />
      ),
    },
    {
      path: `${donationsUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Donations") ? (
          <Donations />
        ) : (
          <Error />
        )
      ) : (
        <Donations />
      ),
    },
    {
      path: `${donationsUrl}${addDonationUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Medical Camp") ? (
          <AddDonation />
        ) : (
          <Error />
        )
      ) : (
        <AddDonation />
      ),
    },
    {
      path: `${donationsUrl}/:id`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Donations") ? (
          <AddDonation />
        ) : (
          <Error />
        )
      ) : (
        <AddDonation />
      ),
    },
    {
      path: `${adminUrl}${customerRegistrationUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Customer Registration") ? (
          <CustomerRegistration />
        ) : (
          <Error />
        )
      ) : (
        <CustomerRegistration />
      ),
    },
    {
      path: `${adminUrl}${customerRegistrationUrl}/:id`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Customer Registration") ? (
          <AddCustomer />
        ) : (
          <Error />
        )
      ) : (
        <AddCustomer />
      ),
    },
    {
      path: `${adminUrl}${customerRegistrationUrl}${addCustomerUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Customer Registration") ? (
          <AddCustomer />
        ) : (
          <Error />
        )
      ) : (
        <AddCustomer />
      ),
    },
    {
      path: `${adminUrl}${userRegistrationUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Restaurant") ? (
          <UserRegistration />
        ) : (
          <Error />
        )
      ) : (
        <UserRegistration />
      ),
    },
    {
      path: `${clinicalUrl}${appointmentUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Clinic") ? (
          <Appointment />
        ) : (
          <Error />
        )
      ) : (
        <Appointment />
      ),
    },
    {
      path: `${clinicalUrl}${appointmentUrl}${createAppointmentUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Clinic") ? (
          <AddAppointment />
        ) : (
          <Error />
        )
      ) : (
        <AddAppointment />
      ),
    },
    {
      path: `${clinicalUrl}${appointmentUrl}${editUrl}/:id`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Clinic") ? (
          <AddAppointment />
        ) : (
          <Error />
        )
      ) : (
        <AddAppointment />
      ),
    },
    {
      path: `${clinicalUrl}${appointmentUrl}/:id`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Clinic") ? (
          <AppointmentDetails />
        ) : (
          <Error />
        )
      ) : (
        <AppointmentDetails />
      ),
    },
    {
      path: `${spiritualTourUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Spiritual Tour") ? (
          <SpiritualTourList />
        ) : (
          <Error />
        )
      ) : (
        <SpiritualTourList />
      ),
    },
    {
      path: `${spiritualTourUrl}${createUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Spiritual Tour") ? (
          <AddAndEditSpiritualTour />
        ) : (
          <Error />
        )
      ) : (
        <AddAndEditSpiritualTour />
      ),
    },
    {
      path: `${spiritualTourUrl}${editUrl}/:tourId`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Spiritual Tour") ? (
          <AddAndEditSpiritualTour />
        ) : (
          <Error />
        )
      ) : (
        <AddAndEditSpiritualTour />
      ),
    },
    {
      path: expensesUrl,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Expenses") ? (
          <ExpensesList />
        ) : (
          <Error />
        )
      ) : (
        <ExpensesList />
      ),
    },
    {
      path: `${expensesUrl}${createUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Expenses") ? (
          <ExpensesAddAndEdit />
        ) : (
          <Error />
        )
      ) : (
        <ExpensesAddAndEdit />
      ),
    },
    {
      path: profitAndLossUrl,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Profit And Loss") ? (
          <ProfitAndLossReport />
        ) : (
          <Error />
        )
      ) : (
        <ProfitAndLossReport />
      ),
    },
    {
      path: `${expensesUrl}${editUrl}/:id`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Expenses") ? (
          <ExpensesAddAndEdit />
        ) : (
          <Error />
        )
      ) : (
        <ExpensesAddAndEdit />
      ),
    },
    {
      path: adjustmentUrl,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Adjustment") ? (
          <AdjustmentList />
        ) : (
          <Error />
        )
      ) : (
        <AdjustmentList />
      ),
    },
    {
      path: `${adjustmentUrl}${createUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Adjustment") ? (
          <AdjustmentAddAndEdit />
        ) : (
          <Error />
        )
      ) : (
        <AdjustmentAddAndEdit />
      ),
    },
    {
      path: `${adjustmentUrl}${editUrl}/:id`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Adjustment") ? (
          <AdjustmentAddAndEdit />
        ) : (
          <Error />
        )
      ) : (
        <AdjustmentAddAndEdit />
      ),
    },
    {
      path: `${neetUrl}${scheduleUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Neet") ? (
          <NeetScheduleList />
        ) : (
          <Error />
        )
      ) : (
        <NeetScheduleList />
      ),
    },
    {
      path: `${neetUrl}${scheduleUrl}${createUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Neet") ? (
          <NeetScheduleAddAndEdit />
        ) : (
          <Error />
        )
      ) : (
        <NeetScheduleAddAndEdit />
      ),
    },
    {
      path: `${neetUrl}${scheduleUrl}${editUrl}/:id`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Neet") ? (
          <NeetScheduleAddAndEdit />
        ) : (
          <Error />
        )
      ) : (
        <NeetScheduleAddAndEdit />
      ),
    },
    {
      path: `${neetUrl}${registrationUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Neet") ? (
          <NeetRegistrationList />
        ) : (
          <Error />
        )
      ) : (
        <NeetRegistrationList />
      ),
    },
    {
      path: `${neetUrl}${registrationUrl}${createUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Neet") ? (
          <NeetRegistrationAddAndEdit />
        ) : (
          <Error />
        )
      ) : (
        <NeetRegistrationAddAndEdit />
      ),
    },
    {
      path: `${neetUrl}${registrationUrl}${editUrl}/:id`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Neet") ? (
          <NeetRegistrationAddAndEdit />
        ) : (
          <Error />
        )
      ) : (
        <NeetRegistrationAddAndEdit />
      ),
    },
    {
      path: othersUrl,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Others") ? (
          <Others />
        ) : (
          <Error />
        )
      ) : (
        <Others />
      ),
    },
    {
      path: `${othersUrl}${womenWelfareUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Others") ? (
          <WomenWelfareList />
        ) : (
          <Error />
        )
      ) : (
        <WomenWelfareList />
      ),
    },
    {
      path: `${othersUrl}${womenWelfareUrl}${createUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Others") ? (
          <WomenWelfareAddAndEdit />
        ) : (
          <Error />
        )
      ) : (
        <WomenWelfareAddAndEdit />
      ),
    },
    {
      path: `${othersUrl}${womenWelfareUrl}${editUrl}/:id`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Others") ? (
          <WomenWelfareAddAndEdit />
        ) : (
          <Error />
        )
      ) : (
        <WomenWelfareAddAndEdit />
      ),
    },
    {
      path: `${othersUrl}${farmersTrainingUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Others") ? (
          <FormersTrainingList />
        ) : (
          <Error />
        )
      ) : (
        <FormersTrainingList />
      ),
    },
    {
      path: `${othersUrl}${farmersTrainingUrl}${createUrl}`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Others") ? (
          <FormersTrainingAddAndEdit />
        ) : (
          <Error />
        )
      ) : (
        <FormersTrainingAddAndEdit />
      ),
    },
    {
      path: `${othersUrl}${farmersTrainingUrl}${editUrl}/:id`,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Others") ? (
          <FormersTrainingAddAndEdit />
        ) : (
          <Error />
        )
      ) : (
        <FormersTrainingAddAndEdit />
      ),
    },
    {
      path: reportUrl,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Feedback") ? (
          <Report />
        ) : (
          <Error />
        )
      ) : (
        <Report />
      ),
    },
    {
      path: dashboardUrl,
      Component: authUser.permission ? (
        hasPermission(authUser?.permission, "Dashboard") ? (
          <Dashboard />
        ) : (
          <Error />
        )
      ) : (
        <Report />
      ),
    },
  ];

  const publicRoutes = [
    {
      path: signInUrl,
      Component: <SignIn />,
    },
  ];

  return { privateRoutes, publicRoutes };
};

export default Routes;
