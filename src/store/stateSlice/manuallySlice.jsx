import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const manuallySlice = createSlice({
  name: 'manually',
  initialState,
  reducers: {
    updateItemSuccess: (state, action) => {
      const {id, updatedItem} = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        console.log('updateItemSuccess?????!!');
        state.items[index] = {...state.items[index], ...updatedItem};
      }
      console.log('updateItemSuccess');
      console.log(state.items);
    },
    deleteItem: (state, action) => {
      const {id} = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
    addItemRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    addItemSuccess: (state, action) => {
      console.log('manuallySlice.addItemSuccess');
      console.log(action.payload);
      state.loading = false;
      state.items.push(action.payload);
      console.log(state.items);
    },
    addItemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchItemsRequest: state => {
      state.loading = true;
      state.error = null;
    },
    fetchItemsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchItemsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  deleteItem,
  updateItemSuccess,
  addItemRequest,
  addItemSuccess,
  addItemFailure,
  fetchItemsRequest,
  fetchItemsSuccess,
  fetchItemsFailure,
} = manuallySlice.actions;

export default manuallySlice.reducer;
