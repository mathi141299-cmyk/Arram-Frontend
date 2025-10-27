import { masterEndPoints } from "../constants/apiEndPoints";
import { ApiUtils } from "../utils";
import { setQueryParams } from "../utils/GeneralUtils";

const {
  getAreaDetails,
  getCityDetails,
  getPermissionDetails,
  getTalukDetails,
  getBranchDetails,
  getTotalReportDetail,
  getVillageDetails,
  getSourceOptions,
  getExpenseCategoryOptions,
} = masterEndPoints;

const areaDetails = async () => {
  return await ApiUtils.getWithToken(getAreaDetails);
};

const villageDetails = async (search?: object) => {
  const apiUrl = setQueryParams(search, getVillageDetails);
  return await ApiUtils.getWithToken(apiUrl);
};

const cityDetails = async () => {
  return await ApiUtils.getWithToken(getCityDetails);
};

const talukDetails = async () => {
  return await ApiUtils.getWithToken(getTalukDetails);
};

const permissionDetail = async (id: any) => {
  return await ApiUtils.getWithToken(`${getPermissionDetails}/${id}`);
};

const branchDetail = async () => {
  return await ApiUtils.getWithToken(getBranchDetails);
};

const totalReportDetail = async () => {
  return await ApiUtils.getWithToken(getTotalReportDetail);
};

const sourceOptionDetails = async () => {
  return await ApiUtils.getWithToken(getSourceOptions);
};

const expenseCategoryOptionDetails = async () => {
  return await ApiUtils.getWithToken(getExpenseCategoryOptions);
};

export {
  areaDetails,
  permissionDetail,
  cityDetails,
  talukDetails,
  branchDetail,
  totalReportDetail,
  villageDetails,
  sourceOptionDetails,
  expenseCategoryOptionDetails,
};
