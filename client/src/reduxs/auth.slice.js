import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo, deleteUserAddress, changePassword } from "./auth.thunk";
//  đây là nơi lưu trữ các thông tin về state của user

// 1. Khởi tạo state ban đầu
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  message: null,
  pendingEmail: null,
};

// 2. Tạo slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // LOGIN
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.message = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
      state.message = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      state.message = null;
      state.pendingEmail = null;
    },
    // REGISTER
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    setPendingEmail: (state, action) => {
      state.pendingEmail = action.payload;
    },
    // VERIFY OTP
    verifyRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    verifySuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
      state.pendingEmail = null;
    },
    verifyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // RESEND OTP
    resendRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resendSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    resendFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // UPDATE USER INFO
    updateUserRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload;

      // Cập nhật user info nếu có
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    // Delete Account
    deleteAccountRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteAccountSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.message = action.payload;
    },
    deleteAccountFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;

        // Cập nhật user info nếu có
        if (action.payload.user) {
          state.user = action.payload.user;
        }

        // Cập nhật token nếu có
        if (action.payload.token) {
          state.token = action.payload.token;
        }
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  registerRequest,
  registerSuccess,
  registerFailure,
  setPendingEmail,
  verifyRequest,
  verifySuccess,
  verifyFailure,
  resendRequest,
  resendSuccess,
  resendFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
} = authSlice.actions;

export default authSlice.reducer;
