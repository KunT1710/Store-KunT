import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Lấy giỏ hàng, nếu chưa có thì tạo mới
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      // console.log("trước khi gọi api cart", token);
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("sau khi goi API Cart");
      // console.log(res);
      return res.data;
    } catch (error) {
      // console.log(error);
      // Nếu lỗi là không tìm thấy giỏ hàng, thì tạo mới
      if (error.response && error.response.status === 404) {
        try {
          // Nếu backend lấy userId từ middleware, chỉ cần gửi { items: [] }
          const createRes = await axios.post(
            "http://localhost:5000/api/cart",
            { items: [] },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return createRes.data;
        } catch (createErr) {
          console.log("Lỗi khi tạo giỏ hàng mới:", createErr);
          return rejectWithValue(
            createErr.response?.data?.message || createErr.message
          );
        }
      }
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Cập nhật giỏ hàng
export const updateCart = createAsyncThunk("cart/updateCart", async ({ userId, items }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`http://localhost:5000/api/cart/${userId}`, { items }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});