const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_PATH = "/api";
const BASE_PATH = `${BASE_URL}${API_PATH}`;

export const authEndPoints = {
  login: `${BASE_PATH}/auth/login`,
  logout: `${BASE_PATH}/logout`,
  refreshToken: `${BASE_PATH}/auth/refresh-token`,
};

export const customerEndPoints = {
  getAllCustomers: `${BASE_PATH}/customer`,
  getPersonalInformations: `${BASE_PATH}/customer/getCustomerById`,
  createBill: `${BASE_PATH}/bill`,
  updateBill: `${BASE_PATH}/bill/updateBillById`,
  getBill: `${BASE_PATH}/bill/getBillById`,
  baseUrl: `${BASE_PATH}/customer`,
  getAllBill: `${BASE_PATH}/bill`,
  createCustomer: `${BASE_PATH}/customer`,
  getAllAreas: `${BASE_PATH}/customer`,
  getAllZeroCustomer: `${BASE_PATH}/customer/getLastAllZeroCustomer`,
};

export const billEndPoints = { getBillById: `${BASE_PATH}/bill/getBillById` };

export const medicalCampPoints = {
  getMedicalCampList: `${BASE_PATH}/medical-camp/appointment`,
  createMedicalList: `${BASE_PATH}/medical-camp/appointment`,
  medicalCampUrl: `${BASE_PATH}/medical-camp`,
  getAllCampDateDetails: `${BASE_PATH}/medical-camp/getby-date`,
};

export const masterEndPoints = {
  getAllReasons: `${BASE_PATH}/master/reason`,
  getAllConsultants: `${BASE_PATH}/master/consultant`,
  getAreaDetails: `${BASE_PATH}/master/area`,
  getCityDetails: `${BASE_PATH}/master/city`,
  getPermissionDetails: `${BASE_PATH}/master/permission`,
  getAllDepartment: `${BASE_PATH}/master/department`,
  getTalukDetails: `${BASE_PATH}/master/taluk`,
  getBranchDetails: `${BASE_PATH}/master/branch`,
  getTotalReportDetail: `${BASE_PATH}/master/getTotalReport`,
  getVillageDetails: `${BASE_PATH}/master/getAllVillages`,
  getSourceOptions: `${BASE_PATH}/master/getAllSources`,
  getExpenseCategoryOptions: `${BASE_PATH}/master/getAllExpensesCategory`,
};

export const appointmentEndPoints = {
  getAppointment: `${BASE_PATH}/appointment`,
  createAppointment: `${BASE_PATH}/appointment`,
  getAppointmentToken: `${BASE_PATH}/appointment/token`,

  getAppointmentById: `${BASE_PATH}/appointment`,
  updateAppointmentById: `${BASE_PATH}/appointment`,
};

export const userEndPoints = {
  getUserDetails: `${BASE_PATH}/user/details`,
};

export const donationsPoints = {
  donationsUrl: `${BASE_PATH}/donation`,
};

export const spiritualToursEndPoints = {
  getAllSpiritualToursList: `${BASE_PATH}/spiritual-tour`,
  getAllSpiritualToursWithPilgrimsList: `${BASE_PATH}/spiritual-tour/getAllSpiritualToursWithPilgrims`,
  createNewSpiritualTour: `${BASE_PATH}/spiritual-tour`,
  getOneSpiritualTourDetail: `${BASE_PATH}/spiritual-tour/getSpiritualTourById`,
  updateNewSpiritualTour: `${BASE_PATH}/spiritual-tour`,
  deleteOneSpiritualTourPilgrim: `${BASE_PATH}/spiritual-tour`,
  deleteOneSpiritualTour: `${BASE_PATH}/spiritual-tour`,
};

export const feedbackEndpoints = {
  getBillFeedbackHistory: `${BASE_PATH}/feedback/getBillFeedbackHistoryById`,
  getAppointmentFeedbackHistory: `${BASE_PATH}/feedback/getAppointmentFeedbackHistoryById`,
  getMedicalCampFeedbackHistory: `${BASE_PATH}/feedback/getMedicalCampFeedbackHistoryById`,
  getSpiritualTourFeedbackHistory: `${BASE_PATH}/feedback/getSpiritualTourFeedbackHistoryById`,
  feedbackCreate: `${BASE_PATH}/feedback/create`,
  billFeedbackUpdate: `${BASE_PATH}/feedback/update`,
  billsWithFeedback: `${BASE_PATH}/feedback/getBillsWithFeedback`,
  allBillsWithFeedback: `${BASE_PATH}/feedback/getAllBillsWithFeedback`,
  appointmentsWithFeedback: `${BASE_PATH}/feedback/getAppointmentsWithFeedback`,
  allAppointmentsWithFeedback: `${BASE_PATH}/feedback/getAllAppointmentsWithFeedback`,
  medicalCampsWithFeedback: `${BASE_PATH}/feedback/getMedicalCampsWithFeedback`,
  allMedicalCampsWithFeedback: `${BASE_PATH}/feedback/getAllMedicalCampsWithFeedback`,
  spiritualToursPilgrimsWithFeedback: `${BASE_PATH}/feedback/getSpiritualToursPilgrimsWithFeedback`,
  allSpiritualToursPilgrimsWithFeedback: `${BASE_PATH}/feedback/getAllSpiritualToursPilgrimsWithFeedback`,
};

export const expensesEndPoints = {
  expensesRootUrl: `${BASE_PATH}/expense`,
};

export const adjustmentEndPoints = {
  adjustmentRootUrl: `${BASE_PATH}/adjustment`,
  getBillDetails: `${BASE_PATH}/adjustment/getBillDetails`,
  getAdjustmentByDateAndBranch: `${BASE_PATH}/adjustment/getAdjustmentByDateAndBranch`,
};

export const neetEndPoints = {
  neetMasterRootUrl: `${BASE_PATH}/neet-master`,
  neetStudentRootUrl: `${BASE_PATH}/neet-student`,
};

export const womenWelfareEndPoints = {
  womenWelfareRootUrl: `${BASE_PATH}/neet`,
  getWomenWelfareDetails: `${BASE_PATH}/neet`,
};

export const formersTrainingEndPoints = {
  formersTrainingRootUrl: `${BASE_PATH}/neet`,
  getFormersTrainingDetails: `${BASE_PATH}/neet`,
};

export const eventEndPoints = {
  eventRootUrl: `${BASE_PATH}/event`,
};

export const profitAndLossEndPoints = {
  profitAndLossRootUrl: `${BASE_PATH}/profit-and-loss`,
};
