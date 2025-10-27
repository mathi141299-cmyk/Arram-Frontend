import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type LoaderState = {
  isLoading: boolean;
  isHorizontalLoading: boolean;
};

const initialLoaderState: LoaderState = {
  isLoading: false,
  isHorizontalLoading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState: initialLoaderState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsHorizontalLoading: (state, action: PayloadAction<boolean>) => {
      state.isHorizontalLoading = action.payload;
    },
  },
});

export const { setIsLoading, setIsHorizontalLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
