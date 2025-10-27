import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PaginationValue {
  page: number;
  pageSize: number;
  sortBy?: string | null;
  sortOrder?: string | null;
}

export type PageType =
  | "customerRegistration"
  | "appointmentList"
  | "SpiritualTourList"
  | "MedicalCampList"
  | "RestaurantList"
  | "appointmentReportList"
  | "restaurantReportList"
  | "medicalCampReportList"
  | "spiritualTourReportList"
  | "ExpensesList"
  | "spiritualTourReportList"
  | "donationsList"
  | "scheduleList"
  | "AdjustmentList"
  | "NeetScheduleList"
  | "NeetRegistrationList"
  | "WomenWelfareList"
  | "formersTrainingList";

export type IPagination = Record<PageType, PaginationValue>;

interface PageActionPayloadType {
  key: PageType;
  value: number | string | undefined | null;
}

const initialState: IPagination = {
  customerRegistration: { page: 0, pageSize: 10 },
  appointmentList: { page: 0, pageSize: 10 },
  SpiritualTourList: { page: 0, pageSize: 10 },
  MedicalCampList: { page: 0, pageSize: 10 },
  RestaurantList: { page: 0, pageSize: 10 },
  appointmentReportList: { page: 0, pageSize: 10 },
  restaurantReportList: { page: 0, pageSize: 10 },
  medicalCampReportList: { page: 0, pageSize: 10 },
  spiritualTourReportList: { page: 0, pageSize: 10 },
  ExpensesList: { page: 0, pageSize: 10 },
  donationsList: { page: 0, pageSize: 10 },
  scheduleList: { page: 0, pageSize: 10 },
  AdjustmentList: { page: 0, pageSize: 10 },
  NeetScheduleList: { page: 0, pageSize: 10 },
  NeetRegistrationList: { page: 0, pageSize: 10 },
  WomenWelfareList: { page: 0, pageSize: 10 },
  formersTrainingList: { page: 0, pageSize: 10 },
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (
      state,
      { payload }: PayloadAction<PageActionPayloadType>
    ) => {
      state[payload.key].page = payload.value as number;
    },
    setRowsPerPage: (
      state,
      { payload }: PayloadAction<PageActionPayloadType>
    ) => {
      state[payload.key].pageSize = payload.value as number;
    },
    setSortBy: (state, { payload }: PayloadAction<PageActionPayloadType>) => {
      state[payload.key].sortBy = payload.value as string;
    },
    setSortOrder: (
      state,
      { payload }: PayloadAction<PageActionPayloadType>
    ) => {
      state[payload.key].sortOrder = payload.value as string;
    },
  },
});

export const { setCurrentPage, setRowsPerPage, setSortBy, setSortOrder } =
  paginationSlice.actions;

export default paginationSlice.reducer;
