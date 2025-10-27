import { spiritualToursEndPoints } from "../constants/apiEndPoints";
import { ApiUtils } from "../utils";
import { setQueryParams } from "../utils/GeneralUtils";

const {
  getAllSpiritualToursList,
  getAllSpiritualToursWithPilgrimsList,
  createNewSpiritualTour,
  getOneSpiritualTourDetail,
  updateNewSpiritualTour,
  deleteOneSpiritualTourPilgrim,
  deleteOneSpiritualTour,
} = spiritualToursEndPoints;

const getSpiritualToursList = async (params: any) => {
  const apiUrl = setQueryParams(params, getAllSpiritualToursList);

  return await ApiUtils.getWithToken(apiUrl);
};

const getSpiritualToursWithPilgrimsList = async (params: any) => {
  const apiUrl = setQueryParams(params, getAllSpiritualToursWithPilgrimsList);

  return await ApiUtils.getWithToken(apiUrl);
};

const createSpiritualTour = async (data: any) => {
  return await ApiUtils.postWithToken(createNewSpiritualTour, data);
};

const getOneSpiritualTour = async (id: any) => {
  return await ApiUtils.getWithToken(`${getOneSpiritualTourDetail}/${id}`);
};

const updateSpiritualTour = async (id: any, data: any) => {
  return await ApiUtils.putWithToken(`${updateNewSpiritualTour}/${id}`, data);
};

const deleteSpiritualTourPilgrim = async (tourId: any, pilgrimId: any) => {
  return await ApiUtils.deleteWithToken(
    `${deleteOneSpiritualTourPilgrim}/${tourId}/customer/${pilgrimId}`
  );
};

const deleteSpiritualTour = async (id: any) => {
  return await ApiUtils.deleteWithToken(`${deleteOneSpiritualTour}/${id}`);
};

export {
  getSpiritualToursList,
  getSpiritualToursWithPilgrimsList,
  createSpiritualTour,
  getOneSpiritualTour,
  updateSpiritualTour,
  deleteSpiritualTourPilgrim,
  deleteSpiritualTour,
};
