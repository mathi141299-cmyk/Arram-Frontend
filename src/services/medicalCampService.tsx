import { medicalCampPoints } from "../constants/apiEndPoints";
import { ApiUtils } from "../utils";
import { setQueryParams } from "../utils/GeneralUtils";

const { medicalCampUrl } = medicalCampPoints;

const getAllMedicalCampList = async (params: {
  type: string | number;
  department: string | number;
  date: string | Date;
  location: string;
  page: number;
  size: number;
  column: string;
  order: string;
}) => {
  try {
    const apiUrl = setQueryParams(params, medicalCampUrl);
    return await ApiUtils.getWithToken(apiUrl);
  } catch (error) {
    console.log("Error occurs while getting the medical camp list:", error);
    throw error;
  }
};
const createMedicalCamp = async (data: any) => {
  try {
    return await ApiUtils.postWithToken(medicalCampUrl, data);
  } catch (error) {
    console.log("Error occurs while creating the medical camp:", error);
    throw error;
  }
};
const updateMedicalCampById = async (id: number | string, data: any) => {
  try {
    return await ApiUtils.putWithToken(`${medicalCampUrl}/${id}`, data);
  } catch (error) {
    console.log("Error occurs while updating the medical camp:", error);
    throw error;
  }
};

const getMedicalCampByCampId = async (id: number | string) => {
  try {
    return await ApiUtils.getWithToken(`${medicalCampUrl}/${id}`);
  } catch (error) {
    console.log("Error occurs while updating the medical camp:", error);
    throw error;
  }
};

export {
  getAllMedicalCampList,
  createMedicalCamp,
  updateMedicalCampById,
  getMedicalCampByCampId,
};
