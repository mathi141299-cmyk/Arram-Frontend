import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type ViewState = {
  selectedOthersSection: number | null;
};

const initialViewState: ViewState = {
  selectedOthersSection: null,
};

const viewSlice = createSlice({
  name: "view",
  initialState: initialViewState,
  reducers: {
    setSelectedOthersSection: (state, action: PayloadAction<number>) => {
      state.selectedOthersSection = action.payload;
    },
  },
});

export const { setSelectedOthersSection } = viewSlice.actions;

export default viewSlice.reducer;
