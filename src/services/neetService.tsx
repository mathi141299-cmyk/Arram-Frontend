import { neetEndPoints } from "../constants/apiEndPoints";
import { ApiUtils } from "../utils";
import { setQueryParams } from "../utils/GeneralUtils";

const { neetMasterRootUrl, neetStudentRootUrl } = neetEndPoints;

const getAllSchedules = async (data: any) => {
  const apiUrl = setQueryParams(data, neetMasterRootUrl);

  return await ApiUtils.getWithToken(apiUrl);
};

const createSchedule = async (data: any) => {
  return await ApiUtils.postWithToken(neetMasterRootUrl, data);
};

const getScheduleDetailsById = async (id: any) => {
  return await ApiUtils.getWithToken(`${neetMasterRootUrl}/${id}`);
};

const updateScheduleDetailsById = async (id: any, data: any) => {
  return await ApiUtils.putWithToken(`${neetMasterRootUrl}/${id}`, data);
};

const deleteScheduleDetailsById = async (id: any) => {
  return await ApiUtils.deleteWithToken(`${neetMasterRootUrl}/${id}`);
};

const getAllRegistrations = async (data: any) => {
  const apiUrl = setQueryParams(data, neetStudentRootUrl);

  return await ApiUtils.getWithToken(apiUrl);
};

const createRegistration = async (data: any) => {
  return await ApiUtils.postWithToken(neetStudentRootUrl, data);
};

const getRegistrationDetailsById = async (id: any) => {
  return await ApiUtils.getWithToken(`${neetStudentRootUrl}/${id}`);
};

const updateRegistrationDetailsById = async (id: any, data: any) => {
  return await ApiUtils.putWithToken(`${neetStudentRootUrl}/${id}`, data);
};

const deleteRegistrationDetailsById = async (id: any) => {
  return await ApiUtils.deleteWithToken(`${neetStudentRootUrl}/${id}`);
};

export {
  getAllSchedules,
  createSchedule,
  getScheduleDetailsById,
  updateScheduleDetailsById,
  deleteScheduleDetailsById,
  getAllRegistrations,
  createRegistration,
  getRegistrationDetailsById,
  updateRegistrationDetailsById,
  deleteRegistrationDetailsById,
};
