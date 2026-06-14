import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

export const verifyAccount = createAsyncThunk(
  "auth/verifyAccount",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.VERIFY_ACCOUNT
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const verifyAccountSlice = createSlice({
  name: "verifyAccount",
  initialState: {
    loading: false,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyAccount.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        // console.log("state.status", state.status);
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        // console.log("state.status", state.status);
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
        // console.log("state.status", state.status);
      });
  },
});

export const verifyAccountState = verifyAccountSlice.reducer;
