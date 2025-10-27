import { donationsPoints } from "../constants/apiEndPoints";
import { ApiUtils } from "../utils";
import { setQueryParams } from "../utils/GeneralUtils";
const { donationsUrl } = donationsPoints;

export const getDonationList = async (params: any) => {
  const apiUrl = setQueryParams(params, donationsUrl);
  return await ApiUtils.getWithToken(apiUrl);
};
export const createDonation = async (data: any) => {
  return await ApiUtils.postWithToken(donationsUrl, data);
};
export const getDonationById = async (id: any) => {
  return await ApiUtils.getWithToken(`${donationsUrl}/${id}`);
};

export const updateDonationWithId = async (id: number | string, data: any) => {
  return await ApiUtils.putWithToken(`${donationsUrl}/${id}`, data);
};
