import { configureStore } from '@reduxjs/toolkit';
import orderDraftsSlice from '@/store/orderDraftsSlice';
import realtimeSlice from './realtimeSlice';

export const store = configureStore({
  reducer: {
    orderDrafts: orderDraftsSlice,
    realtime: realtimeSlice,
  },
});

// Тип усього вмісту блокнота.
// ReturnType<...> — "тип того, що повертає функція".
// store.getState() повертає весь стан, тож ми беремо його тип.
export type RootState = ReturnType<typeof store.getState>;
// Тип функції dispatch (подати заявку).
export type AppDispatch = typeof store.dispatch;
