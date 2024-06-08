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
    addItemRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    addItemSuccess: (state, action) => {
      // console.log(action.payload)
      state.loading = false;
      state.items.push(action.payload);
    },
    addItemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchItemsRequest: (state) => {
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
  addItemRequest,
  addItemSuccess,
  addItemFailure,
  fetchItemsRequest,
  fetchItemsSuccess,
  fetchItemsFailure,
} = manuallySlice.actions;

export default manuallySlice.reducer;
