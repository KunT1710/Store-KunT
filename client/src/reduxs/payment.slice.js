import { createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchVouchers, calculateShippingFee } from "./payment.thunk";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    selectedAddress: null,
    selectedPaymentMethod: "cod", // cod, momo, vnpay
    selectedVoucher: null,
    selectedCartItems: [], // Lưu danh sách sản phẩm đã chọn từ cart
    shippingFee: 30000, // Phí vận chuyển mặc định
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setSelectedPaymentMethod: (state, action) => {
      state.selectedPaymentMethod = action.payload;
    },
    setSelectedVoucher: (state, action) => {
      state.selectedVoucher = action.payload;
    },
    setSelectedCartItems: (state, action) => {
      state.selectedCartItems = action.payload;
    },
    setShippingFee: (state, action) => {
      state.shippingFee = action.payload;
    },
    clearPaymentData: (state) => {
      state.selectedAddress = null;
      state.selectedPaymentMethod = "cod";
      state.selectedVoucher = null;
      state.selectedCartItems = [];
      state.shippingFee = 30000;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Vouchers
      .addCase(fetchVouchers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVouchers.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchVouchers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Calculate Shipping Fee
      .addCase(calculateShippingFee.fulfilled, (state, action) => {
        state.shippingFee = action.payload.shippingFee;
      });
  },
});

export const {
  setSelectedAddress,
  setSelectedPaymentMethod,
  setSelectedVoucher,
  setSelectedCartItems,
  setShippingFee,
  clearPaymentData,
} = paymentSlice.actions;

export default paymentSlice.reducer; 