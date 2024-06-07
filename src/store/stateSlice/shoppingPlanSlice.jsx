// store/shoppingPlanSlice.js

import { createSlice } from '@reduxjs/toolkit';

const shoppingPlanSlice = createSlice({
  name: 'shoppingPlan',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push({
        id: Date.now().toString(),
        name: action.payload,
        completed: false,
      });
    },
    toggleItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.completed = !item.completed;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, toggleItem, removeItem } = shoppingPlanSlice.actions;
export default shoppingPlanSlice.reducer;
