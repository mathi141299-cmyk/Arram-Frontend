import {
  customerEndPoints,
  masterEndPoints,
  medicalCampPoints,
} from "../constants/apiEndPoints";
import { ApiUtils } from "../utils";
import { setQueryParams } from "../utils/GeneralUtils";

const getCustomerList = async (params: any) => {
  const apiUrl = setQueryParams(params, customerEndPoints.baseUrl);
  return await ApiUtils.getWithToken(apiUrl);
};
const createCustomer = async (data: any) => {
  return await ApiUtils.postWithToken(customerEndPoints.createCustomer, data);
};
const getCustomerById = async (id: any) => {
  return await ApiUtils.getWithToken(
    `${customerEndPoints.getPersonalInformations}/${id}`
  );
};

const updateCustomerWithId = async (id: number | string, data: any) => {
  return await ApiUtils.putWithToken(
    `${customerEndPoints.createCustomer}/${id}`,
    data
  );
};
const {
  getAllCustomers,
  getPersonalInformations,
  createBill,
  updateBill,
  getBill,
  getAllZeroCustomer,
} = customerEndPoints;
const { getAllReasons, getAllConsultants } = masterEndPoints;
const { getMedicalCampList, createMedicalList, getAllCampDateDetails } =
  medicalCampPoints;

const CustomerDetails = async (search?: object) => {
  const apiUrl = setQueryParams(search, getAllCustomers);
  return await ApiUtils.getWithToken(apiUrl);
};
const PersonalInformationDetails = async (id: any) => {
  return await ApiUtils.getWithToken(`${getPersonalInformations}/${id}`);
};
const BillDetails = async (billData: {} | any) => {
  return await ApiUtils.postWithToken(createBill, billData);
};
const getAllBillList = async (data: any) => {
  const apiUrl = setQueryParams(data, customerEndPoints.getAllBill);
  return await ApiUtils.getWithToken(apiUrl);
};

const reasonDetails = async () => {
  return await ApiUtils.getWithToken(getAllReasons);
};
const consultantDetails = async () => {
  return await ApiUtils.getWithToken(getAllConsultants);
};

const getMedicalCampListDetails = async (params: any) => {
  const apiUrl = setQueryParams(params, getMedicalCampList);
  return await ApiUtils.getWithToken(apiUrl);
};
const createMedicalCampDetails = async (data: any) => {
  return await ApiUtils.postWithToken(createMedicalList, data);
};
const getMedicalCampById = async (id: any) => {
  return await ApiUtils.getWithToken(`${getMedicalCampList}/${id}`);
};
const getBillById = async (id: any) => {
  return await ApiUtils.getWithToken(`${getBill}/${id}`);
};
const updateMedicalCampWithId = async (id: number | string, data: any) => {
  return await ApiUtils.putWithToken(`${createMedicalList}/${id}`, data);
};
const updateBillById = async (id: number | string, data: any) => {
  return await ApiUtils.putWithToken(`${updateBill}/${id}`, data);
};

const getLastAllZeroCustomer = async () => {
  return await ApiUtils.getWithToken(getAllZeroCustomer);
};

const getAllCampDateList = async (data: any) => {
  const apiUrl = setQueryParams(data, getAllCampDateDetails);

  return await ApiUtils.getWithToken(apiUrl);
};
export {
  updateBillById,
  getBillById,
  getCustomerList,
  createCustomer,
  getCustomerById,
  updateCustomerWithId,
  CustomerDetails,
  PersonalInformationDetails,
  BillDetails,
  getAllBillList,
  reasonDetails,
  consultantDetails,
  getMedicalCampListDetails,
  createMedicalCampDetails,
  getMedicalCampById,
  updateMedicalCampWithId,
  getLastAllZeroCustomer,
  getAllCampDateList,
};
