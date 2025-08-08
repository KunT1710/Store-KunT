import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vouchers: [],
  loading: false,
  error: null,
  selectedVoucher: null,
  appliedVouchers: []
};

const voucherSlice = createSlice({
  name: 'voucher',
  initialState,
  reducers: {
    // Fetch vouchers
    fetchVouchersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchVouchersSuccess: (state, action) => {
      state.loading = false;
      state.vouchers = action.payload;
      state.error = null;
    },
    fetchVouchersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Apply voucher
    applyVoucher: (state, action) => {
      const voucher = action.payload;
      const existingIndex = state.appliedVouchers.findIndex(v => v._id === voucher._id);

      if (existingIndex === -1) {
        state.appliedVouchers.push(voucher);
      }
    },

    // Remove voucher
    removeVoucher: (state, action) => {
      const voucherId = action.payload;
      state.appliedVouchers = state.appliedVouchers.filter(v => v._id !== voucherId);
    },

    // Clear applied vouchers
    clearAppliedVouchers: (state) => {
      state.appliedVouchers = [];
    },

    // Select voucher for details
    selectVoucher: (state, action) => {
      state.selectedVoucher = action.payload;
    },

    // Clear selected voucher
    clearSelectedVoucher: (state) => {
      state.selectedVoucher = null;
    },

    // Update voucher usage
    updateVoucherUsage: (state, action) => {
      const { voucherId, usedCount } = action.payload;
      const voucher = state.vouchers.find(v => v._id === voucherId);
      if (voucher) {
        voucher.usedCount = usedCount;
      }
    }
  }
});

export const {
  fetchVouchersStart,
  fetchVouchersSuccess,
  fetchVouchersFailure,
  applyVoucher,
  removeVoucher,
  clearAppliedVouchers,
  selectVoucher,
  clearSelectedVoucher,
  updateVoucherUsage
} = voucherSlice.actions;

export default voucherSlice.reducer;
