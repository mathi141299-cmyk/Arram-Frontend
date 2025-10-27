import {
  appointmentEndPoints,
  masterEndPoints,
} from "../constants/apiEndPoints";
import { ApiUtils } from "../utils";
import { setQueryParams } from "../utils/GeneralUtils";
const getAllAppointment = async (data: any) => {
  const apiUrl = setQueryParams(data, appointmentEndPoints.getAppointment);
  return await ApiUtils.getWithToken(apiUrl);
};
const createAppointment = async (data: any) => {
  return await ApiUtils.postWithToken(
    appointmentEndPoints.createAppointment,
    data
  );
};
const getTokenNumber = async (date: any) => {
  return await ApiUtils.getWithToken(
    `${appointmentEndPoints.getAppointmentToken}/${date}`
  );
};
const getAllDepartmentAndType = async () => {
  return await ApiUtils.getWithToken(masterEndPoints.getAllDepartment);
};
const getAppointmentById = async (id: any) => {
  return await ApiUtils.getWithToken(
    `${appointmentEndPoints.getAppointmentById}/${id}`
  );
};
const updateAppointmentById = async (id: number | string, data: any) => {
  return await ApiUtils.putWithToken(
    `${appointmentEndPoints.createAppointment}/${id}`,
    data
  );
};
export {
  updateAppointmentById,
  getAllAppointment,
  createAppointment,
  getTokenNumber,
  getAppointmentById,
  getAllDepartmentAndType,
};
