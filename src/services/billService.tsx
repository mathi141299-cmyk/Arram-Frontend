import { billEndPoints } from "../constants/apiEndPoints";
import { ApiUtils } from "../utils";

const getBillById = async (id: number) => {
  return await ApiUtils.getWithToken(`${billEndPoints.getBillById}/${id}`);
};

export { getBillById };
