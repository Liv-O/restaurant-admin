import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

type RealtimeState = { isConnected: boolean };

const initialState: RealtimeState = {
  isConnected: false,
};

const realtimeSlice = createSlice({
  name: 'realtime',
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setConnected } = realtimeSlice.actions;

export default realtimeSlice.reducer;

export const selectIsConnected = (state: RootState) => state.realtime.isConnected;
