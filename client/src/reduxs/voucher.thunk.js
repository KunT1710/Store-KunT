import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchVouchersStart,
  fetchVouchersSuccess,
  fetchVouchersFailure,
  updateVoucherUsage
} from './voucher.slice';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fetch all vouchers
export const fetchVouchers = createAsyncThunk(
  'voucher/fetchVouchers',
  async (_, { dispatch }) => {
    try {
      dispatch(fetchVouchersStart());

      const response = await fetch(`${API_BASE_URL}/sale`);
      if (!response.ok) {
        throw new Error('Failed to fetch vouchers');
      }

      const vouchers = await response.json();
      dispatch(fetchVouchersSuccess(vouchers));
      return vouchers;
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch vouchers';
      dispatch(fetchVouchersFailure(errorMessage));
      throw error;
    }
  }
);

// Apply a voucher
export const applyVoucher = createAsyncThunk(
  'voucher/applyVoucher',
  async ({ voucherId, orderData }, { dispatch }) => {
    try {
      // First validate the voucher
      const validateResponse = await fetch(`${API_BASE_URL}/sale/${voucherId}/validate`);
      if (!validateResponse.ok) {
        throw new Error('Voucher validation failed');
      }

      const { isValid, sale } = await validateResponse.json();
      if (!isValid) {
        throw new Error('Voucher is not valid or expired');
      }

      // Use the voucher
      const useResponse = await fetch(`${API_BASE_URL}/sale/${voucherId}/use`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!useResponse.ok) {
        throw new Error('Failed to apply voucher');
      }

      const result = await useResponse.json();

      // Update voucher usage in store
      dispatch(updateVoucherUsage({
        voucherId,
        usedCount: sale.usedCount + 1
      }));

      return result;
    } catch (error) {
      throw error;
    }
  }
);

// Validate a voucher by code
export const validateVoucherByCode = createAsyncThunk(
  'voucher/validateVoucherByCode',
  async (code) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sale/validate-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        throw new Error('Invalid voucher code');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
);

// Get available vouchers for a specific order
export const getAvailableVouchers = createAsyncThunk(
  'voucher/getAvailableVouchers',
  async (orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sale/available`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to get available vouchers');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
);
