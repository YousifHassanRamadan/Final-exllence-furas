import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"; // استيراد مكتبة js-cookie
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";
import { LocalStorageUtils } from "../../utils/localStorageUtils";

const getUserData = () => {
  try {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    return null;
  }
};

const initialState = {
  isLogged: !!LocalStorageUtils.getAccessToken(),
  logInError: null,
  loading: false,
  logInLoading: false,
  error: null,
  signUpErr: null,
  token: LocalStorageUtils.getAccessToken(),
  userData: getUserData(),
  signUpStatus: "idle",
  loginStatus: "idle",
  errorMsg: null,
};

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.SIGNUP,
        userData,
      );
      return response.data; // إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response || error);
    }
  },
);

export const logInUser = createAsyncThunk(
  "auth/logInUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.LOGIN,
        userData,
      );
      const data = response.data;
      LocalStorageUtils.setAccessToken(data.accessToken);
      LocalStorageUtils.setRefreshToken(data.refreshToken);

      return data; // إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
        errors: error.response?.data?.data || [], // for signup field errors
      });
    }
  },
);

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (token, { rejectWithValue }) => {
    try {
      if (!token) throw new Error("No token provided");
      const response = await axiosClient.get(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.GET_USER_DATA,
      );
      const data = response.data;
      localStorage.setItem("userData", JSON.stringify(data));
      return data; // إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isLogged = false;
      state.token = null;
      state.userData = null;
      localStorage.removeItem("@ACCESS_TOKEN");
      localStorage.removeItem("@REFRESH_TOKEN");
      localStorage.removeItem("@ACCESS_TOKEN");
      localStorage.removeItem("favourites");
      localStorage.removeItem("userData");
    },
    resetSignUp: (state) => {
      state.loading = false;
      state.signUpErr = null;
      state.errorMsg = null;
      state.signUpStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.signUpErr = false;
        state.errorMsg = null;
        state.signUpStatus = "loading";
        // console.log("state.status", state.signUpStatus);
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
        state.signUpErr = false;
        state.signUpStatus = "success";
        state.errorMsg = "noError";
        // console.log("state.status", state.signUpStatus);
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.signUpErr = true;
        state.status = "failed";
        // console.log("state.status", state.signUpStatus);
        // console.log("action.payload", action.payload.data.data[0].msg);
        state.errorMsg = action.payload.data.data[0].msg;
      })
      .addCase(logInUser.pending, (state) => {
        state.logInLoading = true;
        state.error = null;
        state.loginStatus = "loading";
        // console.log("state.loginStatus", state.loginStatus);
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.logInLoading = false;
        state.isLogged = true;
        state.token = action.payload.accessToken;
        state.loginStatus = "success";
        // console.log("state.loginStatus", state.loginStatus);
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.logInLoading = false;
        state.isLogged = false;
        state.logInError = action.payload?.message || "Login failed";
        state.loginStatus = "failed";
        // console.log("state.loginStatus", state.loginStatus);
        // console.log("action", action.payload.data.message);
        state.errorMsg =
          action.payload?.errors?.[0]?.msg || action.payload?.message;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logOut, resetSignUp } = authSlice.actions;
export const authState = authSlice.reducer;
