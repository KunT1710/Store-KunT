import { createAsyncThunk } from "@reduxjs/toolkit";

// API base URL
const API_BASE_URL = "http://localhost:5000/api";

// Tạo đơn hàng
export const createOrder = createAsyncThunk(
  "payment/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Có lỗi xảy ra");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Lấy danh sách voucher
export const fetchVouchers = createAsyncThunk(
  "payment/fetchVouchers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/sales`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Có lỗi xảy ra");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Tính phí vận chuyển
export const calculateShippingFee = createAsyncThunk(
  "payment/calculateShippingFee",
  async (addressData, { rejectWithValue }) => {
    try {
      // Tạm thời tính phí vận chuyển dựa trên địa chỉ
      // Có thể mở rộng để gọi API tính phí vận chuyển thực tế
      const { province } = addressData;

      // Logic tính phí vận chuyển đơn giản
      let shippingFee = 30000; // Mặc định

      if (province === "TP.HCM" || province === "Hà Nội") {
        shippingFee = 20000;
      } else if (province.includes("TP.") || province.includes("Thành phố")) {
        shippingFee = 25000;
      } else {
        shippingFee = 35000;
      }

      return { shippingFee };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); 