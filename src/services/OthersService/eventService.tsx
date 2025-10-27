import { eventEndPoints } from "../../constants/apiEndPoints";
import { ApiUtils } from "../../utils";
import { setQueryParams } from "../../utils/GeneralUtils";

const { eventRootUrl } = eventEndPoints;

const getEventsList = async (data: any) => {
  const apiUrl = setQueryParams(data, eventRootUrl);

  return await ApiUtils.getWithToken(apiUrl);
};

const createEvent = async (data: any) => {
  return await ApiUtils.postWithToken(eventRootUrl, data);
};

const getEventDetailsById = async (id: any) => {
  return await ApiUtils.getWithToken(`${eventRootUrl}/${id}`);
};

const updateEventDetailsById = async (id: any, data: any) => {
  return await ApiUtils.putWithToken(`${eventRootUrl}/${id}`, data);
};

const deleteEvent = async (id: any) => {
  return await ApiUtils.deleteWithToken(`${eventRootUrl}/${id}`);
};

const deleteEventParticipantById = async (id: any) => {
  return await ApiUtils.deleteWithToken(
    `${eventRootUrl}/deleteEventParticipantById/${id}`
  );
};

export {
  getEventsList,
  createEvent,
  getEventDetailsById,
  updateEventDetailsById,
  deleteEvent,
  deleteEventParticipantById,
};
