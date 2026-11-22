import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

// 1. Як виглядає ОДИН рядок у списку.
export type DraftItem = {
  dishId: string;
  quantity: number;
  note: string;
};

// 2. Як виглядає ВЕСЬ розділ.
type OrderDraftsState = {
  byTableId: Record<string, DraftItem[]>; // { 't3': [...], 't5': [...] }
};

// 3. Що лежить у розділі на самому початку.
const initialState: OrderDraftsState = {
  byTableId: {},
};

const orderDraftsSlice = createSlice({
  name: 'orderDrafts',
  initialState,
  reducers: {
    //addItem { tableId, dishId }
    addItem: (state, action: PayloadAction<{ tableId: string; dishId: string }>) => {
      const tableId = action.payload.tableId;
      const dishId = action.payload.dishId;
      if (!state.byTableId[tableId]) {
        state.byTableId[tableId] = [];
      }
      const items = state.byTableId[tableId];
      const existingDraft = items.find((item) => item.dishId === dishId);
      if (existingDraft) {
        existingDraft.quantity += 1;
      } else {
        items.push({ dishId, quantity: 1, note: '' });
      }
    },
    //{ tableId, dishId }
    removeItem: (state, action: PayloadAction<{ tableId: string; dishId: string }>) => {
      const tableId = action.payload.tableId;
      const items = state.byTableId[tableId];
      if (!items) return;
      const rest = items.filter((item) => item.dishId !== action.payload.dishId);
      if (rest.length === 0) {
        delete state.byTableId[tableId];
      } else {
        state.byTableId[tableId] = rest;
      }
    },
    //changeQuantity { tableId, dishId, quantity }
    changeQuantity: (
      state,
      action: PayloadAction<{ tableId: string; dishId: string; delta: number }>,
    ) => {
      const { tableId, dishId, delta } = action.payload;
      const items = state.byTableId[tableId];
      if (!items) return;
      const existingDraft = items.find((item) => item.dishId === dishId);
      if (existingDraft) {
        existingDraft.quantity += delta;
        if (existingDraft.quantity <= 0) {
          const rest = items.filter((item) => item.dishId !== dishId);
          if (rest.length === 0) {
            delete state.byTableId[tableId];
          } else {
            state.byTableId[tableId] = rest;
          }
        }
      }
    },
    setNote: (state, action: PayloadAction<{ tableId: string; dishId: string; note: string }>) => {
      const { tableId, dishId, note } = action.payload;
      const items = state.byTableId[tableId];
      if (!items) return;
      const existingDraft = items.find((item) => item.dishId === dishId);
      if (existingDraft) {
        existingDraft.note = note;
      }
    },
    clearDraft: (state, action: PayloadAction<string>) => {
      delete state.byTableId[action.payload];
    },
  },
});

// 5. createSlice сам створив "бланки заявок" (action creators). Експортуємо їх.
export const { addItem, removeItem, changeQuantity, setNote, clearDraft } =
  orderDraftsSlice.actions;

// 6. І адміністратора розділу (reducer), щоб підключити його до store.
export default orderDraftsSlice.reducer;

const EMPTY: DraftItem[] = [];

// селектор із параметром: state приходить першим, далі твої аргументи

export const selectDraft = (state: RootState, tableId: string) =>
  state.orderDrafts.byTableId[tableId] ?? EMPTY;
//selectDraftCount(state, tableId) повертає загальну кількість страв
export const selectDraftCount = (state: RootState, tableId: string) =>
  selectDraft(state, tableId).reduce((sum, item) => sum + item.quantity, 0);
