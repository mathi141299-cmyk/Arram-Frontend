import { expensesEndPoints } from "../constants/apiEndPoints";
import { ApiUtils } from "../utils";
import { setQueryParams } from "../utils/GeneralUtils";

const { expensesRootUrl } = expensesEndPoints;

const getAllExpenses = async (data: any) => {
  const apiUrl = setQueryParams(data, expensesRootUrl);

  return await ApiUtils.getWithToken(apiUrl);
};

const createExpense = async (data: any) => {
  return await ApiUtils.postWithToken(expensesRootUrl, data);
};

const getExpenseDetailsById = async (id: any) => {
  return await ApiUtils.getWithToken(`${expensesRootUrl}/${id}`);
};

const updateExpenseDetailsById = async (id: any, data: any) => {
  return await ApiUtils.putWithToken(`${expensesRootUrl}/${id}`, data);
};

const deleteExpenseDetailsById = async (id: any) => {
  return await ApiUtils.deleteWithToken(`${expensesRootUrl}/${id}`);
};

export {
  getAllExpenses,
  createExpense,
  getExpenseDetailsById,
  updateExpenseDetailsById,
  deleteExpenseDetailsById,
};
