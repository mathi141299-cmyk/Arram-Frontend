import { adjustmentEndPoints } from "../constants/apiEndPoints";
import { ApiUtils } from "../utils";
import { setQueryParams } from "../utils/GeneralUtils";

const { adjustmentRootUrl, getBillDetails, getAdjustmentByDateAndBranch } =
  adjustmentEndPoints;

const getAllAdjustments = async (data: any) => {
  const apiUrl = setQueryParams(data, adjustmentRootUrl);

  return await ApiUtils.getWithToken(apiUrl);
};

const createAdjustment = async (data: any) => {
  return await ApiUtils.postWithToken(adjustmentRootUrl, data);
};

const getAdjustmentDetailsById = async (id: any) => {
  return await ApiUtils.getWithToken(`${adjustmentRootUrl}/${id}`);
};

const getAdjustmentDetailByDateAndBranch = async (params: any) => {
  const apiUrl = setQueryParams(params, getAdjustmentByDateAndBranch);

  return await ApiUtils.getWithToken(apiUrl);
};

const updateAdjustmentDetailsById = async (id: any, data: any) => {
  return await ApiUtils.putWithToken(`${adjustmentRootUrl}/${id}`, data);
};

const deleteAdjustmentDetailsById = async (id: any) => {
  return await ApiUtils.deleteWithToken(`${adjustmentRootUrl}/${id}`);
};

const getRestaurantBillDetails = async (params: any) => {
  const apiUrl = setQueryParams(params, getBillDetails);

  return await ApiUtils.getWithToken(apiUrl);
};

export {
  getAllAdjustments,
  createAdjustment,
  getAdjustmentDetailsById,
  updateAdjustmentDetailsById,
  deleteAdjustmentDetailsById,
  getRestaurantBillDetails,
  getAdjustmentDetailByDateAndBranch,
};
