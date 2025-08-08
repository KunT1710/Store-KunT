import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import cartReducer from './cart.slice';
import paymentReducer from './payment.slice';
import voucherReducer from './voucher.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    payment: paymentReducer,
    voucher: voucherReducer,
  },
});

export default store;