import { feedbackEndpoints } from "../constants/apiEndPoints";
import { ApiUtils } from "../utils";
import { setQueryParams } from "../utils/GeneralUtils";

const {
  getBillFeedbackHistory,
  getAppointmentFeedbackHistory,
  getMedicalCampFeedbackHistory,
  getSpiritualTourFeedbackHistory,
  feedbackCreate,
  billFeedbackUpdate,
  billsWithFeedback,
  allBillsWithFeedback,
  appointmentsWithFeedback,
  allAppointmentsWithFeedback,
  medicalCampsWithFeedback,
  allMedicalCampsWithFeedback,
  spiritualToursPilgrimsWithFeedback,
  allSpiritualToursPilgrimsWithFeedback,
} = feedbackEndpoints;

const getBillFeedbackHistoryById = async (id: any) => {
  return await ApiUtils.getWithToken(`${getBillFeedbackHistory}/${id}`);
};

const getAppointmentFeedbackHistoryById = async (id: any) => {
  return await ApiUtils.getWithToken(`${getAppointmentFeedbackHistory}/${id}`);
};

const getMedicalCampFeedbackHistoryById = async (id: any) => {
  return await ApiUtils.getWithToken(`${getMedicalCampFeedbackHistory}/${id}`);
};

const getSpiritualTourFeedbackHistoryById = async (id: any) => {
  return await ApiUtils.getWithToken(
    `${getSpiritualTourFeedbackHistory}/${id}`
  );
};

const createFeedback = async (data: any) => {
  return await ApiUtils.postWithToken(feedbackCreate, data);
};

const updateBillFeedback = async (id: any, data: any) => {
  return await ApiUtils.putWithToken(`${billFeedbackUpdate}/${id}`, data);
};

const getBillsWithFeedback = async (data: any) => {
  const apiUrl = setQueryParams(data, billsWithFeedback);
  return await ApiUtils.getWithToken(apiUrl);
};

const getAllBillsWithFeedback = async (data: any) => {
  const apiUrl = setQueryParams(data, allBillsWithFeedback);
  return await ApiUtils.getWithToken(apiUrl);
};

const getAppointmentsWithFeedback = async (data: any) => {
  const apiUrl = setQueryParams(data, appointmentsWithFeedback);
  return await ApiUtils.getWithToken(apiUrl);
};

const getAllAppointmentsWithFeedback = async (data: any) => {
  const apiUrl = setQueryParams(data, allAppointmentsWithFeedback);
  return await ApiUtils.getWithToken(apiUrl);
};

const getMedicalCampsWithFeedback = async (data: any) => {
  const apiUrl = setQueryParams(data, medicalCampsWithFeedback);
  return await ApiUtils.getWithToken(apiUrl);
};

const getAllMedicalCampsWithFeedback = async (data: any) => {
  const apiUrl = setQueryParams(data, allMedicalCampsWithFeedback);
  return await ApiUtils.getWithToken(apiUrl);
};

const getSpiritualToursPilgrimsWithFeedback = async (data: any) => {
  const apiUrl = setQueryParams(data, spiritualToursPilgrimsWithFeedback);
  return await ApiUtils.getWithToken(apiUrl);
};

const getAllSpiritualToursPilgrimsWithFeedback = async (data: any) => {
  const apiUrl = setQueryParams(data, allSpiritualToursPilgrimsWithFeedback);
  return await ApiUtils.getWithToken(apiUrl);
};

export {
  createFeedback,
  updateBillFeedback,
  getBillFeedbackHistoryById,
  getAppointmentFeedbackHistoryById,
  getMedicalCampFeedbackHistoryById,
  getSpiritualTourFeedbackHistoryById,
  getBillsWithFeedback,
  getAllBillsWithFeedback,
  getAppointmentsWithFeedback,
  getAllAppointmentsWithFeedback,
  getMedicalCampsWithFeedback,
  getAllMedicalCampsWithFeedback,
  getSpiritualToursPilgrimsWithFeedback,
  getAllSpiritualToursPilgrimsWithFeedback,
};
