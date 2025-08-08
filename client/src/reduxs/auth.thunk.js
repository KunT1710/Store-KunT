import {
  loginRequest, loginSuccess, loginFailure, logout,
  registerRequest, registerSuccess, registerFailure, setPendingEmail,
  verifyRequest, verifySuccess, verifyFailure,
  resendRequest, resendSuccess, resendFailure,
  updateUserRequest, updateUserSuccess, updateUserFailure,
} from './auth.slice';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';

export const loginUser = (account, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      dispatch(loginSuccess(data));
    } else {
      dispatch(loginFailure(data.message));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(registerSuccess(data.message));
      // mở modal nhập OTP
      dispatch(setPendingEmail(userData.email));

    } else {
      dispatch(registerFailure(data.message));
    }
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

export const verifyOtp = (otpData, navigate) => async (dispatch) => {
  dispatch(verifyRequest());
  try {
    const response = await fetch('http://localhost:5000/api/users/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(otpData)
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);

      dispatch(loginSuccess(data));

      navigate('/update-info');
    } else {
      dispatch(verifyFailure(data.message));
    }
  } catch (error) {
    dispatch(verifyFailure(error.message));
  }
};


export const resendOtp = (email) => async (dispatch) => {
  dispatch(resendRequest());
  try {
    const response = await fetch('http://localhost:5000/api/users/resend-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(resendSuccess(data.message));
    } else {
      dispatch(resendFailure(data.message));
    }
  } catch (error) {
    dispatch(resendFailure(error.message));
  }
};

export const updateUserInfo = (userInfo, navigate) => async (dispatch) => {
  dispatch(updateUserRequest());
  try {
    const response = await fetch('http://localhost:5000/api/users/update-info', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(userInfo)
    });
    const data = await response.json();
    if (response.ok) {

      localStorage.setItem('token', data.token);

      dispatch(loginSuccess(data));
      navigate('/');
    } else {
      dispatch(updateUserFailure(data.error || data.message || 'Cập nhật thất bại'));
    }
  } catch (error) {
    dispatch(updateUserFailure(error.message));
    return { success: false, error: error.message };
  }
};

export const loadUserFromToken = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const response = await fetch('http://localhost:5000/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(loginSuccess({ user: data.user, token }));
    } else {
      localStorage.removeItem('token');
      dispatch(logout());
    }
  } catch {
    localStorage.removeItem('token');
    dispatch(logout());
  }
};

export const fetchUserInfo = createAsyncThunk('auth/fetchUserInfo', async () => {
  const token = localStorage.getItem('token');
  // console.log("Token: ", token);
  const response = await axios.get('http://localhost:5000/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

export const updateUserInfo_2 = createAsyncThunk(
  'auth/updateUserInfo',
  async (userInfo, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/users/update-info',
        userInfo,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Nếu API trả về token mới, bạn có thể lưu lại ở đây nếu muốn
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      // Xử lý lỗi trả về từ server
      return rejectWithValue(
        error.response?.data?.error || error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteUserAddress = createAsyncThunk(
  'auth/deleteUserAddress',
  async (addressId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`http://localhost:5000/api/users/address/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.data || !res.data.user) {
        throw new Error("Phản hồi không hợp lệ từ server");
      }

      return res.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/users/change-password',
        passwordData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Nếu API trả về token mới, lưu lại
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteAccount = (userId, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/users/deleteAccount/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      // Xóa token, logout, chuyển hướng hoặc thông báo thành công
      localStorage.removeItem('token');
      dispatch(logout());
      if (navigate) navigate('/'); // hoặc trang nào bạn muốn
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || 'Xóa tài khoản thất bại' };
    }
  } catch (error) {
    return { success: false, message: error.message || 'Lỗi hệ thống' };
  }
};
