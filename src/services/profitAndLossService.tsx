import { profitAndLossEndPoints } from "../constants/apiEndPoints";
import { ApiUtils } from "../utils";
import { setQueryParams } from "../utils/GeneralUtils";

const { profitAndLossRootUrl } = profitAndLossEndPoints;

const getProfitAndLossSummary = async (data: any) => {
  const apiUrl = setQueryParams(data, profitAndLossRootUrl);

  return await ApiUtils.getWithToken(apiUrl);
};

export { getProfitAndLossSummary };
